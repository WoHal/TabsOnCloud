import React from 'react';
import ReactDOM from 'react-dom';

import Config from './components/Config';
import URLList from './components/URLList';

import './entry.scss';

class App extends React.Component {
    render() {
        return (
            <div className="entry">
                <Config />
                <URLList />
            </div>
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