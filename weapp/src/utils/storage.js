/**
 * 全局Storage封装
 */
import Taro from "@tarojs/taro";

export function set(name, value) {
	Taro.setStorageSync(name, value);
};

export function get(name) {
	return Taro.getStorageSync(name);
};

export function remove(name) {
	Taro.removeStorageSync(name);
};

export function clear() {
	Taro.clearStorageSync();
};

export function setJson(name, value) {
	Taro.setStorageSync(name, JSON.stringify(value));
};

export function getJson(name) {
	const content = Taro.getStorageSync(name);
	if (!content) {
		return null;
	}
	return JSON.parse(content);
};

export function setToken(token) {
	Taro.setStorageSync(TOKEN_KEY, token)
};

export function getToken() {
	const content = Taro.getStorageSync(TOKEN_KEY);
	if (!content) {
		return null;
	}
	return content;
};

