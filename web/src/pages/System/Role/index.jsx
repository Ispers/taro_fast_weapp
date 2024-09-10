import { Card, Col, Input, Row, DatePicker, Button, Table, Pagination, Modal, Space, Popconfirm, Form, Radio, Cascader, Select, notification, message } from 'antd';
import { useEffect, useState } from "react";
import { addRole, bindMenu, getMenuJsonArr, getRole, modifyRole, removeRole } from "../../../api/role";
import FormSubmitButton from '../../../components/FormSubmitButton';
import { getMenuInfo } from '../../../api/menu';

const { RangePicker } = DatePicker;

// 根据菜单数据生成节点选择器数据
const dataToOptions = (dataSource) => {
    let options = [];

    for (let i = 0; i < dataSource.length; i++) {
        let opItem = {};
        opItem.label = dataSource[i].menuName;
        opItem.value = dataSource[i].menuId;
        if (dataSource[i].children && dataSource[i].children.length > 0) {
            opItem.children = dataToOptions(dataSource[i].children);
        }
        options.push(opItem);
    }

    return options;
};



const Role = () => {
    const columns = [
        { title: '角色编码', dataIndex: 'code' },
        { title: '角色名称', dataIndex: 'name' },
        { title: '描述', dataIndex: 'description' },
        {
            title: '启用状态', dataIndex: 'enabled',
            render: (_, record) => (
                <div>{record.enabled === 1 ? '启用' : '禁用'}</div>
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
                    <a onClick={() => {
                        showMenuModalOpen(record)
                    }}>菜单</a>
                    <a onClick={() => {
                        showFormModalOpen(record)
                    }}>编辑</a>
                    <Popconfirm
                        title="确认删除该条记录吗？"
                        onConfirm={() => {
                            del(record.roleId)
                        }}
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
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [formBtnLoading, setFormBtnLoading] = useState(false);
    const [menuModalLoading, setMenuModalLoading] = useState(false);
    const [menuModalOpen, setMenuModalOpen] = useState(false);
    const [menuCascaderOptions, setMenuCascaderOptions] = useState([]);
    const [menuCascaderValue, setMenuCascaderValue] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [roleId, setRoleId] = useState(0);

    const [form] = Form.useForm();

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

    const del = (id) => {
        setDelBtnLoading(true);
        console.log('del-id', id);
        removeRole([id]).then(res => {
            console.log('removeRole', res);
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
        console.log('beachDel-selectedRowKeys', selectedKeys);
        removeRole(selectedKeys).then(res => {
            console.log('removeRole', res);
            notification.success({
                message: '提示',
                description: '删除菜单成功',
                duration: 5
            });
            getTableData();
            setDelBtnLoading(false);
        });
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

    const showFormModalOpen = (row) => {
        console.log('showFormModalOpen', row);
        setModalLoading(true);
        setModalOpen(true);
        if (row.roleId) {
            setModalTitle('角色-编辑');
            setEditRow(row);
            form.setFieldsValue({
                'code': row.code,
                'name': row.name,
                'enabled': row.enabled,
                'description': row.description,
            });
        } else {
            setModalTitle('角色-新增');
            form.setFieldValue('enabled', 1)
        }
        setTimeout(() => {
            setModalLoading(false);
        }, 500);
    };

    const pageChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
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
        if (editRow?.roleId) {
            params.roleId = editRow.roleId
        }
        console.log('submitForm-params:', params);
        if (editRow?.roleId) {
            // 编辑
            modifyRole(params).then(res => {
                console.log('modifyRole', res);
                notification.success({
                    message: '提示',
                    description: '修改角色成功',
                    duration: 5
                })
                modalCanael();
                getTableData();
            })
        } else {
            // 新增
            addRole(params).then(res => {
                console.log('addRole', res);
                notification.success({
                    message: '提示',
                    description: '新增角色成功',
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

    const showMenuModalOpen = (row) => {
        let num = 0;
        setMenuModalLoading(true);
        setMenuModalOpen(true);
        setRoleId(row.roleId);
        getMenuInfo().then(res => {
            console.log('getMenuInfo', res);
            setMenuCascaderOptions(dataToOptions(res.result));
            if (++num === 2) {
                setMenuModalLoading(false);
            }
        })
        getMenuJsonArr(row.roleId).then(res => {
            console.log('getMenuJsonArr', res);
            setMenuCascaderValue(res.result ? JSON.parse(res.result) : []);
            if (++num === 2) {
                setMenuModalLoading(false);
            }
        })
    };

    const menuModalCanael = () => {
        setMenuModalOpen(false);
        setMenuCascaderValue([]);
    };

    const menuCascaderOnChange = (value) => {
        setMenuCascaderValue(value);
    };

    const submitMenu = () => {
        // 根据选中的 values 计算 SelectedMenuIds
        setConfirmLoading(true);
        const getSelectedMenuIds = (values) => {
            const uniqueValues = new Set();
            values.forEach(subArray => {
                subArray.forEach(value => uniqueValues.add(value));
            });
            return Array.from(uniqueValues);
        };

        if (menuCascaderValue.length === 0) {
            message.warning('菜单列表不能为空成功');
            return;
        }
        const selectedMenuIds = getSelectedMenuIds(menuCascaderValue);
        let params = {
            selectedMenuIds,
            menuJsonArr: JSON.stringify(menuCascaderValue),
            roleId
        };
        console.log('bindMenu-params:', params);
        bindMenu(params).then(res => {
            console.log('bindMenu', res);
            notification.success({
                message: '提示',
                description: '角色绑定菜单成功',
                duration: 5
            });
            setConfirmLoading(false);
            menuModalCanael();
        });
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
                            onConfirm={() => {
                                beachDel()
                            }}
                            okText="确定"
                            cancelText="取消">
                            <Button danger type='primary' loading={delBtnLoading}
                                disabled={!selectedKeys.length > 0}>删除</Button>
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
                    style={{ marginTop: '20px' }}
                    form={form}
                    name="form"
                    autoComplete="off"
                    onFinish={submitForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="角色编码"
                        rules={[{ required: true, message: '请输入角色编码' }]}
                        name="code">
                        <Input allowClear type='text' placeholder='角色编码' />
                    </Form.Item>
                    <Form.Item
                        label="角色名称"
                        rules={[{ required: true, message: '请输入角色名称' }]}
                        name="name">
                        <Input allowClear type='text' placeholder='角色名称' />
                    </Form.Item>
                    <Form.Item
                        label="启用状态"
                        name="enabled"
                        wrapperCol={{ span: 10 }}>
                        <Radio.Group>
                            <Radio value={1}>启用</Radio>
                            <Radio value={0}>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description">
                        <Input allowClear type='text' placeholder='描述' />
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

            <Modal
                loading={menuModalLoading}
                title="菜单角色管理"
                destroyOnClose
                open={menuModalOpen}
                keyboard={false}
                maskClosable={false}
                width={500}
                onCancel={menuModalCanael}
                onOk={submitMenu}
                confirmLoading={confirmLoading}
            >
                <Cascader
                    allowClear
                    placeholder="请选择角色拥有的菜单"
                    style={{ width: '100%', margin: '20px 0' }}
                    options={menuCascaderOptions}
                    onChange={menuCascaderOnChange}
                    value={menuCascaderValue}
                    showCheckedStrategy='SHOW_CHILD'
                    multiple
                    maxTagCount="responsive"
                />
            </Modal>
        </>
    );
};

export default Role;