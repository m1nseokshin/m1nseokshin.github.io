window.addEventListener('scroll', function() {
  let section2 = document.getElementById('section2');
  let section7 = document.getElementById('section7');
  let linksSVGs = document.querySelectorAll('.links img');

  // 요소의 화면 상의 상단 위치와 높이를 가져오기
  let section2Top = section2.offsetTop;
  let section7Top = section7.offsetTop;
  let section2Height = section2.offsetHeight;
  let section7Height = section7.offsetHeight;

  // 현재 스크롤 위치 가져오기
  let scrollPosition = window.scrollY;

  // 요소가 뷰포트에 노출되는지 확인
  let isVisibleSection2 = scrollPosition >= section2Top && scrollPosition < (section2Top + section2Height);
  let isVisibleSection7 = scrollPosition >= section7Top && scrollPosition < (section7Top + section7Height);

  linksSVGs.forEach(function(svg) {
    if (isVisibleSection2 || isVisibleSection7) {
      svg.classList.add('white-svg');
    } else {
      svg.classList.remove('white-svg');
    }
  });
});
