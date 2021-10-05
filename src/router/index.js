import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login'
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
    // component: () => import('@/views/Login.vue'),
    component: Login,
    meta:{
      navBarType: 'register'
    }
  },
  {
    path: '/userProfile',
    name: 'UserProfile',
    component: UserProfile,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
