<script setup>
import { useUserStore } from '@/stores/user'
const user_login = useUserStore()

import axios from 'axios'
const API_URL_users = 'http://localhost:5000/users'
const API_URL_incomes = 'http://localhost:5000/incomes'
const API_URL_expenses = 'http://localhost:5000/expenses'
import { ref, onMounted } from 'vue'
const users = ref([])
const incomes = ref([])
const expenses = ref([])
const incomes_login = ref([])
const expenses_login = ref([])
const fetchData = async () => {
  try {
    const response_users = await axios.get(API_URL_users)
    const response_incomes = await axios.get(API_URL_incomes)
    const response_expenses = await axios.get(API_URL_expenses)

    users.value = response_users.data
    incomes.value = response_incomes.data
    expenses.value = response_expenses.data

    console.log('전체 users:', users.value)
    console.log('전체 incomes:', incomes.value)
    console.log('전체 expenses:', expenses.value)

    // 로그인한 유저의 UserId 기준으로 필터링
    incomes_login.value = incomes.value.filter((item) => item.UserId === user_login.UserId)
    expenses_login.value = expenses.value.filter((item) => item.UserId === user_login.UserId)

    // console.log('로그인한 유저의 수입:', incomes_login.value)
    // console.log('로그인한 유저의 지출:', expenses_login.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  const fetchData = async () => {
    try {
      const response_users = await axios.get(API_URL_users)
      const response_incomes = await axios.get(API_URL_incomes)
      const response_expenses = await axios.get(API_URL_expenses)

      users.value = response_users.data
      incomes.value = response_incomes.data
      expenses.value = response_expenses.data

      // console.log('전체 users:', users.value)
      // console.log('전체 incomes:', incomes.value)
      // console.log('전체 expenses:', expenses.value)

      // 로그인한 유저의 UserId 기준으로 필터링
      incomes_login.value = incomes.value.filter((item) => item.UserId === user_login.UserId)
      expenses_login.value = expenses.value.filter((item) => item.UserId === user_login.UserId)

      // console.log('로그인한 유저의 수입:', incomes_login.value)
      // console.log('로그인한 유저의 지출:', expenses_login.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  fetchData()
})
// 수입 추가 함수
const check = () => {
  fetchData()
}
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const deleteIncome = async (id) => {
  console.log(id)
  try {
    await axios.delete(`http://localhost:5000/incomes/${id}`)
    console.log('삭제 성공!')
  } catch (error) {
    console.error('수입 삭제 실패:', error)
  }
}

const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL_expenses}/${id}`)
    expenses_login.value = expenses_login.value.filter((item) => item.id !== id)
    console.log(`지출 항목 ${id} 삭제됨`)
  } catch (error) {
    console.error('지출 삭제 실패:', error)
  }
}
</script>

<template>
  <body>
    <h3>오늘의 Vueget 기록</h3>
    <div class="list-box">
      <ul>
        <li v-for="i in incomes_login" :key="i.id">
          <div>
            <span class="list-name">{{ i.vendor }}</span>
            <span class="income"> 수입 </span>
            <i class="fa-solid fa-trash" @click="deleteIncome(i.id)"></i>
          </div>
          <div>
            <span class="date">{{ i.date }}</span
            ><span class="cate-name">{{ i.category }}</span>
            <span class="amount">{{ i.amount }}</span>
          </div>
        </li>
        <li v-for="i in expenses_login" :key="i.id">
          <div>
            <span class="list-name">{{ i.vendor }}</span>
            <span class="cost"> 지출 </span>
            <i class="fa-solid fa-trash" @click="deleteExpense(i.id)"></i>
          </div>
          <div>
            <span class="date">{{ i.date }}</span
            ><span class="cate-name">{{ i.category }}</span>
            <span class="amount">{{ i.amount }}</span>
          </div>
        </li>
      </ul>
    </div>
  </body>

  <button class="move-total" @click="check">새로고침</button>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
h3 {
  position: relative;
  top: 110px;
  font-size: 2rem;
}
li {
  list-style: none;
  border: 1px solid #8a8d8f47;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
  right: 40px;
  border-radius: 10px;
  width: 480px;
}
.list-box {
  /* border: 1px solid #8a8d8f47; */
  width: 500px;
  height: 380px;
  /* top: px; */
  position: absolute;
  top: 200px;
  left: -30px;
  overflow-x: auto;
}

.move-total {
  background-color: white;
  border: white;
  color: #a6a6a6;
  left: 350px;
  position: relative;
  top: 50px;
}
ul {
  margin: 0 auto;
}
.income {
  position: absolute;
  left: 380px;
  top: 5px;
  /* border: 1px solid black; */
  background-color: #eaedff;
  color: #2b46f9;
  padding: 0.3rem;
  border-radius: 1rem;
  /* margin: ; */
}
.cost {
  position: absolute;
  left: 380px;
  top: 5px;
  /* border: 1px solid black; */
  background-color: #eaedff;
  color: #ff5c5c;
  padding: 0.3rem;
  border-radius: 1rem;
  /* margin: ; */
}
.date {
  color: #8a8d8f;
  font-size: 0.8rem;
}
.cate-name {
  color: #8a8d8f;
  position: relative;
  left: 10px;
  font-size: 0.8rem;
}
.amount {
  position: relative;
  left: 270px;
}
i {
  position: absolute;
  left: 450px;
  top: 10px;
  font-size: 20px;
}
i:hover {
  color: #ff4400;
}
i:active {
  color: red;
}
</style>
