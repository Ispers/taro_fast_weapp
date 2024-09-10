import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import MyIcon from '@/components/MyIcon';
import './index.less';

const PersonalCenterPage = () => {
    const { user } = useSelector(state => state.global);

    return (
        <Row gutter={15} style={{ height: '83vh' }}>
            <Col span={6}>
                <Card title='个人信息'>
                    <Row justify={'center'}>
                        <img className="avatar" src={user.avatarUrl} title="点击上传头像" />
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 登录账号</Col>
                        <Col span={18} className="value">{user.username}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 用户昵称</Col>
                        <Col span={18} className="value">{user.nickname || '暂未设置'}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 真实姓名</Col>
                        <Col span={18} className="value">{user.realName || '暂未设置'}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 用户性别</Col>
                        <Col span={18} className="value">{user.gender ? (user.gender == 1 ? '男' : '女') : '暂未设置'}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 出生日期</Col>
                        <Col span={18} className="value">{user.birthday || '暂未设置'}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 所属组织</Col>
                        <Col span={18} className="value">{user.deptName || '暂未分配'}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 手机号码</Col>
                        <Col span={18} className="value">{user.phone}</Col>
                    </Row>
                    <Row className="box">
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 用户邮箱</Col>
                        <Col span={18} className="value">{user.email || '暂未设置'}</Col>
                    </Row>
                    <Row className="box" style={{marginBottom: '15px'}}>
                        <Col span={6} className="label"> <MyIcon type='icon-user' /> 安全设置</Col>
                        <Col span={18} className="value">
                            <a>修改密码</a>
                            <a style={{marginLeft: '10px'}}>修改邮箱</a>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={18}>
                <Card title='用户资料'>

                </Card>
            </Col>
        </Row>
    )
};

export default PersonalCenterPage;