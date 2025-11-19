// onprogram.js
// ⭐️ APIkey.js에서 설정 불러오기
import { API_CONFIG } from '../APIkey.js';

// ================================
// 0) 카카오맵 SDK 동적 로드
// ================================
const loadKakaoMapSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_CONFIG.KAKAO_MAP_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      kakao.maps.load(() => {
        resolve();
      });
    };
    
    script.onerror = () => {
      reject(new Error('카카오맵 SDK 로드 실패'));
    };
    
    document.head.appendChild(script);
  });
};

// ============================================
// onprogram.js - RUN TOGETHER SEOUL
// Kakao 지도 + 현재 위치 + 크루 리스트 렌더링
// ⭐️ [수정] 북마크 기능 추가
// ============================================

// --- ⭐️ [신규] 로그인 상태 및 북마크 키 ---
let currentUserEmail = "onrunning@example.com";
let IS_LOGGED_IN = false;
const loggedInUser = sessionStorage.getItem("loggedInUser");
if (loggedInUser) {
  try {
    const user = JSON.parse(loggedInUser);
    currentUserEmail = user.email || currentUserEmail;
    IS_LOGGED_IN = currentUserEmail !== "onrunning@example.com";
  } catch (e) {
    console.error("세션 사용자 정보 파싱 오류:", e);
  }
}

const LOCAL_STORAGE_ID_KEY = IS_LOGGED_IN
  ? `bookmarkedCrewIds_${currentUserEmail}`
  : "bookmarkedCrewIds_guest";
const LOCAL_STORAGE_DATA_KEY = IS_LOGGED_IN
  ? `bookmarkedRuns_${currentUserEmail}`
  : "bookmarkedRuns_guest";

// 전역 변수
let globalMap = null;
let activeFilter = "near";
let allCrewData = [];
let userLat = 37.5665;
let userLng = 126.9780;
let searchLat = null;
let searchLng = null;

/**
 * ⭐️ async 함수로 변경
 */
async function initApp() {
  console.log('initApp 실행 시작');

  try {
    // ⭐️ 카카오맵 SDK 먼저 로드
    await loadKakaoMapSDK();
    console.log('카카오맵 SDK 로드 완료');

    // 1. 사용자의 현재 위치 획득 후 지도 초기화
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log('위치 획득 성공:', pos.coords.latitude, pos.coords.longitude);
          userLat = pos.coords.latitude;
          userLng = pos.coords.longitude;
          initMap(pos.coords.latitude, pos.coords.longitude);
        },
        (error) => {
          console.log('위치 획득 실패, 서울 중심으로 설정');
          initMap(37.5665, 126.9780);
        }
      );
    } else {
      console.log('Geolocation 지원 안 함, 서울 중심으로 설정');
      initMap(37.5665, 126.9780);
    }

    // 2. 필터 버튼 이벤트
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener("click", e => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          activeFilter = btn.getAttribute("data-filter");
          console.log('선택된 필터:', activeFilter);
          fetchAndRenderRuns();
        });
      });
    }

    // 3. Daum 우편번호 검색 초기화
    initDaumPostcodeSearch();
  } catch (error) {
    console.error('초기화 실패:', error);
    alert('지도를 불러올 수 없습니다.');
  }
}

function initDaumPostcodeSearch() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("location-search");
  const searchWrapper = document.querySelector(".search-wrapper");

  if (searchInput) searchInput.style.cursor = "pointer";
  if (searchWrapper) searchWrapper.style.cursor = "pointer";

  if (searchInput) {
    searchInput.addEventListener("click", (e) => {
      execDaumPostcode();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      updateMapAndList();
    });
  }
}

function initMap(lat, lng) {
  console.log('initMap 실행:', lat, lng);

  if (typeof kakao === 'undefined') {
    console.error('Kakao 객체가 정의되지 않았습니다!');
    return;
  }

  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error('맵 컨테이너를 찾을 수 없습니다');
    return;
  }

  const mapOptions = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 7,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  globalMap = new kakao.maps.Map(mapContainer, mapOptions);
  let currentLevel = 7;

  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      if (currentLevel > 1) {
        currentLevel--;
        globalMap.setLevel(currentLevel);
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      if (currentLevel < 14) {
        currentLevel++;
        globalMap.setLevel(currentLevel);
      }
    });
  }

  function setGrabbing(on) {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    mapEl.classList.toggle('grabbing', !!on);
  }

  kakao.maps.event.addListener(globalMap, 'mousedown', () => {
    globalMap.setDraggable(true);
    setGrabbing(true);
  });

  kakao.maps.event.addListener(globalMap, 'mouseup', () => {
    globalMap.setDraggable(false);
    setGrabbing(false);
  });

  kakao.maps.event.addListener(globalMap, 'mouseleave', () => {
    globalMap.setDraggable(false);
    setGrabbing(false);
  });

  kakao.maps.event.addListener(globalMap, 'dragstart', () => setGrabbing(true));
  kakao.maps.event.addListener(globalMap, 'dragend', () => setGrabbing(false));

  window.addEventListener('mouseup', () => setGrabbing(false));

  loadCrewMarkers(globalMap);
  fetchAndRenderRuns();
}

function loadCrewMarkers(map) {
  console.log('마커 로드 시작');
  
  fetch(API_CONFIG.CREW_API)
    .then(res => res.json())
    .then(data => {
      console.log('데이터 로드 성공:', data.length);

      const nearestByName = Object.values(
        data.reduce((acc, item) => {
          const scheduleDate = new Date(item.schedule);
          const key = item.name.trim();
          if (!acc[key] || scheduleDate < new Date(acc[key].schedule)) {
            acc[key] = item;
          }
          return acc;
        }, {})
      );

      nearestByName.forEach(run => {
        const markerHTML = `<div class="run-marker">${run.remain}</div>`;

        new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(run.lat, run.lng),
          content: markerHTML,
          yAnchor: 0.5
        }).setMap(map);
      });
    })
    .catch(err => {
      console.error('마커 데이터 로드 실패:', err);
    });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function sortCrewList(crewList, filter) {
  let sortedList = [...crewList];

  switch (filter) {
    case "near":
      console.log('내 근처 필터 적용');
      const baseLat = searchLat !== null ? searchLat : userLat;
      const baseLng = searchLng !== null ? searchLng : userLng;
      sortedList.sort((a, b) => {
        const distA = calculateDistance(baseLat, baseLng, parseFloat(a.lat), parseFloat(a.lng));
        const distB = calculateDistance(baseLat, baseLng, parseFloat(b.lat), parseFloat(b.lng));
        return distA - distB;
      });
      break;

    case "distance":
      console.log('레이스거리 필터 적용');
      sortedList.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      break;

    case "date":
      console.log('날짜 필터 적용');
      sortedList.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));
      break;

    case "my":
      console.log('MY 필터 선택 (구현 예정)');
      break;
  }

  return sortedList;
}

async function fetchAndRenderRuns(searchQuery = "") {
  try {
    const response = await fetch(API_CONFIG.CREW_API);
    let crewList = await response.json();

    crewList = crewList.map(crew => {
      if (crew.image && crew.image.includes(',')) {
        const images = crew.image
          .split(',')
          .map(url => url.trim())
          .filter(url => url && url.length > 0 && url !== 'undefined' && url !== 'null');
        
        crew.image = images.length > 0 ? images[0] : 'https://placekitten.com/200/200';
      } else if (!crew.image) {
        crew.image = 'https://placekitten.com/200/200';
      }
      return crew;
    });

    allCrewData = crewList;

    if (searchQuery) {
      crewList = crewList.filter(crew => crew.name.includes(searchQuery));
    }

    crewList = sortCrewList(crewList, activeFilter);

    const bookmarkedIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID_KEY) || "[]");
    renderRuns(crewList, bookmarkedIds);

  } catch (error) {
    console.error("데이터 로드 실패:", error);
    const fallbackData = [
      {
        id:'YEO01', 
        schedule:'2025-11-15 09:30', 
        location:'여의도 한강', 
        distance:'3.5', 
        remain:'7', 
        image:'https://placekitten.com/200/200',
        name: '여의도 한강 크루',
        lat: '37.5300',
        lng: '126.9244'
      }
    ];
    
    allCrewData = fallbackData;
    let filtered = fallbackData;
    
    if (searchQuery) {
      filtered = fallbackData.filter(crew => crew.name.includes(searchQuery));
    }
    
    filtered = sortCrewList(filtered, activeFilter);
    const bookmarkedIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID_KEY) || "[]");
    renderRuns(filtered, bookmarkedIds);
  }
}

function renderRuns(list, bookmarkedIds = []) {
  const container = document.getElementById("run-list");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<div style='padding:70px;text-align:center;color:#a1a1a1;'>검색 결과가 없습니다.</div>";
    return;
  }

  const baseLat = searchLat !== null ? searchLat : userLat;
  const baseLng = searchLng !== null ? searchLng : userLng;

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "run-card";
    
    const explanationUrl = `../explanation/explanation.html?id=${item.id}&name=${encodeURIComponent(item.name)}`;
    
    const distanceToCrewLocation = calculateDistance(
      baseLat, 
      baseLng, 
      parseFloat(item.lat), 
      parseFloat(item.lng)
    );
    
    const distanceText = distanceToCrewLocation.toFixed(1);
    const isBookmarked = bookmarkedIds.includes(item.id.trim());

    card.innerHTML = `
      <img class="run-card-image" src="${item.image || 'https://placekitten.com/200/200'}" alt="${item.location}">
      
      <div class="run-info">
        <div class="run-schedule">${item.schedule}</div>
        <div class="run-location">온런 · ${item.location}</div>
        <div class="run-distance">${item.distance} km · ${item.time || item.distance} min</div>
        
        <div class="run-bottom">
          <div class="run-remain">신청인원 : ${item.remain} / ${item.limit || 30} </div>
          
          <button class="bookmark-btn" type="button" aria-label="즐겨찾기" aria-pressed="${isBookmarked}">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="icon-default" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="icon-active" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
            </svg>
          </button>
        </div>

        <div class="run-overlay">
          <span>더 알아보기</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
          </svg>
        </div>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('.run-card-image').addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = explanationUrl;
    });

    const bookmarkBtn = card.querySelector('.bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        e.preventDefault(); 
        
        if (!IS_LOGGED_IN) {
          alert("로그인 후 북마크할 수 있습니다.");
          window.location.href = '../userauth/login.html';
          return;
        }
        
        const newState = !(bookmarkBtn.getAttribute('aria-pressed') === 'true');
        bookmarkBtn.setAttribute('aria-pressed', String(newState));
        toggleBookmark(item); 
      });
    }
  });
}

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      const addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
      document.getElementById("location-search").value = addr;
    },
    width: 400,
    height: 500,
    autoClose: true
  }).open();
}

function updateMapAndList() {
  const addr = document.getElementById("location-search").value.trim();
  if (!addr) {
    alert("주소를 입력해주세요.");
    return;
  }

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('[data-filter="near"]').classList.add("active");
  activeFilter = "near";

  geocodeAddress(addr, () => {
    fetchAndRenderRuns();
  });
}

function geocodeAddress(addr, callback) {
  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(addr, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const lat = parseFloat(result[0].y);
      const lng = parseFloat(result[0].x);

      searchLat = lat;
      searchLng = lng;

      globalMap.setCenter(new kakao.maps.LatLng(lat, lng));
      displaySearchMarker(lat, lng, addr);

      if (callback) callback();
    } else {
      alert('주소를 좌표로 변환하지 못했습니다. 다시 시도해주세요.');
      console.error('좌표 변환 실패:', status);
    }
  });
}

function displaySearchMarker(lat, lng, placeName) {
  if (window.searchMarker) {
    window.searchMarker.setMap(null);
  }

  const markerImage = new kakao.maps.MarkerImage(
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
    new kakao.maps.Size(31, 35)
  );

  window.searchMarker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(lat, lng),
    title: placeName,
    image: markerImage
  });

  window.searchMarker.setMap(globalMap);
}

function toggleBookmark(crewItem) {
    if (!crewItem || !crewItem.id) return;

    let bookmarkedIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID_KEY) || "[]");
    let bookmarkedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY) || "[]");
    
    const crewId = crewItem.id.trim();
    const existingIndex = bookmarkedIds.indexOf(crewId);

    if (existingIndex > -1) {
        bookmarkedIds.splice(existingIndex, 1);
        bookmarkedData = bookmarkedData.filter(run => run.id !== crewId);
        console.log("북마크 제거:", crewId);
    } else {
        bookmarkedIds.push(crewId);
        
        const bookmarkObject = {
            id: crewId,
            location: crewItem.location || "정보 없음",
            date: crewItem.schedule ? crewItem.schedule.split(" ")[0] : "날짜 없음",
            departure: crewItem.departure || "정보 없음",
            destination: crewItem.destination || "정보 없음",
            distance: crewItem.distance || "?",
            level: crewItem.level || "정보 없음",
            link: `explanation/explanation.html?id=${crewId}`
        };
        bookmarkedData.push(bookmarkObject);
        console.log("북마크 추가:", bookmarkObject);
    }

    localStorage.setItem(LOCAL_STORAGE_ID_KEY, JSON.stringify(bookmarkedIds));
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(bookmarkedData));
}

// ⭐️ DOMContentLoaded에서 initApp 호출
document.addEventListener("DOMContentLoaded", initApp);
