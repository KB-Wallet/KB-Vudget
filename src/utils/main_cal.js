import { ref, computed, onMounted, watch } from 'vue'

import router from '@/router'
import '@/assets/calendar.css'
import axios from '@/utils/axios'
// import { useUserStore } from '@/stores/user'
import WriteSet from '@/components/WritePage/WriteSet.vue'
import DailyList from '@/components/WritePage/DailyList.vue'
// const user_login = useUserStore()

//당일 날짜 불러오기, =사용자가 클릭한 날짜
const today = new Date()
const currentDate = ref(new Date())
const selectedDay = ref(null)

//현재 연도, 월 계산
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

//요일 한글 설정
const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 선택한 달 달력 뜨게 하기, 날짜 계산
function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekDay = firstDay.getDay()
  const totalDays = lastDay.getDate()
  const days = []

  // 이전 달 공백 (= currentMonth) _ 공백 채움 용
  for (let i = 0; i < startWeekDay; i++) {
    const prevDate = new Date(year, month, i - startWeekDay + 1)
    days.push({ date: prevDate, notes: [], inactive: true, isToday: false })
  }

  // 현재 달 (= currentMonth + 1)
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

  // 다음 달 공백 (총 6주 x 7일; 주 없을 시 줄어듦) _ 공백 채움 용
  while (days.length % 7 !== 0) {
    const nextDate = new Date(year, month, totalDays + (days.length - startWeekDay - totalDays) + 1)
    days.push({ date: nextDate, notes: [], inactive: true, isToday: false })
  }

  return days
}

//달력에 날짜 표시
const calendarDays = computed(() => getMonthDays(currentYear.value, currentMonth.value))

//달 변경
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

//창 열렸을 때 클릭한 해당 날 뜨게 하기 (형식: 0000년 0월 00일)
function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

//axios를 통해 데이터 불러오기

// 현재 월에 해당하는 수입/지출 통계를 stats에서 찾아서 반영
const totalExpensesMonth = ref(0)
const totalIncomeMonth = ref(0)
const stats = ref([])

function updateMonthlyStats() {
  //YYYY-MM 형식 포맷 (객체 키로 사용위함)
  const monthStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}`
  //db.json 에 stat 객체에서 불러옴
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
// const totalIncomeDay = ref([])
// const totalExpensesDay = ref([])
const dailyTotals = ref({}) //빈 객체 { 'YYYY-MM-DD': { income: 숫자, expense: 숫자 } }
const incomes = ref([])
const expenses = ref([])

//YYYY-MM-DD 형식 포맷 (객체 키로 사용위함)
function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

//수입과 지출을 날짜 별로 정리 하여 dailyTotals 객체에 저장
function updateDailyStats() {
  const totals = {}

  // 수입 날짜 별 정리 및 총합
  incomes.value.forEach((item) => {
    if (!totals[item.date]) {
      totals[item.date] = { income: 0, expense: 0 }
    }
    totals[item.date].income += item.amount
  })

  // 지출 날짜 별 정리 및 총합
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
    updateMonthlyStats()
  } catch (error) {
    console.error('stats 데이터 불러오기 실패:', error)
  }
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

// 월 변경/데이터 변경 감지시 다시 계산
watch([currentYear, currentMonth, stats, incomes, expenses], () => {
  updateMonthlyStats()
  updateDailyStats()
})

//버튼 클릭시 전체리스트 페이지
function moveTotalList() {
  router.push({ path: '/history' })
}

// //버튼 클릭시 작성 페이지
// function moveWritePage() {
//   router.push({ path: '/WritePage' })
// }

export function formatDate(date) {
  return date.toLocaleDateString()
}
