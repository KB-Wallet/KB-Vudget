<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import db from '@/../db.json'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// db 확인용
onMounted(() => {
  console.log(db)
})

// 유저 ID
const userId = ref(0)

// 내역 타입 (지출 / 수입)
const selectedType = ref('expense')

// 입력 내역
const newRecordItem = ref({
  amount: 0,
  date: new Date(), // 오늘 날짜로 초기값 설정
  category: '',
  description: '',
  payment: '',
  vendor: '',
})

// 날짜 출력 형식 변환

// 내역 type에 따라 카테고리 필터링 표시
const filteredCategories = computed(() =>
  db.users[userId.value].categories.filter((cat) => cat.type === selectedType.value),
)

// 선택된 내역 type이 바뀔 때 카테고리를 초기화
watch(selectedType, () => {
  newRecordItem.value.category = ''
})
</script>

<template>
  <div class="quickpost-container">
    <div class="typebtn-container">
      <button
        type="button"
        class="btn btn-warning"
        :class="{ activeType: selectedType === 'expense' }"
        @click="selectedType = 'expense'"
      >
        지출
      </button>
      <button
        type="button"
        class="btn btn-warning"
        :class="{ activeType: selectedType === 'income' }"
        @click="selectedType = 'income'"
      >
        수입
      </button>
    </div>
    <div class="quickpost-middle">
      <div class="input-container">
        <VueDatePicker
          v-model="newRecordItem.date"
          style="width: 200px"
          locale="ko"
          :enable-time-picker="false"
          auto-apply
          placeholder="내역 날짜"
          :format="(date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`"
        />
        <!-- 년월일 출력 형식 지정 -->
        <!-- 카테고리: selectedType에 따라 필터링된 목록 출력 -->
        <select
          v-model="newRecordItem.category"
          class="form-select category"
          id="category"
          name="category"
          style="width: 200px"
        >
          <option disabled value="">카테고리</option>
          <option
            v-for="category in filteredCategories"
            :value="category.name"
            :key="category.name"
            :class="{ selectedOption: newRecordItem.category === category.name }"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <!-- 입력 필드: vendor 라벨이 selectedType에 따라 바뀜 -->
      <div class="input-container">
        <label for="vendor">
          {{ selectedType === 'expense' ? '지출 장소' : '수입원' }}
        </label>
        <input type="text" v-model="newRecordItem.vendor" placeholder="" id="vendor" />
      </div>
      <div class="input-container">
        <label for="amount">금액</label>
        <div class="amount-wrapper">
          <input
            type="text"
            v-model.number="newRecordItem.amount"
            placeholder="0원"
            id="amount"
            @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
          />
          <span class="unit-text">원</span>
        </div>
      </div>
      <div class="input-container">
        <label for="description">메모</label>
        <input type="text" v-model="newRecordItem.description" placeholder="" id="description" />
      </div>
    </div>
    <img src="../../icons/bear_submit.svg" alt="새로운 지출 등록" class="post-btn" />
  </div>
</template>

<style scoped>
.quickpost-container {
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
.typebtn-container {
  gap: 15px;
  display: flex;
  flex-direction: column;
}
.typebtn-container > * {
  width: 70px;
  height: 40px;
  border-radius: 7px;
  border: #ffbc00 1px solid;
  background-color: white;
  color: #ffbc00;
}
.activeType {
  background-color: #ffbc00;
  color: white;
}
.quickpost-middle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-container > input,
.amount-wrapper > input {
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 5px 15px;
}
.post-btn {
  width: 100px;
  height: 100px;
}
select option:disabled {
  color: lightgray;
}
.amount-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}
.amount-wrapper > input {
  width: 80%;
  margin-right: 5px;
}
.unit-text {
  color: gray;
}
</style>
