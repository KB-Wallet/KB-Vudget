<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import dayjs from 'dayjs'
import '@vuepic/vue-datepicker/dist/main.css'

// 유저 정보 불러오기
const users = ref({})
onMounted(async () => {
  try {
    const response = await axios.get('https://vudget.glitch.me/users/1')
    users.value = response.data
  } catch (error) {
    console.error('데이터 불러오기 실패:', error)
  }
})

// 선택된 타입 (지출 or 수입)
const selectedType = ref('expense')

// 새로 추가할 내역 객체
const newRecordItem = ref({
  amount: 0,
  date: new Date(),
  category: '',
  description: '',
  payment: '',
  vendor: '',
})

// 유효성 검사용
const fieldErrors = ref({
  category: false,
  vendor: false,
  amount: false,
})

// 타입 변경 시 카테고리 초기화
watch(selectedType, () => {
  newRecordItem.value.category = ''
})

// 필터링된 카테고리
const filteredCategories = computed(() => {
  const user = users.value
  if (!user || !user.categories) return []
  return user.categories.filter((cat) => cat.type === selectedType.value)
})

// 금액 입력 포맷
const formattedAmount = computed(() => newRecordItem.value.amount.toLocaleString('ko-KR'))
const onAmountInput = (e) => {
  const digits = e.target.value.replace(/[^0-9]/g, '')
  newRecordItem.value.amount = parseInt(digits || '0')
}

// 제출 핸들러
const handleSubmit = async () => {
  // 유효성 체크
  fieldErrors.value.category = !newRecordItem.value.category
  fieldErrors.value.vendor = !newRecordItem.value.vendor.trim()
  fieldErrors.value.amount = !newRecordItem.value.amount

  const hasError = Object.values(fieldErrors.value).some((v) => v)
  if (hasError) {
    console.log('🚨 입력값 오류 발생')
    return
  }

  // const payload = {
  //   ...newRecordItem.value,
  //   type: selectedType.value,
  //   userId: 1,
  //   date: new Date().toISOString(),
  // }

  const endpoint =
    selectedType.value === 'expense'
      ? 'https://vudget.glitch.me/expenses'
      : 'https://vudget.glitch.me/incomes'

  // ✅ 기존 내역들 불러와서 id 계산
  const { data: existingRecords } = await axios.get(endpoint)
  const maxId = Math.max(...existingRecords.map((item) => Number(item.id) || 0))
  const newId = (maxId + 1).toString()

  const payload = {
    id: newId, // 기존 ID + 1
    userId: 1,
    amount: newRecordItem.value.amount,
    date: dayjs(newRecordItem.value.date).format('YYYY-MM-DD'), // YYYY-MM-DD로 저장
    category: newRecordItem.value.category,
    description: newRecordItem.value.description,
    payment: newRecordItem.value.payment,
    vendor: newRecordItem.value.vendor,
  }

  try {
    await axios.post(endpoint, payload)

    alert('저장이 완료되었습니다!')
    console.log(`💾 ${selectedType.value} 저장됨:`, payload)
  } catch (error) {
    console.error('데이터 저장 실패:', error)
  }

  // 폼 초기화
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
            teleport="body"
            placeholder="날짜 선택"
            :format="
              (date) =>
                date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : ''
            "
          />

          <select
            v-model="newRecordItem.category"
            class="form-select category"
            :class="{ error: fieldErrors.category }"
            style="width: 210px"
          >
            <option disabled value="">카테고리</option>
            <option
              v-for="category in filteredCategories"
              :key="category.name"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="input-container">
          <label for="vendor">{{ selectedType === 'expense' ? '지출 장소' : '수입원' }}</label>
          <input
            type="text"
            v-model="newRecordItem.vendor"
            :class="{ error: fieldErrors.vendor }"
            id="vendor"
          />
        </div>

        <div class="input-container">
          <label for="amount">금액</label>
          <div class="amount-wrapper">
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
          <input type="text" v-model="newRecordItem.description" id="description" />
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
  justify-content: space-between;
  gap: 30px;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  overflow: visible;
}

.typebtn-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-shrink: 0;
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
  gap: 20px;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 0;
}

.quickpost-container ::v-deep(.dp__menu) {
  z-index: 9999 !important;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 0;
  min-width: 0;
}

.input-container > input,
.amount-wrapper > input,
select {
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 5px 15px;
  width: 100%;
  box-sizing: border-box;
}

.amount-wrapper {
  display: flex;
  align-items: center;
  height: 40px;
}

.amount-wrapper > input {
  flex: 1;
  margin-right: 5px;
}

.unit-text {
  color: gray;
  white-space: nowrap;
}

.post-btn {
  cursor: grab;
  flex-shrink: 0;
}

select option:disabled {
  color: lightgray;
}

.error {
  border: 1px solid red !important;
}
</style>
