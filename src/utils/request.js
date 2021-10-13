import axios from 'axios'
import { ElMessage } from 'element-plus'
import {getToken} from '@/utils/auth'
import {logout} from '@/utils/index'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            // let each request carry token
            config.headers['Authorization'] = `${token}`
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code == 0) {
            return res
        }
        // jwt error
        else if (res.code == -2) {
            ElMessage({
                message: res.msg || 'JWT token invalid or expired',
                type: 'error',
                duration: 5 * 1000
            })
            logout()
            return Promise.reject(new Error(res.msg || 'JWT token invalid or expired'))
        }
        // if the custom code is not 0, it is judged as an error.
        else {
            ElMessage({
                message: res.msg || 'Request failed',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Request failed'))
        }
    },
    error => {
        console.log({ error })
        const { msg } = error.response.data
        ElMessage({
            message: msg || 'Request failed',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
