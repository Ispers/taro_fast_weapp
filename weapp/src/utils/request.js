/**
 * 全局请求统一处理封装
 */
import Taro from "@tarojs/taro";
import { taroHideLoading, taroShowLoading, taroShowToast } from ".";
import { getToken } from "./storage";
import { wxLogin } from "../service/auth";


const printLog = (options) => {
    // 仅开发环境打印
    if (process.env.NODE_ENV === 'development') {
        console.log("================== request start ================");
        console.log("header: ", JSON.stringify(options.header));
        console.log("method: ", options.method + " URL: " + options.url);
        console.log("data: ", options.data);
        console.log("=================== request end ==================");
    }
};

const send = (options = {}, showLoading = true) => {
    // loading加载
    if (showLoading) {
        taroShowLoading();
    }

    // 拼接路径
    if (options.url.substr(1, 4) == 'auth') {
        options.url = process.env.TARO_APP_WEB_AUTH_URL + '' + options.url.substr(5);
        console.log('options.url', options.url);
    } else {
        options.url = process.env.TARO_APP_WEB_API_URL + '' + options.url.substr(4);
        console.log('options.url', options.url);
    }

    // 请求方式
    options.method = options.method || "GET";

    // 让每个请求携带自定义token
    const header = {};
    let token = getToken();
    if (token != null && token != '' && token != undefined) {
        header['Authorization'] = token;
    }
    if (options.method != 'GET') {
        header['Content-Type'] = 'application/json;charset=utf-8';
    }
    options.header = header;
    printLog(options); // 打印请求数据，调试用

    // 发起Promise请求
    return new Promise((resolve, reject) => {
        Taro.request({
            url: options.url,
            method: options.method,
            data: options.data,
            header,
            timeout: TIME_OUT,
            success(res) {
                // console.log('res', res)
                // 全局统一请求处理
                let code = 0;
                code = res.data.code || res.data.resultCode;
                // console.log('code: ', code);
                if (code != 200 && code != 201) {
                    if (code == 400) {
                        taroShowToast('none', '请求的数据格式不符');
                    } else if (code == 401) {
                        // todo: 登录过期 重新登录
                        console.log('登录');
                        wxLogin();
                    } else if (code == 403) {
                        taroShowToast('none', '无权访问');
                    } else if (code == 404) {
                        taroShowToast('none', '未找到该资源');
                    } else if (code == 500) {
                        taroShowToast('none', '服务器内部错误');
                    } else if (code == 503) {
                        taroShowToast('none', '服务器正忙，请稍后再试');
                    } else if (code == -1) {
                        taroShowToast('none', res.data.message);
                    } else {
                        // 其他问题处理
                        const errMsg = res.data.message;
                        if (errMsg) {
                            if (errMsg.toString().indexOf('JWT String argument cannot be null or empty') !== -1) {
                                taroShowToast('none', '登录信息校验失败')
                                // todo: 重新登录
                                console.log('登录');
                                wxLogin();
                            }
                            else {
                                taroShowToast('none', errMsg)
                            }
                        }
                    }
                    if (showLoading) { taroHideLoading(); }
                    return reject(res.data);
                } else {
                    if (showLoading) { taroHideLoading(); }
                    resolve(res.data)
                }
            },
            fail(err) {
                taroHideLoading();
                console.log('err', err)
                if (err.errMsg.toString().indexOf('request:fail') !== -1) {
                    taroShowToast('none', '接口请求失败');
                }
                if (err.errMsg.toString().indexOf('request:fail timeout') !== -1) {
                    taroShowToast('none', '网络请求超时');
                }
                reject(err)
            }
        });
    });
};

export default {
    get(url = "", data = {}, showLoading = true) {
        return send({
            url: url,
            data: data
        }, showLoading);
    },
    post(url = "", data = {}, showLoading = true) {
        return send({
            url: url,
            data: data,
            method: "POST"
        }, showLoading);
    },
    put(url = "", data = {}, showLoading = true) {
        return send({
            url: url,
            data: data,
            method: "PUT"
        }, showLoading);
    },
    delete(url = "", data = {}, showLoading = true) {
        return send({
            url: url,
            data: data,
            method: "DELETE"
        }, showLoading);
    }
};