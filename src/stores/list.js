import { ref, computed, async } from 'vue'
import { defineStore } from 'pinia'
export const usePostStore = defineStore('post', {
  actions: {
    async fetchPosts() {
      const toastStore = useToastStore()
      this.posts = []
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(API_URL)
        this.posts = response.data
      } catch (error) {
        this.error = error.message || '게시물을 불러오는데 실패했습니다.'
        toastStore.showToast(this.error, 'error')
      } finally {
        this.loading = false
      }
    },
  },
})
