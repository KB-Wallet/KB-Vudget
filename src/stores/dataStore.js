import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import instance from '@/utils/axios'

export const useDataStore = defineStore('dataStore', () => {
  //상태
  const usersData = ref([])
  const incomesData = ref([])
  const expensesData = ref([])
  // 액션
  const fetchUsersData = async () => {
    try {
      const response = await instance.get('/users')
      usersData.value = response.data
      // console.log('user데이터값===', usersData.value)
    } catch (err) {
      console.log('데이터 정보 로딩 에러 : ', err)
    }
  }
  const fetchIncomesData = async () => {
    try {
      const response = await instance.get('/incomes')
      incomesData.value = response.data
      // console.log('user데이터값===', usersData.value)
    } catch (err) {
      console.log('데이터 정보 로딩 에러 : ', err)
    }
  }
  const fetchExpensesData = async () => {
    try {
      const response = await instance.get('/expenses')
      expensesData.value = response.data
      // console.log('expenses데이터값===', expensesData.value)
    } catch (err) {
      console.log('데이터 정보 로딩 에러 : ', err)
    }
  }
  // 게터
  // 총지출액
  const totalExpensesAmount = computed(() =>
    expensesData.value.reduce((sum, expenses) => sum + expenses.amount, 0),
  )
  // 특정 userID의 지출만 계산한 총지출액
  const getUserExpensesById = (userId) =>
    expensesData.value.filter((item) => item.userId === userId)
  return {
    usersData,
    incomesData,
    expensesData,
    fetchUsersData,
    fetchIncomesData,
    fetchExpensesData,
    totalExpensesAmount,
    getUserExpensesById,
  }
})
