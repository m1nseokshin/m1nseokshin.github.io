/* ==========================================================================
   Google Antigravity Inspired Portfolio Script with Advanced Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
   * 1. Premium Physics-based Smooth Scrolling Engine (LERP Momentum)
   * --------------------------------------------------------- */
  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;
  const scrollEasing = 0.075; // Buttery smooth LERP factor
  let isScrolling = false;
  let animationFrameId = null;

  // Sync scroll values on native scroll events (like anchor links clicks, manual drags)
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      targetScrollY = window.scrollY;
      currentScrollY = window.scrollY;
    }
  });

  // Trackpad vs Mouse Wheel heuristic: 
  // Standard mouse wheels trigger deltas that are multiples of 100 or have large steps.
  // Trackpads trigger small, high-frequency scroll steps.
  window.addEventListener('wheel', (e) => {
    // Only intercept scroll on non-touch desktop screens to prevent interfering with mobile touch swipe
    if (window.matchMedia('(pointer: fine)').matches) {
      e.preventDefault(); // Prevent native abrupt scrolling
      
      // Target delta adjustment
      targetScrollY += e.deltaY;
      
      // Clamp target scroll to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      
      if (!isScrolling) {
        isScrolling = true;
        smoothScrollLoop();
      }
    }
  }, { passive: false });

  function smoothScrollLoop() {
    const diff = targetScrollY - currentScrollY;
    
    if (Math.abs(diff) > 0.15) {
      currentScrollY += diff * scrollEasing;
      window.scrollTo(0, currentScrollY);
      animationFrameId = requestAnimationFrame(smoothScrollLoop);
    } else {
      currentScrollY = targetScrollY;
      window.scrollTo(0, currentScrollY);
      isScrolling = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }
  }

  // Intercept anchor link clicks to scroll smoothly through our engine
  const anchorLinks = document.querySelectorAll('a[href^="#"], a[href^="index.html#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      let targetId = link.getAttribute('href');
      if (targetId.startsWith('index.html#')) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html' || currentPage === '') {
          targetId = targetId.substring(10); // get the "#..." part
        } else {
          return; // Let standard link navigation open index.html and jump to hash
        }
      }
      
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Calculate position including header offset
        const headerHeight = 64;
        const targetPos = targetEl.offsetTop - headerHeight;
        
        targetScrollY = targetPos;
        if (!isScrolling) {
          isScrolling = true;
          smoothScrollLoop();
        }
      }
    });
  });


  /* ---------------------------------------------------------
   * 2. Antigravity Style Header Dropdown Drawer Panel Control
   * --------------------------------------------------------- */
  const header = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerPanels = document.querySelectorAll('.drawer-panel');
  
  let activeTriggerLink = null;
  let closeTimeout = null;

  function openDrawer(drawerId, triggerLink) {
    if (closeTimeout) clearTimeout(closeTimeout);
    
    // Deactivate previous active trigger links
    navLinks.forEach(link => link.classList.remove('drawer-active'));
    
    // Highlight current link
    triggerLink.classList.add('drawer-active');
    activeTriggerLink = triggerLink;

    // Show corresponding panel
    drawerPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.getAttribute('id') === `drawer-${drawerId}`) {
        panel.classList.add('active');
      }
    });

    // Slide down drawer container
    if (navDrawer) {
      navDrawer.classList.add('open');
      header.classList.add('scrolled'); // Force glass background when drawer is open
    }
  }

  function closeDrawer() {
    navLinks.forEach(link => link.classList.remove('drawer-active'));
    if (navDrawer) {
      navDrawer.classList.remove('open');
    }
    // Remove background sticky scrolled state if scroll position is high
    if (window.scrollY <= 30) {
      header.classList.remove('scrolled');
    }
    activeTriggerLink = null;
  }

  // Bind mouse hover to nav links for dropdown panels
  navLinks.forEach(link => {
    const drawerId = link.getAttribute('data-drawer');
    if (drawerId) {
      link.addEventListener('mouseenter', () => {
        openDrawer(drawerId, link);
      });
    }
  });

  // When mouse leaves the header bar completely, close the drawer
  if (header) {
    header.addEventListener('mouseleave', () => {
      closeTimeout = setTimeout(closeDrawer, 300); // 300ms cushion before closing drawer
    });
    
    header.addEventListener('mouseenter', () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    });
  }

  // Clicking sublinks in drawer closes it immediately
  const drawerItems = document.querySelectorAll('.drawer-link-item');
  drawerItems.forEach(item => {
    item.addEventListener('click', () => {
      closeDrawer();
    });
  });


  /* ---------------------------------------------------------
   * 3. Scroll Progress Indicator
   * --------------------------------------------------------- */
  const progressBar = document.getElementById('scroll-bar');
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    }
  });


  /* ---------------------------------------------------------
   * 4. Headroom Navigation Control (Show on scroll up, Hide on scroll down)
   * --------------------------------------------------------- */
  let lastScrollY = window.scrollY;
  const navHeader = document.getElementById('header-nav');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Only hide navigation if drawers (desktop panel / mobile drawer) are closed
    const isDrawerOpen = navDrawer && navDrawer.classList.contains('open');
    const isMobileDrawerOpen = mobileDrawer && mobileDrawer.classList.contains('open');
    
    if (navHeader && !isDrawerOpen && !isMobileDrawerOpen) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        navHeader.classList.add('header-hidden');
      } else {
        navHeader.classList.remove('header-hidden');
      }
    }
    lastScrollY = currentScrollY;
  });

  /* ---------------------------------------------------------
   * 4.2 Real-time Scroll-Linked Viewport Expanding Animation
   * --------------------------------------------------------- */
  const expandElements = document.querySelectorAll('.scroll-expand');
  
  function updateScrollExpand() {
    const vh = window.innerHeight;
    
    expandElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      
      // If completely below screen
      if (rect.top > vh) {
        el.style.transform = 'scale(0.8) translateY(40px)';
        el.style.opacity = '0';
        el.style.clipPath = 'inset(4% 4% round var(--shape-corner-lg))';
      } 
      // If completely above screen
      else if (rect.bottom < 0) {
        el.style.transform = 'scale(1) translateY(0)';
        el.style.opacity = '1';
        el.style.clipPath = 'inset(0% 0% round var(--shape-corner-lg))';
      } 
      // If inside viewport (entering or exiting)
      else {
        // We calculate progress based on element's entry from screen bottom
        // Starts entering at rect.top = vh (progress = 0)
        // Fully expanded when rect.top = vh * 0.35 (progress = 1)
        const startPoint = vh;
        const endPoint = vh * 0.35;
        
        let progress = (startPoint - rect.top) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
        
        // Calculate smooth scale (0.8 -> 1.0)
        const scale = 0.8 + progress * 0.2;
        // Translate translateY (40px -> 0px)
        const translate = 40 * (1 - progress);
        // Fade opacity (0 -> 1)
        const opacity = progress;
        // Crop inset (4% -> 0%)
        const inset = 4 * (1 - progress);
        
        el.style.transform = `scale(${scale}) translateY(${translate}px)`;
        el.style.opacity = `${opacity}`;
        el.style.clipPath = `inset(${inset}% ${inset}% round var(--shape-corner-lg))`;
      }
    });
  }

  // Register real-time scroll & resize listeners for scaling
  window.addEventListener('scroll', updateScrollExpand);
  window.addEventListener('resize', updateScrollExpand);
  
  // Trigger once initially
  updateScrollExpand();


  /* ---------------------------------------------------------
   * 5. Antigravity Force Field: Canvas Mesh Background
   * --------------------------------------------------------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initGrid();
    });
    
    const spacing = 45;
    let points = [];
    
    class Point {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
      }
      
      update(mousePos) {
        // Slow time factor for autowave
        const time = Date.now() * 0.0012;
        const waveX = Math.sin(time + this.baseX * 0.008) * 12;
        const waveY = Math.cos(time + this.baseY * 0.008) * 12;
        const animBaseX = this.baseX + waveX;
        const animBaseY = this.baseY + waveY;
        
        const dx = mousePos.x - this.x;
        const dy = mousePos.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 230; // 130% larger warping radius (approx 1.3 * 180 = 234)
        
        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          
          // Target position includes both the animated wave base and the mouse push displacement
          const targetX = animBaseX - Math.cos(angle) * force * 45;
          const targetY = animBaseY - Math.sin(angle) * force * 45;
          
          this.x += (targetX - this.x) * 0.15;
          this.y += (targetY - this.y) * 0.15;
        } else {
          this.x += (animBaseX - this.x) * 0.08;
          this.y += (animBaseY - this.y) * 0.08;
        }
      }
    }
    
    function initGrid() {
      points = [];
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c].push(new Point(c * spacing - 10, r * spacing - 10));
        }
      }
    }
    
    let canvasMouse = { x: -1000, y: -1000 };
    const heroSection = document.getElementById('about');
    
    if (heroSection && canvas) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        canvasMouse.x = e.clientX - rect.left;
        canvasMouse.y = e.clientY - rect.top;
      });
      
      heroSection.addEventListener('mouseleave', () => {
        canvasMouse.x = -1000;
        canvasMouse.y = -1000;
      });
    }
    
    initGrid();
    
    function drawMesh() {
      ctx.clearRect(0, 0, width, height);
      
      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          points[c][r].update(canvasMouse);
        }
      }
      
      ctx.strokeStyle = 'rgba(3, 199, 90, 0.12)';
      ctx.lineWidth = 1;
      
      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          const pt = points[c][r];
          
          if (c < points.length - 1) {
            const nextPt = points[c + 1][r];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }
          
          if (r < points[c].length - 1) {
            const nextPt = points[c][r + 1];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }
          
          ctx.fillStyle = 'rgba(3, 199, 90, 0.35)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      requestAnimationFrame(drawMesh);
    }
    
    drawMesh();
  }


  /* ---------------------------------------------------------
   * 6. One-time Title Typing Animation in Hero Section
   * --------------------------------------------------------- */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const part1 = "디자인과 개발의 \n";
    const part2 = "경계를 허물어";
    const part3 = " 가치를 만듭니다.";

    let p1Idx = 0;
    let p2Idx = 0;
    let p3Idx = 0;
    const speed = 75; // Typing speed in ms

    // Initialize cursor class and empty content
    heroTitle.classList.add('typing-cursor');
    heroTitle.innerHTML = '';

    function typeTitle() {
      if (p1Idx < part1.length) {
        p1Idx++;
        let text = part1.substring(0, p1Idx).replace(/\n/g, '<br>');
        heroTitle.innerHTML = text;
        setTimeout(typeTitle, speed);
      } else if (p2Idx < part2.length) {
        p2Idx++;
        let text1 = part1.replace(/\n/g, '<br>');
        let text2 = `<span class="hero-title-accent">${part2.substring(0, p2Idx)}</span>`;
        heroTitle.innerHTML = text1 + text2;
        setTimeout(typeTitle, speed);
      } else if (p3Idx < part3.length) {
        p3Idx++;
        let text1 = part1.replace(/\n/g, '<br>');
        let text2 = `<span class="hero-title-accent">${part2}</span>`;
        let text3 = part3.substring(0, p3Idx);
        heroTitle.innerHTML = text1 + text2 + text3;
        setTimeout(typeTitle, speed);
      } else {
        // Completed typing!
        // Show pre-title and buttons with a 0.5s delay and 1s transition
        const preTitle = document.querySelector('.hero-pre-title');
        const buttons = document.querySelector('.hero-buttons');
        
        setTimeout(() => {
          if (preTitle) {
            preTitle.style.opacity = '1';
            preTitle.style.transform = 'translateY(0)';
          }
          if (buttons) {
            buttons.style.opacity = '1';
            buttons.style.transform = 'translateY(0)';
            buttons.style.pointerEvents = 'auto';
          }
        }, 500); // 0.5s delay
        
        // Keep cursor blinking for 3 seconds then remove the class
        setTimeout(() => {
          heroTitle.classList.remove('typing-cursor');
        }, 3000);
      }
    }

    // Start typing with a slight delay
    setTimeout(typeTitle, 400);
  }

  /* ---------------------------------------------------------
   * 6.2 Typing Animation in About Page Profile Greeting (Two-line version)
   * --------------------------------------------------------- */
  const aboutTitle = document.getElementById('about-typing-title');
  if (aboutTitle) {
    const line1 = "안녕하세요!";
    const line2Before = "예비 UX 디자이너 ";
    const line2Name = "신민석";
    const line2After = "입니다.";
    
    let charIdx = 0;
    const fullText = line1 + "\n" + line2Before + line2Name + line2After;
    const speed = 65; // Typing speed in ms
    
    aboutTitle.classList.add('typing-cursor');
    aboutTitle.innerHTML = '';
    
    function typeAbout() {
      if (charIdx < fullText.length) {
        charIdx++;
        const typed = fullText.substring(0, charIdx);
        
        // Build displayed HTML with line breaks and green highlight
        let html = '';
        const nameStart = line1.length + 1 + line2Before.length; // index where 신민석 starts
        const nameEnd = nameStart + line2Name.length;           // index where 신민석 ends
        
        for (let i = 0; i < typed.length; i++) {
          const ch = typed[i];
          if (ch === '\n') {
            html += '<br>';
          } else if (i >= nameStart && i < nameEnd) {
            // Check if this is the start of the highlighted span
            if (i === nameStart || (i > 0 && typed[i - 1] === '\n') || i === nameStart) {
              // Find how many highlighted chars we have so far
              let spanEnd = i;
              while (spanEnd < typed.length && spanEnd < nameEnd) {
                spanEnd++;
              }
              html += '<span class="hero-title-accent">' + typed.substring(i, spanEnd) + '</span>';
              i = spanEnd - 1; // skip ahead
            }
          } else {
            html += ch;
          }
        }
        
        aboutTitle.innerHTML = html;
        setTimeout(typeAbout, speed);
      } else {
        // Keep cursor blinking for 3 seconds then remove the class
        setTimeout(() => {
          aboutTitle.classList.remove('typing-cursor');
        }, 3000);
      }
    }
    
    setTimeout(typeAbout, 400);
  }


  /* ---------------------------------------------------------
   * 6.3 Swipe Carousel Controller (Work Page)
   * --------------------------------------------------------- */
  const swipeTrack = document.getElementById('swipe-track');
  const swipeCards = document.querySelectorAll('.swipe-card');
  const swipePrev = document.getElementById('swipe-prev');
  const swipeNext = document.getElementById('swipe-next');
  const swipeInfoTag = document.getElementById('swipe-info-tag');
  const swipeInfoTitle = document.getElementById('swipe-info-title');
  const swipeInfoDesc = document.getElementById('swipe-info-desc');
  const swipeVisitBtn = document.getElementById('swipe-visit-btn');
  
  if (swipeTrack && swipeCards.length > 0) {
    let activeSwipeIndex = 0;
    
    function updateSwipeCarousel(index) {
      if (index < 0 || index >= swipeCards.length) return;
      activeSwipeIndex = index;
      
      // Calculate offset to center the active card
      const containerWidth = swipeTrack.parentElement.offsetWidth;
      const card = swipeCards[index];
      const cardWidth = card.offsetWidth;
      const gap = 24;
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += swipeCards[i].offsetWidth + gap;
      }
      // Center the card
      const centerOffset = (containerWidth - cardWidth) / 2;
      swipeTrack.style.transform = `translateX(${centerOffset - offset}px)`;
      
      // Update active states
      swipeCards.forEach((c, i) => {
        c.classList.toggle('active', i === index);
      });
      
      // Fade out info, update, fade in
      if (swipeInfoTitle) swipeInfoTitle.style.opacity = '0';
      if (swipeInfoDesc) swipeInfoDesc.style.opacity = '0';
      
      setTimeout(() => {
        if (swipeInfoTag) swipeInfoTag.textContent = card.dataset.tag || '';
        if (swipeInfoTitle) {
          swipeInfoTitle.textContent = card.dataset.title || '';
          swipeInfoTitle.style.opacity = '1';
        }
        if (swipeInfoDesc) {
          swipeInfoDesc.textContent = card.dataset.desc || '';
          swipeInfoDesc.style.opacity = '1';
        }
        if (swipeVisitBtn) {
          swipeVisitBtn.href = card.dataset.url || '#';
        }
      }, 250);
    }
    
    if (swipePrev) {
      swipePrev.addEventListener('click', () => {
        updateSwipeCarousel(activeSwipeIndex - 1);
      });
    }
    if (swipeNext) {
      swipeNext.addEventListener('click', () => {
        updateSwipeCarousel(activeSwipeIndex + 1);
      });
    }
    
    // Click on card to go to it or open site
    swipeCards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // Don't navigate if we just finished dragging
        if (wasDragging) { e.preventDefault(); return; }
        
        if (idx === activeSwipeIndex) {
          // If active card is clicked, navigate to the target link
          const url = card.dataset.url;
          if (url) {
            window.open(url, '_blank');
          }
        } else {
          // If inactive card is clicked, center it
          updateSwipeCarousel(idx);
        }
      });
    });
    
    // --- Drag / Touch Swipe Support ---
    let isDragging = false;
    let wasDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;
    let baseTranslateX = 0;
    const SWIPE_THRESHOLD = 60;
    const swipeContainer = swipeTrack.parentElement;
    
    function getBaseTranslateX() {
      const containerWidth = swipeContainer.offsetWidth;
      const card = swipeCards[activeSwipeIndex];
      const cardWidth = card.offsetWidth;
      const gap = 24;
      let offset = 0;
      for (let i = 0; i < activeSwipeIndex; i++) {
        offset += swipeCards[i].offsetWidth + gap;
      }
      return (containerWidth - cardWidth) / 2 - offset;
    }
    
    function onDragStart(clientX) {
      isDragging = true;
      wasDragging = false;
      dragStartX = clientX;
      dragDeltaX = 0;
      baseTranslateX = getBaseTranslateX();
      swipeTrack.style.transition = 'none';
      swipeContainer.style.cursor = 'grabbing';
    }
    
    function onDragMove(clientX) {
      if (!isDragging) return;
      dragDeltaX = clientX - dragStartX;
      swipeTrack.style.transform = `translateX(${baseTranslateX + dragDeltaX}px)`;
      if (Math.abs(dragDeltaX) > 5) wasDragging = true;
    }
    
    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      swipeTrack.style.transition = '';
      swipeContainer.style.cursor = '';
      
      if (dragDeltaX < -SWIPE_THRESHOLD && activeSwipeIndex < swipeCards.length - 1) {
        updateSwipeCarousel(activeSwipeIndex + 1);
      } else if (dragDeltaX > SWIPE_THRESHOLD && activeSwipeIndex > 0) {
        updateSwipeCarousel(activeSwipeIndex - 1);
      } else {
        updateSwipeCarousel(activeSwipeIndex); // snap back
      }
      
      // Reset wasDragging after a tick so click handler can check it
      setTimeout(() => { wasDragging = false; }, 50);
    }
    
    // Mouse events
    swipeContainer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      onDragStart(e.clientX);
    });
    window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
    window.addEventListener('mouseup', onDragEnd);
    
    // Touch events
    swipeContainer.addEventListener('touchstart', (e) => {
      onDragStart(e.touches[0].clientX);
    }, { passive: true });
    swipeContainer.addEventListener('touchmove', (e) => {
      onDragMove(e.touches[0].clientX);
    }, { passive: true });
    swipeContainer.addEventListener('touchend', onDragEnd);
    
    // Initial position
    updateSwipeCarousel(0);
    window.addEventListener('resize', () => updateSwipeCarousel(activeSwipeIndex));
  }

  /* ---------------------------------------------------------
   * 6.4 Artworks Video Section Scroll-linked Width Expansion
   * --------------------------------------------------------- */
  const artworksWrapper = document.querySelector('.artworks-video-wrapper');
  if (artworksWrapper) {
    function updateArtworksExpand() {
      const rect = artworksWrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Progress: 0 when top of element is at bottom of viewport, 1 when fully visible
      let progress = 1 - (rect.top / vh);
      progress = Math.max(0, Math.min(1, progress));
      
      // Expand from 90% width to 100%
      const width = 90 + progress * 10;
      artworksWrapper.style.width = `${width}%`;
      artworksWrapper.style.margin = '0 auto';
      artworksWrapper.style.borderRadius = `${(1 - progress) * 16}px`;
    }
    
    window.addEventListener('scroll', updateArtworksExpand);
    updateArtworksExpand();
  }

  /* ---------------------------------------------------------
   * 7. Header Navigation Mobile Drawer (Drawer style toggle)
   * --------------------------------------------------------- */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      const symbol = mobileMenuBtn.querySelector('.symbol');
      if (symbol) {
        symbol.textContent = isOpen ? 'close' : 'menu';
      }
    });
    
    const drawerLinks = mobileDrawer.querySelectorAll('.nav-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const symbol = mobileMenuBtn.querySelector('.symbol');
        if (symbol) {
          symbol.textContent = 'menu';
        }
      });
    });
  }


  /* ---------------------------------------------------------
   * 8. Academic Assignments Carousel (Slider)
   * --------------------------------------------------------- */
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track ? track.children : []);
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  
  let currentSlideIndex = 0;
  
  if (track && slides.length > 0) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
      indicatorsContainer.appendChild(dot);
    });
    
    const dots = Array.from(indicatorsContainer.children);
    
    function updateControls() {
      if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
      if (nextBtn) nextBtn.disabled = currentSlideIndex === slides.length - 1;
      
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
      });
    }
    
    function goToSlide(targetIndex) {
      if (targetIndex < 0 || targetIndex >= slides.length) return;
      
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 24;
      const amountToMove = targetIndex * (slideWidth + gap);
      
      track.style.transform = `translateX(-${amountToMove}px)`;
      currentSlideIndex = targetIndex;
      updateControls();
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlideIndex + 1);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlideIndex - 1);
      });
    }
    
    window.addEventListener('resize', () => {
      goToSlide(currentSlideIndex);
    });
    
    updateControls();
  }


  /* ---------------------------------------------------------
   * 9. Detail Modal Controller (Dynamic Media Injection)
   * --------------------------------------------------------- */
  const modal = document.getElementById('assignment-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMedia = document.getElementById('modal-media-container');
  
  const modalData = {
    'design-artworks': {
      tag: 'Motion & Graphic Artworks',
      title: 'Design Artworks 모음전',
      desc: '다양한 시각 매체와 3D 그래픽을 탐구한 그래픽 아카이브 영상입니다. Adobe After Effects 및 Blender를 활용하여 가상 브랜딩 시나리오에 맞춤화된 모션 그래픽 필름을 연출하고 편집했습니다.',
      media: `<iframe src="https://www.youtube.com/embed/YX-OpeNZYI4?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    },
    'uiux-study': {
      tag: 'UI/UX Research',
      title: '모바일 앱 UI/UX 리디자인 연구',
      desc: '기존 금융 앱의 송금 프로세스를 분석해 사용자가 병목을 겪는 주요 단계들을 식별했습니다. 스크롤 깊이 및 클릭 반응 분석을 바탕으로 불필요한 입력을 없애고 가독성을 개선해 직관적인 모바일 와이어프레임과 Figma 프로토타입을 설계했습니다.',
      media: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#F8F9FC; display:block;">
                <rect width="100%" height="100%" fill="#F8F9FC"/>
                <rect x="100" y="200" width="140" height="80" rx="8" fill="#03C75A" />
                <text x="170" y="245" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle">1. 연구 및 분석</text>
                <path d="M 240 240 L 290 240" stroke="#CDD4DC" stroke-width="3" fill="none"/>
                <polygon points="290,240 282,235 282,245" fill="#CDD4DC"/>
                <rect x="330" y="200" width="140" height="80" rx="8" fill="#30B041" />
                <text x="400" y="245" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle">2. 와이어프레임</text>
                <path d="M 470 240 L 520 240" stroke="#CDD4DC" stroke-width="3" fill="none"/>
                <polygon points="520,240 512,235 512,245" fill="#CDD4DC"/>
                <rect x="560" y="200" width="140" height="80" rx="8" fill="#121317" />
                <text x="630" y="245" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle">3. 고충격 프로토타입</text>
                <text x="400" y="100" font-family="sans-serif" font-weight="500" font-size="24" fill="#121317" text-anchor="middle">UI/UX 프로세스 흐름도</text>
                <text x="400" y="135" font-family="sans-serif" font-size="14" fill="#45474D" text-anchor="middle">퍼소나 설정을 시작으로 피드백 수렴까지의 디자인 주기</text>
              </svg>`
    },
    'brand-identity': {
      tag: 'Brand Design',
      title: '가상 IT 스타트업 브랜드 아이덴티티 구축',
      desc: '미래 지향적인 AI 에이전트 플랫폼 스타트업을 가상으로 설정하고, 브랜드 네이밍부터 비주얼 아이덴티티 전반을 수립했습니다. 기하학적 그리드 시스템에 의해 조율된 로고 마크는 지성과 연결성을 형상화했으며, 모바일 화면 및 인쇄 매체에 고루 적용되는 디자인 매뉴얼을 집필했습니다.',
      media: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#121317; display:block;">
                <rect width="100%" height="100%" fill="#121317"/>
                <circle cx="400" cy="220" r="90" fill="none" stroke="#03C75A" stroke-width="1.5" />
                <circle cx="400" cy="220" r="60" fill="none" stroke="#30B041" stroke-width="1.5" />
                <path d="M 350 260 L 380 160 L 400 200 L 420 160 L 450 260" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="brand-path" />
                <text x="400" y="385" font-family="sans-serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">MINSEOK BRAND SYSTEM</text>
                <text x="400" y="415" font-family="sans-serif" font-size="13" fill="#B2BBC5" text-anchor="middle" letter-spacing="1">Logo Mark Construction & Typography Grid</text>
              </svg>`
    },
    'interaction-prototype': {
      tag: 'Interaction Design',
      title: '인터랙티브 웹 모션 프로토타이핑 실험',
      desc: '브라우저에서의 화면 프레임워크 전이 및 가속도 센서 연동(모바일)에 어울리는 물리 기반 인터랙션을 구축하는 것을 목적으로 한 개발 실험입니다. GSAP 라이브러리 및 바닐라 JS의 Canvas API를 사용해 대량의 기하학적 파티클이 부드러운 중력 효과와 마우스 반응에 따라 무리 짓는 모션을 연출했습니다.',
      media: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#F8F9FC; display:block;">
                <rect width="100%" height="100%" fill="#F8F9FC"/>
                <path d="M 100 240 Q 250 100, 400 240 T 700 240" fill="none" stroke="#03C75A" stroke-width="4" stroke-linecap="round" />
                <path d="M 100 250 Q 250 150, 400 250 T 700 250" fill="none" stroke="#30B041" stroke-width="2" opacity="0.6" stroke-linecap="round" />
                <circle cx="250" cy="170" r="12" fill="#03C75A" opacity="0.8" />
                <circle cx="550" cy="310" r="10" fill="#30B041" opacity="0.8" />
                <circle cx="400" cy="240" r="6" fill="#121317" />
                <text x="400" y="360" font-family="sans-serif" font-weight="bold" font-size="20" fill="#121317" text-anchor="middle">물리 역학 기반의 웹 인터랙션</text>
                <text x="400" y="390" font-family="sans-serif" font-size="14" fill="#45474D" text-anchor="middle">중력, 마찰력, 탄성 계수를 매개변수화한 자바스크립트 엔진 시뮬레이터</text>
              </svg>`
    },
    'graphic-layout': {
      tag: 'Graphic Design',
      title: '타이포그래피 및 편집 레이아웃',
      desc: '가독성과 조형미를 충족시키는 잡지 더블 스프레드 구성과 기하학적 형태를 접목한 실험적 포스터 그래픽 레이아웃입니다. 문자 자체의 조형성을 발견하고 편집 가이드라인에 맞춰 심미적인 배치를 설계했습니다.',
      media: `<svg viewBox="0 0 800 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#121317; display:block;">
                <rect width="100%" height="100%" fill="#121317"/>
                <rect x="250" y="80" width="300" height="320" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                <line x1="400" y1="80" x2="400" y2="400" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 4" />
                <text x="310" y="160" font-family="sans-serif" font-weight="900" font-size="72" fill="#FFFFFF" text-anchor="middle">T</text>
                <text x="370" y="160" font-family="sans-serif" font-weight="100" font-size="54" fill="#30B041" text-anchor="middle">Y</text>
                <text x="430" y="160" font-family="sans-serif" font-weight="100" font-size="54" fill="#FFFFFF" text-anchor="middle">P</text>
                <text x="490" y="160" font-family="sans-serif" font-weight="900" font-size="72" fill="#03C75A" text-anchor="middle">O</text>
                <rect x="290" y="200" width="220" height="2" fill="rgba(255,255,255,0.3)" />
                <rect x="290" y="220" width="220" height="10" fill="rgba(255,255,255,0.1)" />
                <rect x="290" y="240" width="140" height="10" fill="rgba(255,255,255,0.1)" />
                <circle cx="400" cy="310" r="40" fill="none" stroke="#30B041" stroke-width="3" />
                <line x1="360" y1="310" x2="440" y2="310" stroke="#30B041" stroke-width="1.5" />
                <text x="400" y="380" font-family="sans-serif" font-size="12" fill="#B2BBC5" text-anchor="middle" letter-spacing="2">TYPOGRAPHIC POSTER DESIGN</text>
              </svg>`
    }
  };
  
  window.openAssignmentModal = function(key) {
    const data = modalData[key];
    if (!data) return;
    
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalMedia.innerHTML = data.media;
    
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  };
  
  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modalMedia.innerHTML = '';
    }, 300);
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }


  /* ---------------------------------------------------------
   * 9. Scroll Fade-in Up Animations (Intersection Observer)
   * --------------------------------------------------------- */
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }


  /* ---------------------------------------------------------
   * 10. Header scroll scrolled background behavior
   * --------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    // Only toggle class if dropdown drawer is closed
    if (header && !navDrawer.classList.contains('open')) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });


  /* ---------------------------------------------------------
   * 11. Active navigation state based on page URL
   * --------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === '#') || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
