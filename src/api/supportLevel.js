import request from '../utils/request'

export function getSubsType() {
    return request({
        url: '/api/subscribetype',
        method: 'get',
    })
}

// export function setSubsType(subsType) {
//     return request({
//
//     })
// }
