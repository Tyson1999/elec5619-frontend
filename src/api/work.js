import request from '../utils/request'

export function getCategories() {
    return request({
        url: '/api/work/category',
        method: 'get'
    })
}

export function addPost(data) {
    return request({
        url: '/api/works/add',
        method: 'post',
        data
    })
}

export function getArtifactById(userId) {
    return request({
        url: '/api/getAllArtifactById',
        method: 'get',
        params: userId
    })
}
