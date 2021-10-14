import {ElNotification} from 'element-plus'
import {removeToken} from '@/utils/auth'

const siteTitle = "Patronus"

export function logout() {
    removeToken()
    ElNotification.success({
        title: 'Tips',
        message: 'You have been logout successfully!'
    })
    console.log('logout')
}

export function getTitle(pageTitle) {
    return pageTitle + ' - ' + siteTitle
}
