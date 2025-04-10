<script setup>
import CategoryCard from '@/components/CategoryCard.vue'
import ReportCard2 from '@/components/ReportCard2.vue'
// import ReportCard from '@/components/ReportCard.vue'
</script>

<template>
  <div>
    <h6>main_slide_1_1</h6>
    <!-- 카테고리별 지출 요약 차트 -->
    <CategoryCard />
  </div>
  <!--  -->
  <h6>main_slide_1_2 원본</h6>
  <!-- <div><ReportCard /></div> -->
  <h6>main_slide_1_2 수정중</h6>
  <div><ReportCard2 /></div>
</template>

<style scoped></style>
