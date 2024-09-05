import { Card, Col, Input, Row, DatePicker, Button, Table, Pagination, Modal, Space, Popconfirm, Form, Radio, Cascader, Select, notification } from 'antd';
import { useEffect, useState } from "react";
import { getRole } from "../../../api/role";

const { RangePicker } = DatePicker;

const Role = () => {
    const columns = [
        { title: '角色编码', dataIndex: 'code' },
        { title: '角色名称', dataIndex: 'name' },
        { title: '描述', dataIndex: 'description' },
        {
            title: '启用状态', dataIndex: 'enabled',
            render: (_, record) => (
                <div>{record.enabled === 1 ? '已启用' : '未启用'}</div>
            )
        },
        { title: '创建人', dataIndex: 'createBy' },
        { title: '创建时间', dataIndex: 'createTime' },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <a>菜单</a>
                    <a>编辑</a>
                    <Popconfirm
                        title="确认删除该条记录吗？"
                        onConfirm={() => { }}
                        okText="确定"
                        cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            )
        },
    ];
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [enabled, setEnabled] = useState(null);
    const [date, setDate] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [delBtnLoading, setDelBtnLoading] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [current, setCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        getTableData();
    }, []);

    const getTableData = () => {
        setTableLoading(true);
        let params = {
            current,
            size,
            name,
            code,
            enabled,
            beginDate: date[0]?.format('YYYY-MM-DD'),
            endDate: date[1]?.format('YYYY-MM-DD')
        };
        console.log('getTableData--params', params);
        getRole(params).then(res => {
            console.log('getRole', res);
            let data = res.result.records || [];
            data.forEach(item => {
                item.key = item.roleId;
            })
            setCurrent(res.result.current);
            setDataSource(data);
            setTotalCount(res.result.totalCount);
            setTableLoading(false);
        })
    };

    const nameChange = (e) => {
        setName(e.target.value);
    };

    const codeChange = (e) => {
        setCode(e.target.value);
    };

    const enabledChange = (e) => {
        setEnabled(e);
    };

    const dateChange = (e) => {
        setDate(e);
    };

    const reset = () => {
        setName('');
        setCode('');
        setEnabled(null);
        setDate([]);
    };

    const showFormModalOpen = () => {

    };

    const pageChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedKeys(selectedRowKeys);
        }
    };

    return (
        <>
            <Card title='筛选条件' style={{ marginBottom: 20 }}>
                <Row gutter={20} style={{ marginTop: 15 }}>
                    <Col>
                        <Input
                            value={name}
                            placeholder='角色名称'
                            allowClear
                            onChange={nameChange}>
                        </Input>
                    </Col>
                    <Col>
                        <Input
                            value={code}
                            placeholder='角色编码'
                            allowClear
                            onChange={codeChange}>
                        </Input>
                    </Col>
                    <Col>
                        <Select
                            value={enabled}
                            placeholder="启用状态"
                            style={{ width: 120 }}
                            onChange={enabledChange}
                            options={[
                                { label: '已启用', value: 1 },
                                { label: '未启用', value: 0 }
                            ]}
                        />

                    </Col>
                    <Col>
                        <RangePicker
                            value={date}
                            allowClear
                            onChange={dateChange} />
                    </Col>
                    <Col>
                        <Button type='primary' loading={tableLoading} onClick={getTableData}>搜索</Button>
                    </Col>
                    <Col>
                        <Button loading={tableLoading} onClick={reset}>重置</Button>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 15 }}>
                    <Col>
                        <Popconfirm
                            title="确认删除已选择的菜单吗？"
                            onConfirm={() => { beachDel() }}
                            okText="确定"
                            cancelText="取消">
                            <Button danger type='primary' loading={delBtnLoading} disabled={!selectedKeys.length > 0}>删除</Button>
                        </Popconfirm>
                    </Col>
                    <Col>
                        <Button type='primary' onClick={showFormModalOpen}>新增</Button>
                    </Col>
                </Row>
            </Card>

            <Card title='角色数据'>
                <Table
                    loading={tableLoading}
                    scroll={{ x: '100%', y: 700 }}
                    dataSource={dataSource}
                    columns={columns}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                    pagination={false}>
                </Table>

                <Pagination
                    style={{ marginTop: 20 }}
                    align='end'
                    current={current}
                    total={totalCount}
                    pageSize={size}
                    pageSizeOptions={[10, 20, 50]}
                    showTotal={(totalCount) => `共 ${totalCount} 条`}
                    onChange={pageChange}
                />
            </Card>
        </>
    );
};

export default Role;