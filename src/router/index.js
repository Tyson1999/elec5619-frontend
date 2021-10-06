import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Artist from '@/views/Artist'
import Plan from '@/views/Plan'
import UserProfile from '@/views/UserProfile'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      navBarType: 'register'
    }
  },
  {
    path: '/signUp',
    name: 'Signup',
    component: Signup,
    meta:{
      navBarType: 'login'
    }
  },
  {
    path: '/artist',
    name: 'Artist',
    component: Artist,
    meta:{
      navBarType: 'login'
    },
  },
  {
    path: '/join',
    name: 'Plan',
    component: Plan,
    meta: {
        navBarType: 'login'
    }
  },
  {
    path: '/userProfile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path:'/newPost',
    name: 'NewPost',
    component: () => import('@/views/NewPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
