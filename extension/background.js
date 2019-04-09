let ws;

function start(server) {
    try {
        ws = new WebSocket(`ws://${server}`);
        ws.addEventListener('open', function() {
            // one hour
            const delay = 1000 * 60 * 60;
            syncURLsOfTabs(ws);

            // setInterval(syncURLsOfTabs.bind(this, ws), delay)
        });
        ws.addEventListener('error', function(event) {
            console.log('err ', event);
        });
    } catch (e) {
        console.error(e);
        setTimeout(start.bind(this, server), 100 * 1000);
    }
}

function restart(server) {
    if (ws) {
        ws.close();
        ws = null;
    }
    start(server);
}

function syncURLsOfTabs(socket) {
    chrome.tabs.query({}, function(tabs) {
        const urls = [];
        for (tab of tabs.values()) {
            if (!tab.url.startsWith('chrome://')) {
                urls.push({
                    url: tab.url,
                    title: tab.title
                });
            }
        }
        socket.send(JSON.stringify(urls));

        chrome.storage.sync.set({
            data: urls
        });
    });
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { ports: [80, 443] }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });


    let server;
    chrome.storage.sync.get(['server'], function(data) {
        server = data.server || 'localhost:8033';
        start(server);
    });
    chrome.storage.onChanged.addListener(function(change, areaName) {
        if (areaName === 'sync') {
            for (let key in change) {
                if (key === 'server') {
                    restart(change[key].newValue);
                }
            }
        }
    });
});