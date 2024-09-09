import request from '@/utils/request'

// 获取当前登录用户菜单信息
export function getCurrentUserMenuInfo() {
    return request({
        url: 'api/menu/getCurrentUserMenuInfo',
        method: 'get'
    })
}

// 获取菜单信息
export function getMenuInfo(params) {
    return request({
        url: 'api/menu/getMenuInfo',
        method: 'get',
        params
    })
}

// 获取图标信息
export function getIcons(iconName = '') {
    return request({
        url: 'api/menu/getIcons',
        method: 'get',
        params: {
            iconName
        }
    })
}

// 新增菜单
export function addMenu(data) {
    return request({
        url: 'api/menu/addMenu',
        method: 'post',
        data
    })
}

// 修改菜单
export function modifyMenu(data) {
    return request({
        url: 'api/menu/modifyMenu',
        method: 'post',
        data
    })
}

// 删除菜单
export function removeMenu(ids) {
    return request({
        url: 'api/menu/removeMenu',
        method: 'post',
        data: ids
    })
}