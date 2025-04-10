<script setup>
import DailyList from '@/components/WritePage/DailyList.vue'
import WriteSet from '@/components/WritePage/WriteSet.vue'
</script>

<template>
  <body>
    <div>
      <DailyList class="list-box" />

      <WriteSet class="write-box" />
    </div>
  </body>
</template>

<style scoped>
@import '../assets/WritePage.css';
</style>
