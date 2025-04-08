<script setup>
import { onMounted } from 'vue'
// const props = defineProps({ '카테고리별 총지출값 데이터'})

import db from '@/../db.json'

// Chart.js에 필요한 라이브러리 임포트
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

onMounted(() => {
  console.log(db)
})

// Chart.js에서 필요한 컴포넌트 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement)

// 파이차트 데이터 정의

const chartData = {
  labels: ['식비', '주거비', '교통비', '쇼핑', '여가비', '보험비', '기타'],
  datasets: [
    {
      // 지출 입력 컴포넌트에서 입력, json 파일에 저장, 그 데이터 불러오기
      label: '지출액',
      data: [300000, 500000, 80000, 150000, 200000, 95000, 150000],
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
}

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
</script>

<template>
  <h4 class="categoryTitle">카테고리별 지출</h4>
  <section class="wholeChart">
    <div class="pieChart">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style scoped>
.categoryTitle {
  /* border: 1px solid green; */
  font-size: x-large;
  margin: 1rem;
  padding: 1rem;
}
.wholeChart {
  display: flex;
  align-items: center;
  /* border: 1px solid blue; */
}
.pieChart {
  width: 300px;
  height: 300px;
  /* border: 1px solid red; */
}
</style>
