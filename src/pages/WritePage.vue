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
.write-box {
  position: relative;
  left: 200px;
  top: 250px;
}
.list-box {
  position: relative;
  bottom: 100px;
  /* left: 200px; */
}
body > div {
  right: 300px;
  position: relative;
  /* border: 1px solid black; */
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 832px) {
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1px;
    position: absolute;
    left: -170px;
  }
  .write-box {
    position: relative;
    right: 200px;
    top: 800px;
  }
  .list-box {
    position: relative;
    bottom: 100px;
    left: 200px;
  }
}
</style>
