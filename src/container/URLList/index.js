import React from 'react';
import {List, Button} from 'antd';

import {observer, inject} from 'mobx-react';

import './index.scss';

@inject(({store}) => ({
    list: store.list,
    openPage: store.openPage
}))
@observer
export default class URLList extends React.Component {
    render() {
        const {list, openPage} = this.props;
        return (
            <List
                className="m-list"
                bordered
                dataSource={list}
                renderItem={item => {
                    return (
                        <List.Item>
                            <Button
                                className="link"
                                onClick={openPage.bind(this, item.url)}
                            >{item.title}</Button>
                        </List.Item>
                    );
                }}
            />
        );
    }
}