import { Card, Col, Input, Row, DatePicker, Button, Table, Modal, Popconfirm, Select, Pagination, Tooltip, notification } from 'antd'
import { useEffect, useState } from 'react';
import { clearOperationLog, getOperationLog } from '../../../api/log';
import './index.less'

const { RangePicker } = DatePicker;

const Log = () => {
    const columns = [
        { title: '日志编号', dataIndex: 'id', width: 100 },
        { title: '操作人', dataIndex: 'operationUsername', width: 120 },
        { title: '操作模块', dataIndex: 'operationModule', width: 120 },
        { title: '操作事件', dataIndex: 'operationEvents', width: 250 },
        { title: '请求路径', dataIndex: 'operationUrl', width: 400 },
        {
            title: '请求数据', dataIndex: 'operationData', width: 250, ellipsis: { showTitle: false },
            render: (_, record) => (
                <Tooltip key={record.id} placement="topLeft" title={record.operationData}>
                    {record.operationData}
                </Tooltip>
            )
        },
        {
            title: '操作结果', dataIndex: 'operationStatus', width: 180,
            render: (_, record) => (<div key={record.id}>{record.operationStatus ? '成功' : '失败'}</div>)
        },
        { title: '所载IP地址', dataIndex: 'operationIp', width: 180 },
        { title: '操作时间', dataIndex: 'addTime', width: 180 },
        {
            title: '响应数据',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <a key={record.id} onClick={() => { showOperationResult(record) }}>响应数据</a>
            )
        }
    ];
    const [username, setUsername] = useState('');
    const [date, setDate] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [delBtnLoading, setDelBtnLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [current, setCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [operationStatus, setOperationStatus] = useState(null);

    useEffect(() => {
        getTableData();
    }, [current, size]);

    const getTableData = () => {
        setTableLoading(true);
        let params = {
            current,
            size,
            username,
            operationStatus,
            beginDate: date[0]?.format('YYYY-MM-DD'),
            endDate: date[1]?.format('YYYY-MM-DD')
        };
        console.log('getOperationLog--params', params);
        getOperationLog(params).then(res => {
            console.log('getOperationLog', res);
            setCurrent(res.result.current);
            let data = res.result.records || [];
            data.forEach(item => {
                item.key = item.id;
            });
            setDataSource(data);
            setTotalCount(res.result.totalCount);
            setTableLoading(false);
        })
    };

    const showOperationResult = (row) => {
        Modal.info({
            okText: '关闭',
            title: '响应数据',
            width: '800px',
            content: (
                <div className='operationResult'>
                    {row.operationResult}
                </div>
            ),
            onOk() { },
        });
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };

    const dateChange = (e) => {
        setDate(e);
    };

    const operationStatusChange = (e) => {
        setOperationStatus(e);
    };

    const pageChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
    };

    const reset = () => {
        setUsername('');
        setDate([]);
        setOperationStatus(null);
    };

    const beachDel = () => {
        setDelBtnLoading(true);
        clearOperationLog().then(res => {
            console.log('clearOperationLog', res);
            notification.success({
                message: '提示',
                description: '清空日志成功',
                duration: 5
            });
            setDelBtnLoading(false);
            getTableData();
        })
    };

    return (
        <>
            <Card title="筛选条件" style={{ marginBottom: 20 }}>
                <Row gutter={20}>
                    <Col>
                        <Input
                            value={username}
                            placeholder='操作人'
                            allowClear
                            onChange={usernameChange}>
                        </Input>
                    </Col>
                    <Col>
                        <Select
                            style={{ width: 120 }}
                            value={operationStatus}
                            placeholder='操作结果'
                            allowClear
                            onChange={operationStatusChange}>
                            <Select.Option value={true}>成功</Select.Option>
                            <Select.Option value={false}>失败</Select.Option>
                        </Select>
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
                            title="确认清空所有操作日志吗？"
                            onConfirm={() => { beachDel() }}
                            okText="确定"
                            cancelText="取消">
                            <Button danger type='primary' loading={delBtnLoading} >清空</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </Card>

            <Card title="操作日志数据">
                <Table
                    loading={tableLoading}
                    scroll={{ x: '100%', y: 700 }}
                    dataSource={dataSource}
                    columns={columns}
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

export default Log;