<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  selectedDay: Object,
})

const user_login = useUserStore()

// API URL
const API_URL_incomes = 'https://vudget.glitch.me/incomes'
const API_URL_expenses = 'https://vudget.glitch.me/expenses'

// 상태 변수
const dailyIncomes = ref([])
const dailyExpenses = ref([])

// 날짜 필터링용 포맷 함수 (YYYY-MM-DD)
const formatDateKey = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

const fetchData = async () => {
  try {
    const resIncomes = await axios.get(API_URL_incomes)
    const resExpenses = await axios.get(API_URL_expenses)

    const allIncomes = resIncomes.data.filter((item) => item.UserId === user_login.UserId)
    const allExpenses = resExpenses.data.filter((item) => item.UserId === user_login.UserId)

    const selectedDateStr = formatDateKey(new Date(props.selectedDay.date))

    dailyIncomes.value = allIncomes.filter((i) => i.date === selectedDateStr)
    dailyExpenses.value = allExpenses.filter((e) => e.date === selectedDateStr)

    console.log('✅ 선택된 날짜:', selectedDateStr)
    console.log('📥 수입:', dailyIncomes.value)
    console.log('📤 지출:', dailyExpenses.value)
  } catch (error) {
    console.error('데이터 불러오기 실패:', error)
  }
}

onMounted(() => {
  fetchData()
})

// 삭제 함수 (옵션: 필요 없으면 지워도 됨)
const deleteIncome = async (id) => {
  try {
    await axios.delete(`${API_URL_incomes}/${id}`)
    fetchData()
  } catch (error) {
    console.error('수입 삭제 실패:', error)
  }
}

const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL_expenses}/${id}`)
    fetchData()
  } catch (error) {
    console.error('지출 삭제 실패:', error)
  }
}
</script>

<template>
  <h3 class="header_mini">vudget</h3>
  <div class="list-box">
    <ul class="unordered_list">
      <!-- 수입 -->
      <li class="lists" v-for="i in dailyIncomes" :key="i.id">
        <div class="box_rev_cost">
          <span class="list-name">{{ i.vendor }}</span>
          <span class="income">수입</span>
          <i class="fa-solid fa-trash i_con_trash" @click="deleteIncome(i.id)"></i>
        </div>
        <div>
          <span class="date">{{ i.date }}</span>
          <span class="cate-name">{{ i.category }}</span>
          <span class="amount">{{ i.amount }}</span>
        </div>
      </li>

      <!-- 지출 -->
      <li class="lists" v-for="i in dailyExpenses" :key="i.id">
        <div>
          <span class="list-name">{{ i.vendor }}</span>
          <span class="cost">지출</span>
          <i class="fa-solid fa-trash i_con_trash" @click="deleteExpense(i.id)"></i>
        </div>
        <div>
          <span class="date">{{ i.date }}</span>
          <span class="cate-name">{{ i.category }}</span>
          <span class="amount">{{ i.amount }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
@import '../../assets/DailyList.css';
</style>
