import React from 'react';
import {List, Button} from 'antd';
import './index.scss';

export default class URLList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        chrome.storage.sync.get(['data'], ({data}) => {
            this.setState({
                data
            });
        });
    }
    openPage(url) {
        chrome.tabs.create({url});
    }
    render() {
        const {data} = this.state;
        return (
            <List
                className="m-list"
                bordered
                dataSource={data}
                renderItem={item => {
                    return (
                        <List.Item>
                            <Button
                                className="link"
                                onClick={this.openPage.bind(this, item.url)}
                            >{item.title}</Button>
                        </List.Item>
                    );
                }}
            />
        );
    }
}