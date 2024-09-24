import request from '@/utils/request'

export function modify(data) {
    return request({
        url: 'api/user/center/modify',
        method: 'post',
        data
    })
};

export function modifyAvatar(avatarUrl) {
    return request({
        url: 'api/user/center/modifyAvatar?avatarUrl=' + avatarUrl,
        method: 'get'
    })
};

export function modifyPass(data) {
    return request({
        url: 'api/user/center/modifyPass',
        method: 'post',
        data
    })
};

