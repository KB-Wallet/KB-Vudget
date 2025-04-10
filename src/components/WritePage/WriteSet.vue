<script setup>
import { useUserStore } from '@/stores/user'
const user_login = useUserStore()

const API_URL_users = 'http://localhost:5001/users'
const API_URL_incomes = 'http://localhost:5001/incomes'
const API_URL_expenses = 'http://localhost:5001/expenses'
import { onMounted, reactive, ref } from 'vue'

const cate = ref('')
const amount = ref()
const place = ref('')
const memo = ref('')
const today = ref('')
const catelist = ref(['식비', '주거비', '교통비', '쇼핑', '여가비', '보험비', '기타'])
const payment = ref('')
const incomes = reactive({
  id: 1,
  userId: 1,
  amount: 3000000,
  date: '2025-03-01',
  category: '월급',
  description: '3월 월급',
  payment: '이체',
  vendor: '회사',
})
const expenses = reactive({
  id: 1,
  userId: 1,
  amount: 1,
  date: '',
  category: '',
  description: '',
  payment: '',
  vendor: '',
})
const cateClick = ref(false)
const none_style = ref({ display: 'none' }) // 수정

const send_list = async function () {
  incomes.userId = user_login.UserId
  expenses.userId = user_login.UserId
  console.log('incomes user id!: ', user_login)
  console.log('expenses user id!: ', expenses.userId)

  incomes.id = Date.now
  incomes.amount = Number(amount.value).toLocaleString()

  incomes.category = cate.value
  incomes.description = memo.value
  incomes.vendor = place.value
  incomes.payment = payment.value

  expenses.id = Date.now
  expenses.amount = Number(amount.value).toLocaleString()
  expenses.date = today.value
  expenses.category = cate.value
  expenses.description = memo.value
  expenses.vendor = place.value
  expenses.payment = payment.value
  console.log('expenses: ', expenses)
  if (choose_revenue.value === true) {
    try {
      const response = await fetch(API_URL_incomes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomes),
      })

      if (response.ok) {
        console.log('Income successfully sent to the server.')
        await fetchData()
      } else {
        console.error('Failed to send income. Status:', response.status)
      }
    } catch (error) {
      console.error('Error occurred while sending income:', error)
    }
    window.location.reload()
  }
  if (choose_cost.value === true) {
    try {
      const response = await fetch(API_URL_expenses, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenses),
      })

      if (response.ok) {
        console.log('Expense successfully sent to the server.')
        await fetchData()
      } else {
        console.error('Failed to send expense. Status:', response.status)
      }
    } catch (error) {
      console.error('Error occurred while sending expense:', error)
    }
    window.location.reload()
  }
}

const choose_revenue = ref(false)
const choose_cost = ref(false)
const fetchData = () => {}
const changeRevenue = function () {
  choose_revenue.value = !choose_revenue.value
  choose_cost.value = false
  console.log(choose_revenue.value)
}

const changeCost = function () {
  choose_cost.value = !choose_cost.value
  choose_revenue.value = false
  console.log(choose_cost.value)
}

// 카테고리 리스트를 보여주는 함수
const cate_click = function () {
  console.log(cateClick.value) // 카테고리 클릭 상태
  if (cateClick.value === false) {
    none_style.value = { display: 'block' } // 카테고리 목록 표시
  } else {
    none_style.value = { display: 'none' } // 카테고리 목록 숨김
  }
  cateClick.value = !cateClick.value // 카테고리 클릭 상태 토글
  console.log(cate)
}

// 현재 날짜를 관리하는 변수
const now = ref('')
// 컴포넌트가 마운트된 후 실행되는 함수
onMounted(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  now.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  // `today`가 비어 있으면 초기값을 `now.value`로 설정할 수 있습니다.
  if (!today.value) {
    today.value = now.value
  }
})
</script>

<template>
  <body>
    <div class="revenue-cost-box">
      <span class="set-revenue" @click="changeRevenue" :class="{ chosen_revenue: choose_revenue }">
        <div>수입</div>
        <p class="small-write">Choose Income</p>
      </span>
      <span class="set-cost" @click="changeCost" :class="{ chosen_cost: choose_cost }">
        <div>지출</div>
        <p class="small-write">Choose Expenditure</p>
      </span>
    </div>

    <div class="input-all">
      <div @click="cate_click">
        <span class="category spend-place input-box">카테고리 ▼</span>
        <!-- 카테고리 클릭시 이벤트 추가 예정 -->
        <div class="cate-list" :style="none_style">
          <ul>
            <li v-for="i in catelist" :key="i" @click="cate = i">{{ i }}</li>
          </ul>
        </div>
      </div>
      <input
        type="text"
        placeholder=" 금액"
        class="amount spend-place input-box"
        v-model="amount"
      />
      <div class="container-input">
        <div>
          <span>
            <input
              type="text"
              placeholder=" 지출장소"
              class="spend-place input-box-below"
              v-model="place"
            />
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder=" 한 줄 메모"
            class="small-memo input-box-below"
            v-model="memo"
          />
        </div>
        <div>
          <input
            type="text"
            :placeholder="now.value"
            class="date input-box-below"
            v-model="today"
          />
        </div>
        <!-- 지불 방식 선택 (현금 또는 카드) -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="payment"
            id="cash"
            v-model="payment"
            value="현금"
          />
          <label class="form-check-label" for="cash"> 현금 </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="payment"
            id="credit_card"
            v-model="payment"
            value="카드"
          />
          <label class="form-check-label" for="credit_card"> 카드 </label>
        </div>
        <!-- 제출 버튼 -->
        <button class="btn-confirm" @click="send_list">continue</button>
      </div>
    </div>
  </body>
</template>

<style scoped>
@import '../../assets/WriteSet.css';
</style>
