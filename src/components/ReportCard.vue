<!-- 여기서 수정하기 -->

<script setup>
import { computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
// import instance from '@/utils/axios'

// Pinia store 인스턴스 호출
const store = useDataStore()

// 목표 지출액 선언
const targetBudget = computed(() => {
  const user = store.usersData.find((user) => {
    console.log('🌸 users user : ', user.id)
    return user.id === 1
  })
  return user ? user.targetBudget : 0
})

// 총 누적 지출액 선언
const totalMonthlyExpenses = computed(() => {
  const expense = store.expensesData.find((user) => {
    console.log('🌸 expenses user : ', user.id)
    return user.id === 1
  })
  return expense ? expense.amount : 0
})

// 총 누적 수입액 선언
const totalMonthlyIncome = computed(() => {
  const income = store.incomesData.find((user) => {
    console.log('🌸 incomes user : ', user.id)
    return user.id === 1
  })
  return income ? income.amount : 0
})

const percent = Math.min((totalMonthlyExpenses.value / targetBudget.value) * 100, 100)
// // 총 수입 데이터 선언
// 현재 월 (1~12)
// const currentMonth = 3
const currentMonth = new Date().getMonth() + 1

onMounted(async () => {
  //   // const resUsers = await instance.get('http://localhost:5000/users')
  //   // resUsers.value = resUsers.data

  try {
    await store.fetchUsersData()
    await store.fetchIncomesData()
    await store.fetchExpensesData()
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
})
</script>

<template>
  <div class="main_slide_1_2">
    <div class="gaugeWrapper">
      <div class="gaugeBar">
        <div class="gaugeFill" :style="{ width: percent + '%' }">
          <span class="label">{{
            `${totalMonthlyExpenses.toLocaleString()}원 : 4월 누적 지출액`
          }}</span>
        </div>
        <div class="gaugeRemain" :style="{ width: 100 - percent + '%' }">
          <span class="label">{{ `목표 지출액 : ${targetBudget.toLocaleString()}원` }}</span>
        </div>
      </div>
    </div>

    <div class="main-slide-card-1-2">
      <ul class="totalSummary">
        <li>총 {{ currentMonth }} 월 수입액 : {{ totalMonthlyIncome.toLocaleString() }} 원</li>
        <br />
        <li>총 {{ currentMonth }}월 지출액 : {{ totalMonthlyExpenses.toLocaleString() }} 원</li>
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
  font-size: 0.6rem;
}
.main-slide-card-1-2 {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  font-size: 12px;
}
</style>
