import React from 'react';
import {List, Button} from 'antd';

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
                bordered
                dataSource={data}
                renderItem={item => {
                    return (
                        <List.Item>
                            <Button onClick={this.openPage.bind(this, item)}>{item}</Button>
                        </List.Item>
                    );
                }}
            />
        );
    }
}