import request from '@/utils/request'

export function getOperationLog (params) {
    return request({
        url: 'api/log/getOperationLog',
        method: 'get',
        params
    })
};

export function clearOperationLog () {
    return request({
        url: 'api/log/clearOperationLog',
        method: 'post'
    })
};