import request from '@/utils/request'

export function getGeetest() {
    return request({
        url: `/api/startCaptcha?t=${(new Date()).getTime()}`,
        method: 'GET'
    })
}

export function validateCaptcha (params){
    const url = 'geetest/validate'
    return request.post(url, params)
        .then(res => res.data)
}
