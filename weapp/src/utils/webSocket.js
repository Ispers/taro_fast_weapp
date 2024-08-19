/**
 * 全局webSocket封装
 */
import Taro from "@tarojs/taro";

let socketOpen = false;
let socketMsgQueue = [];

/**
 * 创建webSocket连接
 * @param {String} username 用户名
 */
export function createSocketConnection(username) {
    Taro.connectSocket({
        url: process.env.TARO_APP_WEB_SOCKET_URL + '/' + username,
        header: {
            'content-type': 'application/json'
        }
    });

    Taro.onSocketOpen(function (res) {
        console.log('WebSocket -- 连接已打开！');
        socketOpen = true;
        for (let i = 0; i < socketMsgQueue.length; i++) {
            sendSocketMessage(socketMsgQueue[i]);
        }
        socketMsgQueue = [];
    });
}

/**
 * 发送消息
 * @param {any} msg 消息
 */
export function sendSocketMessage(msg) {
    if (socketOpen) {
        Taro.sendSocketMessage({
            data: msg
        });
    } else {
        socketMsgQueue.push(msg);
    }
}

/**
 *  接受到服务器的消息事件
 */
export function receiveSocketMessage() {
    Taro.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data);
        return res.data;
    });
}

/**
 * 关闭 WebSocket 连接
 */
export function closeSocketConnection() {
    if (socketOpen) {
        Taro.closeSocket();
    }
    Taro.onSocketClose(function (res) {
        console.log('WebSocket -- 连接已关闭！');
    });
}