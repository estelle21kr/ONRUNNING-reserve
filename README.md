# 🏃 ON RUNNING - 서울 러닝 커뮤니티 플랫폼

> **런닝 크루를 찾고, 예약하고, 함께 달리자!**
> 
> 지도 기반 실시간 러닝 크루 매칭 웹 애플리케이션

---

## 📱 프로젝트 소개

**ON RUNNING**은 서울 지역의 러닝 크루들을 쉽게 찾고 참여할 수 있는 플랫폼입니다. 
카카오맵 API를 활용한 위치 기반 검색, 간편한 예약 시스템, 그리고 커뮤니티 기능으로 
혼자가 아닌 함께하는 러닝 경험을 제공합니다.

### 🎯 핵심 기능

#### 1️⃣ **메인 페이지 - 지도 기반 크루 검색** 
**파일**: `main.html` / `main.js` / `main.css`
- 🗺️ 카카오맵 통합으로 서울 전역의 러닝 크루 시각화
- 📍 실시간 위치 기반 검색 (현재 위치 자동 감지)
- 🔍 다양한 정렬 옵션
  - 근처순 (거리순)
  - 페이스순 (난이도)
  - 거리순 (러닝 거리)
  - 날짜순
  - 내 예약 확인
- 🏃 슬라이드 패널에서 크루 상세 정보 확인
- 📍 주소 검색 및 지도 이동 기능



## 🎯 핵심 기능 > 1️⃣ 메인 페이지 
<img src="./screenshot/main_page1.png" width="700" height="370">
<img src="./screenshot/main_page2.png" width="700" height="370">
<img src="./screenshot/main_page3.png" width="700" height="370">
<img src="./screenshot/main_page4.png" width="700" height="370">
<img src="./screenshot/main_page5.png" width="700" height="370">


---

#### 2️⃣ **크루 상세 페이지 - 예약 시스템**
**파일**: `explanation.html` / `explanation.js` / `reserve.html` / `reserve.js`

**예약 전 확인 페이지**:
- 🖼️ 이미지 슬라이더 (크루 사진)
- 📅 일정별 세부 정보 (날짜, 시간, 난이도)
- 📍 출발지/도착지 정보 (클릭 시 카카오맵 연동)
- ❤️ 북마크 기능 (로그인 시 저장)
- 🔗 공유 기능 (URL 복사)

**예약 완료 페이지**:
- ✅ 사용자 정보 자동 채우기 (로그인 시)
- 📝 약관 동의
- 📧 EmailJS를 통한 예약 확인 메일 자동 발송
- 🔄 크루 인원수 실시간 업데이트



## 🎯 핵심 기능 > 2️⃣ 예약 시스템
### [해당 런닝 크루에 관한 설명]
<img src="./screenshot/explanation1.png" width="700" height="370">
<img src="./screenshot/explanation3.png" width="700" height="370">
<img src="./screenshot/explanation2.png" width="700" height="370">

하나의 js를 사용하여, 구글 시트 API를 받아와 런닝 크루 정보 변경
<img src="./screenshot/crewlist1.png" width="700" height="370">

### [회원/비회원 예약창]
<img src="./screenshot/reserve1.png" width="700" height="370">
<img src="./screenshot/reserve2.png" width="700" height="370">

회원은 마이페이지의 기본 정보가 자동으로 입력되어 수정 불가능

예약 정보는 구글 시트 API를 받아와 저장 가능
<img src="./screenshot/reservations.png" width="700" height="370">



### [예약 완료 확인 이메일]
<img src="./screenshot/mypage6.png" width="700" height="370">

### [예약 취소 확인 이메일]
<img src="./screenshot/mypage7.png" width="700" height="370">

---

#### 3️⃣ **마이페이지 - 사용자 프로필 & 통계**
**파일**: `userpage.html` / `userpage.js` / `userprofile.html` / `userprofile.js`

**프로필 정보**:
- 👤 사용자 정보 및 멤버십 카드
- 📊 러닝 통계
  - 총 러닝 횟수
  - 누적 거리
  - 예정된 러닝 개수
- 🎫 스탐프 시스템 (10개 모두 수집 가능)
- ⭐ 북마크 관리 (저장한 크루 목록)

**스탐프/북마크 모달**:
- 🎯 동적 모달 UI
- 🔐 로그인 제한 (비로그인 시 로그인 페이지로 이동)
- 📱 반응형 그리드 레이아웃



## 🎯 핵심 기능 > 3️⃣ 마이페이지 아래에 이미지 추가
### [마이페이지 프로필]
<img src="./screenshot/mypage1.png" width="700" height="370">

### [스탬프 시스템]
<img src="./screenshot/mypage2.png" width="700" height="370">

### [북마크 관리]
<img src="./screenshot/mypage3.png" width="700" height="370">

### [회원 예약확인]
<img src="./screenshot/mypage4.png" width="700" height="370">
<img src="./screenshot/mypage5.png" width="700" height="370">

### [비회원 예약확인]
<img src="./screenshot/check1.png" width="700" height="370">
---

#### 4️⃣ **커뮤니티 페이지 - ON CREW, ON GEAR, ON PROGRAM**
**파일**: `oncrew.html`, `oncrew.js` / `ongear.html`, `ongear.js` / `onprogram.html`, `onprogram.js` / `runtogetherseoul.js`, `runtogetherseoul.js`

**ON CREW** - 러닝 크루 소개:
- 👥 러너 프로필 카드 (헤드, 버디)
- 📸 이미지 모달
- 🖱️ 수평 스크롤 (포인터 드래그)

**ON GEAR** - 제품 추천:
- 👟 남녀 별 러닝화 카테고리
- 💰 가격 정보
- 🔗 ON 공식 쇼핑 연동
- 🎮 3D 마우스 트래킹 효과 (호버 시 제품 움직임)
- 🎯 Intersection Observer로 동적 로딩

**ON PROGRAM** - 특별 프로그램:
- 🗺️ 카카오맵 통합
- 🔍 위치 기반 프로그램 검색
- 🏷️ 필터링 (근처, 날짜, 거리)
- ⭐ 북마크 기능



## 🎯 핵심 기능 > 4️⃣ 커뮤니티
### [ON CREW 페이지]
<img src="./screenshot/oncrew1.png" width="700" height="370">
<img src="./screenshot/oncrew2.png" width="700" height="370">

### [ON GEAR 페이지]
<img src="./screenshot/ongear1.png" width="700" height="370">
<img src="./screenshot/ongear2.png" width="700" height="370">

### [ON PROGRAM 페이지]
<img src="./screenshot/onprogram1.png" width="700" height="370">
<img src="./screenshot/onprogram2.png" width="700" height="370">

### [RUNTOGETHER 페이지]
<img src="./screenshot/runtogetherseoul1.png" width="700" height="370">
<img src="./screenshot/runtogetherseoul2.png" width="700" height="370">

---

#### 5️⃣ **추가 기능**
**파일**: `QnA.html` / `QnA.js`, `contact.html` / `contact.js`, `check.html` / `check.js`

**QnA/FAQ 페이지**:
- ❓ 아코디언 형식의 FAQ
- 📝 사용자 질문 등록 (비밀번호 보호)
- 🔐 관리자 로그인 (비밀번호 1234)
- 💬 답변 작성 및 관리
- 📄 페이지네이션

**Contact 페이지**:
- 📧 문의 양식
- 📍 주소 정보
- 🤝 SNS 링크 (Instagram, X, YouTube)

**Check 페이지**:
- ✅ 예약 확인 페이지
- 🔍 예약 코드 검증



## 🎯 핵심 기능 > 5️⃣ 추가 기능 아래에 이미지 추가
### [QnA 페이지]
<img src="./screenshot/qna1.png" width="700" height="370">
<img src="./screenshot/qna2.png" width="700" height="370">
<img src="./screenshot/qna3.png" width="700" height="370">

관리자모드로 입성시 모든 질문에 대한 답변 가능, 비밀번호 없이도 비공개 질문 확인 가능
<img src="./screenshot/qna4.png" width="700" height="370">
<img src="./screenshot/qna5.png" width="700" height="370">

등록된 질문 정보는 구글 시트 API를 받아와 저장 가능
<img src="./screenshot/questions1.png" width="700" height="370">


### [Contact 페이지]
<img src="./screenshot/contact1.png" width="700" height="370">
---

#### 6️⃣ **사용자 인증 시스템**
**파일**: `login.html` / `login.js`, `createAccount.html` / `createAccount.js`

**로그인**:
- 📧 이메일/비밀번호 로그인
- ✨ 텍스트 애니메이션 효과 (login-textanimation.js)
- 💾 sessionStorage 활용한 세션 관리

**회원가입**:
- ✍️ 사용자 정보 입력
- 🔐 비밀번호 유효성 검사 (8자 이상)
- 📋 로컬스토리지 기반 사용자 DB 관리



## 🎯 핵심 기능 > 6️⃣ 사용자 인증 아래에 이미지 추가
### [로그인 페이지]
<img src="./screenshot/login1.png" width="700" height="370">

### [회원가입 페이지]
<img src="./screenshot/createaccount1.png" width="700" height="370">
---

## 🛠️ 기술 스택

### 프론트엔드
| 기술 | 용도 |
|------|------|
| **HTML5** | 시맨틱 마크업 |
| **CSS3** | 반응형 디자인, Flexbox/Grid, 애니메이션 |
| **JavaScript (ES6+)** | 상태 관리, 동적 UI 렌더링, 이벤트 처리 |

### 외부 API & 라이브러리
| API/라이브러리 | 기능 |
|------|------|
| **Kakao Maps SDK** | 지도 표시, 위치 검색, 마커 표시 |
| **Daum 우편번호 API** | 주소 검색 및 좌표 변환 |
| **EmailJS** | 예약 확인 이메일 자동 발송 |
| **SheetBest API** | Google Sheet 데이터 연동 |

### 데이터 저장소
| 저장소 | 용도 |
|------|------|
| **sessionStorage** | 로그인 정보 (현재 세션) |
| **localStorage** | 북마크, 스탐프, 사용자 데이터 |
| **Google Sheets** | 크루 정보, 예약 데이터, QnA 관리 |

---

## 📁 프로젝트 구조

```
/ONRUNNING-project
├── main/                          # 메인 페이지 (지도, 크루 검색)
│   ├── main.html
│   ├── main.css
│   └── main.js
│
├── reserve/                       # 예약 시스템
│   ├── reserve.html              # 예약 페이지
│   ├── reserve.css
│   ├── reserve.js
│   ├── reserve_done.html          # 예약 완료 페이지
│   └── reserve_done.css
│
├── explanation/                   # 크루 상세 정보
│   ├── explanation.html
│   ├── explanation.css
│   └── explanation.js
│
├── mypage/                        # 마이페이지
│   ├── userpage.html              # 프로필 & 통계
│   ├── userprofile.html           # 프로필 수정
│   ├── coming_running_page.html   # 예정된 러닝
│   ├── my_running_page.html       # 지난 러닝
│   ├── mycard.html                # 멤버십 카드
│   └── mypagestyle/               # CSS 파일들
│       ├── userpage.css
│       ├── userprofile.css
│       ├── coming_running_page.css
│       └── my_running_page.css
│
├── onCrew/                        # 커뮤니티 - 크루 소개
│   ├── oncrew.html
│   ├── oncrew.css
│   └── oncrew.js
│
├── onGear/                        # 커뮤니티 - 제품 추천
│   ├── ongear.html
│   ├── ongear.css
│   ├── ongear.js
│   └── onGearImage/               # 제품 이미지
│
├── onProgram/                     # 커뮤니티 - 특별 프로그램
│   ├── onprogram.html
│   ├── onprogram.css
│   └── onprogram.js
│
├── runTogetherSeoul/              # 런투게더 서울 소개
│   ├── runtogetherseoul.html
│   ├── runtogetherseoul.css
│   └── runtogetherseoul.js
│
├── QnA/                           # QnA/FAQ
│   ├── QnA.html
│   ├── QnA.css
│   └── QnA.js
│
├── contact/                       # 연락처
│   ├── contact.html
│   ├── contact.css
│   └── contact.js
│
├── check/                         # 예약 확인
│   ├── check.html
│   ├── check.css
│   └── check.js
│
├── userauth/                      # 인증 시스템
│   ├── login.html
│   ├── createAccount.html
│   └── userAuthStyle/
│       ├── login.css
│       └── createAccount.css
│   └── userAuthSrc/
│       ├── login.js
│       ├── login-textanimation.js
│       ├── login-utils.js
│       └── createAccount.js
│
├── common/                        # 공통 리소스
│   ├── header.html
│   ├── header.css
│   ├── header.js
│   └── font.css
│
├── assets/
│   ├── images/                    # 이미지 파일
│   └── videos/                    # 비디오 파일
│
└── docs/
    └── guideline.html             # 스타일 가이드
```

---

## 🚀 주요 기술 구현

### 1. **카카오맵 API 활용**
```javascript
// 비동기 SDK 로드
const loadKakaoMapSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APIKEY}&libraries=services,clusterer,drawing&autoload=false`;
    script.onload = () => kakao.maps.load(resolve);
    document.head.appendChild(script);
  });
};

// 지도 초기화
const initMap = () => {
  const map = new kakao.maps.Map(mapContainer, {
    center: new kakao.maps.LatLng(userLat, userLng),
    level: 5,
    draggable: false
  });
};
```

### 2. **실시간 거리 계산 (Haversine 공식)**
```javascript
const calcDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
```

### 3. **LocalStorage 기반 북마크 시스템**
```javascript
const toggleBookmark = (crewItem) => {
  let bookmarkedIds = JSON.parse(localStorage.getItem(STORAGE_ID_KEY));
  
  if (bookmarkedIds.includes(crewItem.id)) {
    // 북마크 제거
    bookmarkedIds = bookmarkedIds.filter(id => id !== crewItem.id);
  } else {
    // 북마크 추가
    bookmarkedIds.push(crewItem.id);
  }
  
  localStorage.setItem(STORAGE_ID_KEY, JSON.stringify(bookmarkedIds));
};
```

### 4. **이미지 슬라이더 (자동 반복)**
```javascript
const showSlide = (index) => {
  slider.style.transform = `translateX(${-index * 100}%)`;
  currentIndex = index;
  
  // 무한 루프
  if (index >= totalSlides) {
    setTimeout(() => {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-100%)`;
      currentIndex = 1;
    }, 500);
  }
};

// 6초마다 자동 전환
const autoSlide = setInterval(() => {
  showSlide(currentIndex + 1);
}, 6000);
```

### 5. **3D 마우스 트래킹 (ON GEAR 페이지)**
```javascript
card.addEventListener('pointermove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const rotX = (y - rect.height / 2) / 10;
  const rotY = (x - rect.width / 2) / 10;
  
  img.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
});
```

### 6. **동적 모달 관리**
```javascript
const openStampModal = () => {
  if (!isLoggedIn) {
    showCustomToast('로그인이 필요합니다.');
    return;
  }
  
  renderStampModal();
  elStampModalOverlay.classList.add('active');
};

const closeStampModal = () => {
  elStampModalOverlay.classList.remove('active');
};
```

### 7. **EmailJS 연동**
```javascript
// 예약 완료 시 이메일 자동 발송
await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
  name: fullName,
  replyto: email,
  toemail: email,
  crewname: selectedCrew.name,
  schedule: selectedCrew.schedule,
  location: selectedCrew.location
});
```

---

## 📊 API 데이터 구조

### Google Sheet API (SheetBest)
```javascript
// 크루 정보 구조
{
  id: "CREW001",
  name: "RUN TOGETHER SEOUL",
  schedule: "2025.01.15 09:30",
  location: "여의도 공원",
  distance: "5.5",
  time: "40",
  pace: "6'30\"",
  level: "초급",
  remain: 12,
  lat: "37.5300",
  lng: "126.9244",
  image: "image_url1, image_url2",
  departure: "여의도 한강공원 입구",
  destination: "여의도 공원 끝점"
}

// 예약 정보 구조
{
  timestamp: "2025-01-10 14:30",
  crewid: "CREW001",
  lastname: "김",
  firstname: "철수",
  email: "kim@example.com"
}
```

---

## 🎨 주요 UI/UX 특징

### ✨ 인터랙티브 요소
- **슬라이드 패널**: 부드러운 애니메이션으로 정보 표시
- **스크롤 진행도**: 페이지 스크롤 위치 시각화
- **호버 효과**: 3D 변환, 그림자 효과
- **로딩 애니메이션**: Intersection Observer로 동적 로딩
- **토스트 알림**: 우측 상단에서 자동 사라지는 알림

### 🎯 사용성
- **반응형 디자인**: 모든 기기에서 최적화
- **접근성**: ARIA 속성, 키보드 네비게이션
- **직관적 UI**: 아이콘, 색상으로 정보 전달

---

## 💡 주요 구현 아이디어

### 위치 기반 검색
- 사용자 현재 위치 자동 감지
- Haversine 공식으로 거리 계산
- 근처순 정렬 기능

### 사용자 경험
- 로그인 상태 자동 유지
- 예약 완료 후 이메일 확인
- 북마크한 크루 관리

### 성능 최적화
- 비동기 SDK 로드
- Intersection Observer로 이미지 지연 로드
- 이벤트 위임으로 메모리 효율화

---

## 🔧 설정 및 실행

### 필수 설정 파일 (`APIkey.js`)
```javascript
export default {
  KAKAOMAP_KEY: "카카오맵 API KEY",
  CREWAPI: "https://api.sheetbest.com/sheets/...", // 크루 정보
  RESERVEAPI: "https://api.sheetbest.com/sheets/...", // 예약 정보
  QNAAPI: "https://api.sheetbest.com/sheets/...", // QnA
  PUBLICKEY: "EmailJS 퍼블릭 키",
  SERVICEID: "EmailJS 서비스 ID",
  TEMPLATERESERVE: "EmailJS 템플릿 ID"
};
```

### 실행 방법
```bash
# 1. 프로젝트 다운로드
git clone https://github.com/yourusername/ONRUNNING.git

# 2. APIkey.js 파일 설정
# APIkey.js에 실제 API 키 입력

# 3. 웹 서버로 실행 (CORS 이슈 방지)
# VS Code: Live Server 확장 사용
# Python: python -m http.server 8000
# Node: npx http-server
```

---

## 👥 개발자

**작성자**: 
코리아IT아카데미 강남점 4조 프로젝트
홍정민, 홍수민, 김지우, 남현서

---

## 📝 주요 기능 별 파일 매핑

| 기능 | HTML | CSS | JS |
|------|------|-----|-----|
| 메인 + 지도 검색 | main.html | main.css | main.js |
| 크루 상세 정보 | explanation.html | - | explanation.js |
| 예약 | reserve.html | reserve.css | reserve.js |
| 마이페이지 | userpage.html | userpage.css | userpage.js |
| 프로필 관리 | userprofile.html | userprofile.css | userprofile.js |
| 예정된 러닝 | coming_running_page.html | coming_running_page.css | coming_running_page.js |
| 지난 러닝 | my_running_page.html | my_running_page.css | my_running_page.js |
| 멤버십 카드 | mycard.html | - | mycard.js |
| ON CREW | oncrew.html | - | oncrew.js |
| ON GEAR | ongear.html | - | ongear.js |
| ON PROGRAM | onprogram.html | - | onprogram.js |
| 런투게더 서울 | runtogetherseoul.html | - | runtogetherseoul.js |
| QnA | QnA.html | - | QnA.js |
| Contact | contact.html | - | contact.js |
| 예약 확인 | check.html | - | check.js |
| 로그인 | login.html | login.css | login.js, login-textanimation.js |
| 회원가입 | createAccount.html | createAccount.css | createAccount.js |

---

## 🎓 학습 포인트

이 프로젝트를 통해 학습할 수 있는 내용:

✅ **외부 API 통합** (Kakao Maps, EmailJS, SheetBest)  
✅ **비동기 프로그래밍** (Promise, async/await)  
✅ **상태 관리** (sessionStorage, localStorage)  
✅ **DOM 조작** (Event Delegation, 동적 렌더링)  
✅ **CSS 애니메이션** (Transform, Transition)  
✅ **반응형 웹 디자인**  
✅ **성능 최적화** (Intersection Observer, 이벤트 위임)  
✅ **사용자 경험 설계** (UX/UI)  

---

## 🌟 추가 기능 (향후 개선 계획)

- [ ] 사용자 평점 & 리뷰 시스템
- [ ] 실시간 채팅 기능
- [ ] 푸시 알림
- [ ] 소셜 로그인 (구글, 카카오)
- [ ] 모바일 앱 (React Native)
- [ ] 결제 시스템 (프리미엄 크루)
- [ ] 크루 생성 기능
- [ ] 통계 대시보드

---

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 프로젝트입니다.

---

## 📸 스크린샷 추가 위치 정리

README에 사진을 추가할 때 다음 위치에 넣으면 됩니다:

```markdown
1. # 🏃 ON RUNNING 제목 아래
![ON RUNNING 로고](/screenshots/logo.png)

2. ## 🎯 핵심 기능 각 섹션 아래
   - 메인 페이지 => ![메인 페이지](/screenshots/01_main.png)
   - 예약 시스템 => ![예약 페이지](/screenshots/02_reserve.png)
   - 마이페이지 => ![마이페이지](/screenshots/03_mypage.png)
   - 커뮤니티 => ![커뮤니티](/screenshots/04_community.png)

3. ## 📁 프로젝트 구조 아래
![폴더 구조 다이어그램](/screenshots/folder_structure.png)

4. ## 🛠️ 기술 스택 아래
![기술 스택 아이콘](/screenshots/tech_stack.png)

5. 각 API 섹션 옆에
![API 다이어그램](/screenshots/api_flow.png)
```

### 📸 추천 스크린샷 목록
```
screenshots/
├── logo.png                    # ON RUNNING 로고
├── 01_main_map.png            # 메인 지도 페이지
├── 02_main_list.png           # 메인 크루 리스트
├── 03_explanation.png         # 크루 상세 정보
├── 04_reserve.png             # 예약 페이지
├── 05_reserved_done.png       # 예약 완료
├── 06_userpage.png            # 마이페이지 프로필
├── 07_stamps.png              # 스탐프 시스템
├── 08_bookmarks.png           # 북마크 관리
├── 09_oncrew.png              # ON CREW 페이지
├── 10_ongear.png              # ON GEAR 페이지
├── 11_onprogram.png           # ON PROGRAM 페이지
├── 12_qna.png                 # QnA 페이지
├── 13_login.png               # 로그인 페이지
├── 14_signup.png              # 회원가입 페이지
├── 15_header.png              # 헤더 네비게이션
├── 16_mobile_view.png         # 모바일 뷰
└── architecture.png           # 전체 아키텍처
```

---

**🚀 함께 서울을 달리자! ON RUNNING으로 시작하세요.**
