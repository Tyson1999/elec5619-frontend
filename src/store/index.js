import { createStore } from 'vuex'
import {getUserInfo} from '@/api/user'


export default createStore({
  state: {
    email: '',
    username: '',
    role: '',
    avatar: '',
    id: ''
  },
  mutations: {
    setUser(state, user){
      state.email = user['email']
      state.username = user['username']
      state.id = user['id']
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
              const id = res['id']
              const avatar = process.env.VUE_APP_BASE_API + res['avatar']
              commit('setUser', {
                username,
                role,
                email,
                avatar,
                id
              })
              resolve(role)
          })
          .catch((err) => {reject(err)})
      })
    },


  }
})
