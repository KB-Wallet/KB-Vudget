<script setup>
import { ref, onMounted } from 'vue'

const category = '식비' // 임시 카테고리, 추후 prop 또는 루프 처리 가능

const consumed = ref(0)
const target = ref(0)
const percent = ref(0)

onMounted(async () => {
  try {
    const res = await fetch('/db.json')
    const data = await res.json()

    // 소비 데이터 계산
    const expenses = data.expenses.filter((e) => e.userId === 1 && e.category === category)
    const sum = expenses.reduce((acc, curr) => acc + curr.amount, 0)
    consumed.value = sum

    // 카테고리별 목표 예산 설정 (예: 식비: 100000)
    const categoryBudgets = {
      식비: 100000,
      주거비: 0,
      교통비: 50000,
      쇼핑: 200000,
      여가비: 100000,
      보험비: 80000,
      기타: 150000,
    }

    target.value = categoryBudgets[category] || 1000000
    percent.value = Math.min((consumed.value / target.value) * 100, 100)
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
})
</script>

<template>
  <div class="main_slide_1_2">
    <div class="gaugeWrapper">
      <div class="gaugeBar">
        <div class="gaugeFill" :style="{ width: percent + '%' }">
          <span class="label">{{ `소비액 : ${consumed.toLocaleString()}원` }}</span>
        </div>
        <div class="gaugeRemain" :style="{ width: 100 - percent + '%' }">
          <span class="label">{{ `목표 지출액 : ${target.toLocaleString()}원` }}</span>
        </div>
      </div>
    </div>

    <div class="main-slide-card-1-2">
      <ul class="totalSummary">
        <li>총 수입액 : 3,000,000 원</li>
        <br />
        <li>총 지출액 : 2,300,000 원</li>
      </ul>
      <img
        class="icons-bear"
        src="../icons/bear.svg"
        alt="로고캐릭터"
        style="width: 100px; height: 100px"
      />
    </div>
  </div>
</template>

<style scoped>
.main_slide_1_2 {
  border: 1px solid red;
  width: 300px;
}
.gaugeWrapper {
  /* border: 1px solid green; */
  max-width: 300px;
  margin: 0.5rem auto;
}

.gaugeBar {
  display: flex;
  margin: 20px 10px;
  height: 20px;
  width: 280px;
  border-radius: 30px;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.gaugeFill {
  background-color: #ffb300;
  display: flex;
  align-items: center;
  padding-left: 10px;
  white-space: nowrap;
}

.gaugeRemain {
  background-color: #5f5852;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  white-space: nowrap;
}

.label {
  color: #fff;
  font-size: small;
}
.main-slide-card-1-2 {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  font-size: 12px;
}
</style>
