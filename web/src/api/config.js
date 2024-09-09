import request from '@/utils/request'

export function getConfig(key) {
    return request({
        url: 'api/config/getConfig?key=' + key,
        method: 'get'
    })
}

export function modifyValue1ByKey(key, value1) {
    return request({
        url: 'api/config/modifyValue1ByKey',
        method: 'post',
        data: { key, value1 }
    })
}