// QnA.js
// APIkey.js에서 설정 불러오기
import { API_CONFIG } from '../APIkey.js';

// ================================
// 상수 설정
// ================================
// ✅ API 키를 변수로 변경
const SHEETBESTURL = API_CONFIG.QNA_API;
const ADMIN_PASSWORD = "1234";
const ITEMS_PER_PAGE = 5;

// 전역 변수
let currentQuestionId = null;
let currentEditId = null;
let allQuestions = [];
let isAdminMode = false;
let currentPage = 1;

// ================================
// DOM 로드 후 초기화
// ================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('페이지 로드됨');
    
    // FAQ 아코디언 기능
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isOpen = answer.classList.contains('active');
            
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('active');
            });
            
            if (!isOpen) {
                answer.classList.add('active');
            }
        });
    });

    // 질문 등록 폼
    const form = document.getElementById('questionForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const title = document.getElementById('questionTitle').value.trim();
            const content = document.getElementById('questionContent').value.trim();
            const password = document.getElementById('questionerPassword').value.trim();
            const isPrivate = document.getElementById('isPrivate').checked;
            
            if (title && content && password) {
                submitQuestion(title, content, password, isPrivate);
            }
        });
    }

    // 페이지 로드 시 질문 불러오기
    loadQuestions();

    // 모달 기능
    setupModals();

    // 관리자 로그인
    document.getElementById('adminLoginLink').addEventListener('click', (e) => {
        e.preventDefault();
        if (isAdminMode) {
            logoutAdmin();
        } else {
            document.getElementById('adminLoginModal').style.display = 'block';
        }
    });

    document.getElementById('submitAdminLoginBtn').addEventListener('click', loginAdmin);
    document.getElementById('adminLogoutBtn').addEventListener('click', logoutAdmin);
});

// Line 88 - 질문 제출
function submitQuestion(title, content, password, isPrivate) {
    const data = {
        timestamp: new Date().toLocaleString('ko-KR'),
        title: title,
        content: content,
        answer: "",
        status: "미답변",
        isPrivate: isPrivate,
        questionerPassword: password
    };

    console.log('데이터 전송:', data);

    // ✅ SHEETBESTURL로 수정
    fetch(SHEETBESTURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('성공:', result);
        alert('질문이 등록되었습니다!');
        document.getElementById('questionForm').reset();
        loadQuestions();
    })
    .catch(error => {
        console.error('에러:', error);
        alert('오류가 발생했습니다.');
    });
}

// Line 115 - 질문 불러오기
function loadQuestions() {
    console.log('질문 불러오는 중...');
    
    // ✅ SHEETBESTURL로 수정
    fetch(SHEETBESTURL)
    .then(response => response.json())
    .then(result => {
        console.log('받은 데이터:', result);
        console.log('첫 번째 질문:', result[0]);
        allQuestions = result;
        displayQuestions();
    })
    .catch(error => {
        console.error('에러:', error);
    });
}

// 질문 표시 (페이지네이션 포함)
function displayQuestions() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';

    console.log('displayQuestions 실행됨');
    console.log('allQuestions:', allQuestions);

    if (!allQuestions || allQuestions.length === 0) {
        questionList.innerHTML = '<p style="text-align: center; color: #999;">등록된 질문이 없습니다.</p>';
        displayPagination();
        return;
    }

    // 중복 제거: timestamp가 같은 경우 가장 최신(마지막) 데이터만 유지
    const timestampMap = {};
    allQuestions.forEach(q => {
        timestampMap[q.timestamp] = q;
    });
    const uniqueQuestions = Object.values(timestampMap);

    console.log('중복 제거 후 질문 수:', uniqueQuestions.length);
    console.log('유니크 질문들:', uniqueQuestions);

    // ✅ 수정: 필터링하지 말고 모든 질문 표시 (내용만 "비공개"로 표시)
    let visibleQuestions = uniqueQuestions;

    console.log('표시할 질문 수:', visibleQuestions.length);

    // 최신 질문부터 표시
    visibleQuestions = visibleQuestions.reverse();

    // 페이지네이션 계산
    const totalPages = Math.ceil(visibleQuestions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedQuestions = visibleQuestions.slice(startIndex, endIndex);

    paginatedQuestions.forEach((q, index) => {
        const originalIndex = allQuestions.findIndex(item => item.timestamp === q.timestamp);

        console.log(`질문 ${index}:`, q);
        console.log(`originalIndex: ${originalIndex}, questionerPassword: ${q.questionerPassword}`);

        const div = document.createElement('div');
        div.className = 'question-item';

        const statusClass = q.status === '답변완료' ? 'status-answered' : 'status-unanswered';
        const statusText = q.status === '답변완료' ? '답변완료' : '미답변';

        // 비공개 여부 확인
        const isPrivateValue = q.isPrivate === 'TRUE' || q.isPrivate === true;

        console.log(`배지 체크 - title: ${q.title}, isPrivate: "${q.isPrivate}", 배지표시: ${isPrivateValue}`);

        // 비공개 배지
        const privateBadge = isPrivateValue
            ? '<span class="private-badge">🔒 비공개</span>'
            : '';

        // ✅ 핵심: 비공개 질문의 내용은 "비공개"로 표시, 관리자면 원본 내용 표시
        let contentDisplay = q.content;
        if (isPrivateValue && !isAdminMode) {
            contentDisplay = '<em style="color: #999;">비공개</em>';
        }

        // 답변 표시
        let answerHtml = '';
        if (q.answer && q.answer.trim() !== '') {
            answerHtml = `
                <div class="question-item-answer">
                    <strong>[답변]</strong> 
                    <button class="btn-view-answer" onclick="openViewAnswerModal('${q.answer.replace(/'/g, "\\'")}', ${originalIndex})">
                        답변 보기
                    </button>
                </div>
            `;
        }

        // 버튼 생성
        let buttonsHtml = '';

        if (isAdminMode) {
            // 관리자 모드: 모든 미답변 질문에 답변 버튼
            if (q.status !== '답변완료') {
                buttonsHtml += `<button class="btn-answer" onclick="openAnswerModal('${q.title.replace(/'/g, "\\'")}', '${q.content.replace(/'/g, "\\'")}', ${originalIndex})">답변하기</button>`;
            }
        } else {
            // 일반 사용자 모드
            const hasPassword = q.questionerPassword && q.questionerPassword.trim() !== '';

            console.log(`hasPassword: ${hasPassword}`);

            if (hasPassword) {
                buttonsHtml += `<button class="btn-edit" onclick="openEditModal(${originalIndex})">수정하기</button>`;
            }
        }

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem;">
                <div class="question-item-status ${statusClass}">${privateBadge}${statusText}</div>
                <div>${buttonsHtml}</div>
            </div>
            <div class="question-item-title">${q.title}</div>
            <div class="question-item-content">${contentDisplay}</div>
            ${answerHtml}
        `;

        questionList.appendChild(div);
    });

    // 페이지네이션 표시
    displayPagination(totalPages);
}




// 답변 보기 (모달이 아니라 질문 밑에 직접 표시)
function openViewAnswerModal(answer, index) {
    const question = allQuestions[index];
    
    if (!question) {
        alert('질문을 찾을 수 없습니다.');
        return;
    }

    // 이미 답변이 표시된 요소가 있으면 제거
    const existingAnswerView = document.getElementById(`answer-view-${index}`);
    if (existingAnswerView) {
        existingAnswerView.remove();
        return;
    }

    // 버튼을 클릭한 질문 아이템 찾기
    const buttons = document.querySelectorAll('.btn-view-answer');
    let clickedButton = null;
    
    buttons.forEach((btn, i) => {
        if (btn.onclick && btn.onclick.toString().includes(answer)) {
            clickedButton = btn;
        }
    });

    // 질문 아이템 찾기
    const questionItem = clickedButton ? clickedButton.closest('.question-item') : null;
    
    if (!questionItem) {
        alert('질문을 찾을 수 없습니다.');
        return;
    }

    // 비공개 여부 확인
    const isPrivateValue = question.isPrivate === 'TRUE' || question.isPrivate === true;

    // 답변 보기 영역 생성
    const answerViewDiv = document.createElement('div');
    answerViewDiv.id = `answer-view-${index}`;
    answerViewDiv.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
    `;

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '닫기';
    closeBtn.style.cssText = `
        background-color: #f44336;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.85rem;
        margin-top: 0.1rem;
    `;
    closeBtn.onclick = function() {
        answerViewDiv.remove();
    };

    // 닫기 버튼을 맨 아래에 추가하는 함수
    function addCloseButton() {
        if (!answerViewDiv.querySelector('button[style*="f44336"]')) {
            answerViewDiv.appendChild(closeBtn);
        }
    }

    // ✅ 공개 질문: 비밀번호 없이 바로 답변 표시
    if (!isPrivateValue) {
        const answerDisplayArea = document.createElement('div');
        answerDisplayArea.style.cssText = `
            padding: 1rem;
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            border-radius: 4px;
            margin-bottom: 15px;
        `;
        answerDisplayArea.innerHTML = `
            <p style="margin-top: 0.5rem; line-height: 1.6; color: #1b5e20;">${answer}</p>
        `;

        answerViewDiv.appendChild(answerDisplayArea);
        addCloseButton();
        questionItem.appendChild(answerViewDiv);
        return;
    }

    // ✅ 비공개 질문: 비밀번호 입력 필요
    const passwordInputArea = document.createElement('div');
    passwordInputArea.style.cssText = `
        display: flex;
        gap: 0.5rem;
        align-items: center;
    `;
    passwordInputArea.id = `password-area-${index}`;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = '질문자 비밀번호를 입력하세요';
    passwordInput.style.cssText = `
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: 'Noto Sans KR', sans-serif;
    `;

    const viewBtn = document.createElement('button');
    viewBtn.textContent = '확인';
    viewBtn.style.cssText = `
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.85rem;
    `;

    // 답변 표시 영역
    const answerDisplayArea = document.createElement('div');
    answerDisplayArea.id = `answer-display-${index}`;
    answerDisplayArea.style.cssText = `
        display: none;
        margin-top: 1rem;
        padding: 1rem;
        background-color: #e8f5e9;
        border-left: 4px solid #4caf50;
        border-radius: 4px;
    `;
    answerDisplayArea.innerHTML = `
        <p style="margin-top: 0.5rem; line-height: 1.6; color: #1b5e20;">${answer}</p>
    `;

    // 비밀번호 입력 함수
    function checkPassword() {
        const inputPassword = passwordInput.value.trim();

        if (!inputPassword) {
            alert('비밀번호를 입력하세요!');
            return;
        }

        if (inputPassword !== question.questionerPassword) {
            alert('비밀번호가 맞지 않습니다!');
            passwordInput.value = '';
            return;
        }

        // 비밀번호 맞음 - 답변 표시, 비밀번호 입력 영역 숨김
        passwordInputArea.style.display = 'none';
        answerDisplayArea.style.display = 'block';
    }

    // 확인 버튼 클릭
    viewBtn.onclick = checkPassword;

    // ✅ 엔터 키 입력 시에도 확인 버튼과 동일한 효과
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPassword();
        }
    });

    // 엘리먼트 조립
    passwordInputArea.appendChild(passwordInput);
    passwordInputArea.appendChild(viewBtn);
    passwordInputArea.appendChild(closeBtn.cloneNode(true));
    passwordInputArea.lastChild.onclick = function() {
        answerViewDiv.remove();
    };

    answerViewDiv.appendChild(passwordInputArea);
    answerViewDiv.appendChild(answerDisplayArea);

    // 질문 아이템 밑에 답변 보기 영역 추가
    questionItem.appendChild(answerViewDiv);
}




// 페이지네이션 표시
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (!totalPages || totalPages <= 1) return;

    // 이전 페이지 버튼
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '이전';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayQuestions();
            window.scrollTo(0, document.getElementById('faq').offsetTop);
        }
    });
    pagination.appendChild(prevBtn);

    // 페이지 번호 버튼
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayQuestions();
            window.scrollTo(0, document.getElementById('faq').offsetTop);
        });
        pagination.appendChild(pageBtn);
    }

    // 다음 페이지 버튼
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayQuestions();
            window.scrollTo(0, document.getElementById('faq').offsetTop);
        }
    });
    pagination.appendChild(nextBtn);
}

// 관리자 로그인
function loginAdmin() {
    const password = document.getElementById('adminLoginPassword').value;

    if (password === ADMIN_PASSWORD) {
        isAdminMode = true;
        document.getElementById('adminLoginModal').style.display = 'none';
        document.getElementById('adminBadge').style.display = 'flex';
        document.getElementById('adminLoginLink').textContent = '로그아웃';
        document.getElementById('adminLoginPassword').value = '';
        alert('관리자 모드가 활성화되었습니다.');
        currentPage = 1; // 페이지 초기화
        displayQuestions();
    } else {
        alert('비밀번호가 맞지 않습니다!');
    }
}

// 관리자 로그아웃
function logoutAdmin() {
    isAdminMode = false;
    document.getElementById('adminBadge').style.display = 'none';
    document.getElementById('adminLoginLink').textContent = '관리자';
    alert('관리자 모드가 해제되었습니다.');
    currentPage = 1; // 페이지 초기화
    displayQuestions();
}

// 수정 모달 열기
function openEditModal(index) {
    currentEditId = index;
    const question = allQuestions[index];
    
    console.log('수정 모달 열기:', question);
    
    if (!question) {
        alert('질문을 찾을 수 없습니다.');
        return;
    }
    
    document.getElementById('editQuestionTitle').value = question.title;
    document.getElementById('editQuestionContent').value = question.content;
    document.getElementById('editQuestionPassword').value = '';
    document.getElementById('editModal').style.display = 'block';
}

// 답변 모달 열기
function openAnswerModal(title, content, index) {
    currentQuestionId = index;
    console.log('답변 모달 열기:', index);
    document.getElementById('modalQuestionTitle').textContent = title;
    document.getElementById('modalQuestionContent').textContent = content;
    document.getElementById('answerContent').value = '';
    document.getElementById('answerModal').style.display = 'block';
}

// 모달 설정
function setupModals() {
    const modals = [
        'adminLoginModal',
        'editModal',
        'answerModal',
        'viewAnswerModal'  // ← 이 줄 추가
    ];

    modals.forEach(modalId => {
        const modalElement = document.getElementById(modalId);
        if (!modalElement) return;

        const closeBtn = modalElement.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modalElement.style.display = 'none';
                
                // viewAnswerModal 닫을 때 초기화
                if (modalId === 'viewAnswerModal') {
                    document.getElementById('viewAnswerPassword').parentElement.style.display = 'block';
                    document.getElementById('viewAnswerBtn').style.display = 'block';
                    document.getElementById('answerDisplayArea').style.display = 'none';
                }
            }
        }

        window.addEventListener('click', function(event) {
            if (event.target === modalElement) {
                modalElement.style.display = 'none';
                
                // viewAnswerModal 닫을 때 초기화
                if (modalId === 'viewAnswerModal') {
                    document.getElementById('viewAnswerPassword').parentElement.style.display = 'block';
                    document.getElementById('viewAnswerBtn').style.display = 'block';
                    document.getElementById('answerDisplayArea').style.display = 'none';
                }
            }
        });
    });

    // 수정 완료 버튼
    const submitEditBtn = document.getElementById('submitEditBtn');
    if (submitEditBtn) {
        submitEditBtn.addEventListener('click', submitEdit);
    }

    // 답변 제출 버튼
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    if (submitAnswerBtn) {
        submitAnswerBtn.addEventListener('click', submitAnswer);
    }
}

// 질문 수정 제출
function submitEdit() {
    const password = document.getElementById('editQuestionPassword').value.trim();
    const newTitle = document.getElementById('editQuestionTitle').value.trim();
    const newContent = document.getElementById('editQuestionContent').value.trim();
    const question = allQuestions[currentEditId];

    console.log('수정 제출:', { password, newTitle, newContent, question });

    if (!question) {
        alert('질문을 찾을 수 없습니다.');
        return;
    }

    // 비밀번호 확인
    if (password !== question.questionerPassword) {
        alert('비밀번호가 맞지 않습니다!');
        return;
    }

    if (!newTitle || !newContent) {
        alert('제목과 내용을 입력해주세요!');
        return;
    }

    // 1단계: 기존 데이터 DELETE
    console.log('1단계: 기존 데이터 삭제 시작...');
    
    const deleteQuery = {
        "timestamp": question.timestamp
    };

// ✅ SHEETBESTURL로 수정
    fetch(SHEETBESTURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteQuery)
    })
    .then(response => {
        console.log('DELETE 응답 상태:', response.status);
        console.log('DELETE 완료, 2초 대기 후 새 데이터 추가...');
        return new Promise(resolve => setTimeout(resolve, 2000));
    })
    .then(() => {
        console.log('2단계: 새 데이터 추가 시작...');
        
        const newData = {
            timestamp: question.timestamp,
            title: newTitle,
            content: newContent,
            answer: question.answer || "",
            status: question.status || "미답변",
            isPrivate: question.isPrivate || "FALSE",
            questionerPassword: question.questionerPassword
        };

        console.log('새 데이터:', newData);

        // ✅ SHEETBESTURL로 수정
        return fetch(SHEETBESTURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
    })


    .then(response => {
        console.log('POST 응답 상태:', response.status);
        return response.json();
    })
    .then(result => {
        console.log('수정 성공:', result);
        alert('질문이 수정되었습니다!');
        document.getElementById('editModal').style.display = 'none';
        document.getElementById('editQuestionPassword').value = '';
        document.getElementById('editQuestionTitle').value = '';
        document.getElementById('editQuestionContent').value = '';
        
        // 2초 후 데이터 다시 불러오기
        setTimeout(() => {
            loadQuestions();
        }, 2000);
    })
    .catch(error => {
        console.error('수정 에러:', error);
        alert('오류가 발생했습니다: ' + error.message);
    });
}

// 답변 제출
function submitAnswer() {
    const answer = document.getElementById('answerContent').value.trim();

    if (!answer) {
        alert('답변을 입력해주세요!');
        return;
    }

    const question = allQuestions[currentQuestionId];
    
    console.log('답변 제출:', { currentQuestionId, question });

    if (!question) {
        alert('질문을 찾을 수 없습니다.');
        return;
    }

    // 1단계: 기존 데이터 DELETE
    console.log('1단계: 기존 데이터 삭제 시작...');
    
    const deleteQuery = {
        "timestamp": question.timestamp
    };

// ✅ SHEETBESTURL로 수정
    fetch(SHEETBESTURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteQuery)
    })
    .then(response => {
        console.log('DELETE 응답 상태:', response.status);
        console.log('DELETE 완료, 2초 대기 후 새 데이터 추가...');
        return new Promise(resolve => setTimeout(resolve, 2000));
    })
    .then(() => {
        console.log('2단계: 새 데이터 추가 시작...');
        
                const newData = {
            timestamp: question.timestamp,
            title: question.title,
            content: question.content,
            answer: answer,
            status: "답변완료",
            isPrivate: question.isPrivate || "FALSE",
            questionerPassword: question.questionerPassword || ""
        };

        console.log('새 데이터:', newData);

        // ✅ SHEETBESTURL로 수정
        return fetch(SHEETBESTURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
    })
    
    .then(response => {
        console.log('POST 응답 상태:', response.status);
        return response.json();
    })
    .then(result => {
        console.log('답변 성공:', result);
        alert('답변이 등록되었습니다!');
        document.getElementById('answerModal').style.display = 'none';
        document.getElementById('answerContent').value = '';
        
        // 2초 후 데이터 다시 불러오기
        setTimeout(() => {
            loadQuestions();
        }, 2000);
    })
    .catch(error => {
        console.error('답변 에러:', error);
        alert('오류가 발생했습니다: ' + error.message);
    });
}