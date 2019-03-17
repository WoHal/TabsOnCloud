import React from 'react';

import {Input} from 'antd';

import './index.scss';

export default class Config extends React.Component {
    constructor() {
        super();
        this.state = {
            server: ''
        };
    }
    componentDidMount() {
        chrome.storage.sync.get(['server'], ({server}) => {
            this.setState({
                server
            });
        });
    }
    saveServerConfig(value) {
        const server = value.trim();

        if (!server) {
            return;
        }
        chrome.storage.sync.set({ server });
    }
    change(e) {
        this.setState({
            server: e.target.value
        });
    }
    render() {
        return (
            <div className="m-config">
                <span className="tit">Server</span>
                <Input.Search
                    className="input"
                    placeholder="IP:Port/domain"
                    size="large"
                    value={this.state.server}
                    enterButton="Save"
                    onSearch={this.saveServerConfig}
                />
            </div>
        );
    }
}