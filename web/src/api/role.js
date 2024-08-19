import request from '@/utils/request'

// 获取当前登录用户角色信息
export function getCurrentUserRoleInfo() {
    return request({
        url: 'api/role/getCurrentUserRoleInfo',
        method: 'get'
    })
}