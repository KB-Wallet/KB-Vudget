// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import apiClient from '@/utils/axios'

// export const useStore = defineStore('Store', () => {
//   //상태
//   const datas = ref([])
//   // 액션
//   const fetchDatas = async () => {
//     try {
//       const response = await apiClient.get('/db.json')
//     } catch (err) {
//       console.log('데이터 정보 로딩 에러 : ', err)
//     }
//   }
//   // 게터
//   const totalExpenses = computed(() => datas.expenses.value)
// })
