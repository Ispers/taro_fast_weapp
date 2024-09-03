import { Card, Col, Input, Row, DatePicker, Button, Table, Modal, Space, Popconfirm, Form, Radio, Cascader, Select, notification } from 'antd'
import { useEffect, useState } from 'react';
import { addMenu, getIcons, getMenuInfo, modifyMenu, removeMenu } from '../../../api/menu';
import MyIcon from '@/components/MyIcon';
import FormSubmitButton from '../../../components/FormSubmitButton';

const { RangePicker } = DatePicker;

// 给dataSource添加key索引
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

// 根据菜单数据生成父级节点选择器数据
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

// 根据 menuId 计算 pid 层叠关系数组
const getParentPids = (menuId, menus) => {
  for (const menu of menus) {
    if (menu.menuId === menuId) {
      return [0];
    }
    if (menu.children) {
      const result = getParentPids(menuId, menu.children);
      if (result) {
        let res = [menu.key, ...result];
        if (res[res.length - 1] == 0) {
          res.pop();
        }
        return res;
      }
    }
  }
  return null;
}

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
      width: 60,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="确认编辑该条记录吗？"
            onConfirm={() => { showFormModalOpen(record) }}
            okText="确定"
            cancelText="取消">
            <a>编辑</a>
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
  const [modalLoading, setModalLoading] = useState(false);
  const [iconOptions, setIconOptions] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [formBtnLoading, setFormBtnLoading] = useState(false);
  const [delBtnLoading, setDelBtnLoading] = useState(false);

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

  // 初始化图标
  const initIcon = () => {
    getIcons().then(res => {
      console.log('getIcons', res);
      let options = [];
      res?.result?.forEach((item) => {
        options.push({
          label: item.name,
          value: item.value,
          icon: item.value
        })
      })
      setIconOptions(options);
      setModalLoading(false);
    })
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
    setModalLoading(true);
    initParentMenuOptions();
    initIcon();
    if (row.menuId) {
      setModalTitle('菜单-编辑');
      setEditRow(row);
      form.setFieldsValue({
        'menuName': row.menuName,
        'page': row.page,
        'url': row.url,
        'pid': getParentPids(row.menuId, dataSource),
        'icon': row.icon,
        'type': row.type,
        'sort': row.sort,
        'hidden': row.hidden ? 1 : 0,
        'enabled': row.enabled ? 1 : 0
      });
    } else {
      setModalTitle('菜单-新增');
      form.setFieldsValue({
        'pid': [0],
        'type': 0,
        'sort': 1,
        'hidden': 0,
        'enabled': 1
      });
    }
    setModalOpen(true);
  };

  const beachDelFormData = () => {
    setDelBtnLoading(true);
    console.log('beachDelFormData-selectedRowKeys', selectedKeys);
    removeMenu(selectedKeys).then(res => {
      console.log('removeMenu', res);
      notification.success({
        message: '提示',
        description: '删除菜单成功',
        duration: 5
      });
      getTableData();
      setDelBtnLoading(false);
    });
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
    setEditRow(null);
    setFormBtnLoading(false);
    setModalOpen(false);
  };

  const submitForm = (values) => {
    setFormBtnLoading(true);
    let params = { ...values };
    params.pid = params.pid[params.pid.length - 1];
    if (editRow?.menuId) {
      params.menuId = editRow.menuId
    }
    console.log('submitForm-params:', params);
    if (editRow?.menuId) {
      // 编辑
      modifyMenu(params).then(res => {
        console.log('modifyMenu', res);
        notification.success({
          message: '提示',
          description: '修改菜单成功',
          duration: 5
        })
        modalCanael();
        getTableData();
      })
    } else {
      // 新增
      addMenu(params).then(res => {
        console.log('addMenu', res);
        notification.success({
          message: '提示',
          description: '新增菜单成功',
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
            <Popconfirm
              title="确认删除已选择的菜单吗？"
              onConfirm={() => { beachDelFormData() }}
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

      <Card title="菜单数据">
        <Table
          loading={tableLoading}
          scroll={{ x: '100%', y: 700 }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
            checkStrictly: false // 树形数据->关闭严格检查模式
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={{ hideOnSinglePage: true }}>
        </Table>
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
        width={700}
        onCancel={modalCanael}
      >
        <Form
          form={form}
          name="form"
          autoComplete="off"
          onFinish={submitForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}>

          <Form.Item
            label="菜单名称"
            tooltip="左侧菜单栏展示的名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
            name="menuName">
            <Input allowClear type='text' placeholder='菜单名称' />
          </Form.Item>

          <Form.Item
            label="组件路径"
            tooltip="组件在工程文件中src/pages下的路径（包含子菜单则应为空），例：/Dashboard/index"
            name="page">
            <Input allowClear type='text' placeholder='组件路径(包含子菜单则应为空)  例：/Dashboard/index' />
          </Form.Item>

          <Form.Item
            label="请求路径/外链地址"
            tooltip="组件的路由路径（需注意多级菜单需要包含上一级的路径），例：/Test/Test1。如是外链菜单，此处则填写外链地址"
            rules={[{ required: true, message: '请输入组件路径' }]}
            name="url">
            <Input allowClear type='text' placeholder='请求路径(外链地址) 例：/dashboard 或 https://umijs.org/' />
          </Form.Item>

          <Form.Item
            label="上级节点"
            tooltip="菜单父节点，默认为根节点"
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
            <Select
              allowClear
              showSearch
              placeholder="请选择菜单图标"
              options={iconOptions}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              labelRender={(props) => {
                const { label, value } = props;
                if (label) {
                  return (
                    <Space>
                      <span role="img" aria-label={label}>
                        <MyIcon type={`icon-${value}`} />
                      </span>
                      {label} - {value}
                    </Space>
                  );
                }
                return <span>当前没有对应的选项</span>;
              }}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    <MyIcon type={`icon-${option.data.icon}`} />
                  </span>
                  {option.data.label} - {option.data.icon}
                </Space>
              )}>
            </Select>
          </Form.Item>

          <Form.Item
            label="菜单类型"
            name="type"
            wrapperCol={{ span: 10 }}>
            <Radio.Group>
              <Radio value={0}>内部菜单</Radio>
              <Radio value={1}>外链菜单</Radio>
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
              <Radio value={0}>是</Radio>
              <Radio value={1}>否</Radio>
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
                <FormSubmitButton form={form} loaidng={formBtnLoading}>确定</FormSubmitButton>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuMS;
