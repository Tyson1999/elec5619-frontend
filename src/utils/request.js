import axios from 'axios'
import { ElMessage } from 'element-plus'
// import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
// service.interceptors.request.use(
//     config => {
//         // debugger
//         // console.log(store.getters.token)
//         if (store.getters.token) {
//             // let each request carry token
//             config.headers['Authorization'] = `Bearer ${getToken()}`
//         }
//         return config
//     },
//     error => {
//         // do something with request error
//         console.log(error)
//         return Promise.reject(error)
//     }
// )

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        // if the custom code is not 0, it is judged as an error.
        if (res.code !== 0) {
            ElMessage({
                message: res.msg || 'Request failed',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Request failed'))
        } else {
            return res
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
