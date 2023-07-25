window.onload = function() {
  const elm = document.querySelectorAll('#section, #section2, #section3, #section4, #section5, #section6');
  const elmCount = elm.length;
  const duration = 250; // Set the duration of the scroll animation in milliseconds

  function scrollToElement(element, duration) {
    const startingY = window.pageYOffset;
    const elementY = window.pageYOffset + element.getBoundingClientRect().top;
    const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
    const diff = targetY - startingY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  elm.forEach(function(item, index) {
    item.addEventListener('wheel', function(event) {
      event.preventDefault();
      let delta = 0;

      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;

      let moveTop = window.scrollY;
      const elmSelector = elm[index];

      // wheel down: move to next section
      if (delta < 0) {
        if (elmSelector !== elmCount - 1) {
          try {
            scrollToElement(elmSelector.nextElementSibling, duration);
          } catch (e) {}
        }
      }
      // wheel up: move to previous section
      else {
        if (elmSelector !== 0) {
          try {
            scrollToElement(elmSelector.previousElementSibling, duration);
          } catch (e) {}
        }
      }
    });
  });
};
