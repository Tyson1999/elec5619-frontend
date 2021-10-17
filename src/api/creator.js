import request from '../utils/request'

export function getCreatorInfo(userId) {
    return request({
        url: '/api/getUserById',
        method: 'get',
        params: userId
    })
}

export function followCreator(favouriteUserId) {
    return request({
        url: '/api/favorite',
        method: 'post',
        params: {favouriteUserId}
    })
}


export function unfollowCreator(favouriteUserId) {
    return request({
        url: '/api/deleteFavouriteList',
        method: 'post',
        params: {favouriteUserId}
    })
}
