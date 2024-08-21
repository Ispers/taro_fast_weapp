import './index.less'
import background from '@/assets/images/background.png';
import Cookies from 'js-cookie'
import { Button, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { getCodeImg, login } from '@/api/auth';
import { encrypt } from '@/utils/rsaEncrypt';
import { setToken } from '@/utils/auth';
import { getCurrentUserRoleInfo } from '../../api/role';
import { getCurrentUserMenuInfo } from '../../api/menu';
import { getInfo } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { setMenu, setRoles, setUser } from '../../store/slices/globalSlice';

const LoginPage = () => {
  const [vcodeImg, setVcodeImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState('');
  const [cookiePass, setCookiePass] = useState('');
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldValue('rememberMe', false);
    // 获取验证码
    getCode();
    // 获取用户名密码等Cookie
    getCookie();
    // token 过期提示
    point();
  }, []);

  // 获取验证码
  const getCode = () => {
    getCodeImg().then(res => {
      console.log('getCodeImg', res);
      setVcodeImg(res.result.img);
      setUuid(res.result.uuid);
    })
  }

  // 获取用户名密码等Cookie
  const getCookie = () => {
    const username = Cookies.get('username')
    let password = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe')
    // 保存cookie里面的加密后的密码
    setCookiePass(password === undefined ? '' : password);
    form.setFieldValue('username', username === undefined ? '' : username);
    form.setFieldValue('password', password === undefined ? '' : password);
    form.setFieldValue('rememberMe', rememberMe === undefined ? false : Boolean(rememberMe));
    form.setFieldValue('code', '');
  }

  // 登录
  const onFinish = (values) => {
    const { username, password, code, rememberMe } = values;
    let pwd = password;
    if (password !== cookiePass) {
      pwd = encrypt(password)
    }
    setLoading(true);
    if (rememberMe) {
      Cookies.set('username', username, { expires: PASS_COOKIE_EXPIRES })
      Cookies.set('password', pwd, { expires: PASS_COOKIE_EXPIRES })
      Cookies.set('rememberMe', rememberMe, { expires: PASS_COOKIE_EXPIRES })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }
    login(username, pwd, code, uuid).then(res => {
      console.log("login", res);
      setToken(res.result.token, rememberMe);

      // window.location.href跳转会使render与patchClientRoutes重新渲染
      let flag = 0;
      // 获取用户信息
      getInfo().then(res => {
        console.log('getInfo', res);
        dispatch(setUser(res.result));
        if(++flag == 3){
          setLoading(false);
          window.location.href = '/';
        }
      })
      // 获取角色信息
      getCurrentUserRoleInfo().then(res => {
        console.log('getCurrentUserRoleInfo', res);
        dispatch(setRoles(res.result));
        if(++flag == 3){
          setLoading(false);
          window.location.href = '/';
        }
      })
      // 获取菜单信息
      getCurrentUserMenuInfo().then(res => {
        console.log('getCurrentUserMenuInfo', res);
        dispatch(setMenu(res.result));
        if(++flag == 3){
          setLoading(false);
          window.location.href = '/';
        }
      })
    }).catch(err => {
      console.log("login", err);
      setLoading(false);
      getCode();
      form.resetFields();
    })
  };

  // token 过期提示
  const point = () => {
    const point = Cookies.get('point') !== undefined
    if (point) {
      notification.warning({
        message: '提示',
        description: '当前登录状态已过期，请重新登录！',
        duration: 5
      });
      Cookies.remove('point')
    }
  }

  // 监听键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      form.validateFields().then(values => {
        onFinish(values);
      });
    }
  };

  return (
    <div className='box'>
      <img src={background} className='background' />

      <Form
        className='form'
        name="basic"
        size='large'
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        onKeyDown={handleKeyDown}
      >
        <Form.Item
          wrapperCol={{
            span: 24
          }}
        >
          <div className='title'>{APP_TITLE}</div>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '用户名不能为空',
            }
          ]}
          wrapperCol={{
            offset: 2,
            span: 20
          }}
        >
          <Input placeholder='用户名' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
          wrapperCol={{
            offset: 2,
            span: 20
          }}
        >
          <Input.Password placeholder='密码' prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 10 }}
          name="code"
          rules={[
            {
              required: true,
              message: '验证码不能为空',
            },
          ]}
          wrapperCol={{
            offset: 2,
            span: 20
          }}
        >
          <Row>
            <Col span={14}>
              <Input placeholder='验证码' prefix={<VerifiedOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </Col>
            <Col span={8} offset={2}>
              <img
                onClick={getCode}
                src={vcodeImg}
                style={{ transform: 'translateY(-5px) translateX(-18px)', cursor: 'pointer' }}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 20 }}
          name="rememberMe"
          valuePropName="checked"
          wrapperCol={{
            offset: 2,
            span: 16,
          }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 2,
            span: 20,
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
