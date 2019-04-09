import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import store from './store';

import Config from './container/Config';
import URLList from './container/URLList';

import './entry.scss';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="entry">
                    <Config />
                    <URLList />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

chrome.runtime.onMessage.addListener((sender, resp) => {
    alert(JSON.stringify(sender));
});