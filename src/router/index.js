import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Artist from '@/views/Artist'
import Plan from '@/views/Plan'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    // component: () => import('@/views/Login.vue'),
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
