<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import defaultProfile from '@/icons/user.svg'
const router = useRouter()
const isModalOpen = ref(false)
const user = ref(null)
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5001/users/1')
    user.value = response.data
  } catch (error) {
    console.error('유저 정보 불러오기 실패:', error)
  }
})
function logout() {
  alert('로그아웃 되었습니다.')
  router.push('/mainpage')
}
function openImage() {
  isModalOpen.value = true
}
function closeImage() {
  isModalOpen.value = false
}
</script>
<template>
  <div v-if="user" class="mypage-container">
    <div class="mypage-Lcontainer">
      <div class="profile-container">
        <h2 class="page-title">마이페이지</h2>
        <div class="profile-left">
          <img
            :src="user.profileImg || defaultProfile"
            alt="프로필"
            class="profile-img"
            @click="openImage"
          />
        </div>
        <div class="profile-right">
          <p>
            <span class="label">이름:</span><span class="value">{{ user.username }}</span>
          </p>
          <p>
            <span class="label">이메일:</span><span class="value">{{ user.email }}</span>
          </p>
          <p>
            <span class="label">목표예산:</span
            ><span class="value">{{ user.targetBudget.toLocaleString() }}원</span>
          </p>
          <p><span class="label">투자성향:</span><span class="value">쇼핑왕</span></p>
        </div>
      </div>
    </div>
    <div class="mypage-Rcontainer">
      <router-link to="/editmypage" class="link">회원정보수정</router-link>
      <router-link to="/editmypage" class="link">소비 유형 검사</router-link>
      <button class="logout-btn" @click="logout">로그아웃</button>
    </div>
    <div :class="['modal-overlay', { active: isModalOpen }]" @click="closeImage">
      <div class="modal-content" @click.stop>
        <img :src="user.profileImg || defaultProfile" alt="확대된 프로필" />
      </div>
    </div>
  </div>
  <div v-else>유저 정보를 불러오는 중입니다..</div>
</template>
<style scoped>
.mypage-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
}
.mypage-Lcontainer {
  display: flex;
  width: 75%;
  border: 1px solid lightgray;
  border-radius: 20px;
  overflow: hidden;
  flex-wrap: wrap;
  padding: 150px 0;
}
h2 {
  padding: 30px;
}
.profile-img {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.profile-img:hover {
  transform: scale(1.05);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  z-index: 1000;
}

.modal-overlay.active {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 50%;
}

.modal-content img {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 50%;
}

.mypage-Rcontainer {
  border: none;
  background-color: #ffbc00;
  display: flex;
  flex-direction: column;
  width: 20%;
  border-radius: 20px;
  position: relative;
}
.label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.value {
  display: inline-block;
  margin-left: 100px;
}
.profile-container {
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 40px;
  padding-top: 80px;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.profile-left {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
}
.profile-right {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 20px;
  font-weight: bold;
  padding-left: 20px;
  min-width: 300px;
}
.page-title {
  position: absolute;
  top: -80px;
  left: 30px;
  margin: 0;
  font-size: 2rem;
}
.profile-container > div:first-child {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}
.profile-container > div:last-child {
  padding: 20px;
  display: flex;
  flex: 3;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  font-size: 1.4rem;
  gap: 20px;
  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-left: 0;
  padding-left: 20px;
}
.profile-container > div > img {
  width: 250px;
}
.link {
  text-decoration: none;
  color: white;
  font-size: 2rem;
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid white;
}
.logout-btn {
  padding: 20px;
  position: absolute;
  bottom: 0;
  border: none;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
}
.link:hover,
.logout-btn:hover {
  color: brown;
  cursor: pointer;
}
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
  }
  .profile-left,
  .profile-right {
    flex: none;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
  .profile-right {
    padding-left: 0;
  }
  .label,
  .value {
    display: inline-block;
    text-align: left;
    margin: 5px;
  }
  .label {
    width: 80px;
    text-align: right;
  }
}
@media (max-width: 1200px) {
  .mypage-container {
    flex-direction: column;
    align-items: center;
  }
  .mypage-Lcontainer,
  .mypage-Rcontainer {
    width: 100%;
    margin-top: 20px;
  }
  .mypage-Rcontainer {
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    height: auto;
    position: static;
  }
  .logout-btn {
    position: static;
    transform: none;
    font-size: 1rem;
  }
  .link {
    border-bottom: none;
    font-size: 1rem;
  }
}
.link:hover,
.logout-btn:hover {
  color: brown;
}
</style>
