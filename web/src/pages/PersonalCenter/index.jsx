import { Button, Card, Col, DatePicker, Flex, Form, Input, Modal, notification, Radio, Row, Space, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MyIcon from '@/components/MyIcon';
import './index.less';
import { getAge, splitPhone } from "../../utils";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { modify, modifyPass } from "../../api/user";
import { setUser } from '../../store/slices/globalSlice';
import { getInfo, logout } from "../../api/auth";
import { removeToken } from '@/utils/auth';
import { history } from 'umi';
import CropAvatarAndUpload from "../../components/CropAvatarAndUpload";


const { TextArea } = Input;

const PersonalCenterPage = () => {
    const { user } = useSelector(state => state.global);
    const [form] = Form.useForm();
    const [modifyPwdForm] = Form.useForm();
    const dispatch = useDispatch();

    const [formDisabled, setFormDisabled] = useState(true);
    const [fromBtnLoading, setFromBtnLoading] = useState(false);
    const [modifyPwdModalOpen, setModifyPwdModalOpen] = useState(false);
    const [modifyPwdFormBtnLoading, setModifyPwdFormBtnLoading] = useState(false);
    const [avatar, setAvatar] = useState(user.avatarUrl);
    const [cropImageOpen, setCropImageOpen] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        form.setFieldsValue({
            nickname: user.nickname || '',
            realName: user.realName || '',
            gender: user.gender || 1,
            birthday: user.birthday ? dayjs(user.birthday) : '',
            phone: user.phone || '',
            email: user.email || '',
            address: user.address || ''
        });
    };

    const submitForm = (values) => {
        setFromBtnLoading(true);
        let params = {
            ...values,
            birthday: values.birthday.format('YYYY-MM-DD'),
            userId: user.userId
        };
        console.log('submitForm-params:', params);

        modify(params).then(res => {
            console.log('modify', res);
            // 获取用户信息
            getInfo().then(res => {
                console.log('getInfo', res);
                dispatch(setUser(res.result));
                notification.success({
                    message: '提示',
                    description: '修改资料成功',
                    duration: 5
                });
                setFromBtnLoading(false);
                setFormDisabled(true);
            })
        });
    };

    const submitModifyPwdForm = (values) => {
        setModifyPwdFormBtnLoading(true);
        let params = {
            oldPass: values.oldPass,
            newPass: values.newPass
        };
        console.log('submitForm-params:', params);

        modifyPass(params).then(res => {
            console.log('modifyPass', res);
            // 退出登录
            logout().then(res => {
                console.log('logout', res);
                notification.success({
                    message: '提示',
                    description: '修改密码成功',
                    duration: 5
                });
                removeToken();
                localStorage.removeItem('persist:root');
                setModifyPwdFormBtnLoading(false);
                history.replace('/Login');
            })
        }).catch(err => {
            setModifyPwdFormBtnLoading(false);
        })
    }

    const modifyPwdOnClose = () => {
        modifyPwdForm.resetFields();
        setModifyPwdModalOpen(false);
    };

    return (
        <>
            <Row gutter={15} style={{ height: '83vh' }}>
                <Col span={6}>
                    <Card title='个人信息'>
                        <Row justify={'center'}>
                            <CropAvatarAndUpload>
                                <img className="avatar" src={user.avatarUrl} title="点击上传头像" />
                            </CropAvatarAndUpload>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-username' /> 登录账号</Col>
                            <Col span={18} className="value">{user.username}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-nickname' /> 用户昵称</Col>
                            <Col span={18} className="value">{user.nickname || '暂未设置'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-realname' /> 真实姓名</Col>
                            <Col span={18} className="value">{user.realName || '暂未设置'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-gender' /> 用户性别</Col>
                            <Col span={18} className="value">{user.gender ? (user.gender == 1 ? '男' : '女') : '暂未设置'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-age' /> 用户年龄</Col>
                            <Col span={18} className="value">{user.birthday ? getAge(user.birthday) : '暂无数据'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-birthday' /> 出生日期</Col>
                            <Col span={18} className="value">{user.birthday || '暂未设置'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-organization' /> 所属组织</Col>
                            <Col span={18} className="value">{user.deptName || '暂未分配'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-phone' /> 手机号码</Col>
                            <Col span={18} className="value">{user.phone ? splitPhone(user.phone) : '暂未设置'}</Col>
                        </Row>
                        <Row className="box">
                            <Col span={6} className="label"> <MyIcon type='icon-email' /> 电子邮箱</Col>
                            <Col span={18} className="value">{user.email || '暂未设置'}</Col>
                        </Row>
                        <Row className="box" style={{ marginBottom: '15px' }}>
                            <Col span={6} className="label"> <MyIcon type='icon-security' /> 安全设置</Col>
                            <Col span={18} className="value">
                                <a onClick={() => { setModifyPwdModalOpen(true); }}>修改密码</a>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card title='用户资料'>
                        <Form
                            disabled={formDisabled}
                            style={{ marginTop: '20px' }}
                            form={form}
                            name="form"
                            autoComplete="off"
                            onFinish={submitForm}
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <Form.Item
                                rules={[{ required: true, message: '用户昵称不能为空' }]}
                                label="用户昵称"
                                name="nickname"
                            >
                                <Input type="text" placeholder="用户昵称" />
                            </Form.Item>

                            <Form.Item
                                rules={[{ required: true, message: '真实姓名不能为空' }]}
                                label="真实姓名"
                                name="realName"
                            >
                                <Input type="text" placeholder="真实姓名" />
                            </Form.Item>

                            <Form.Item
                                rules={[{ required: true, message: '用户性别不能为空' }]}
                                label="用户性别"
                                name="gender"
                            >
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                rules={[{ required: true, message: '出生日期不能为空' }]}
                                label="出生日期"
                                name="birthday"
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                rules={[{ required: true, message: '手机号码不能为空' }]}
                                label="手机号码"
                                name="phone"
                            >
                                <Input type="text" placeholder="手机号码" />
                            </Form.Item>

                            <Form.Item
                                label="电子邮箱"
                                name="email"
                            >
                                <Input type="text" placeholder="电子邮箱" />
                            </Form.Item>

                            <Form.Item
                                label="用户地址"
                                name="address"
                            >
                                <TextArea rows={3} type="text" placeholder="用户地址" />
                            </Form.Item>

                            {
                                !formDisabled &&
                                <Form.Item
                                    wrapperCol={{ span: 6 }}>
                                    <Row gutter={20} justify="center">
                                        <Col>
                                            <Button
                                                loading={fromBtnLoading}
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >保存配置</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            }
                        </Form>
                        {
                            formDisabled &&
                            <Row>
                                <Col span={2}></Col>
                                <Col span={6}>
                                    <Button
                                        style={{ width: '5vw' }}
                                        type="primary"
                                        block
                                        onClick={() => { setFormDisabled(false) }}>
                                        编辑</Button>
                                </Col>
                            </Row>
                        }
                    </Card>
                </Col>
            </Row>

            <Modal
                title='修改密码'
                forceRender
                destroyOnClose
                footer={null}
                open={modifyPwdModalOpen}
                keyboard={false}
                maskClosable={false}
                onCancel={modifyPwdOnClose}
            >
                <Form
                    style={{ marginTop: '20px' }}
                    form={modifyPwdForm}
                    name="modifyPwdForm"
                    autoComplete="off"
                    onFinish={submitModifyPwdForm}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        rules={[{ required: true, message: '原密码不能为空' }]}
                        label="原密码"
                        name="oldPass"
                    >
                        <Input.Password placeholder="原密码" />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: '新密码不能为空' }]}
                        label="新密码"
                        name="newPass"
                    >
                        <Input.Password placeholder="新密码" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '确认密码不能为空' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPass') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致'));
                            },
                        })]}
                        label="确认密码"
                        name="reNewPass"
                    >
                        <Input.Password placeholder="确认密码" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 23 }}>
                        <Flex size={'middle'} justify="flex-end">
                            <Button style={{ marginRight: '15px' }} onClick={modifyPwdOnClose}>取消</Button>
                            <Button loading={modifyPwdFormBtnLoading} type="primary" htmlType="submit">确定</Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
};

export default PersonalCenterPage;