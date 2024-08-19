import request from '@/utils/request'

// 获取当前登录用户菜单信息
export function getCurrentUserMenuInfo() {
    return request({
        url: 'api/menu/getCurrentUserMenuInfo',
        method: 'get'
    })
}