import { createStore } from 'vuex'
import {getUserInfo} from '@/api/user'

export default createStore({
  state: {
    email: '',
    username: '',
    role: '',
    avatar: ''
  },
  mutations: {
    setUser(state, user){
      state.email = user['email']
      state.username = user['username']
      state.role = user['role']
      state.avatar = user['avatar']
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
              const avatar = res['avatar']
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
    }
  }
})
