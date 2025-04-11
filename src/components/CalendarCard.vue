<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import router from '@/router'
import '@/assets/calendarcard.css'
import axios from '@/utils/axios'
// import { useUserStore } from '@/stores/user'

// const user_login = useUserStore()

const today = new Date()
const currentDate = ref(new Date()) // 현재 주 기준 날짜
const selectedDay = ref(null)

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// ⭐ 현재 주의 일요일 기준 일주일 날짜 반환
function getWeekDays(date) {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay()) // 일요일로 이동
  const days = []

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek)
    dayDate.setDate(startOfWeek.getDate() + i)
    const isToday = dayDate.toDateString() === today.toDateString()
    days.push({
      date: dayDate,
      isToday,
    })
  }

  return days
}

const calendarWeekDays = computed(() => getWeekDays(currentDate.value))

function changeWeek(delta) {
  const newDate = new Date(currentDate.value)
  newDate.setDate(currentDate.value.getDate() + delta * 7)
  currentDate.value = newDate
}

function handleDayClick(day) {
  selectedDay.value = day
}

// function formatDate(date) {
//   return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
// }

const totalExpensesMonth = ref(0)
const totalIncomeMonth = ref(0)
const stats = ref([])

function updateMonthlyStats() {
  const monthStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}`

  const incomeSum = incomes.value
    .filter((item) => item.date.startsWith(monthStr))
    .reduce((sum, item) => sum + item.amount, 0)

  const expenseSum = expenses.value
    .filter((item) => item.date.startsWith(monthStr))
    .reduce((sum, item) => sum + item.amount, 0)

  totalIncomeMonth.value = incomeSum
  totalExpensesMonth.value = expenseSum
}

const dailyTotals = ref({})
const incomes = ref([])
const expenses = ref([])

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

function updateDailyStats() {
  const totals = {}

  incomes.value.forEach((item) => {
    if (!totals[item.date]) {
      totals[item.date] = { income: 0, expense: 0 }
    }
    totals[item.date].income += item.amount
  })

  expenses.value.forEach((item) => {
    if (!totals[item.date]) {
      totals[item.date] = { income: 0, expense: 0 }
    }
    totals[item.date].expense += item.amount
  })

  dailyTotals.value = totals
}

onMounted(async () => {
  // try {
  //   const res = await axios.get('/stats')
  //   stats.value = res.data
  //   updateMonthlyStats()
  // } catch (error) {
  //   console.error('stats 데이터 불러오기 실패:', error)
  // }

  try {
    const resIncome = await axios.get('/incomes')
    const resExpenses = await axios.get('/expenses')
    incomes.value = resIncome.data
    expenses.value = resExpenses.data
    updateDailyStats()
  } catch (error) {
    console.error('daily 데이터 불러오기 실패:', error)
  }
})

watch([currentYear, currentMonth, stats, incomes, expenses], () => {
  updateMonthlyStats()
  updateDailyStats()
})

function moveTotalList() {
  router.push({ path: '/history' })
}
function moveCalendar() {
  router.push({ path: '/calendarmain' })
}
</script>

<template>
  <div class="calendar-container">
    <!-- 주간 캘린더 상단 -->
    <div class="calendar-header">
      <h2 class="calendar-year">{{ currentYear }}년</h2>
      <h2 class="calendar-month">{{ currentMonth + 1 }}월</h2>
      <h4 class="totalIncomeMonth">총 수입 {{ totalIncomeMonth.toLocaleString() }}</h4>
      <h4 class="totalExpensesMonth">총 지출 {{ totalExpensesMonth.toLocaleString() }}</h4>
      <div class="changebutton">
        <button class="btn1" @click="changeWeek(-1)">&lt;</button>
        <button class="btn2" @click="changeWeek(1)">&gt;</button>
      </div>
    </div>

    <!-- 주간 달력 -->
    <div class="calendar-grid week-view">
      <!-- 달력 표 (요일 부분) -->
      <div v-for="day in weekDays" :key="day" class="day-header">
        {{ day }}
      </div>
      <div
        v-for="(day, index) in calendarWeekDays"
        :key="index"
        class="day-cell"
        :class="{ today: day.isToday }"
        @click="handleDayClick(day)"
        style="height: 130px"
      >
        <div class="day-number">{{ day.date.getDate() }}</div>

        <div class="amounts">
          <div class="amountsincomes" v-if="dailyTotals[formatDateKey(day.date)]?.income">
            수입 + {{ dailyTotals[formatDateKey(day.date)].income.toLocaleString() }} 원
          </div>
          <div class="amountsExpenses" v-if="dailyTotals[formatDateKey(day.date)]?.expense">
            지출 - {{ dailyTotals[formatDateKey(day.date)].expense.toLocaleString() }} 원
          </div>
          <!-- <div class="balance" v-if="dailyTotals[formatDateKey(day.date)]">
            잔액
            {{
              (
                dailyTotals[formatDateKey(day.date)].income -
                dailyTotals[formatDateKey(day.date)].expense
              ).toLocaleString()
            }}
            원
          </div> -->
        </div>
      </div>
    </div>

    <div class="move-button">
      <div class="move-calendar">
        <button class="btn-move-calendar" @click="moveCalendar()">달력</button>
      </div>
      <div class="move-totallist">
        <button class="btn-move-totallist" @click="moveTotalList()">전체 리스트</button>
      </div>
    </div>

    <!-- 선택된 날짜 상세 모달 -->
    <!-- <div v-if="selectedDay" class="modal-overlay" @click.self="selectedDay = null">
       <div class="modal-content">
         <button class="close-btn" @click="selectedDay = null">닫기</button>
         <h3>{{ formatDate(selectedDay.date) }}</h3>
         <div class="list_write_box">
           <DailyList class="list-box" />
           <WriteSet class="write-box" />
         </div>
       </div>
     </div> -->
  </div>
</template>

<style scoped>
.week-view {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.move-button {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-top: 1rem;
}
.move-calendar {
  text-align: right;
}

.btn-move-calendar {
  background-color: #ffcb3d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  /* transition:
     background-color 0.3s ease,
     transform 0.2s ease; */
}

.btn-move-calendar:hover {
  background-color: #ffaa00;
  transform: translateY(-2px);
}

.btn-move-calendar:active {
  background-color: #e69e00;
  transform: scale(0.98);
}
</style>
