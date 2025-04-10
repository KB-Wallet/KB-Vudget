<script setup>
import { ref, reactive, onMounted } from 'vue'
// const props = defineProps({ '카테고리별 총지출값 데이터'})

// import db from '@/../db.json'

// Chart.js에 필요한 라이브러리 임포트
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

// Chart.js에서 필요한 컴포넌트 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement)

// 파이차트 데이터 정의
const chartData = reactive({
  // labels: ['식비', '주거비', '교통비', '쇼핑', '여가비', '보험비', '기타'],
  labels: [],
  datasets: [
    {
      // 지출 입력 컴포넌트에서 입력, json 파일에 저장, 그 데이터 불러오기
      label: '지출액',
      data: [],
      //totalExpenses[category == '식비'].value 방식으로 넣기
      backgroundColor: [
        'rgba(255, 64, 0, 0.9)',
        'rgba(255, 111, 0, 0.8)',
        'rgba(255, 204, 0, 0.8)',
        'rgba(0, 196, 48, 0.7)',
        'rgba(0, 127, 196, 0.7)',
        'rgba(0, 38, 255, 0.7)',
        'rgba(42, 0, 196, 0.7)',
      ],
      hoverOffset: 15,
    },
  ],
})

// 옵션 설정
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: '카테고리별 리포트',
    },
  },
}

//데이터 로드 상태 체크
const isLoaded = ref(false)

// 온마운트 시 데이터 처리
onMounted(async () => {
  try {
    // Json 서버 경로 (예: public 폴더에 있는 경우)
    const response = await fetch('/db.json') // 또는 http://localhost:5000/db.json
    const data = await response.json()

    const expenses = data.expenses.filter((expense) => expense.userId === 1)
    const categorySums = {}

    // 카테고리별로 합산
    expenses.forEach((expense) => {
      const category = expense.category
      if (!categorySums[category]) {
        categorySums[category] = 0
      }
      categorySums[category] += expense.amount
    })
    //데이터 차트에 추가
    chartData.labels = Object.keys(categorySums)
    chartData.datasets[0].data = Object.values(categorySums)

    isLoaded.value = true
  } catch (error) {
    console.error('데이터 로딩 실패: ', error)
  }
})
</script>

<template>
  <section class="wholeChart">
    <div class="pieChart">
      <h4 class="categoryTitle">카테고리별 지출</h4>
      <Pie v-if="isLoaded" :data="chartData" :options="chartOptions" />
      <p v-else>차트 데이터를 불러오는 중입니다...</p>
    </div>
  </section>
</template>

<style scoped>
.categoryTitle {
  /* border: 1px solid green; */
  font-size: large;
  margin: 0.3rem;
  display: flex;
  justify-content: center;
}
.wholeChart {
  display: flex;
  align-items: center;
  width: 300px;
  border: 1px solid blue;
}
.pieChart {
  /* border: 1px solid red; */
  gap: 0.3rem;
  flex-direction: column;
  /* background-color: rgba(138, 141, 143, 0.3); */
}
</style>
