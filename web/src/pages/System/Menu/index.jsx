import { Card, Col, Input, Row, DatePicker, Button, Table, Modal, Space, Popconfirm, Form, Alert, Radio, Cascader } from 'antd'
import { useEffect, useState } from 'react';
import { getMenuInfo } from '../../../api/menu';
import MyIcon from '@/components/MyIcon';
import dayjs from 'dayjs';
import FormSubmitButton from '../../../components/FormSubmitButton';

const { RangePicker } = DatePicker;

const addKeyToItems = (menuData) => {
  menuData.forEach(item => {
    // 确保menuId存在，如果不存在则默认为0
    item.key = item.menuId || 0;
    if (item.children && item.children.length > 0) {
      // 递归处理子项
      addKeyToItems(item.children);
    }
  });

  return menuData;
}

const dataToOptions = (dataSource) => {
  let options = [];

  for (let i = 0; i < dataSource.length; i++) {
    if (dataSource[i].type == 1 || dataSource[i].hidden == 1) continue;
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

// todo: 0822 菜单表单未完成
const MenuMS = () => {
  const columns = [
    {
      title: '菜单标题',
      dataIndex: 'menuName',
      width: 200,
      fixed: 'left',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 100,
      render: (_, record) => (
        <MyIcon type={`icon-${record.icon}`} />
      )
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
    },
    {
      title: '组件路径',
      dataIndex: 'page',
      width: 250
    },
    {
      title: '请求路径 / 外链地址',
      dataIndex: 'url',
      width: 250
    },
    {
      title: '是否外链',
      dataIndex: 'type',
      width: 100,
      render: (_, record) => (
        <span>{record.type == 0 ? '否' : '是'}</span>
      )
    },
    {
      title: '是否可见',
      dataIndex: 'hidden',
      width: 100,
      render: (_, record) => (
        <span>{record.hidden ? '否' : '是'}</span>
      )
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      width: 100,
      render: (_, record) => (
        <span>{record.enabled ? '是' : '否'}</span>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="确认编辑该条记录吗？"
            onConfirm={() => { showFormModalOpen(record) }}
            okText="确定"
            cancelText="取消">
            <a>编辑</a>
          </Popconfirm>
          <Popconfirm
            title="确认删除吗，如此菜单包含子菜单将同时删除？"
            onConfirm={() => { delFormData(record.menuId) }}
            okText="确定"
            cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [date, setDate] = useState([]);
  const [parentMenuOptions, setParentMenuOptions] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getTableData();
  }, []);

  // 初始化父级节点选择器数据
  const initParentMenuOptions = () => {
    const options = dataToOptions(dataSource);
    options.unshift({
      label: '顶级节点',
      value: 0
    });
    setParentMenuOptions(options);
  };

  const getTableData = () => {
    setTableLoading(true);
    let params = {
      menuName,
      beginDate: date[0]?.format('YYYY-MM-DD'),
      endDate: date[1]?.format('YYYY-MM-DD')
    };
    console.log('getMenuInfo--params', params);
    getMenuInfo(params).then(res => {
      console.log('getMenuInfo', res);
      setDataSource(addKeyToItems(res.result));
      setTableLoading(false);
    })
  };

  const showFormModalOpen = (row) => {
    console.log('showFormModalOpen', row);
    initParentMenuOptions();
    setModalOpen(true);
    if (row.menuId) {
      setModalTitle('菜单-编辑');
    } else {
      setModalTitle('菜单-新增');
    }
  };

  const delFormData = (id) => {
    console.log('delFormData', id);
  };

  const beachDelFormData = () => {
    console.log('beachDelFormData');
  };

  const reset = () => {
    setMenuName('');
    setDate([]);
  };

  const menuNameChange = (e) => {
    setMenuName(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e);
  };

  const modalCanael = () => {
    form.resetFields();
    // setAddFormRow({});
    // setBtnLoading(false)
    setModalOpen(false);
  };

  const submitForm = (values) => {
    console.log('submitForm-values', values);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedKeys(selectedRowKeys);
    }
  };

  return (
    <>
      <Card title="筛选条件" style={{ marginBottom: 20 }}>
        <Row gutter={20}>
          <Col>
            <Input
              value={menuName}
              placeholder='菜单名称'
              allowClear
              onChange={menuNameChange}>
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
            <Button type='primary' onClick={showFormModalOpen}>新增</Button>
          </Col>
          <Col>
            <Button danger type='primary' disabled={!selectedKeys.length > 0} onClick={beachDelFormData}>删除</Button>
          </Col>
        </Row>
      </Card>

      <Card title="菜单数据">
        <Table
          loading={tableLoading}
          scroll={{ x: '100%' }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
            checkStrictly: false // 树形数据->关闭严格检查模式
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            hideOnSinglePage: true
          }}>
        </Table>
      </Card>

      <Modal
        title={modalTitle}
        destroyOnClose
        footer={null}
        open={modalOpen}
        keyboard={false}
        maskClosable={false}
        width={700}
        onCancel={modalCanael}
      >
        <Form
          form={form}
          name="form"
          autoComplete="off"
          onFinish={submitForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}>

          <Form.Item
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
            name="menuName">
            <Input allowClear type='text' placeholder='菜单名称' />
          </Form.Item>

          <Form.Item
            label="组件路径"
            rules={[{ required: true, message: '请输入组件路径' }]}
            name="page">
            <Input allowClear type='text' placeholder='组件路径  例：/Dashboard/index' />
          </Form.Item>

          <Form.Item
            label="请求路径/外链地址"
            rules={[{ required: true, message: '请输入组件路径' }]}
            name="url">
            <Input allowClear type='text' placeholder='请求路径(外链地址) 例：/dashboard 或 https://umijs.org/' />
          </Form.Item>

          <Form.Item
            label="上级节点"
            rules={[{ required: true, message: '请选择菜单上级节点' }]}
            name="pid"
            wrapperCol={{ span: 10 }}>
            <Cascader
              allowClear
              changeOnSelect
              options={parentMenuOptions}
              placeholder="菜单上级节点" />
          </Form.Item>

          <Form.Item
            label="菜单图标"
            name="icon"
            wrapperCol={{ span: 10 }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="菜单类型"
            name="type"
            wrapperCol={{ span: 10 }}>
            <Radio.Group>
              <Radio value={0}>内部菜单</Radio>
              <Radio value={1}>外部菜单</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="菜单排序"
            name="sort"
            wrapperCol={{ span: 10 }}>
            <Input allowClear type='number' placeholder='菜单排序' />
          </Form.Item>

          <Form.Item
            label="是否可见"
            name="hidden"
            wrapperCol={{ span: 10 }}>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="是否启用"
            name="enabled"
            wrapperCol={{ span: 10 }}>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}>
            <Row gutter={20} justify="center">
              <Col>
                <Button onClick={modalCanael}>取消</Button>
              </Col>
              <Col>
                <FormSubmitButton form={form}>确定</FormSubmitButton>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuMS;
