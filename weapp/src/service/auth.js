import Taro from "@tarojs/taro";
import { httpGet, httpPost } from "../utils/http";
import { taroShowToast } from "../utils";
import { setToken } from "../utils/storage";
import { store } from "../store";
import { setUser } from "../store/slices/globalSlice";

export function wxLogin() {
    Taro.login().then((res) => {
        if (res.code) {
            httpPost('/auth/wxlogin', res.code).then(res => {
                setToken(res.result);
                info().then(res => {
                    console.log('info', res);
                    store.dispatch(setUser(res.result));
                });
            }).catch(err => {
                console.log('登录失败，原因:', err.message);
            });
        } else {
            taroShowToast('登录失败');
        }
    });
};

export function info() {
    return httpGet('/api/weapp/user/info');
}

export function test() {
    return httpGet('/api/test0513/test2');
}

export function test2() {
    return httpGet('/api/test0513/test3');
}