<script setup>
import CategoryCard from '@/components/CategoryCard.vue'
import ReportCard from '@/components/ReportCard.vue'
</script>

<template>
  <div>
    <h6>main_slide_1_1</h6>
    <!-- 카테고리별 지출 요약 차트 -->
    <CategoryCard />
  </div>
  <!-- 게이지바 수입지출 요약 차트 -->
  <h6>main_slide_1_2 원본</h6>
  <div><ReportCard /></div>
</template>

<style scoped></style>
