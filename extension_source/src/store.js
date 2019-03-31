import {observable, action} from 'mobx';

const chromeTabs = chrome.tabs;
const chromeStorage = chrome.storage.sync;

class Store {
    @observable server = '';
    @observable boards = [];
    @observable list = [];

    @action.bound init() {
        chromeStorage.get(['server'], ({server}) => {
            this.server = server;
        });
        chromeStorage.get(['url_list'], ({data}) => {
            this.list = data;
        });
    }
    @action.bound openPage(url) {
        chromeTabs.create({ url });
    }
    @action.bound updateServerConfig(value) {
        const server = value.trim();

        if (!server) {
            return;
        }
        chromeStorage.set({ server });
    }
}

export default new Store();