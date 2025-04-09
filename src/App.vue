<script setup>
import PieChart from './components/CategoryCard.vue'
import Bar from './components/ReportCard.vue'
</script>

<template>
  <section>
    <div>
      <h6>main_slide_1_1</h6>
      <!-- 카테고리별 지출 요약 차트 -->
      <PieChart />
    </div>
    <!--  -->
    <h6>main_slide_1_2</h6>
    <div><Bar /></div>
  </section>
</template>

<style scoped></style>
