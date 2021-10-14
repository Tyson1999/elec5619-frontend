import request from '../utils/request'

export function login(user) {
    return request({
        url: '/api/login',
        method: 'post',
        data: user
    })
}

export function register(user) {
    return request({
        url: '/api/register',
        method: 'post',
        data: user
    })
}

export function getUserInfo() {
    return request({
        url: '/api/getUserInfo',
        method: 'get'
    })
}

