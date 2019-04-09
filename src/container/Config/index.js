import React from 'react';
import {observer, inject} from 'mobx-react';

import {Input} from 'antd';

import './index.scss';

@inject(({store}) => {
    alert(store.server)
    return ({
        server: store.server,
        updateServerConfig: store.updateServerConfig
    });
})
@observer
export default class Config extends React.Component {
    render() {
        const {server, updateServerConfig} = this.props;
        alert(server)
        return (
            <div className="m-config">
                <span className="tit">Server</span>
                <Input.Search
                    className="input"
                    placeholder="IP:Port/domain"
                    size="large"
                    value={server}
                    enterButton="Save"
                    onSearch={updateServerConfig}
                />
            </div>
        );
    }
}