import request from '@/utils/request'

// 获取当前登录用户角色信息
export function getCurrentUserRoleInfo() {
    return request({
        url: 'api/role/getCurrentUserRoleInfo',
        method: 'get'
    })
};

export function getRole(params) {
    return request({
        url: 'api/role/getRole',
        method: 'get',
        params
    })
};

export function addRole(data) {
    return request({
        url: 'api/role/addRole',
        method: 'post',
        data
    })
};

export function modifyRole(data) {
    return request({
        url: 'api/role/modifyRole',
        method: 'post',
        data
    })
};

export function removeRole(ids) {
    return request({
        url: 'api/role/removeRole',
        method: 'post',
        data: ids
    })
};