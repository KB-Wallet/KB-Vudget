import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    email: '',
    isLoggedIn: false,
  }),
  actions: {
    login(user) {
      this.id = user.id
      this.username = user.username
      this.email = user.email
      this.isLoggedIn = true
    },
    logout() {
      this.id = null
      this.username = ''
      this.email = ''
      this.isLoggedIn = false
    },
  },
})
