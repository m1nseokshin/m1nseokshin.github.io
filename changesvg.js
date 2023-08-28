window.addEventListener('scroll', function() {
  var section2 = document.getElementById('section2');
  var section3 = document.getElementById('section7');
  var linksSVGs = document.querySelectorAll('.links img');

  // #section2 요소가 뷰포트에 보이는지 확인
  var section2Rect = section2.getBoundingClientRect();
  var section3Rect = section3.getBoundingClientRect();
  
  var isVisibleSection2 = section2Rect.top >= 0 && section2Rect.bottom <= window.innerHeight;
  var isVisibleSection3 = section3Rect.top >= 0 && section3Rect.bottom <= window.innerHeight;
  
  linksSVGs.forEach(function(svg) {
    if (isVisibleSection2 || isVisibleSection3) {
      svg.classList.add('white-svg');
    } else {
      svg.classList.remove('white-svg');
    }
  });
});
