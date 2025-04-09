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

// 내역 type에 따라 카테고리 필터링 표시
const filteredCategories = computed(() =>
  db.users[userId.value].categories.filter((cat) => cat.type === selectedType.value),
)

const fieldErrors = ref({
  category: false,
  vendor: false,
  amount: false,
})

// 선택된 내역 type이 바뀔 때 카테고리를 초기화
watch(selectedType, () => {
  newRecordItem.value.category = ''
})

// 금액 1000단위 콤마 형식 변환용 computed
const formattedAmount = computed(() => newRecordItem.value.amount.toLocaleString('ko-KR'))
const onAmountInput = (e) => {
  const digits = e.target.value.replace(/[^0-9]/g, '')
  newRecordItem.value.amount = parseInt(digits || '0')
}

// submit 버튼 클릭시 입력값을 저장하고 초기화하는 함수
const handleSubmit = () => {
  // ⚠️ 유효성 검사
  fieldErrors.value.category = !newRecordItem.value.category
  fieldErrors.value.vendor = !newRecordItem.value.vendor.trim()
  fieldErrors.value.amount = !newRecordItem.value.amount

  const hasError = Object.values(fieldErrors.value).some((v) => v)
  if (hasError) {
    console.log('🚨 입력값 오류 발생')
    return
  }

  // payload: 서버나 저장소로 보내는 데이터 덩어리 (묶음)
  const payload = {
    ...newRecordItem.value, // 입력된 모든 값을 (펼쳐서) 복사해서
    type: selectedType.value, // 현재 지출/수입 타입도 추가
  }

  console.log('💾 저장된 내역:', payload) // 일단은... 실제 저장 대신 콘솔에 출력
  // 나중에 여기에 axios.post(...)나 fetch(...)로 서버 전송을 붙이게 됨

  // 입력 폼 초기화 (새로운 입력 위해)
  newRecordItem.value = {
    amount: 0,
    date: new Date(),
    category: '',
    description: '',
    payment: '',
    vendor: '',
  }
  fieldErrors.value = { category: false, vendor: false, amount: false }
}
</script>

<template>
  <!--
  form 태그를 이용해 폼 데이터를 묶고
  @submit 폼이 제출될 때 실행할 이벤트 핸들러 지정
  .prevent: e.preventDefault() 기능: 기본 동작(페이지 새로고침)을 막음
  - ⭐️ HTML 기본 동작으로 <form> 안에 있는 <button>이 눌리면 페이지가 새로고침됨
       그걸 막기 위해 .prevent를 붙여주는 것
  handleSubmit: 실행될 함수 이름
    -->
  <!-- 폼 전체를 감싸는 태그 / @submit.prevent: 기본 새로고침 막고 handleSubmit 실행 -->
  <form @submit.prevent="handleSubmit">
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
            style="width: 210px"
            locale="ko"
            :enable-time-picker="false"
            auto-apply
            placeholder="내역 날짜"
            :format="
              (date) =>
                date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : ''
            "
          />
          <!-- 년월일 출력 형식 지정 -->
          <!-- 카테고리: selectedType에 따라 필터링된 목록 출력 -->
          <select
            v-model="newRecordItem.category"
            class="form-select category"
            :class="{ error: fieldErrors.category }"
            id="category"
            name="category"
            style="width: 210px"
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
          <input
            type="text"
            v-model="newRecordItem.vendor"
            :class="{ error: fieldErrors.vendor }"
            placeholder=""
            id="vendor"
          />
        </div>
        <div class="input-container">
          <label for="amount">금액</label>
          <div class="amount-wrapper">
            <!-- <input
              type="text"
              v-model.number="newRecordItem.amount"
              placeholder="0"
              id="amount"
              @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
            /> -->
            <input
              type="text"
              :value="formattedAmount"
              @input="onAmountInput"
              :class="{ error: fieldErrors.amount }"
              id="amount"
              placeholder="0"
            />
            <span class="unit-text">원</span>
          </div>
        </div>
        <div class="input-container">
          <label for="description">메모</label>
          <input type="text" v-model="newRecordItem.description" placeholder="" id="description" />
        </div>
      </div>
      <button type="submit" class="post-btn" style="background: none; border: none; padding: 0">
        <img src="../../icons/bear_submit.svg" alt="제출" style="cursor: grab" />
      </button>
    </div>
  </form>
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
  cursor: grab;
}
select option:disabled {
  color: lightgray;
}
.amount-wrapper {
  display: flex;
  align-items: center;
  height: 40px;
  /* width: 100%; */
}
.amount-wrapper > input {
  width: calc(100% - 3rem);
  min-width: 100px;
  margin-right: 5px;
}
.unit-text {
  color: gray;
  white-space: nowrap;
}
.error {
  border: 1px solid red !important;
}
</style>
