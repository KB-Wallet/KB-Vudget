import axios from 'axios'

// axios 인스턴스 분리
// 공통된 설정을 한곳에서 처리 가능
const instance = axios.create({
  baseURL: 'http://localhost:5001',

  // 서버 응답이 없을때 대기하는 시간 설정
  timeout: 5000,
})

export default instance
