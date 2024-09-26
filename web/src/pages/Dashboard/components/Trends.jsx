import { Card } from "antd";
import React, { useState, useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';

const Trends = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const getData = () => {
        setTimeout(() => {
            setData(Array.from({
                length: 5,
            }).map((_, i) => ({
                href: 'javascript:void(0);',
                title: `动态-${i + 1}`,
                avatar: require(`../../../assets/images/${i + 1}.png`),
                img: require(`../../../assets/images/b${i + 1}.jpg`),
                description: 'Ant设计是一种用于后台应用程序的设计语言，由Ant UED团队进行改进',
                content: '我们提供一系列的设计原则，实用的模式和高质量的设计资源 (草图和Axure)，帮助人们创建他们的产品原型精美，高效。',
            })));
        }, 700);
    }

    return (
        <div style={{ marginTop: '-1vw', boxSizing: 'border-box', padding: '0 .6vw' }}>
            <Card title='动态'>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    style={{ borderRadius: '5px' }}
                                    width={272}
                                    alt="logo"
                                    src={item.img}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Card>
        </div >
    );
};

export default Trends;