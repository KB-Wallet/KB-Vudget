<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h2 class="calendar-year">{{ currentYear }}년</h2>
      <h2 class="calendar-month">{{ currentMonth + 1 }}월</h2>
      <button @click="changeMonth(-1)">&lt;</button>
      <button @click="changeMonth(1)">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="day-header">
        {{ day }}
      </div>

      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="day-cell"
        :class="{ inactive: day.inactive, today: day.isToday }"
        @click="handleDayClick(day)"
      >
        <div class="day-number">{{ day.date.getDate() }}</div>
        <ul class="notes">
          <li v-for="(note, i) in day.notes" :key="i">• {{ note }}</li>
        </ul>
      </div>
    </div>

    <!-- 날짜 상세 모달 -->
    <div
      v-if="selectedDay"
      class="modal-overlay"
      @click.self="selectedDay = null"
    >
      <div class="modal-content">
        <button class="close-btn" @click="selectedDay = null">닫기</button>
        <h3>{{ formatDate(selectedDay.date) }}</h3>
        <ul>
          <li v-for="(note, i) in selectedDay.notes" :key="i">• {{ note }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "@/assets/calendar.css";

const today = new Date();
const currentDate = ref(new Date());
const selectedDay = ref(null);

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const days = [];

  // 이전 달 공백
  for (let i = 0; i < startWeekDay; i++) {
    const prevDate = new Date(year, month, i - startWeekDay + 1);
    days.push({ date: prevDate, notes: [], inactive: true, isToday: false });
  }

  // 현재 달
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === today.toDateString();
    days.push({
      date,
      notes: ["예시 일정", "메모1"],
      inactive: false,
      isToday,
    });
  }

  // 다음 달 공백 (총 셀이 42개가 되도록)
  while (days.length % 7 !== 0) {
    const nextDate = new Date(
      year,
      month,
      totalDays + (days.length - startWeekDay - totalDays) + 1
    );
    days.push({ date: nextDate, notes: [], inactive: true, isToday: false });
  }

  return days;
}

const calendarDays = computed(() =>
  getMonthDays(currentYear.value, currentMonth.value)
);

function changeMonth(delta) {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + delta);
  currentDate.value = newDate;
}

function handleDayClick(day) {
  if (day.inactive) return;
  selectedDay.value = day;
}

function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
</script>

<style scoped></style>
