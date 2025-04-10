<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import router from '@/router'
import '@/assets/calendar.css'
import axios from '@/utils/axios'

const today = new Date()
const currentDate = ref(new Date())
const selectedDay = ref(null)

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 선택한 달 달력 뜨게 하기
function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekDay = firstDay.getDay()
  const totalDays = lastDay.getDate()
  const days = []

  // 이전 달 공백
  for (let i = 0; i < startWeekDay; i++) {
    const prevDate = new Date(year, month, i - startWeekDay + 1)
    days.push({ date: prevDate, notes: [], inactive: true, isToday: false })
  }

  // 현재 달
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d)
    const isToday = date.toDateString() === today.toDateString()
    days.push({
      date,
      notes: [],
      inactive: false,
      isToday,
    })
  }

  // 다음 달 공백 (총 셀이 42개가 되도록)
  while (days.length % 7 !== 0) {
    const nextDate = new Date(year, month, totalDays + (days.length - startWeekDay - totalDays) + 1)
    days.push({ date: nextDate, notes: [], inactive: true, isToday: false })
  }

  return days
}

const calendarDays = computed(() => getMonthDays(currentYear.value, currentMonth.value))

//월 변경
function changeMonth(delta) {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + delta)
  currentDate.value = newDate
}

//Day 클릭 시
function handleDayClick(day) {
  if (day.inactive) return
  selectedDay.value = day
}

//창 열렸을 때 클릭한 해당 날 뜨게 하기
function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

//axios를 통해 데이터 불러오기
const totalExpensesMonth = ref(0)
const totalIncomeMonth = ref(0)
const stats = ref([])

// 현재 월에 해당하는 통계를 stats에서 찾아서 반영
function updateMonthlyStats() {
  const monthStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}`
  const stat = stats.value.find((item) => item.month === monthStr)

  if (stat) {
    totalIncomeMonth.value = stat.totalIncome
    totalExpensesMonth.value = stat.totalExpenses
  } else {
    totalIncomeMonth.value = 0
    totalExpensesMonth.value = 0
  }
}

//일 에 해당하는 통계를 incomes 와 expenses에서 찾아서 반영
const totalIncomeDay = ref([])
const totalExpensesDay = ref([])
const dailyTotals = ref({})
// 추가 정보 = ref({}):빈 객체를 초기값, ref([]): 빈 배열을 초기값
const incomes = ref([])
const expenses = ref([])

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function updateDailyStats() {
  const totals = {}

  // 수입 처리
  incomes.value.forEach((item) => {
    if (!totals[item.date]) {
      totals[item.date] = { income: 0, expense: 0 }
    }
    totals[item.date].income += item.amount
  })

  // 지출 처리
  expenses.value.forEach((item) => {
    if (!totals[item.date]) {
      totals[item.date] = { income: 0, expense: 0 }
    }
    totals[item.date].expense += item.amount
  })

  dailyTotals.value = totals
}

// 통계 데이터 불러온 후 업데이트
onMounted(async () => {
  try {
    const res = await axios.get('/stats')
    stats.value = res.data
    updateMonthlyStats() // mount 시 초기화
  } catch (error) {
    console.error('stats 데이터 불러오기 실패:', error)
  }
  try {
    const resIncome = await axios.get('/incomes')
    const resExpenses = await axios.get('/expenses')
    incomes.value = resIncome.data
    expenses.value = resExpenses.data
    updateDailyStats() // mount 시 초기화
  } catch (error) {
    console.error('daily 데이터 불러오기 실패:', error)
  }
})

// 월 변경 감지
watch([currentYear, currentMonth, stats, incomes, expenses], () => {
  updateMonthlyStats()
  updateDailyStats()
})
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h2 class="calendar-year">{{ currentYear }}년</h2>
      <h2 class="calendar-month">{{ currentMonth + 1 }}월</h2>
      <h4 class="totalIncomeMonth">총 수입 {{ totalIncomeMonth.toLocaleString() }}</h4>
      <h4 class="totalExpensesMonth">총 지출 {{ totalExpensesMonth.toLocaleString() }}</h4>
      <button @click="changeMonth(-1)">&lt;</button>
      <button @click="changeMonth(1)">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="day-header">
        {{ day }}
      </div>

      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="day-cell"
        :class="{ inactive: day.inactive, today: day.isToday }"
        @click="handleDayClick(day)"
      >
        <div class="day-number">{{ day.date.getDate() }}</div>
        <!-- 현재 달의 날짜만 표시하기 위한 조건 (amount의 v-if) -->
        <div class="amounts" v-if="!day.inactive">
          <div class="amountsincomes" v-if="dailyTotals[formatDateKey(day.date)]?.income">
            수입 +{{ dailyTotals[formatDateKey(day.date)].income.toLocaleString() }}
          </div>

          <div class="amountsExpenses" v-if="dailyTotals[formatDateKey(day.date)]?.expense">
            지출 -{{ dailyTotals[formatDateKey(day.date)].expense.toLocaleString() }}
          </div>

          <div class="balance" v-if="dailyTotals[formatDateKey(day.date)]">
            잔액
            {{
              (
                dailyTotals[formatDateKey(day.date)].income -
                dailyTotals[formatDateKey(day.date)].expense
              ).toLocaleString()
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- 날짜 클릭시 뜨는 화면 -->
    <div v-if="selectedDay" class="modal-overlay" @click.self="selectedDay = null">
      <div class="modal-content">
        <button class="close-btn" @click="selectedDay = null">닫기</button>
        <h3>{{ formatDate(selectedDay.date) }}</h3>
        <ul>
          <li>해당 일자 작성 페이지 입니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
