import React from 'react';
import { Button, Popconfirm, Table } from 'antd';

const ProductList = ({ onDelete, products, }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render(text, record) {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ];
    return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;