<script setup>
import DailyList from './components/WritePage/DailyList.vue'
import WriteSet from './components/WritePage/WriteSet.vue'
</script>

<template>
  <body>
    <div>
      <DailyList />
    </div>
    <div>
      <WriteSet class="dd" />
    </div>
  </body>
</template>

<style scoped>
.dd {
  position: relative;
  left: 500px;
}
</style>
