import { createStore } from 'vuex'
import {getUserInfo} from '@/api/user'
import {getCreatorInfo} from '@/api/user'


export default createStore({
  state: {
    email: '',
    username: '',
    role: '',
    avatar: '',
  },
  mutations: {
    setUser(state, user){
      state.email = user['email']
      state.username = user['username']
      state.role = user['role']
      state.avatar = user['avatar']
    },
    setCreator(state, creator){
      state.email = creator['email']
      state.username = creator['username']
      state.role = creator['role']
      state.avatar = creator['avatar']
    }
  },
  actions: {
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
              res = res['data']
              const username = res['username']
              const role = res['role']
              const email = res['email']
              const avatar = process.env.VUE_APP_BASE_API + res['avatar']
              commit('setUser', {
                username,
                role,
                email,
                avatar
              })
              resolve(role)
          })
          .catch((err) => {reject(err)})
      })
    },

    getCreatorInfo({commit}) {
      return new Promise((resolve, reject) => {
        getCreatorInfo()
          .then(res => {
              res = res['data']
              const username = res['username']
              const role = res['role']
              const email = res['email']
              const avatar = res['avatar']
              commit('setCreator', {
                username,
                role,
                email,
                avatar
              })
              resolve(role)
          })
          .catch((err) => {reject(err)})
      })
    }
  }
})
