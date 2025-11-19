# 파일구조
/ONRUNNING-project  
├── main  
├  ├── main.html  
├  ├── main.css  
├  └── main.js  
├── runtogetherseoul  
├  ├── runtogetherseoul.html  
├  ├── runtogetherseoul.css  
├  └── runtogetherseoul.js  
├── oncrew  
├  ├── oncrew.html  
├  ├── oncrew.css  
├  └── oncrew.js  
├── ongear  
├  ├── ongear.html  
├  ├── ongear.css  
├  └── ongear.js  
├── onprogram  
├  ├── onprogram.html  
├  ├── onprogram.css  
├  └── onprogram.js  

├── reserve    
├  ├── reserve.html    
├  ├── reserve.css    
├  ├── reserve.js   
├  ├── reserve_done.html      
├  └── reserve_done.css     
├── explanation    
├  ├── explanation.html   
├  ├── explanation.css    
├  └── explanation.js    
├── QnA   
├  ├── QnA.html    
├  ├── QnA.css     
├  └── QnA.js    
├── check  
├  ├── check.html  
├  ├── check.css  
├  ├── check.js  
├  └── cancel_done.html  

├── common  
├  ├── font.css  
├  ├── header.html  
├  ├── header.css  
├  └── header.js  
├── assets  
├  ├── images  
├  └── videos  
├  
└── guideline.html  

🔨 마이페이지, 로그인 파일 구조 공유 부탁드립니다.


# On Gear 최종본
## 2025.11.12 14:00 CSS 완료
—— 보완 요소 ——  
🔨 update 함수 설정 후 이미지 불러오는데 지연 발생 > 로딩 중으로 대체할 수 있는 화면 요함  
🔨 남성 여성 탭 클릭 말고 슬라이드로 변경하면 좋을 것 같음 클릭하면 슬라이드에서 넘어가는 애니메이션  
—————————----  

✅ 애니메이션 카드 자체 > 카드 내부 이미지로 변경  



# 헤더메뉴파일(nav) 최종본
## 2025.11.12 13:10

✅ 색 설정하면 변환되도록 구현  
반드시 해당 페이지 담당 css 파일을 최하단에 배치해야 충돌 가능성 적음  

    `<link rel="stylesheet" href="../common/font.css">`
    `<link rel="stylesheet" href="../common/header.css">`
    `<link rel="stylesheet" href="./onGear.css" />`

이후 각 페이지 css 파일에 헤더색 지정  
[ex] onGear.css 파일에 하단 코드 1줄 추가  

헤더색이 검정색일경우(==배경색이 하얀색일경우)  
.header-container { color: black; }  

헤더색이 하얀색일경우(==배경색이 검정색일경우)  
.header-container { color: white; }  

🔨배경색을 계산해서 배경에 따라 자연스럽게 전환되도록 하는 기능 추가 요함




# 메인 페이지
## 2025.11.12 02:10
—— 보완 요소 ——  
🔨 자주 묻는 질문 링크 연결  
🔨 CONTACT US 이메일 클릭 시 이메일 전송 가능한 js 추가 요함  
—————————----  
  
✅ section2 지도 패널안 검색창 X 버튼 구현  
- 검색 전에는 display:none; 으로 숨기기 설정  
- input 값이 들어오면 display:block으로 토글하여 노출  
- X 버튼 클릭 시 input value 초기화 시키는 이벤트 발생  

✅ section 3 qna 애니메이션 구현  
✅ section 4 hover 및 페이지 링크 연결 구현  
✅ contact 페이지 css 작업 완료  


# Explanation.html
2025.11.11 15:06 CSS 완료  
✅ 북마크 로직 구현해야합니다.  
✅ 공유 버튼 링크 구현해야합니다.  
✅ 스케줄 박스 넘침현상 일어날때 단어기준 자동 줄바꿈 CSS 설정해놨는데 제대로 동작하는지 더블 체크 필요합니다.  
✅ 등록 페이지 제대로 구현되는지 로직 점검 필요합니다.  
✅ 등록 페이지는 지금 구성도 괜찮아서 별도 CSS 작업하지 않았습니다. (등록만 가운데 정렬)


# On Program 페이지
2025.11.11 14:50 CSS / JS 완료  
✅ 맵 드래깅 커서 수정  
✅ 즐겨찾기 버튼 로직 추가 필요  
✅ 오버레이는 오버레이 효과만 > 클릭 동작 적용되지 않게 막아놨습니다.  
✅ 카드 클릭시 링크로 이동하게 되면 즐겨찾기 버튼이랑 클릭 이벤트 중복되어 이미지 썸네일 클릭하면 이동하는 것으로 수정했습니다.  
✅ 썸네일 깨지는 이슈 있습니다.



# 메인 페이지
2025.11.11 09:16 CSS  
✅ 스크롤 가능 영역 변경했습니다.( 기존 : 패널 전체 > 카드 섹션 영역 )

2025.11.10 20:41 CSS/ JS / HTML section2 까지 완료  
✅ 전반적인 로직 모두 완료했습니다.  
✅ 수정된 부분 주석 처리 해놨습니다. 확인 바랍니다.  
✅ 불필요한 코드 전부 주석 처리 했습니다. 확인 후 삭제 부탁드립니다.  
✅ 하단 코드 남은 인원 남은 인원: ${crew.remain} / 30 > 30에서 정원으로 변수명 처리 해야합니다. 이 외 crew distance, time 모두 변수명 처리 해야합니다. 확인 후 수정 바랍니다. (동일 코드 필드에 3개 존재)  

```js  
div.innerHTML = `
  <div class="inner-img">
    <img src="" alt="">
  </div>
  <div class="inner-details">
    <div class="inner-description">
      <div class="crew-date">${crew.schedule}</div>
      <div class="crew-name">${crew.name}</div>
      <div class="crew-trackInfo">
        <span class="crew-distance">${crew.distance} km</span>
        <span>·</span>
        <span class="crew-time">${crew.time} min</span>
      </div>
      <div class="crew-leftSpot">남은 인원: ${crew.remain} / ${crew.limit}</div>
    </div>
    <button class="crew-apply-btn" type="button" id="crewApplyBtn">
      <span>신청하기</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
        class="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
      </svg>
    </button>
  </div>
`;
```



# 로그인/회원가입페이지
2025.11.10 CSS 완료  
✅ 현서님 JS 마무리 작업 요청드립니다.

# On Crew 페이지
2025.11.10 HTML / CSS / JS 완료  
✅**인스타그램 연동 API 구현여부 확인 필요**  

# font.css
글로벌 폰트 파일

# 헤더파일
✅**SHOP 버튼 애니메이션 추후 적용**  
✅**로그인시 MY PAGE로 전환하는 JS 작업 필요**  

**HTML 문서 상단에 아래 코드를 붙여 사용하세요.**  
`<link rel="stylesheet" href="../font.css">`  
`<link rel="stylesheet" href="../header.css">`  
`<script src="../header.js"></script>`  


코드내용:
```js  
<div class="header-container">
        <div class="left-box">
            <div class="menu-nav" id="menuNav">
                <button class="menu-title">MENU</button>
                <div class="menu-itemList">
                    <div class="menu-inner">
                        <button class="menu-item">RUN ON SEOUL</button>
                        <button class="menu-item">ON CREW</button>
                        <button class="menu-item">ON GEAR</button>
                        <button class="menu-item">ON PROGRAM</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="center-box">
            <button type="button" class="logo" id="logoBtn">
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" height="20px" width="20px" version="1.1"
                    y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-104.428 -0.618 612 792"
                    enable-background="new -104.428 -0.618 612 792">
                    <path
                        d="m402.97 62.754c-1.236 1.236-2.473 2.782-3.71 4.019-17.002 17.002-34.313 34.314-51.315 51.316-0.618 0.619-0.928 0.928-1.237 1.237-1.236 1.545-1.236 3.091 0.31 5.255 12.983 21.948 21.021 45.442 23.804 70.482 5.564 51.316-7.42 97.377-39.569 137.87-27.513 34.623-63.372 56.262-106.34 65.845-19.785 4.328-39.878 4.637-59.972 2.473-33.077-3.4-62.754-15.456-89.34-35.241-38.333-28.44-62.136-66.155-72.028-113.14-3.709-17.312-4.328-34.932-2.782-52.243 3.709-40.497 19.167-76.356 46.679-106.96 26.276-29.368 58.426-48.534 96.45-57.189 18.857-4.328 37.714-5.874 57.189-4.019 27.822 2.473 53.789 10.511 77.901 24.422 3.092 1.854 4.328 0.618 6.184-1.237 17.02-17.005 34.02-34.007 51.02-51.01 1.236-1.237 2.473-2.782 4.019-4.637 21.02 21.021 41.73 41.733 62.75 62.754m-115.92 157.66c1.546-59.663-45.442-102.94-98.305-104.49-59.663-1.546-104.18 47.916-104.18 101.4 0 54.717 46.061 102.01 101.4 101.09 54.41 0.62 99.85-44.21 101.09-98"
                        fill="#000000" />
                    <path
                        d="m365.26 633.42c0.309 50.079 0 100.47 0 150.55v6.801h-89.649v-6.183c0-52.553 0.31-105.1 0-157.66 0-27.513-9.583-51.625-29.677-70.792-13.292-12.674-29.367-20.094-47.916-22.566-24.112-3.4-46.061 2.473-65.536 17.002-19.476 14.839-30.914 34.933-34.623 58.735-1.855 11.438-2.164 23.186-2.164 34.933-0.309 46.679 0 93.049 0 139.73v6.491h-89.019v-5.873c0-56.571-0.618-113.45 0.309-170.02 0.618-29.986 10.202-58.427 25.967-84.394 26.276-43.278 63.682-71.101 112.83-82.539 15.148-3.4 31.532-4.945 47.298-4.327 49.152 2.164 91.194 21.639 124.58 58.426 23.803 26.586 38.95 57.499 44.206 93.05 2.16 12.98 3.4 25.96 3.4 38.64"
                        fill="#000000" />
                </svg>
            </button>
        </div>
        <div class="right-box">
            <button id="shopBtn">SHOP</button>
            <button id="contactBtn">CONTACT</button>
            <button id="myPageBtn">MY PAGE</button>
        </div>

  </div>
```

    

