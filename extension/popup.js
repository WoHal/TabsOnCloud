function syncURLsOfTabs(socket) {
    chrome.tabs.query({}, function(tabs) {
        const urls = [];
        for (tab of tabs.values()) {
            if (tab.url) {
                urls.push(tab.url);
            }
        }
        socket.send(JSON.stringify(urls));
    });
}

function start() {
    try {
        const ws = new WebSocket('ws://localhost:8033');
        ws.addEventListener('open', function() {
            // one hour
            const delay = 1000 * 60 * 60;
            
            setInterval(syncURLsOfTabs.bind(this, ws), delay)
        });
        ws.addEventListener('error', function(event) {
            console.log('err ', event);
        });
    } catch(e) {
        console.error(e);
        setTimeout(start, 100 * 1000);
    }
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {ports: [80, 443]}
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    start();
});

