import axios from 'axios'
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

export function userInfo() {
    return axios.get(process.env.VUE_APP_BASE_API + '/api/getUserInfo')
    // return request({
    //     url: '/api/getUserInfo',
    //     method: 'get'
    // })
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



