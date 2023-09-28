// body 요소 가져오기
const body = document.body;

// 스크롤이 0인 상태에서 no-scroll 클래스를 활성화
function enableNoScroll() {
    if (window.scrollY === 0) {
        body.classList.add('no-scroll');
    }
}

// 페이지 로드 시 실행
window.addEventListener('load', enableNoScroll);

// 스크롤 이벤트 처리
window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
});
