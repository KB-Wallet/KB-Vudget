<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const users = ref([])

// 사용자 답변 저장 변수
const answers = ref({
  q1: null,
  q2: null,
  // ...
})

onMounted(async () => {
  const res = await axios.get('http://localhost:5000/users')
  users.value = res.data
})
</script>
<template>
  <header class="header">
    <h2>SPTI (Spending Personality Type Indicator)</h2>
  </header>

  <div class="container">
    <div class="scrollbox">
      <section class="fullquestion">
        <div class="question">
          <p>Q1. 월 초에 수입이 들어오면 나는 돈을 금방 사용해버린다</p>
          <label class="radio-option" name="q1" value="1"
            ><input type="radio" v-model="answers.q1" value="1" /> 전혀 아니다</label
          >
          <label class="radio-option" name="q1" value="1"
            ><input type="radio" v-model="answers.q1" value="2" /> 아니다</label
          >
          <label class="radio-option" name="q1" value="1"
            ><input type="radio" v-model="answers.q1" value="3" /> 보통이다</label
          >
          <label class="radio-option" name="q1" value="1"
            ><input type="radio" v-model="answers.q1" value="4" /> 그렇다</label
          >
          <label class="radio-option" name="q1" value="1"
            ><input type="radio" v-model="answers.q1" value="5" /> 매우 그렇다</label
          >
        </div>

        <div class="question">
          <p>Q 2. 세일 중이지만 지금 당장 필요 없는 물건이 있다면 구매 충동을 느낀다</p>
          <label><input type="radio" v-model="answers.q2" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q2" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q2" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q2" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q2" value="5" /> 매우 그렇다</label>
        </div>

        <div class="question">
          <p>Q 3. 여행을 앞두고 지출 예상 계획을 짜는 편이다</p>
          <label><input type="radio" v-model="answers.q3" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q3" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q3" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q3" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q3" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 4. 월급이 들어오면 먼저 하고 싶은 건 저축이다</p>
          <label><input type="radio" v-model="answers.q4" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q4" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q4" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q4" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q4" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 5. 친구와 카페에서 만나면 정확히 n빵 하는 편이다</p>
          <label><input type="radio" v-model="answers.q5" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q5" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q5" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q5" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q5" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 6. 충동구매를 한 날, 나의 마음은 후회하는 편이다</p>
          <label><input type="radio" v-model="answers.q6" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q6" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q6" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q6" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q6" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 7. 물건을 살 때 가장 중요한 기준은 가성비와 실용성이다</p>
          <label><input type="radio" v-model="answers.q7" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q7" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q7" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q7" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q7" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 8. 소비 기록 앱을 사용하고 있다면 가끔 생각날 때만 사용한다</p>
          <label><input type="radio" v-model="answers.q8" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q8" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q8" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q8" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q8" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 9. 갑작스러운 수입이 생긴다면 소비 욕구가 올라온다</p>
          <label><input type="radio" v-model="answers.q9" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q9" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q9" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q9" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q9" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 10. 지출 기록 앱을 쓸 때 당신은 대충 대충 적는다</p>
          <label><input type="radio" v-model="answers.q10" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q10" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q10" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q10" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q10" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 11. 친구들이 소비를 줄이자고 할 때 나는 극단적으로 줄인다</p>
          <label><input type="radio" v-model="answers.q11" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q11" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q11" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q11" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q11" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 12. 할인 쿠폰을 보면 필요하지 않은 물건을 산다</p>
          <label><input type="radio" v-model="answers.q12" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q12" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q12" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q12" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q12" value="5" /> 매우 그렇다</label>
        </div>
        <div class="question">
          <p>Q 13. 비싼 물건을 사기 전 고민없이 주문한다</p>
          <label><input type="radio" v-model="answers.q13" value="1" /> 전혀 아니다</label>
          <label><input type="radio" v-model="answers.q13" value="2" /> 아니다</label>
          <label><input type="radio" v-model="answers.q13" value="3" /> 보통이다</label>
          <label><input type="radio" v-model="answers.q13" value="4" /> 그렇다</label>
          <label><input type="radio" v-model="answers.q13" value="5" /> 매우 그렇다</label>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 바깥쪽 스크롤 방지 */
}
.header {
  text-align: center;
}
.scrollbox {
  height: 90vh;
  overflow-y: auto;
  width: 100%;
  display: flex;
  justify-content: center;
}
.fullquestion {
  width: 80%;
  max-width: 800px;
}

.question {
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.question:last-of-type {
  border-bottom: none; /* 마지막 항목은 선 제거 */
}
</style>
