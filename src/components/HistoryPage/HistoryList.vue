<script setup>
import db from '@/../db.json'
import { ref, onMounted, computed } from 'vue'

onMounted(() => {
  console.log(db)
})

const userId = ref(1)
const selectedMonth = ref('2025-03')

// 해당 내역의 날짜가 선택된 월에 속하는지 확인하는
const isInMonth = (dateStr, monthStr) => {
  return dateStr.startsWith(monthStr)
}

// 월별 내역 가져오기
const monthlyHistory = computed(() => {
  const incomeHistory = db.incomes
    .filter((i) => i.userId === userId.value && isInMonth(i.date, selectedMonth.value))
    .map((i) => ({
      type: '수입',
      ...i,
    }))

  const expenseHistory = db.expenses
    .filter((e) => e.userId === userId.value && isInMonth(e.date, selectedMonth.value))
    .map((e) => ({
      type: '지출',
      ...e,
    }))

  // 날짜순 정렬
  return [...incomeHistory, ...expenseHistory].sort((a, b) => new Date(a.date) - new Date(b.date))
})
</script>

<template>
  <div class="historylist-container">
    <div class="historylist-title">
      <div class="month-wrapper">
        <i class="fa-solid fa-chevron-left" style="cursor: pointer"></i>
        <h1>4월</h1>
        <i class="fa-solid fa-chevron-right" style="cursor: pointer"></i>
      </div>
      <div class="option-btncontainer">
        <button type="button" class="btn">내역 전체 보기</button>
        <button type="button" class="btn">카테고리별 보기</button>
      </div>
      <button type="button" class="btn addlist-btn">내역 추가</button>
    </div>
    <div class="historylist-table">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>분류</th>
            <th>날짜</th>
            <th>카테고리</th>
            <th>결제수단</th>
            <th>거래처</th>
            <th>금액</th>
            <th>메모</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in monthlyHistory" :key="index">
            <td><input type="checkbox" /></td>
            <td>{{ item.type }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.payment }}</td>
            <td>{{ item.vendor }}</td>
            <td>{{ item.amount.toLocaleString() }}원</td>
            <td>{{ item.description }}</td>
            <td>
              <i class="fa-solid fa-pencil"></i>
              <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
        <!-- <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>지출</td>
            <td>2020-02-02</td>
            <td>식비</td>
            <td>카드</td>
            <td>김밥천국</td>
            <td>3000원</td>
            <td>김밥 맛있다</td>
            <td>
              <i class="fa-solid fa-pencil"></i>
              <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody> -->
      </table>
      <button type="button" class="btn selected-deletebtn">선택 내역 삭제</button>
    </div>
  </div>
</template>

<style scoped>
.historylist-container {
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px 30px;
  min-width: 1200px;
}
.historylist-title {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  /* justify-content: space-between; */
  align-items: center;
  gap: 50px;
}
.historylist-table {
  min-width: 900px;
}
.month-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  flex: 1;
  min-width: 180px;
}
.month-wrapper > h1 {
  font-size: 3rem;
}
/* .month-wrapper > i {
  width: 1.5rem;
} */
.option-btncontainer {
  display: flex;
  flex: 5;
  gap: 20px;
}
.option-btncontainer > button,
.addlist-btn,
.selected-deletebtn {
  border: 1px solid #ffbc00;
  background-color: white;
}
.option-btncontainer > button:hover,
.addlist-btn:hover .selected-deletebtn:hover {
  background-color: #ffbc00;
  color: white;
}
.option-btncontainer > button:focus,
.addlist-btn:focus,
.selected-deletebtn:focus {
  border: none;
}
.selected-deletebtn {
  align-self: flex-end;
}
</style>

<!-- pagination, 검색 -->
