import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Artist from '@/views/Artist'
import Plan from '@/views/Plan'
import UserProfile from '@/views/UserProfile'
import NotFound from '@/views/404'
import SearchCreator from '@/views/SearchCreator'
<<<<<<< HEAD
import About from '@/views/About'
=======
>>>>>>> ad83af11c1496c8c93e8bf589cda5dcfffbbf881

const routes = [
  {
        path: '/',
        name: 'Index',
        component: Index
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
<<<<<<< HEAD
  
  {
       path:'/About',
       name: 'About',
       component: About
  },
  

=======
>>>>>>> ad83af11c1496c8c93e8bf589cda5dcfffbbf881
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
