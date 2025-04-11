<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import dayjs from 'dayjs'
// import AddList from './AddList.vue'

const userId = ref(1)
const selectedMonth = ref(dayjs())
const currentFilter = ref('전체')
const currentPage = ref(1)
const itemsPerPage = 5

const incomes = ref([])
const expenses = ref([])

onMounted(async () => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
      fetch('http://localhost:5001/incomes'),
      fetch('http://localhost:5001/expenses'),
    ])

    incomes.value = await incomeRes.json()
    expenses.value = await expenseRes.json()
  } catch (err) {
    console.error('데이터 로드 실패:', err)
  }
})

const selectedMonthStr = computed(() => selectedMonth.value.format('YYYY-MM'))
const selectedMonthDisplay = computed(() => selectedMonth.value.format('YYYY년 M월'))

const isFirstPage = computed(() => currentPage.value === 1)
const selectedRows = ref([])

const allChecked = computed({
  get: () =>
    selectedRows.value.length === paginatedHistory.value.length &&
    paginatedHistory.value.length > 0,
  set: (value) => {
    selectedRows.value = value ? paginatedHistory.value.map((item) => item.id) : []
  },
})

const monthlyHistory = computed(() => {
  const incomeHistory = incomes.value
    .filter((i) => i.userId === userId.value && i.date.startsWith(selectedMonthStr.value))
    .map((i) => ({ type: '수입', ...i }))

  const expenseHistory = expenses.value
    .filter((e) => e.userId === userId.value && e.date.startsWith(selectedMonthStr.value))
    .map((e) => ({ type: '지출', ...e }))

  return [...incomeHistory, ...expenseHistory].sort((a, b) => new Date(a.date) - new Date(b.date))
})

const filteredHistory = computed(() => {
  if (currentFilter.value === '전체') return monthlyHistory.value
  return monthlyHistory.value.filter((item) => item.type === currentFilter.value)
})

const totalPages = computed(() => Math.ceil(filteredHistory.value.length / itemsPerPage))
const isLastPage = computed(() => currentPage.value === totalPages.value)

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredHistory.value.slice(start, end)
})

const goPrevMonth = () => {
  selectedMonth.value = selectedMonth.value.subtract(1, 'month')
  currentPage.value = 1
}
const goNextMonth = () => {
  selectedMonth.value = selectedMonth.value.add(1, 'month')
  currentPage.value = 1
}
const goPage = (num) => {
  currentPage.value = num
}
const toggleRow = (id) => {
  selectedRows.value = [id]
}
watch(currentFilter, () => {
  selectedRows.value = []
})

const deleteSelectedItems = async () => {
  if (selectedRows.value.length === 0) {
    alert('삭제할 내역을 선택해주세요.')
    return
  }

  const confirmDelete = confirm('선택한 내역을 삭제하시겠습니까?')
  if (!confirmDelete) return

  for (const id of selectedRows.value) {
    const item = monthlyHistory.value.find((item) => item.id === id)
    if (!item) continue

    const url =
      item.type === '수입'
        ? `http://localhost:5001/incomes/${id}`
        : `http://localhost:5001/expenses/${id}`

    try {
      const res = await fetch(url, { method: 'DELETE' })
      if (!res.ok) throw new Error('삭제 실패')

      // 삭제가 성공한 경우, 로컬 데이터도 제거
      if (item.type === '수입') {
        incomes.value = incomes.value.filter((i) => i.id !== id)
      } else {
        expenses.value = expenses.value.filter((e) => e.id !== id)
      }
    } catch (err) {
      console.error('삭제 중 오류 발생:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  selectedRows.value = [] // 선택 초기화
}
</script>

<template>
  <div class="historylist-container">
    <div class="historylist-title">
      <!-- 월 선택 및 이동 -->
      <div class="month-wrapper">
        <i
          class="fa-solid fa-chevron-left"
          :class="{ disabled: isFirstPage }"
          @click="goPrevMonth"
          style="cursor: pointer"
        ></i>
        <!-- 사용자에게는 2025년 4월 형태로 출력, 숨은 값은 v-model 바인딩용 -->
        <span class="month-display">{{ selectedMonthDisplay }}</span>
        <input
          type="month"
          v-model="selectedMonthStr"
          style="opacity: 0; position: absolute; width: 0; height: 0"
        />
        <i
          class="fa-solid fa-chevron-right"
          :class="{ disabled: isLastPage }"
          @click="goNextMonth"
          style="cursor: pointer"
        ></i>
      </div>
      <!-- 필터 버튼 그룹 -->
      <div class="btn-group filter-btn-group" role="group" aria-label="Filter">
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{ active: currentFilter === '전체' }"
          @click="currentFilter = '전체'"
        >
          전체
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{ active: currentFilter === '수입' }"
          @click="currentFilter = '수입'"
        >
          수입
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{ active: currentFilter === '지출' }"
          @click="currentFilter = '지출'"
        >
          지출
        </button>
      </div>

      <button type="button" class="btn addlist-btn">내역 추가</button>
    </div>

    <!-- 리스트 테이블 -->
    <div class="historylist-table">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 30px"><input type="checkbox" v-model="allChecked" /></th>
            <th style="width: 80px">분류</th>
            <th style="width: 130px">날짜</th>
            <th style="width: 120px">카테고리</th>
            <!-- <th style="width: 120px">결제수단</th> -->
            <th style="width: 120px">거래처</th>
            <th style="width: 120px">금액</th>
            <th style="width: 200px">메모</th>
            <!-- <th style="width: 100px"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedHistory" :key="item.id" @click="toggleRow(item.id)">
            <td>
              <input
                type="checkbox"
                :checked="selectedRows.includes(item.id)"
                @click.stop="toggleRow(item.id)"
              />
            </td>
            <td>
              <span :class="item.type === '수입' ? 'income-label' : 'expense-label'">{{
                item.type
              }}</span>
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <!-- <td>{{ item.payment }}</td> -->
            <td>{{ item.vendor }}</td>
            <td>{{ item.amount.toLocaleString() }}원</td>
            <td>{{ item.description }}</td>
            <!-- <td>
              <i class="fa-solid fa-pencil edit-icon"></i>
              <i class="fa-solid fa-trash delete-icon"></i>
            </td> -->
          </tr>
          <!-- 남은 빈 줄 렌더링 (최대 10줄 맞추기) -->
          <tr
            v-for="n in itemsPerPage - paginatedHistory.length"
            :key="'empty-' + n"
            class="empty-row"
          >
            <td colspan="5">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <div class="pagination-container">
        <nav>
          <ul class="pagination">
            <li :class="['page-item', { disabled: isFirstPage }]">
              <a class="page-link" href="#" @click.prevent="!isFirstPage && goPage(currentPage - 1)"
                >&laquo;</a
              >
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              :class="['page-item', { active: currentPage === page }]"
            >
              <a class="page-link" href="#" @click.prevent="goPage(page)">{{ page }}</a>
            </li>
            <li :class="['page-item', { disabled: isLastPage }]">
              <a class="page-link" href="#" @click.prevent="!isLastPage && goPage(currentPage + 1)"
                >&raquo;</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="deletebtn-wrapper">
        <button type="button" class="btn selected-deletebtn" @click="deleteSelectedItems">
          선택 내역 삭제
        </button>
      </div>
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
  align-items: center;
  gap: 50px;
  margin-bottom: 1rem;
}
.month-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
.month-display {
  font-size: 1.5rem;
  font-weight: 600;
}
.hidden-month-input {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
.filter-btn-group .btn {
  min-width: 70px;
  padding: 6px 12px;
  width: 80px;
}
.btn-outline-primary {
  border: 1px solid #ffbc00 !important;
  color: black !important;
  background-color: white !important;
}
.btn-outline-primary:hover,
.btn-outline-primary.active {
  background-color: #ffbc00 !important;
  color: white !important;
  border-color: #ffbc00 !important;
}
.addlist-btn,
.selected-deletebtn {
  border: 1px solid #ffbc00;
  background-color: white;
}
.addlist-btn:hover,
.selected-deletebtn:hover {
  background-color: #ffbc00;
  color: white;
}
.addlist-btn,
.selected-deletebtn {
  margin-left: auto;
}
.historylist-table table {
  width: 100%;
  border-collapse: collapse;
}
.historylist-table th,
.historylist-table td {
  text-align: center;
  padding: 10px;
  white-space: nowrap;
  height: 48px;
}
.table-striped tbody tr {
  background-color: white !important;
}
.income-label {
  background-color: #e6f3ff;
  border: 1px solid #3399ff;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  font-weight: 600;
  line-height: 1.2;
}
.expense-label {
  background-color: #ffeaea;
  border: 1px solid #ff3d3d;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  font-weight: 600;
  line-height: 1.2;
}
.empty-row td {
  border: none;
  background: none;
  height: 48px;
}
.edit-icon {
  margin-right: 10px;
  cursor: pointer;
}
.delete-icon {
  cursor: pointer;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.page-link {
  color: #545045;
  border: none;
  outline: none !important;
  box-shadow: none !important;
}
.page-item.active .page-link {
  font-weight: bold;
  color: black;
  background-color: transparent;
}
.page-link:focus,
.page-link:hover {
  background: none;
  border: none;
  outline: none !important;
  box-shadow: none !important;
}
.page-item.disabled .page-link {
  opacity: 0.4;
  pointer-events: none;
  background: none;
}
.deletebtn-wrapper {
  display: flex;

  justify-content: flex-end;
}
</style>

<!-- <style scoped>
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
  align-items: center;
  gap: 50px;
}
.month-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
.month-display {
  font-size: 1.5rem;
  font-weight: 600;
}
.filter-btn-group .btn {
  min-width: 70px;
  padding: 6px 12px;
  width: 80px;
}
.btn-outline-primary {
  border: 1px solid #ffbc00 !important;
  color: black !important;
  background-color: white !important;
}
.btn-outline-primary:hover,
.btn-outline-primary.active {
  background-color: #ffbc00 !important;
  color: white !important;
  border-color: #ffbc00 !important;
}
.addlist-btn,
.selected-deletebtn {
  border: 1px solid #ffbc00;
  background-color: white;
}
.addlist-btn:hover,
.selected-deletebtn:hover {
  background-color: #ffbc00;
  color: white;
}
.addlist-btn,
.selected-deletebtn {
  margin-left: auto;
}
.historylist-table {
  min-width: 900px;
}
/* 📌 테이블 열 너비 고정 */
.table thead th,
.table tbody td {
  width: 120px;
  white-space: nowrap;
  text-align: center;
}
/* 📌 리스트 행 배경색 고정 (흰색) */
.table-striped tbody tr {
  background-color: white !important;
}
/* 📌 수입 항목 스타일 */
tr td:first-child:has(+ td:contains('수입')) ~ td {
  background-color: #e6f3ff;
  border: 1px solid #3399ff;
}
/* 📌 지출 항목 스타일 */
tr td:first-child:has(+ td:contains('지출')) ~ td {
  background-color: #ffeaea;
  border: 1px solid #ff3d3d;
}
/* 📌 리스트 행 높이 고정 (10개 유지용) */
tbody {
  min-height: 500px;
  display: block;
}
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  height: 50px;
}
tbody:after {
  content: '';
  display: block;
  height: calc(10 * 50px - var(--actual-row-height));
}
.edit-icon {
  margin-right: 10px;
  cursor: pointer;
}
.delete-icon {
  cursor: pointer;
}
.pagination-container {
  display: flex;
  justify-content: center;
}
.page-link {
  color: #545045;
  border: none;
}
.page-item.active .page-link {
  font-weight: bold;
  font-size: 1.2rem;
  color: black;
  background-color: transparent;
}
.page-link:focus,
.page-link:hover {
  color: #000;
  background: none;
  border: none;
}
.page-item.disabled .page-link {
  opacity: 0.4;
  pointer-events: none;
}
.deletebtn-wrapper {
  display: flex;
}
</style> -->

<!-- <style scoped>
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
.month-display {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 10px;
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
.addlist-btn:hover,
.selected-deletebtn:hover {
  background-color: #ffbc00;
  color: white;
}
.option-btncontainer > button:focus,
.addlist-btn:focus,
.selected-deletebtn:focus {
  border: none;
}
.deletebtn-wrapper {
  display: flex;
}
.selected-deletebtn {
  margin-left: auto;
}
.pagination-container {
  display: flex;
  justify-content: center;
}
.page-link {
  color: #545045;
  border: none;
}
/* 이거 active (현재 페이지 디자인 바꾸기) */
.page-item.active .page-link {
  z-index: 1;
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: none;
}
.page-link:focus,
.page-link:hover {
  color: #000;
  background: none;
  border: none;
}
.page-item.disabled .page-link {
  opacity: 0.4;
  pointer-events: none;
}
</style> -->

<!-- pagination, 검색 -->
