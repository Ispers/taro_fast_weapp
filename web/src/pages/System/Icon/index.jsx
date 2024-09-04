import { Card, Col, Input, Row, DatePicker, Button, Table, Modal, Space, Popconfirm, Form, Radio, Cascader, Select, notification, Pagination } from 'antd'
import { useEffect, useState } from 'react';
import { addIcon, getIcon, modifyIcon, removeIcon } from '../../../api/icon';
import FormSubmitButton from '../../../components/FormSubmitButton';

const { RangePicker } = DatePicker;

const Icon = () => {
    const columns = [
        { title: '图标名称', dataIndex: 'name' },
        { title: '关键字', dataIndex: 'value' },
        { title: '创建时间', dataIndex: 'createTime' },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { showFormModalOpen(record) }}>编辑</a>
                    <Popconfirm
                        title="确认删除该条记录吗？"
                        onConfirm={() => { del(record.id) }}
                        okText="确定"
                        cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            )
        },
    ];
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [delBtnLoading, setDelBtnLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [current, setCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [formBtnLoading, setFormBtnLoading] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        getTableData();
    }, [current, size]);

    const getTableData = () => {
        setTableLoading(true);
        let params = {
            current,
            size,
            name,
            value,
            beginDate: date[0]?.format('YYYY-MM-DD'),
            endDate: date[1]?.format('YYYY-MM-DD')
        };
        console.log('getTableData- params: ', params);
        getIcon(params).then(res => {
            console.log('getIcon', res);
            let data = res.result.records || [];
            data.forEach(item => {
                item.key = item.id;
            })
            setCurrent(res.result.current);
            setDataSource(data);
            setTotalCount(res.result.totalCount);
            setTableLoading(false);
        });
    };

    const nameChange = (e) => {
        setName(e.target.value);
    };

    const valueChange = (e) => {
        setValue(e.target.value);
    };

    const dateChange = (e) => {
        setDate(e);
    };

    const pageChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
    };

    const reset = () => {
        setName('');
        setValue('');
        setDate([]);
    };

    const del = (id) => {
        setDelBtnLoading(true);
        console.log('del-id', id);
        removeIcon([id]).then(res => {
            console.log('removeIcon', res);
            notification.success({
                message: '提示',
                description: '删除菜单成功',
                duration: 5
            });
            getTableData();
            setDelBtnLoading(false);
        });
    };

    const beachDel = () => {
        setDelBtnLoading(true);
        console.log('beachDelFormData-selectedRowKeys', selectedKeys);
        removeIcon(selectedKeys).then(res => {
            console.log('removeIcon', res);
            notification.success({
                message: '提示',
                description: '删除菜单成功',
                duration: 5
            });
            getTableData();
            setDelBtnLoading(false);
        });
    };

    const showFormModalOpen = (row) => {
        console.log('showFormModalOpen', row);
        setModalLoading(true);
        setModalOpen(true);
        if (row.id) {
            setModalTitle('图标-编辑');
            setEditRow(row);
            form.setFieldsValue({
                'name': row.name,
                'value': row.value
            });
        } else {
            setModalTitle('图标-新增');
        }
        setTimeout(() => {
            setModalLoading(false);
        }, 500);
    };

    const modalCanael = () => {
        form.resetFields();
        setEditRow(null);
        setFormBtnLoading(false);
        setModalOpen(false);
    };

    const submitForm = (values) => {
        setFormBtnLoading(true);
        let params = { ...values };
        if (editRow?.id) {
            params.id = editRow.id
        }
        console.log('submitForm-params:', params);
        if (editRow?.id) {
            // 编辑
            modifyIcon(params).then(res => {
                console.log('modifyIcon', res);
                notification.success({
                    message: '提示',
                    description: '修改图标成功',
                    duration: 5
                })
                modalCanael();
                getTableData();
            })
        } else {
            // 新增
            addIcon(params).then(res => {
                console.log('addIcon', res);
                notification.success({
                    message: '提示',
                    description: '新增图标成功',
                    duration: 5
                })
                modalCanael();
                getTableData();
            })
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedKeys(selectedRowKeys);
        }
    };

    return (
        <>
            <Card title='筛选条件' style={{ marginBottom: 20 }}>
                <Row>
                    <p style={{color: '#cb0000'}}>注：系统采用动态引用-阿里巴巴矢量图标库&nbsp;</p>
                    <a href='https://www.iconfont.cn/help/detail?spm=a313x.manage_type_myprojects.i1.d8cf4382a.65ff3a81UOptyN&helptype=code' target='_blank'>(参考地址 symbol 引用)</a>
                </Row>
                <Row gutter={20} style={{ marginTop: 15 }}>
                    <Col>
                        <Input
                            value={name}
                            placeholder='图标名称'
                            allowClear
                            onChange={nameChange}>
                        </Input>
                    </Col>
                    <Col>
                        <Input
                            value={value}
                            placeholder='关键字'
                            allowClear
                            onChange={valueChange}>
                        </Input>
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

            <Card title='图标数据'>
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

            <Modal
                loading={modalLoading}
                title={modalTitle}
                forceRender
                destroyOnClose
                footer={null}
                open={modalOpen}
                keyboard={false}
                maskClosable={false}
                width={500}
                onCancel={modalCanael}
            >
                <Form
                    form={form}
                    name="form"
                    autoComplete="off"
                    onFinish={submitForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="图标名称"
                        rules={[{ required: true, message: '请输入图标名称' }]}
                        name="name">
                        <Input allowClear type='text' placeholder='图标名称' />
                    </Form.Item>
                    <Form.Item
                        label="关键字"
                        rules={[{ required: true, message: '请输入关键字' }]}
                        name="value">
                        <Input allowClear type='text' placeholder='关键字' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 24 }}>
                        <Row gutter={20} justify="center">
                            <Col>
                                <Button onClick={modalCanael}>取消</Button>
                            </Col>
                            <Col>
                                <FormSubmitButton form={form} loaidng={formBtnLoading}>确定</FormSubmitButton>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Icon;