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

export function changeRole() {
    return request({
        url: '/api/changeRole',
        method: 'post',
        data: {
            role: 'Creator'
        }
    })
}

export function changeNameAndPassword(user) {
    return request({
        url: '/api/changeNameAndPassword',
        method: 'post',
        data: user
    })
}

export function getFavouriteList() {
    return request({
        url: '/api/getFavouriteList',
        method: 'get',
    })
}

export function getSubscribeList() {
    return request({
        url: '/api/getSubscribeList',
        method: 'get',
    })
}

export function addProfilePicture() {
    return request({
        url: '/api/addProfilePicture',
        method: 'post'
    })
}

export function getCreatorInfo() {
    return request({
        url: '/api/getCreatorInfo',
        method: 'get'
    })
}

export function search(creator) {
    return request({
        url: '/api/search',
        method: 'post',
        data: creator
        
    })
}


