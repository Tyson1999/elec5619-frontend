import request from '../utils/request'

export function subscribe(data) {
    return request({
        url: '/api/subscribe',
        method: 'post',
        data,
        params: {month: 1}
    })
}
