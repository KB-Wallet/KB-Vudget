<script setup>
import { ref, onMounted } from 'vue'
import db from '@/../db.json'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

onMounted(() => {
  console.log(db)
})
const userId = ref(0)
// const newRecordType = ref('') // 수입인지 지출인지
const newRecordItem = ref({
  amount: 0,
  date: '',
  category: '',
  description: '',
  payment: '',
  vendor: '',
})
</script>

<template>
  <div class="quickpost-container">
    <div class="typebtn-container">
      <button type="button" class="btn btn-warning">지출</button>
      <button type="button" class="btn btn-warning">수입</button>
    </div>
    <div class="quickpost-middle">
      <VueDatePicker v-model="pickedDate" style="width: 200px" />
      <select name="category" id="category">
        <option value="">카테고리</option>
        <option
          v-for="category in db.users[userId].categories"
          :value="category.name"
          :key="category.name"
        >
          {{ category.name }}
        </option>
      </select>
      <label for="vendor">지출 장소</label>
      <input type="text" v-model="newRecordItem.vendor" placeholder="" id="vendor" />
      <label for="amount">금액</label>
      <input type="text" v-model.number="newRecordItem.amount" placeholder="0원" id="amount" />
      <label for="description">메모</label>
      <input type="text" v-model="newRecordItem.description" placeholder="" id="description" />
    </div>
    <img src="../../icons/bear.svg" alt="새로운 지출 등록" class="post-btn" />
  </div>
</template>

<style scoped>
.quickpost-container {
  display: flex;
  flex-direction: row;
  width: 80%;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
}
.typebtn-container {
  gap: 10px;
  display: flex;
  flex-direction: column;
}
.typebtn-container > * {
  width: 70px;
  height: 30px;
  border-radius: 7px;
  border: none;
  background-color: #ffbc00;
  color: white;
}
.post-btn {
  width: 100px;
  height: 100px;
}
</style>
