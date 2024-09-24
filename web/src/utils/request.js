import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { notification } from 'antd';
import { history } from 'umi';

// 创建axios实例
const service = axios.create({
  baseURL: '/',
  timeout: TIME_OUT
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code != '200') {
      if (response.data.code == '401') {
        removeToken();
        // 用户登录界面提示
        Cookies.set('point', 401)
        location.reload();
      } else if (response.data.code == '403') {
        history.push('/403');
      } else {
        const errorMsg = response.data.message
        if (errorMsg !== undefined) {
          notification.error({
            message: '错误提示',
            description: errorMsg,
            duration: 5
          });
        }
      }
      return Promise.reject(response);
    }

    return response.data
  },
  error => {
    console.log('response-error:', error);
    // 兼容blob下载出错json提示
    if (error?.response?.data instanceof Blob && error?.response?.data?.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function (e) {
        const errorMsg = JSON.parse(reader.result).message;
        notification.error({
          message: '错误提示',
          description: errorMsg,
          duration: 5
        });
      }
    } else {
      notification.error({
        message: '错误提示',
        description: '接口请求失败',
        duration: 5
      });
    }
    return Promise.reject(error)
  }
)
export default service;
