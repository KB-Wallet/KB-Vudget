<script setup>
import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const category = '식비' // 임시 카테고리, 추후 prop 또는 루프 처리 가능

// import db from '@/../db.json'

//---------------------------------------------------
const API_URL = 'http://localhost:5000/'

export const usePostStore = defineStore('post', () => {
  // state 상태
  // : 컴포넌트 간에 공유되어야 하는 데이터를 저장
  const consumed = ref(0)
  const target = ref(0)
  const percent = ref(0)

  // getter 게터
  // : computed 속성과 유사 기능
  const getSortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => b.createdAt - a.createdAt)
  })

  // Actions 액션
  // : 비동기 작업 등 복잡 로직 처리, state 변경하는메서드 포함
  const fetchPosts = async () => {
    // 서버에서 게시글 목록을 가져오는 비동기 함수
    const toastStore = useToastStore()
    posts.value = [] // 기존 글 목록 비우기
    loading.value = true // 지금 로딩 중 표시
    error.value = null // 이전 에러 있었으면 초기화

    try {
      const response = await axios.get(API_URL)
      // axios.get() 으로 서버에 게시글 데이터 요청
      // await : '서버에서 응답 올 때까지 기다릴게' 같은 의미
      expenses.value = response.data
      // 서버가 준 데이터(response.data)를 posts에 저장
      // 나중에 v-for로 화면에서 출력할 수 있음
    } catch (err) {
      error.value = err.message || '게시물을 불러오는데 실패했습니다.'
      toastStore.showToast(error.value, 'error')
    } finally {
      loading.value = false
      // 성공/실패든지 무조건 마지막에 로딩 표시 종료 실행
    }
  }

  return {
    posts,
    loading,
    error,
    getSortedPosts,
    fetchPosts,
  })


//-------------------------------------------
const consumed = ref(0)
const target = ref(0)
const percent = ref(0)

onMounted(async () => {
  console.log(db)

  try {
    const res = await fetch('/db.json')
    const data = await res.json()

    // 소비 데이터 계산
    const expenses = data.expenses.filter((e) => e.userId === 1 && e.category === category)
    const sum = expenses.reduce((acc, curr) => acc + curr.amount, 0)
    consumed.value = sum

    // axios async await filter
    // 카테고리별 목표 예산 설정 (예: 식비: 100000)
    // db 데이터랑 연결해야 함
    const categoryBudgets = {
      식비: 0,
      주거비: 0,
      교통비: 0,
      쇼핑: 0,
      여가비: 0,
      보험비: 0,
      기타: 0,
    }

    target.value = categoryBudgets[category] || 1000000
    percent.value = Math.min((consumed.value / target.value) * 100, 100)
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
})
</script>

<template>
  <div class="main_slide_1_2">
    <div class="gaugeWrapper">
      <div class="gaugeBar">
        <div class="gaugeFill" :style="{ width: percent + '%' }">
          <span class="label">{{ `소비액 : ${consumed.toLocaleString()}원` }}</span>
        </div>
        <div class="gaugeRemain" :style="{ width: 100 - percent + '%' }">
          <span class="label">{{ `목표 지출액 : ${target.toLocaleString()}원` }}</span>
        </div>
      </div>
    </div>

    <div class="main-slide-card-1-2">
      <ul class="totalSummary">
        <li>총 수입액 : 3,000,000 원</li>
        <br />
        <li>총 지출액 : 2,300,000 원</li>
      </ul>
      <img
        class="icons-bear"
        src="../icons/bear.svg"
        alt="로고캐릭터"
        style="width: 100px; height: 100px"
      />
    </div>
  </div>
</template>

<style scoped>
.main_slide_1_2 {
  border: 1px solid red;
  width: 300px;
}
.gaugeWrapper {
  /* border: 1px solid green; */
  max-width: 300px;
  margin: 0.5rem auto;
}

.gaugeBar {
  display: flex;
  margin: 20px 10px;
  height: 20px;
  width: 280px;
  border-radius: 30px;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.gaugeFill {
  background-color: #ffb300;
  display: flex;
  align-items: center;
  padding-left: 10px;
  white-space: nowrap;
}

.gaugeRemain {
  background-color: #5f5852;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  white-space: nowrap;
}

.label {
  color: #fff;
  font-size: small;
}
.main-slide-card-1-2 {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  font-size: 12px;
}
</style>
