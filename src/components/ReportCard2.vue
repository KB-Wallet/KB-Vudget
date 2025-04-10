<!-- 여기서 수정하기 -->

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
// import instance from '@/utils/axios'

// Pinia store 인스턴스 호출
const store = useDataStore()
// 💡 store에서 상태와 액션 가져오기
// const { usersData, expensesData, fetchUsersData, fetchExpensesData } = useDataStore()

// // 전체 지출 데이터 및 필터링 데이터
// 소비 데이터 계산
const consumed = ref(0)
const percent = ref(0)

// 누적 총 지출 데이터(store.에 이미 만듦)
// const totalExpensesAmount = computed(() => {
//   return store.expensesData.reduce((sum, expense) => sum + expense.amount, 0)
// })

// 목표 지출액 선언
const targetBudget = computed(() => {
  const user = store.usersData.find((user) => user.id === 1)
  return user ? user.targetBudget : 0
})

const expenses = computed(() => store.expensesData.filter((e) => e.userId === 1))
// watch - 데이터가 준비된 후 소비액 계산
watch(
  [() => store.usersData, () => store.expensesData],
  () => {
    if (store.usersData.length && store.expensesData.length) {
      const sum = expenses.value.reduce((acc, curr) => acc + curr.amount, 0)
      consumed.value = sum
      const percent = computed(() => Math.min((sum / targetBudget.value) * 100, 100))

      console.log('🎯 targetBudget:', targetBudget.value)
      console.log('💸 소비액:', consumed.value)
      console.log('📊 퍼센트:', percent.value)
    }
  },
  { immediate: true, deep: true },
)

// // 총 수입 데이터 선언
// 현재 월 (1~12)
// const currentMonth = 3
const currentMonth = new Date().getMonth() + 1

// 해당 월 userId === 1의 총 수입 계산
const totalMonthlyIncome = computed(() => {
  const incomes = store.incomesData?.value || [] //ref 대응
  if (incomes.length === 0) return 0
  const filtered = incomes.filter((income) => {
    const incomeMonth = new Date(income.date).getMonth() + 1
    return income.userId === 1 && incomeMonth === currentMonth
  })
  return filtered.reduce((sum, income) => sum + income.amount, 0)
})
onMounted(() => {
  console.log('test')
})

// onMounted(async () => {
//   // const resUsers = await instance.get('http://localhost:5000/users')
//   // resUsers.value = resUsers.data

//   try {
//     await store.fetchUsersData()
//     await store.fetchIncomesData()
//     await store.fetchExpensesData()

//     // totalExpensesAmount.value = store.totalExpensesAmount.value
//     // console.log('총지출액 === :', totalExpensesAmount.value) // undefined
//     // console.log('usersData :', store.usersData.value)
//     // console.log('expensesData :', store.expensesData.value)

//     // watch로 반응형 상태 감지 후 콘솔 출력
//     watch(
//       () => store.usersData,
//       (newVal) => {
//         console.log('watch로 usersData===:', newVal)
//         const usersData = store.usersData.value
//       },
//       { immediate: true, deep: true }, // ✅ 중요!
//     )
//     watch(
//       () => store.incomesData,
//       (newVal) => {
//         console.log('watch로 incomesData===:', newVal)
//         const incomesData = store.incomesData.value
//       },
//       { immediate: true, deep: true },
//     )
//     watch(
//       () => store.expensesData,
//       (newVal) => {
//         console.log('watch로 expensesData===:', newVal)
//         const expensesData = store.expensesData.value
//       },
//       { immediate: true, deep: true },
//     )
//   } catch (error) {
//     console.error('데이터 로딩 실패:', error)
//   }
// })
</script>

<template>
  <div class="main_slide_1_2">
    <div class="gaugeWrapper">
      <div class="gaugeBar">
        <div class="gaugeFill" :style="{ width: percent + '%' }">
          <span class="label">{{ `${consumed.toLocaleString()}원 : 4월 누적 지출액` }}</span>
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
        <li>총 {{ currentMonth }}월 지출액 : {{ consumed.toLocaleString() }} 원</li>
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
