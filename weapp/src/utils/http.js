import request from './request'

export function httpGet(url, params, showLoading = true) {
	return new Promise((resolve, reject) => {
		request.get(url, params, showLoading).then((result) => {
			resolve(result)
		}).catch(err => {
			reject(err)
		});
	});
}

export function httpPost(url, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		request.post(url, data, showLoading).then((result) => {
			resolve(result)
		}).catch(err => {
			reject(err)
		});
	});
}

export function httpPut(url, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		request.put(url, data, showLoading).then((result) => {
			resolve(result)
		}).catch(err => {
			reject(err)
		});
	});
}

export function httpDelete(url, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		request.delete(url, data, showLoading).then((result) => {
			resolve(result)
		}).catch(err => {
			reject(err)
		});
	});
}