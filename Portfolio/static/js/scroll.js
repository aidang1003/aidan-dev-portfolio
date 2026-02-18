document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('scroll-container');

  // --- Scroll-triggered animations ---
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: scrollContainer,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Handle elements already in view on page load
  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
    } else {
      animationObserver.observe(el);
    }
  });

  // --- Active navigation tracking ---
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__link[data-section]');

  if (scrollContainer && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');

            navLinks.forEach((link) =>
              link.classList.remove('nav__link--active')
            );

            const activeLink = document.querySelector(
              `.nav__link[data-section="${sectionId}"]`
            );
            if (activeLink) {
              activeLink.classList.add('nav__link--active');
            }
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --- Smooth scroll for nav clicks ---
  const allNavLinks = document.querySelectorAll('.nav__link[href^="#"]');

  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Logo click scrolls to hero
  const logo = document.querySelector('.nav__logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Parallax resume download button ---
  // Slides in from the left and fades in as user scrolls toward the resume section.
  // Does NOT use position:fixed (broken inside scroll-snap containers with overflow:hidden).
  // Instead, keeps the button in normal flow and animates transform + opacity.
  const resumeParallaxBtn = document.querySelector('.resume__download--parallax');
  const resumeSection = document.getElementById('resume');

  if (resumeParallaxBtn && resumeSection && scrollContainer) {
    const updateResumeParallax = () => {
      const scrollTop = scrollContainer.scrollTop;
      const viewportHeight = scrollContainer.offsetHeight;
      const sectionTop = resumeSection.offsetTop;

      // Progress: 0 = one full viewport above the section, 1 = section top is at viewport top
      const distance = sectionTop - scrollTop;
      const progress = Math.max(0, Math.min(1, 1 - distance / viewportHeight));

      // Slide from -60vw to 0, opacity from 0 to 1
      const translateX = -60 * (1 - progress); // vw units
      const opacity = progress;

      resumeParallaxBtn.style.transform = `translateX(${translateX}vw)`;
      resumeParallaxBtn.style.opacity = opacity;
    };

    let parallaxTicking = false;
    scrollContainer.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          updateResumeParallax();
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    });

    updateResumeParallax();
  }

  // --- Floating hexagons in honeycomb pattern ---
  if (scrollContainer) {
    const sections = document.querySelectorAll('.section');
    const hexagons = [];
    const hexSize = 60; // Base honeycomb hex size
    const spacing = hexSize * 1.5;

    // Seed each section with hexagons in honeycomb pattern with clustering
    sections.forEach((section) => {
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;

      // Create 3-4 clusters per section
      const clusterCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 clusters
      const hexPerCluster = 3 + Math.floor(Math.random() * 2); // 3-4 hexagons per cluster

      for (let c = 0; c < clusterCount; c++) {
        // Random cluster center position
        const clusterX = Math.random() * (sectionWidth - 300) + 150; // Keep away from edges
        const clusterY = Math.random() * (sectionHeight - 300) + 150;

        // Create 3-4 hexagons around cluster center
        for (let h = 0; h < hexPerCluster; h++) {
          const hex = document.createElement('div');
          const isOutline = Math.random() > 0.5;
          hex.className = 'hexagon' + (isOutline ? ' hexagon--outline' : '');

          // Scatter hexagons around cluster center (within ~150px radius)
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 120;
          const x = clusterX + Math.cos(angle) * distance;
          const y = clusterY + Math.sin(angle) * distance;

          const size = 40 + Math.floor(Math.random() * 40); // 40-80px
          hex.style.width = size + 'px';
          hex.style.height = size + 'px';
          hex.style.left = x + 'px';
          hex.style.top = y + 'px';
          hex.style.opacity = 0.3 + Math.random() * 0.4;

          // Add bounce animation with staggered delay based on position
          const delay = (Math.random() * 0.6) + 's';
          hex.style.animation = `hexagon-bounce 3s ease-in-out infinite ${delay}`;

          // Each hexagon gets a unique float speed for parallax depth
          const speed = 0.15 + Math.random() * 0.35;
          section.appendChild(hex);
          hexagons.push({ el: hex, speed, section });
        }
      }
    });

    // Animate hexagons floating up based on scroll position with stronger parallax
    let ticking = false;
    scrollContainer.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = scrollContainer.scrollTop;
          hexagons.forEach(({ el, speed, section }) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const viewportHeight = scrollContainer.offsetHeight;

            // Calculate how far through the section the user has scrolled
            const scrollWithinSection = Math.max(0, scrollTop - sectionTop);

            // Stronger parallax: multiply by 2-3x for more dramatic movement
            const parallaxSpeed = speed * 2.5;
            const offset = scrollWithinSection * parallaxSpeed;

            // Cap movement at about 50% of viewport height
            const maxOffset = viewportHeight * 0.5;
            const constrainedOffset = Math.min(offset, maxOffset);

            el.style.transform = 'translateY(' + (-constrainedOffset) + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});
