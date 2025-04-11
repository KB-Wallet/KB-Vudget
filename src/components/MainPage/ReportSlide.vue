<script setup>
import ReportCard from './ReportCard.vue'
import CategoryCard from './CategoryCard.vue'
import db from '@/../db.json'
import { ref, computed } from 'vue'

const userId = ref('1')
const user = computed(() => db.users.find((u) => u.id === userId.value))
</script>

<template>
  <div class="report-slide-wrapper">
    <div class="report-slide-header">
      <h2>
        <span class="username">{{ user?.username }}</span
        >님의 리포트
      </h2>
      <p class="date">{{ currentDate }}</p>
    </div>

    <div class="report-content">
      <div class="left-chart">
        <CategoryCard />
      </div>
      <div class="right-report">
        <ReportCard />
      </div>
    </div>
  </div>
</template>

<script>
const currentDate = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<style scoped>
.report-slide-wrapper {
  width: 100%;
  padding: 30px 50px;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.report-slide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.report-slide-header > h2 {
  font-size: 1.2rem;
}

.username {
  color: #f5a623;
  font-weight: bold;
  font-size: 1.7rem;
}

.date {
  color: #555;
  font-size: 0.9rem;
}

.report-content {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
}

.left-chart,
.right-report {
  width: 48%;
  padding: 1rem;
  background-color: #eee;
  border-radius: 10px;
}
</style>
