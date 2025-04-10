<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import '@/assets/spti.css'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const users = ref([])

const originalQuestions = [
  // P (계획적) vs S (즉흥적)
  { text: '여행을 앞두고 지출 예상 계획을 짜는 편이다', type: 'P' },
  { text: '월말에는 다음 달 소비 계획을 미리 세워두는 편이다', type: 'P' },
  { text: '쇼핑 전에 꼭 필요한 물건인지 리스트를 작성해본다', type: 'P' },
  { text: '오늘 기분이 좋으면 계획에 없던 소비를 하게 된다', type: 'S' },
  { text: '외출했다가 예상치 못한 지출을 한 경험이 자주 있다', type: 'S' },
  { text: '비싼 물건을 사기 전 고민 없이 주문한다', type: 'S' },
  { text: '갑작스러운 수입이 생긴다면 소비 욕구가 올라온다', type: 'S' },

  // C (절제/후회형) vs L (충동/무후회형)
  { text: '충동구매를 한 날, 나의 마음은 후회하는 편이다', type: 'C' },
  { text: '소비한 후에는 꼭 가계부나 기록을 확인하는 편이다', type: 'C' },
  { text: '세일 중이지만 지금 당장 필요 없는 물건이 있다면 구매 충동을 느끼지 않는다', type: 'C' },
  { text: '할인 제품이라면 필요 없어도 한 번쯤 사 본다', type: 'L' },
  { text: '내가 사고 싶은 건 그때그때 바로 사는 편이다', type: 'L' },
  { text: '할인 쿠폰을 보면 필요하지 않은 물건을 산다', type: 'L' },

  // A (저축 중심) vs E (소비 중심)
  { text: '월급이 들어오면 먼저 하고 싶은 건 저축이다', type: 'A' },
  { text: '저축액이 늘어나는 것을 보면 뿌듯함을 느낀다', type: 'A' },
  { text: '월 초에 수입이 들어오면 나는 돈을 주로 저축하고 소비를 시작한다', type: 'A' },
  { text: '지금 쓰지 않으면 나중에 후회할까봐 일단 지른다', type: 'E' },
  { text: '돈은 돌고 도는 것, 지금 즐기는 것이 중요하다', type: 'E' },
  { text: '지출을 통해 스트레스가 해소된다고 느낄 때가 많다', type: 'E' },

  // I (개인 중심) vs F (관계 중심)
  { text: '나 혼자 사용하는 물건에 더 돈을 아끼지 않는다', type: 'I' },
  { text: '나를 위한 선물은 아끼지 않고 자주 한다', type: 'I' },
  { text: '친구와 카페에서 만나면 정확히 n빵 하는 편이다', type: 'I' },
  { text: '모임이나 선물 등 타인을 위한 소비가 많다', type: 'F' },
  { text: '친구나 가족과 함께 쓰는 돈이 기분 좋다', type: 'F' },
  { text: '주변 사람들을 챙기기 위해 예산을 따로 마련해둔다', type: 'F' },
]

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const questions = ref([])
const showResult = ref(false)
const resultType = ref('')
const answers = ref({})
const questionTop = ref(null)

const resultData = {
  PCAI: {
    emoji: '📊💰🧘',
    description: '전략적 절약가 — 계획적이고 절제하며, 저축 중심의 소비를 개인적으로 실천.',
  },
  PCAF: {
    emoji: '📝🤝🏦',
    description:
      '공동체 실속파 — 계획적이고 절제하며, 저축하면서도 가족·지인과의 관계 지출을 선호.',
  },
  PCEI: {
    emoji: '📅💡🎯',
    description: '계획형 소비자 — 계획적이고 절제하지만 경험 중심이며 개인의 만족을 추구.',
  },
  PCEF: {
    emoji: '📋🎁🧑‍🤝‍🧑',
    description:
      '책임감 있는 경험가 — 계획적이며 절제하고, 소비 중심이지만 타인을 위한 소비에 의미를 둠.',
  },
  PLAI: {
    emoji: '🛍️🧠🧘',
    description: '계획적 충동러 — 계획은 하지만 충동구매에도 관대하며, 개인 지향.',
  },
  PLAF: {
    emoji: '🧠💳🤝',
    description: '공감형 지출러 — 계획적이지만 충동도 있으며, 타인과의 지출을 통해 관계를 맺음.',
  },
  PLEI: {
    emoji: '✈️🧠☕',
    description: '균형 잡힌 탐험가 — 계획과 충동 사이, 경험을 추구하고 혼자만의 만족을 중시.',
  },
  PLEF: {
    emoji: '🧠🎉🎨',
    description: '감성 전략가 — 계획도 하고 충동도 즐기며, 관계와 경험을 통해 소비 만족을 추구.',
  },
  SCAI: {
    emoji: '🎯📉📦',
    description: '즉흥 절약파 — 즉흥적이지만 절제하고, 저축 중심의 개인 소비자.',
  },
  SCAF: {
    emoji: '🎈🤝💸',
    description: '실속 있는 YOLO — 즉흥적이지만 절제하며, 관계 중심의 실속 소비자.',
  },
  SCEI: {
    emoji: '🍷📷🔍',
    description: '신중한 개성파 — 즉흥적이고 경험 중심이지만 절제하려 노력하는 개인 중심.',
  },
  SCEF: {
    emoji: '🎨🎁🍷',
    description: '합리적 감성파 — 즉흥적이지만 절제하려 하며, 경험과 관계에서 만족을 찾음.',
  },
  SLAI: {
    emoji: '🔥💳🧃',
    description: '진정한 YOLO — 즉흥적이고 충동적이며, 소비 중심에 개인적 만족을 추구.',
  },
  SLAF: {
    emoji: '🎉🍕🕺',
    description: '파티형 소비자 — 즉흥·충동적이며, 관계를 위한 소비를 즐기는 유형.',
  },
  SLEI: {
    emoji: '✨🎒🎧',
    description: '감각적 탐험가 — 즉흥·충동적이며 경험 중심, 개인 중심으로 만족을 추구.',
  },
  SLEF: {
    emoji: '🛍️🎈👯',
    description: '사회적 플렉서 — 즉흥적이고 충동적이며, 경험과 관계에 돈 쓰는 걸 좋아함.',
  },
}

const submitSPTI = () => {
  const allAnswered = Object.values(answers.value).every((v) => v !== null)
  if (!allAnswered) {
    alert('모든 질문에 응답해주세요!')
    return
  }
  const typeScores = {
    P: 0,
    S: 0,
    C: 0,
    L: 0,
    A: 0,
    E: 0,
    I: 0,
    F: 0,
  }

  questions.value.forEach((q, index) => {
    const key = `q${index + 1}`
    const score = parseInt(answers.value[key])

    if (!isNaN(score)) {
      typeScores[q.type] += score
    }
  })
  const planner = typeScores.P >= typeScores.S ? 'P' : 'S'
  const impulse = typeScores.C >= typeScores.L ? 'C' : 'L'
  const purpose = typeScores.A >= typeScores.E ? 'A' : 'E'
  const social = typeScores.I >= typeScores.F ? 'I' : 'F'

  resultType.value = `${planner}${impulse}${purpose}${social}`

  showResult.value = true
  nextTick(() => {
    questionTop.value?.scrollIntoView({ behavior: 'smooth' })
  })
}
const resetSPTI = () => {
  questions.value.forEach((_, i) => {
    answers.value[`q${i + 1}`] = null
  })
  resultType.value = ''
  showResult.value = false
  nextTick(() => {
    questionTop.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

onMounted(async () => {
  const res = await axios.get('http://localhost:5000/users')
  users.value = res.data

  // 1. 셔플 먼저
  questions.value = shuffleArray(originalQuestions)

  // 2. 셔플된 후 질문 수 기준으로 answers 초기화
  questions.value.forEach((_, i) => {
    answers.value[`q${i + 1}`] = null
  })
})
</script>

<template>
  <div class="container">
    <div class="inner">
      <header class="header">
        <h2>SPTI (Spending Personality Type Indicator)</h2>
        <p>
          🔹 당신의 소비에도 성격이 있다면? <br />
          매달 통장은 텅장이 되고,<br />
          언제, 어디에 돈을 썼는지 기억도 잘 안 나시나요?<br />
          우리는 각자 다른 소비 습관과 성향을 가지고 있어요.<br />
          누군가는 계획적으로, 또 누군가는 기분에 따라 지출하죠.<br />
          <strong>SPTI (Spending Personality Type Indicator)</strong>는<br />
          당신의 소비 패턴을 분석하여<br />
          총 16가지 소비 유형 중 하나로 진단해드립니다.
        </p>
      </header>
      <div class="scrollbox">
        <div class="result-box" v-if="showResult">
          <h3>
            당신의 소비 유형은 <strong>{{ resultType }}</strong
            >입니다 🎯
          </h3>
          <div class="result-emoji">{{ resultData[resultType]?.emoji }}</div>
          <p class="result-desc">
            {{ resultData[resultType]?.description || '해당 유형 설명이 준비 중입니다.' }}
          </p>
          <button @click="resetSPTI" class="reset-btn">다시 검사하기</button>
        </div>
        <section class="fullquestion" ref="questionTop">
          <div class="question" v-for="(question, index) in questions" :key="index">
            <p>Q{{ index + 1 }}. {{ question.text }}</p>
            <div class="radio-group">
              <label class="radio-option" v-for="i in 5" :key="i">
                <input
                  type="radio"
                  :name="`q${index + 1}`"
                  :value="i"
                  v-model="answers[`q${index + 1}`]"
                />
                <span class="custom-radio"></span>
                {{ ['전혀 아니다', '아니다', '보통이다', '그렇다', '매우 그렇다'][i - 1] }}
              </label>
            </div>
          </div>
          <button @click="submitSPTI" class="submit-btn">결과 보기</button>
        </section>
      </div>
    </div>
  </div>
</template>
