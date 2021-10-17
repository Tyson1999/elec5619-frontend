import {ElNotification} from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import {getTitle} from './utils/index'
import {getToken, removeToken} from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/', '/login', '/signUp','/privacy.html','/faq.html','/tos.html','/about.html','/search']

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    document.title = getTitle(to['name'])
    const token = getToken()
    if (token){
        if (to.path.toLowerCase() === '/login' || to.path.toLowerCase() === '/signup') {
            // if is logged in, redirect to the home page
            next({path: '/'})
            NProgress.done()
        }
        else {
            try {
                // check if we've got user info
                const user = store.state.email
                if (user){
                    next()
                } else {
                    // send token to backend and get user info
                    const role = await store.dispatch('getUserInfo')
                    // add sync routers
                    console.log('role is ' + role)
                    next({ ...to, replace: true })
                }
            } catch (e) {
                ElNotification.error({
                    title: "Error",
                    message: e.message || "Token is invalid"
                })
                removeToken()
                next({path: '/login'})
            } finally {
                NProgress.done()
            }
        }
    }
    else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            ElNotification.error({
                title: "Error",
                message: "You need to login firstly before enter this page"
            })
            next(`/login`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
