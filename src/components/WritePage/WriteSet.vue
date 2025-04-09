<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue'

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

const send_list = function () {
  incomes.amount = amount.value
  incomes.date = today.value
  incomes.category = cate.value
  incomes.description = memo.value
  incomes.vendor = place.value
  incomes.payment = payment.value
}

const changeRevenue = function () {}
const changeCost = function () {}

const cate_click = function () {
  console.log(cateClick.value) // 수정
  if (cateClick.value === false) {
    none_style.value = { display: 'block' } // 수정
  } else {
    none_style.value = { display: 'none' } // 수정
  }
  cateClick.value = !cateClick.value // 수정
  // console.log(cate)
}
</script>

<template>
  <body>
    <div class="revenue-cost-box">
      <span class="set-revenue" @click="changeRevenue">
        <div>수입</div>
        <p class="small-write">Choose Income</p>
      </span>
      <span class="set-cost" @click="changeCost">
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
          <input type="text" placeholder=" 날짜" class="date input-box-below" v-model="today" />
        </div>
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
        <button class="btn-confirm" @click="send_list">continue</button>
      </div>
    </div>
  </body>
</template>

<style scoped>
.revenue-cost-box {
  position: relative;
  top: -30px;
}
.set-revenue,
.set-cost {
  padding: 1rem;
  /* margin: rem; */
  width: 150px;
  height: 80px;
  left: 50px;
  position: absolute;
  bottom: 100px;
  border-radius: 10px;
  border: 1px solid #8a8d8f;
  font-size: 2rem;
}
.set-revenue {
  left: 150px;
  /* bottom: 1px; */
}
.set-revenue:active {
  border: #2b46f9 solid 1px;
  background-color: #eaedff;
  /* color: #2b46f9 solid 1px; */
}
.set-cost {
  left: 400px;
}
.set-cost:active {
  border: #ff4e4e solid 1px;

  background-color: #ffd9d9;
}
.small-write {
  color: #8a8d8f;
  font-size: 1rem;
}
.category {
  border: 1px solid #8a8d8f;
  padding: 1rem;
  left: 10px;
  width: 100px;
}
.amount,
.category {
  padding: 1.2rem;
  top: -30px;
  position: absolute;
}
.amount {
  left: 160px;
  padding: 1.3rem;
  width: 240px;
}
.input-box {
  border: 1px solid #8a8d8f;
  border-radius: 4px;
  background-color: #8a8d8f29;
}
.input-box-below {
  padding: 1rem;
  margin: 1rem;
  width: 390px;
}
.container-input {
  top: 30px;
  position: absolute;
  margin: 10px;
  left: -15px;
}
.btn-confirm {
  background-color: #ffbc00;
  border: none;
  border-radius: 2rem;
  width: 460px;
  height: 50px;
  color: white;
}
.btn-confirm:active {
  border: #8a8d8f 1px solid;
}
.input-all {
  bottom: 70px;
  position: inherit;
  left: 140px;
}
.cate-list {
  position: absolute;
  z-index: 3;
  /* border: 1px solid #8a8d8f; */
  border-radius: 4px;
  /* background-color: #eef2f5; */
  width: 138px;
  left: 10px;
  top: 30px;
}
li {
  list-style-type: none;
  border: 1px solid #8a8d8f;
  margin: 0;
  background-color: #eef2f5;
  position: relative;
  top: -15px;
  left: -40px;
  padding: 5px;
  width: 120px;
  border-radius: 5px;
}
li:hover {
  background-color: #8a8d8f;
}
.payment-box {
  position: relative;
  bottom: 10px;
  left: 15px;
  border: 1px solid #8a8d8f;
  border-radius: 5px;
}
</style>
