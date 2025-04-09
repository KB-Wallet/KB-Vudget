<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl w-80 relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-black text-sm"
      >
        닫기
      </button>

      <h3 class="text-lg font-semibold mb-4">{{ formatDate(day.date) }}</h3>
      <ul class="text-sm space-y-2">
        <li v-for="(note, i) in day.notes" :key="i" class="text-gray-700">
          • {{ note }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["day"]);

function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
</script>
