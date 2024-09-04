import request from '@/utils/request'

export function getIcon(params) {
    return request({
        url: 'api/icon/getIcon',
        method: 'get',
        params
    })
}

export function addIcon(data) {
    return request({
        url: 'api/icon/addIcon',
        method: 'post',
        data
    })
}

export function modifyIcon(data) {
    return request({
        url: 'api/icon/modifyIcon',
        method: 'post',
        data
    })
}

export function removeIcon(ids) {
    return request({
        url: 'api/icon/removeIcon',
        method: 'post',
        data: ids
    })
}