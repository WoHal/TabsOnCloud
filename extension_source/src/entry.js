import React from 'react';
import ReactDOM from 'react-dom';

import URLList from './components/List';

class App extends React.Component {
    render() {
        return (
            <URLList />
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