<script setup>
import { ref, computed, onMounted } from 'vue'
// import { defineStore } from 'pinia'
// import axios from '@/utils/axios'
import instance from '@/utils/axios'

// 임시 카테고리, 추후 prop 또는 루프 처리 가
const category = '식비'
const API_URL = '/expenses'

//현재 날짜 기준 월 계산
const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)

// 상태변수
// 지출금액, 목표지출, 지출 비율
const expenses = ref([]) // 전체 expenses
const totalExpensesMonth = ref([]) // 해당 카테고리의 월별 지출만
const allExpensesTotal = ref(0) // 전체 월별 총 지출 합계
const consumed = ref(0) // 해당 카테고리 소비액
const target = ref(1000000) // 기본 목표 지출
const percent = ref(0) // 퍼센트 계산

// const datas = reactive({
//   id: 1,
//   userId: 1,
//   amount: 1,
//   date: '2025-01-01',
//   category: '',
//   description: '',
//   payment: '',
//   vendor: '',
// })

// axios 통해서 데이터 불러오기

// 전체 지출 데이터 및 필터링 데이터

onMounted(async () => {
  try {
    const response = await instance.get(API_URL)
    expenses.value = response.data
    console.log('전체 지출 데이터----', expenses.value)

    // 해당 월 필터링 (현재 월 + 카테고리 + userId 조건 포함)
    totalExpensesMonth.value = expenses.value.filter((exp) => {
      const date = new Date(exp.date)
      const expenseMonth = date.getMonth() + 1
      const isMatch =
        exp.userId === 1 && exp.category === category && expenseMonth === currentMonth.value
      console.log(`🔍 비교: ${exp.category} / ${expenseMonth} -> 일치 여부: ${isMatch}`)
      return isMatch
    })
    // console.log('currentDate.value:',currentDate)
    // console.log('expenses.value:',expenses.month)
    //

    // 총 소비 금액 계산
    consumed.value = totalExpensesMonth.value.reduce((sum, exp) => sum + exp.amount, 0)

    // 전체 지출 합계 (userId 1 & 현재 월 기준)
    allExpensesTotal.value = expenses.value
      .filter((exp) => exp.userId === 1 && new Date(exp.date).getMonth() + 1 === currentMonth.value)
      .reduce((sum, exp) => sum + exp.amount, 0)

    // 카테고리별 목표 예산 설정
    const categoryBudgets = {
      식비: 100000,
      교통: 50000,
      쇼핑: 200000,
      여가비: 80000,
      보험비: 70000,
      기타: 120000,
    }

    target.value = categoryBudgets[category] || 100000
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
        <li>총 {{ currentMonth }} 월 {{ category }}지출액 : {{ consumed.toLocaleString() }} 원</li>
        <br />
        <li>총 {{ currentMonth }}월 지출액 : {{ allExpensesTotal.toLocaleString() }} 원</li>
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
