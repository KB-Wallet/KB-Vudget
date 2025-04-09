<script setup>
import axios from 'axios'
const API_URL = 'http://localhost:5500/posts'
import { defineStore } from 'pinia'

const usePostStore = defineStore('post', {
  state: () => {},
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
</script>

<template>
  <body>
    <h3>오늘의 Vueget 기록</h3>
    <div class="list-box">
      <ul>
        <li>
          <div>
            <span class="list-name">홈플러스 쇼핑</span>
            <span class="income-cost"> 수입 </span>
          </div>
          <div>
            <span class="date">2024-12-03</span><span class="cate-name">식비</span>
            <span class="amount">₩30,000</span>
          </div>
        </li>
      </ul>
    </div>
  </body>

  <button class="move-total">전체 내역 보기→</button>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
h3 {
  position: relative;
  top: 110px;
  font-size: 2rem;
}
li {
  list-style: none;
  border: 1px solid #8a8d8f47;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
  right: 40px;
  border-radius: 10px;
  width: 480px;
}
.list-box {
  /* border: 1px solid #8a8d8f47; */
  width: 500px;
  height: 380px;
  /* top: px; */
  position: absolute;
  top: 200px;
  left: -30px;
  overflow-x: auto;
}

.move-total {
  background-color: white;
  border: white;
  color: #8a8d8f;
  left: 350px;
  position: relative;
  top: 50px;
}
ul {
  margin: 0 auto;
}
.income-cost {
  position: absolute;
  left: 380px;
  top: 5px;
  /* border: 1px solid black; */
  background-color: #eaedff;
  color: #2b46f9;
  padding: 0.3rem;
  border-radius: 1rem;
  /* margin: ; */
}
.date {
  color: #8a8d8f;
  font-size: 0.8rem;
}
.cate-name {
  color: #8a8d8f;
  position: relative;
  left: 10px;
  font-size: 0.8rem;
}
.amount {
  position: relative;
  left: 270px;
}
/* @media (max-width: 832px) {
} */
/* 428 832 */
</style>
