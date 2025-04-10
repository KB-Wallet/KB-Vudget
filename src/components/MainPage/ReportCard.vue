<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const store = useDataStore()
const currentMonth = new Date().getMonth() + 1

const targetBudget = ref(0)
const totalMonthlyExpenses = ref(0)
const totalMonthlyIncome = ref(0)
const percent = ref(0)

onMounted(async () => {
  try {
    await store.fetchUsersData()
    await store.fetchIncomesData()
    await store.fetchExpensesData()

    const user = store.usersData.find((u) => String(u.id) === '1')
    const thisMonth = new Date().toISOString().slice(0, 7)

    const expenses = store.expensesData.filter(
      (e) => e.userId === 1 && e.date.startsWith(thisMonth),
    )
    const incomes = store.incomesData.filter((i) => i.userId === 1 && i.date.startsWith(thisMonth))

    const expenseSum = expenses.reduce((sum, e) => sum + e.amount, 0)
    const incomeSum = incomes.reduce((sum, i) => sum + i.amount, 0)

    totalMonthlyExpenses.value = expenseSum
    totalMonthlyIncome.value = incomeSum
    targetBudget.value = user?.targetBudget || 0

    percent.value =
      targetBudget.value > 0 ? Math.min((expenseSum / targetBudget.value) * 100, 100) : 0
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
})
</script>

<template>
  <div class="main_slide_1_2">
    <p class="title">이번 달 수입 및 지출 현황</p>
    <div class="gaugeWrapper">
      <div class="gaugeTrack">
        <div class="gaugeProgress" :style="{ width: percent + '%' }"></div>
        <div class="gaugeTextWrapper">
          <span class="gaugeText">
            {{ `${totalMonthlyExpenses.toLocaleString()}원 / ${targetBudget.toLocaleString()}원` }}
          </span>
        </div>
      </div>
    </div>

    <div class="main-slide-summary-box">
      <div class="summary income-box">
        총 {{ currentMonth }}월 수입액 : {{ totalMonthlyIncome.toLocaleString() }} 원
      </div>
      <div class="summary expense-box">
        총 {{ currentMonth }}월 지출액 : {{ totalMonthlyExpenses.toLocaleString() }} 원
      </div>
    </div>
  </div>
</template>

<style scoped>
.main_slide_1_2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.gaugeWrapper {
  width: 100%;
  margin: 0 auto 20px;
  position: relative;
}

.gaugeTrack {
  background-color: #e0e0e0;
  height: 28px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}

.gaugeProgress {
  height: 100%;
  background: linear-gradient(90deg, #f8b500, #f57c00);
  transition: width 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 14px 0 0 14px;
}

.gaugeTextWrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.gaugeText {
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;

  padding: 2px 10px;
}

.main-slide-summary-box {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;
}

.summary {
  font-size: 13px;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-weight: 500;
}

.income-box {
  border: 2px solid #42a5f5;
  background-color: #e3f2fd;
  color: #0d47a1;
}

.expense-box {
  border: 2px solid #ef5350;
  background-color: #ffebee;
  color: #b71c1c;
}
/* .main-slide-card-1-2 {
  display: flex;
  flex-direction: row;
  font-size: 13px;
  margin-top: 1rem;
} */
</style>
