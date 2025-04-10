<script setup>
// 유저 관련 데이터와 함수들
import { useUserStore } from '@/stores/user'
const user_login = useUserStore() // 로그인한 유저 정보를 가져오는 store

// API URL 설정
import axios from 'axios'
const API_URL_users = 'http://localhost:5000/users'
const API_URL_incomes = 'http://localhost:5000/incomes'
const API_URL_expenses = 'http://localhost:5000/expenses'

// 상태 관리할 변수들
import { ref, onMounted } from 'vue'
const users = ref([]) // 전체 사용자 데이터
const incomes = ref([]) // 전체 수입 데이터
const expenses = ref([]) // 전체 지출 데이터
const incomes_login = ref([]) // 로그인한 유저의 수입 데이터
const expenses_login = ref([]) // 로그인한 유저의 지출 데이터

// 데이터 가져오기 함수
const fetchData = async () => {
  try {
    // 각각의 API에서 데이터를 가져옴
    const response_users = await axios.get(API_URL_users)
    const response_incomes = await axios.get(API_URL_incomes)
    const response_expenses = await axios.get(API_URL_expenses)

    // 응답 데이터를 상태 변수에 저장
    users.value = response_users.data
    incomes.value = response_incomes.data
    expenses.value = response_expenses.data

    // 로그인한 유저의 UserId로 필터링
    incomes_login.value = incomes.value.filter((item) => item.UserId === user_login.UserId)
    expenses_login.value = expenses.value.filter((item) => item.UserId === user_login.UserId)

    // 콘솔로 필터링된 데이터 출력
    console.log('전체 users:', users.value)
    console.log('전체 incomes:', incomes.value)
    console.log('전체 expenses:', expenses.value)
    // 로그인한 유저의 수입과 지출을 필터링하여 출력
    // console.log('로그인한 유저의 수입:', incomes_login.value)
    // console.log('로그인한 유저의 지출:', expenses_login.value)
  } catch (error) {
    // 데이터 가져오기 실패 시 에러 출력
    console.error('Error fetching data:', error)
  }
}

// 컴포넌트가 마운트되면 데이터를 가져옴
onMounted(() => {
  fetchData() // fetchData 함수 호출
})

// 수입 추가 후 새로고침 함수 (추가된 수입을 화면에 반영)
const check = () => {
  fetchData() // 데이터를 새로 가져옴
}

// 수입 삭제 함수
const deleteIncome = async (id) => {
  console.log(id) // 삭제할 수입의 id
  try {
    // 수입 삭제 요청
    await axios.delete(`http://localhost:5000/incomes/${id}`)
    console.log('삭제 성공!')
    fetchData() // 데이터 새로고침
  } catch (error) {
    console.error('수입 삭제 실패:', error) // 삭제 실패 시 에러 출력
  }
}

// 지출 삭제 함수
const deleteExpense = async (id) => {
  console.log(id) // 삭제할 지출의 id
  try {
    // 지출 삭제 요청
    await axios.delete(`http://localhost:5000/expenses/${id}`)
    console.log('삭제 성공!')
    fetchData() // 데이터 새로고침
  } catch (error) {
    console.error('수입 삭제 실패:', error) // 삭제 실패 시 에러 출력
  }
}
</script>

<template>
  <!-- 헤더 제목 -->
  <h3 class="header3">Vueget 기록</h3>

  <!-- 수입과 지출 목록을 보여주는 박스 -->
  <div class="list-box">
    <ul class="unordered_list">
      <!-- 로그인한 유저의 수입 목록 -->
      <li class="lists" v-for="i in incomes_login" :key="i.id">
        <div class="box_rev_cost">
          <!-- 수입 항목의 벤더 이름 출력 -->
          <span class="list-name">{{ i.vendor }}</span>
          <!-- 수입 텍스트 출력 -->
          <span class="income"> 수입 </span>
          <!-- 삭제 버튼 클릭 시 수입 삭제 함수 호출 -->
          <i class="fa-solid fa-trash i_con_trash" @click="deleteIncome(i.id)"></i>
        </div>
        <div>
          <!-- 수입의 날짜, 카테고리, 금액 출력 -->
          <span class="date">{{ i.date }}</span>
          <span class="cate-name">{{ i.category }}</span>
          <span class="amount">{{ i.amount }}</span>
        </div>
      </li>

      <!-- 로그인한 유저의 지출 목록 -->
      <li class="lists" v-for="i in expenses_login" :key="i.id">
        <div>
          <!-- 지출 항목의 벤더 이름 출력 -->
          <span class="list-name">{{ i.vendor }}</span>
          <!-- 지출 텍스트 출력 -->
          <span class="cost"> 지출 </span>
          <!-- 삭제 버튼 클릭 시 지출 삭제 함수 호출 -->
          <i class="fa-solid fa-trash" @click="deleteExpense(i.id)"></i>
        </div>
        <div>
          <!-- 지출의 날짜, 카테고리, 금액 출력 -->
          <span class="date">{{ i.date }}</span>
          <span class="cate-name">{{ i.category }}</span>
          <span class="amount">{{ i.amount }}</span>
        </div>
      </li>
    </ul>
  </div>

  <!-- 새로고침 버튼 (기능 구현되어 있음) -->
  <button class="move-total" @click="check" style="display: none">새로고침</button>
</template>
<style scoped>
@import '../../assets/DailyList.css';
</style>
