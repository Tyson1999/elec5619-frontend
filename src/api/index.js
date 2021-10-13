import request from '../utils/request'

export function login(user) {
    return request({
        url: '/api/login',
        method: 'post',
        data: user
    })
}


export function oneWord() {

}
