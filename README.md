<h1 style="display: flex; align-items: center; gap: 12px; font-size: 2rem; font-weight: 700; font-family: 'Segoe UI', sans-serif; margin-bottom: 1rem;">
  <img src="https://raw.githubusercontent.com/KB-Wallet/KB-Vudget/6166e5a454627c7b77152d410af780f14cc52cba/src/icons/bear.svg" alt="Vudget Logo" width="48" height="48" style="vertical-align: middle;" />
  <span>Vudget <span style="font-weight: 400; font-size: 1.2rem;">(Vue.js + budget)</span></span>
</h1>


> ✨ **지금 바로 당신의 소비 유형을 검사하고, 귀여운 곰돌이와 함께 똑똑한 가계부를 시작해보세요!** ✨ <br>
mz세대를 위한 SPTI (소비 성향 검사)와 직관적인 소비 분석, 그리고 깔끔한 사용자 친화적 UI를 제공합니다.
---

## 웹개발팀 요약 소개

|      이승리       |          박상현         |       이재정         |       송민지         |       김민정         |       주진혁         |                                                                                                               
| :--: | :--: | :--: | :--: | :--: | :--: |
|   <img src="https://avatars.githubusercontent.com/u/113532580?v=4" width=100>    |  <img src="https://avatars.githubusercontent.com/u/162774863?v=4" width=100>    |<img src="https://avatars.githubusercontent.com/u/201695929?v=4" width=100>    |<img src="https://avatars.githubusercontent.com/u/203580692?v=4" width=100>    |<img src="https://avatars.githubusercontent.com/u/101929817?v=4" width=100>    |<img src="https://avatars.githubusercontent.com/u/201695758?v=4" width=100>    |
|   [@smilevictory](https://github.com/smilevictory)   |    [@SANGHYUNBBB](https://github.com/SANGHYUNBBB)  | [@Jaejeong Lee](https://github.com/Jaejeong-Lee) |  [@star075](https://github.com/star075)| [@ahddl](https://github.com/ahddl) |[@joojinhyeok](https://github.com/joojinhyeok) |

---
## ✅프로젝트 소개 및 목적

**Vudget**은 사용자의 소비 습관을 재미있고 직관적으로 파악할 수 있도록, <br>
SPTI(Spending Personality Type Indicator) 검사와 함께 예산 설정 및 소비 기록 기능을 제공합니다.

- 메인 화면은 슬라이드 형식으로 구성되어 주요 정보를 빠르게 파악할 수 있습니다.
- 지출 추가 버튼은 사용 흐름을 방해하지 않도록 빠르고 간결한 페이지 이동을 지원합니다.
- 프로필 페이지에서 목표 예산을 설정해 지출 관리 습관 형성에 도움을 줍니다.

이 프로젝트는 **KB IT's Your Life 6기**에서 진행한 Front-end 과정을 마치며,  

지금까지 학습한 내용을 복습하고 적용하는 첫 협업 프로젝트로  

팀 **₩allet**은 함께 **Vue.js**  기반 프로젝트를 기획, 개발, 배포했습니다.

---

## 🔨기술 스택

```
🧩 Frontend
- Vue.js 3 (Composition API)
- Vue Router
- Pinia (상태 관리)

🎨 UI & UX
- CSS3 / Flexbox / Grid
- 반응형 웹 디자인
- Chart.js (파이/막대 차트 시각화)
- 커스텀 일러스트 및 아이콘 디자인

📦 Backend (Mock)
- JSON Server (REST API 시뮬레이션)
- Axios (비동기 HTTP 요청)
- Glitch

🛠 협업 & 버전 관리
- Git / GitHub
- Vercel (프론트엔드 배포)
- Notion / Figma (기획 및 디자인)

```
---
## 웹 사이트 주요 기능
 - 로그인 & 로그아웃 & 회원가입 & 비밀번호 찾기 페이지
 - 일주일간 지출 및 수입 캘린더 -> 메인 페이지
 - 한달 지출 및 수입 시각화 차트 -> 메인 페이지
 - 최신 지출 및 수입 목록 -> 메인 페이지
 - 빠른 추가 버튼 -> 메인 페이지
 - 한달 캘린터 페이지
 - 상세 지출 및 수입 추가 페이지
 - 마이페이지 ( 목표 금액 추가, 회원정보 수정, 프로필 등록)
 - SPTI 검사 (소비 유형 검사) 페이지


---
## 프로젝트 구조
<details>
  <summary><strong>📁 프로젝트 구조 보기</strong></summary>
<pre>
📦src
 ┣ 📂assets
 ┃ ┣ 📜calendar.css  
 ┃ ┣ 📜calendarcard.css  
 ┃ ┣ 📜DailyList.css  
 ┃ ┣ 📜findpw.css  
 ┃ ┣ 📜login.css  
 ┃ ┣ 📜main.css  
 ┃ ┣ 📜register.css  
 ┃ ┣ 📜spti.css  
 ┃ ┣ 📜WritePage.css  
 ┃ ┗ 📜WriteSet.css  
 ┣ 📂components
 ┃ ┣ 📂HistoryPage
 ┃ ┃ ┣ 📜AddList.vue  
 ┃ ┃ ┗ 📜HistoryList.vue  
 ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📜CategoryCard.vue  
 ┃ ┃ ┣ 📜HistorySlide.vue  
 ┃ ┃ ┣ 📜QuickPost.vue  
 ┃ ┃ ┣ 📜ReportCard.vue  
 ┃ ┃ ┣ 📜ReportSlide.vue  
 ┃ ┃ ┣ 📜SliderView.vue  
 ┃ ┃ ┗ 📜WeeklyCalendar.vue  
 ┃ ┣ 📂MyPage
 ┃ ┃ ┗ 📜EditMyPage.vue  
 ┃ ┣ 📂WritePage
 ┃ ┃ ┣ 📜DailyList.vue  
 ┃ ┃ ┗ 📜WriteSet.vue  
 ┃ ┣ 📜CalendarCard.vue  
 ┃ ┣ 📜CategoryCard.vue  
 ┃ ┣ 📜Footer.vue  
 ┃ ┣ 📜Header.vue  
 ┃ ┗ 📜ReportCard.vue  
 ┣ 📂icons
 ┃ ┣ 📜bear.svg  
 ┃ ┣ 📜bear_submit.svg  
 ┃ ┣ 📜calendar.svg  
 ┃ ┣ 📜heart.svg  
 ┃ ┣ 📜history.svg  
 ┃ ┣ 📜profile.svg  
 ┃ ┣ 📜radiobutton.svg  
 ┃ ┣ 📜user.svg  
 ┃ ┣ 📜vudget.svg  
 ┃ ┣ 📜vudget_bear_only.svg  
 ┃ ┣ 📜webintroduce.png  
 ┃ ┣ 📜webintroduce2.png  
 ┃ ┗ 📜welcome.svg  
 ┣ 📂pages
 ┃ ┣ 📂LJJ
 ┃ ┃ ┗ 📜MainPage.vue  
 ┃ ┣ 📜CalendarMain.vue  
 ┃ ┣ 📜EditMyPage.vue  
 ┃ ┣ 📜Findpw.vue  
 ┃ ┣ 📜HistoryPage.vue  
 ┃ ┣ 📜Login.vue  
 ┃ ┣ 📜MainPage.vue  
 ┃ ┣ 📜MyPage.vue  
 ┃ ┣ 📜Register.vue  
 ┃ ┣ 📜Spti.vue  
 ┃ ┗ 📜WritePage.vue  
 ┣ 📂router
 ┃ ┗ 📜index.js  
 ┣ 📂stores
 ┃ ┣ 📜counter.js  
 ┃ ┣ 📜dataStore.js  
 ┃ ┗ 📜user.js  
 ┣ 📂utils
 ┃ ┣ 📜axios.js  
 ┃ ┗ 📜main_cal.js  
 ┣ 📜App.vue  
 ┗ 📜main.js  
</pre>
</details>

### 🎞️플로우 차트
<img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/flowchart_wallet.drawio.png?raw=true">

### 와이어 프레임
<details>
  <summary><strong> 🔔와이어 프레임 보기</strong></summary>
<pre>
<table>
  <tr>
    <td align="center">
      <strong>🔐 로그인 페이지</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/loginpage.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong>🔐 메인 페이지 (화면1)</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mainpage-layout1.png?raw=true" width="500"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>🔐 메인 페이지 (화면2)</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mainpage-layout2.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong>🔐 메인 페이지 (화면3)</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mainpage-layout3.png?raw=true" width="500"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong> 📅 캘린더 페이지</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/calendarpage.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong> ➕ 목록 추가 페이지</strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/addpage.png?raw=true" width="500"/>
    </td>
  </tr>
   <tr>
    <td align="center">
      <strong> ➕ 목록 추가 과정 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/addingpage.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong> ✨ 마이 페이지 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mypage.png?raw=true" width="500"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong> ✨ 마이 페이지 수정 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mypage_edit.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong> ✨ 마이 페이지 수정 완료 알림창 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/mypage_edit_alert.png?raw=true" width="500"/>
    </td>
  </tr>
   <tr>
    <td align="center">
      <strong> 🐥 SPTI 페이지 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/sptipage.png?raw=true" width="500"/>
    </td>
    <td align="center">
      <strong> 🐥 SPTI 페이지 오류 알림 </strong><br/>
      <img src="https://github.com/KB-Wallet/KB-Vudget/blob/main/usecase/sptipage_err_alert.png?raw=true" width="500"/>
    </td>
  </tr>
  
</table>
</pre>
</details>

---

## 시작 가이드

### 1. 레포지토리 클론
git clone https://github.com/KB-Wallet/KB-Vudget.git <br>
cd KB-Vudget

### 2. 의존성 설치
npm install

### 3. json-server 실행 (예: 포트 5001)
npx json-server --watch db.json --port 5001

### 4. Vue 앱 실행 (예: 포트 5173)
npm run dev


---

## 팀원 소개
| 이름 | 역할 | 주요 기여 |
|------|------|-----------|
| 이승리 | 팀장 / Frontend | 프로젝트 기획, UI/UX 디자인, 로그인-회원가입-비밀번호 찾기- SPTI 페이지  |
| 박상현 | Frontend | 프로젝트 기획, UI/UX 디자인|
| 이재정 | Frontend | 프로젝트 기획, UI/UX 디자인, 메인 페이지 - 총지출, 총수입 시각화 요약 |
| 송민지 | Frontend | 프로젝트 기획, UI/UX 디자인, 메인 페이지 - 전체 레이아웃 및 슬라이더, 빠른 내역 추가, 전체 내역 페이지, 헤더/푸터|
| 김민정 | Frontend | 프로젝트 기획, UI/UX 디자인, 캘린더 페이지, 메인페이지 - 캘린더 슬라이더|
| 주진혁 | 팀원 / Frontend |  프로젝트 기획, UI/UX 디자인, 마이페이지 - 회원정보수정 |

## 개선사항 및 소감

### 💌이승리
#### 🧩프로젝트 후기
이번 프로젝트는 처음으로 팀장을 맡아 진행한 협업이었습니다.  
항상 팀원으로 참여해왔기에 리딩하는 역할에 많은 부담도 있었지만, 그만큼 많이 배울 수 있는 시간이었습니다.

그동안은 소규모(4명 내외)의 프로젝트만 진행해왔지만, 이번에는 처음으로 6명이 함께하는 다인원 협업을 경험했습니다.  
인원이 늘어난 만큼 역할 분배, 커뮤니케이션, 병합 등 여러 부분에서 팀장으로서 더 섬세한 조율이 필요하다는 것을 체감했고, 미흡한 점도 많았던 것 같습니다.

기획 단계에서는 팀원 모두가 지금까지 학습한 기술을 최대한 활용할 수 있도록 페이지를 구성했고,  
짧은 5일이라는 기간 동안 실습 위주로 다양한 기능을 구현하고자 했습니다.  
초반에 공통 파일을 함께 작업할 수 있는 구조를 만들었더라면 Git 충돌을 줄일 수 있었을 텐데,  
이 부분을 미처 고려하지 못해 아쉬움이 남습니다.

또한 마지막 병합 과정에서 페이지 간 변수나 상태를 통일하는 과정에서 어려움을 겪으며,  
연결된 파트들끼리 좀 더 긴밀히 협업했으면 좋았겠다는 생각이 들었습니다.

그럼에도 불구하고 모든 팀원들이 적극적으로 의견을 제시하고 맡은 파트를 책임감 있게 완성해주었고,  
서로의 어려움을 함께 해결하며 함께 성장하는 값진 시간을 보냈습니다.

짧은 시간이었지만 소통, 책임감, 실전 개발까지 모두 경험할 수 있었던 정말 소중한 협업이었습니다.  
모든 팀원에게 감사하며, 앞으로도 함께 성장해나가길 기대합니다!

#### ✅ 한 줄 요약

> **처음으로 팀장을 맡아 실전 협업을 이끌며, 함께 성장하고 배운 값진 프로젝트였습니다.**

#### 👍 좋았던 점
- 처음으로 팀장을 맡아 팀 전체의 진행을 리딩해볼 수 있었습니다.
- 학습했던 Vue, Pinia, JSON Server 등을 실제 프로젝트에 적용해볼 수 있었습니다.
- GitHub 협업 방식과 충돌 해결을 실전으로 경험할 수 있었습니다.
- 팀원들과 소통하며 다양한 코드 스타일과 사고방식을 접할 수 있었습니다.
- 적극적인 피드백과 회의를 통해 협업의 재미와 성과를 동시에 경험했습니다.

#### 🥲 아쉬운 점
- 초기 기획 단계에서 전체적인 시간 관리가 조금 더 정밀했으면 좋았을 것 같습니다.
- 팀장으로서 역할 분배나 협업 구조 설계가 미흡했던 부분이 있었습니다.
- 연결된 기능 파트를 맡은 팀원들끼리 초기에 별도의 협업 구조를 마련하지 못했습니다.
- 일정이 촉박해 충분한 코드 리뷰나 리팩토링 시간을 확보하지 못했습니다.
- 백엔드 학습 부재로 인해 데이터 설계가 제한되었고, SQL 기반 DB 연동이 아쉬웠습니다.
- 
#### 🔥 앞으로의 다짐
- 다음에 다시 팀장을 맡게 된다면 보다 성숙한 태도와 구조적인 리딩을 해보고 싶습니다.
- 팀원으로 참여하게 된다면 팀장의 고민을 이해하고, 든든한 팀원이 되겠습니다.
- 다음 프로젝트에서는 코드 리뷰, 협업 구조, 일정 관리에 더 신경 쓰고 싶습니다.
- 백엔드를 학습하여 더욱 정교한 프로젝트를 만들어 보고 싶습니다.

---

### 박상현
#### 🧩 프로젝트 후기
- 웹 페이지 개발이 어떤 식으로 이루어지는지 직접 경험해볼 수 있어서 즐거웠고, 제가 어떤 점들이 부족한 지 깨달을 수 있어서 고마웠던 시간이었습니다. 앞으로를 위한 값진 경험이었습니다.
#### 👍 좋았던 점
- 페이지 하나를 직접 맡아서 디자인부터 기능구현까지 시도해 볼 수 있어서 좋았습니다. 특히 다른 페이지와 변수를 연결하고, 제 페이지가 구현되었을 때 기뻤습니다.
#### 🥲 아쉬운 점
- 협업을 미리 염두해두고 작업을 했었어야했는데, 그러지못해서 동료들과의 작업이 다소 원할하지 못했던 부분들이 있었습니다. 그런 점들이 많이 미안했습니다. 기능구현에 욕심이 많았었는데 개발역량이 부족해서 생각만 하고 구현하지 못했던 기능들이 있는것이 아쉬웠습니다.
---

### 이재정
#### 🧩 프로젝트 후기
- 처음 해보는 프로젝트였지만, 여태까지 쌓아온 프론트엔드 개념을 실제로 적용하고 또 팀원들과 가계부를 실현시키면서 짜릿함을 느낄 수 있었습니다. 제 부족한 점도 팀원들과 의논하면서 더 잘 보완해, 개발자로서의 역량이 크게 성장할 수 있어 중요한 경험이 되었습니다! 팀원들 모두 모두 고마워요!!😍 
#### 👍 좋았던 점
- 혼자서 고민하기엔 막연했던 고비들도 팀원들과 의논하면서 오히려 쉽게 해결되거나 더 나은 결과물을 낼 수 있게 되어서 긍정적인 경험을 많이 할 수 있었습니다.
#### 🥲 아쉬운 점
- 아직 백엔드 부분의 수업을 듣기 전이라 아쉬웠습니다. 나중에 백엔드 기술을 더 익혀서 프로젝트의 기능만이 아니라 구동 시 효율성, 시간 복잡도 개선을 이끌어 내고 싶습니다. 
---

### 송민지
#### 🧩 프로젝트 후기
지난 한 달간 학습한 프론트엔드 기술을 바탕으로, 직접 하나의 웹 서비스를 기획하고 구현하는 프로젝트를 진행하였습니다.
Vue.js를 중심으로 컴포넌트 기반의 UI를 구성하고,
Axios를 활용한 비동기 통신, Pinia를 이용한 상태 관리, json-server를 통한 간단한 DB 연동 등
기본적인 프론트엔드 개발 흐름을 실습해볼 수 있는 기회였습니다.

이번 프로젝트를 통해 데이터를 주고받고 상태를 관리하는 구조를 직접 구현하며,
프론트엔드 개발 전반에 대한 이해도를 높일 수 있었습니다.
또한 팀 단위로 각 페이지를 분담하고, 기능별로 컴포넌트를 조합하여
하나의 웹 애플리케이션으로 통합하는 과정을 처음부터 끝까지 함께 경험해볼 수 있어 의미 있었습니다.

기획부터 구현, 디버깅, 수정까지의 과정을 모두 직접 해보면서
서비스 개발의 전반적인 흐름을 익히고, 실전 감각을 키울 수 있었던 값진 시간이었습니다.

#### 👍 좋았던 점
가장 좋았던 점은 지금까지 배웠던 개념들을 실제로 써보면서 더 깊이 이해하게 되었다는 점입니다.
강의나 실습 수준에서 그쳤던 개념들이, 프로젝트를 하면서
“이 기능이 이런 식으로 연결되는구나”, “이럴 땐 이렇게 상태를 나눠야겠구나” 하는 식으로
실제 개발 맥락 안에서 자연스럽게 체화되었던 순간들이 많았습니다.

또한 협업을 통해 팀원들과 서로 모르는 부분을 채워가며 문제를 해결해 나가는 과정 자체가 매우 즐거웠습니다.
어떤 부분에서 오류가 났는지 같이 디버깅하거나, 한 명이 구현한 기능을 다른 사람이 참고하며 개선하는 등
협업을 통해 서로의 부족한 부분을 채워주는 구조가 자연스럽게 만들어졌고,
이를 통해 프로젝트에 대한 흥미와 개발에 대한 몰입도가 높아졌습니다.

그리고 개발 중간중간 각자 맡은 기능 외에도 다른 부분을 같이 보며 의견을 나누는 과정에서
사용자 경험, UI 흐름, 상태 설계 등에 대해 고민할 기회도 많이 생겼고,
이전에는 그냥 넘겼을 부분들도 한 번 더 이유를 생각해보게 되어 매우 의미 있는 경험이었습니다.

#### 🥲 아쉬운 점
아이디어와 기획을 정리한 뒤 본격적으로 구현을 시작하면서,
각자 맡은 기능을 완성하느라 시간에 쫓기다 보니
통합 과정에서 기능 간 연결이 매끄럽지 않거나,
세부적인 오류가 남아 있는 채로 마무리된 부분들이 있어 아쉬움이 남았습니다.

특히 애니메이션 처리, 입력 유효성 메시지, 반응형 레이아웃 구성 등 사용자 편의 요소들도 시간적인 여유가 부족해 좀 더 다듬고 완성도를 높이지 못한 점이 아쉽게 느껴졌습니다.

그럼에도 불구하고 짧은 기간 동안 다양한 기능을 직접 구현하고,
실제로 동작하는 결과물을 만들어냈다는 점에서 큰 성취감을 느꼈고,
이후 더 발전시켜보고 싶다는 의욕도 함께 얻을 수 있었습니다.

---

### 김민정
#### 🧩 프로젝트 후기
- 3월부터 프론트엔드를 기초부터 공부하며, 배운 내용을 직접 프로젝트에 적용해보았습니다. 새로운 사람들과 함께 협력하면서 프로젝트의 전체적인 흐름과 협업의 중요성도 경험 할 수 있었습니다.
#### 👍 좋았던 점
- 이전에는 막연하게 블로그나 GPT를 참고해 코드를 작성했지만, 이번 프로젝트에서는 기본적인 화면 구성부터 시작해 기능을 하나씩 구현하며 axios 비동기 처리, JSON을 이용한 DB 연동도 직접 해볼 수 있었습니다. 어떻게 코드가 구성되며, 코드 한 줄 한 줄이 어떤 역할을 하는지 이해하면서 작성할 수 있어 좋았습니다. 또한팀원들과 서로 모르는 부분을 공유하고 오류를 함께 해결해 나가며 더 많이 성장할 수 있었습니다.
#### 🥲 아쉬운 점
- 각자의 파트를 잘 구현했음에도 불구하고, 통합 과정에서 시간이 부족해 오류가 발생했습니다. 이를 충분히 수정하지 못해 아쉬움이 남습니다. 또한 프로젝트를 진행하며 제 스스로에게도 아쉬움이 남는 부분이 있었습니다. 좀 더 매끄럽고 배려 있는 소통을 했더라면 어땠을까 하는 생각이 들었고, 공동체 속에서의 소통 방식에 대해 스스로 돌아보는 계기가 되었습니다.
---

### 주진혁
#### 🧩 프로젝트 후기 
- 프로젝트의 기획부터 디자인, 구현까지 팀원들과 함께하며 소통과 협업의 중요성을 느낄 수 있었습니다. 그 과정에서 저의 부족한 부분도 깨닫게 되어, 앞으로 더 성장해야겠다는 동기를 얻은 소중한 경험이었습니다.
#### 👍 좋았던 점 
- 스스로 원하는 기능을 기획하고 구현하는 과정이 즐거웠고, 피그마와 깃허브 등 협업 툴을 자연스럽게 익힐 수 있어 좋은 경험이었습니다. 
#### 🥲 아쉬운 점 
- 처음 기획할 때 구상했던 기능들 중 시간 부족으로 구현하지 못한 부분이 있어 아쉬웠고, 디자인 면에서도 완성도가 부족하다고 느껴 아쉬움이 남습니다.
