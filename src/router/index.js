import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Artist from '@/views/Artist'
import Plan from '@/views/Plan'
import UserProfile from '@/views/UserProfile'
import NotFound from '@/views/404'
import SearchCreator from '@/views/SearchCreator'
import FAQ from '@/views/FAQ'
import TOS from '@/views/TOS'
import About from '@/views/About'
import Patronus from '@/views/Patronus'



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
        path: '/artist/:id',
        name: 'Artist',
        component: Artist,
        meta:{
          navBarType: 'login'
        },
  },
  {
        path: '/join/:id',
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
  },
  {
        path:'/search',
        name: 'SearchCreator',
        component: SearchCreator
  },
  {
        path: '/404',
        name: '404',
        component: NotFound
  },
  {
        path:'/FAQ',
        name: 'FAQ',
        component: FAQ
  },
  {
       path:'/About',
       name: 'About',
       component: About
  },
  {
      path:'/Patronus',
      name: 'Patronus',
      component: Patronus
  },
  {
      path:'/TOS',
      name: 'TOS',
      component: TOS
  },

  {    // Default router, return 404
        path: '/:catchAll(.*)',
        name: 'Default',
        redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
