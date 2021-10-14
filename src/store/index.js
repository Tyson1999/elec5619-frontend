import { createStore } from 'vuex'

export default createStore({
  state: {
    email: '',
    username: '',
    role: '',
    avatar: ''
  },
  mutations: {
    setUser(state, user){
      state.username = user['username']
      state.role = user['role']
      state.avatar = user['avatar']
      state.email = user['email']
    },
  },
  actions: {
  }
})
