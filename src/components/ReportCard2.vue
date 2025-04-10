<!-- 여기서 수정하기 -->

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'

// Pinia store 인스턴스 호출
const store = useDataStore()
// 💡 store에서 상태와 액션 가져오기
// const { usersData, expensesData, fetchUsersData, fetchExpensesData } = useDataStore()

// 전체 지출 데이터 및 필터링 데이터
// const usersData = store.usersData
// const expensesData = store.expensesData
const totalExpensesAmount = ref({})

onMounted(async () => {
  try {
    await store.fetchUsersData()
    await store.fetchExpensesData()
    totalExpensesAmount.value = store.totalExpensesAmount.value
    console.log('총지출액 === :', totalExpensesAmount.value)
    // console.log('usersData :', store.usersData.value)
    // console.log('expensesData :', store.expensesData.value)

    // 데이터를 천천히 로그로 찍어보기
    // setTimeout(() => {
    // console.log('✅ usersData (지연 확인):', usersData.value)
    // console.log('✅ expensesData (지연 확인):', expensesData.value)
    // }, 3000)

    // watch로 반응형 상태 감지 후 콘솔 출력
    watch(
      () => store.usersData,
      (newVal) => {
        console.log('watch로 usersData===:', newVal)
        const usersData = store.usersData.value
      },
      { immediate: true, deep: true }, // ✅ 중요!
    )
    watch(
      () => store.expensesData,
      (newVal) => {
        console.log('watch로 expensesData===:', newVal)
        const expensesData = store.expensesData.value
      },
      { immediate: true, deep: true },
    )
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
})
</script>

<template>
  <div class="main_slide_1_2">
    <div class="gaugeWrapper">
      <div class="gaugeBar">
        <div class="gaugeFill" :style="{ width: percent + '%' }">
          <span class="label">{{ `누적 지출액 : $expensesData.value원` }}</span>
        </div>
        <div class="gaugeRemain" :style="{ width: 100 - percent + '%' }">
          <span class="label">{{ `목표 지출액 : $store.usersData.value원` }}</span>
        </div>
      </div>
    </div>

    <div class="main-slide-card-1-2">
      <ul class="totalSummary">
        <!-- <p>`목표 지출액 : {{ usersData.targetBudget }} 원</p> -->
        <li>총 n월 수입액 : 00000000000 원</li>
        <br />
        <li>총 n월 지출액 : 000000000000 원</li>
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
  font-size: 0.6rem;
}
.main-slide-card-1-2 {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  font-size: 12px;
}
</style>
