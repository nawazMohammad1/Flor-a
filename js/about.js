/* =========================================================
   FLORÉA
   ABOUT PAGE JAVASCRIPT

   Shared navbar / preloader / footer functionality
   is already handled by script.js.

   This file handles only About page interactions.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

  const counters = document.querySelectorAll(".counter");

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target;

          const target = parseInt(counter.dataset.target, 10) || 0;

          let current = 0;

          const duration = 1200;

          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const ease = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * ease);

            counter.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);

          observer.unobserve(counter);
        });
      },
      {
        threshold: 0.5,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /* =====================================================
       HERO IMAGE PARALLAX
       Very subtle movement only
    ===================================================== */

  const heroImage = document.querySelector(".hero-image-wrap");

  if (
    heroImage &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY < 700) {
            const movement = Math.min(scrollY * 0.035, 18);

            heroImage.style.transform = `rotate(2deg) translateY(${movement}px)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  /* =====================================================
       STORY IMAGE HOVER
    ===================================================== */

  const storyImage = document.querySelector(".story-image");

  if (storyImage) {
    storyImage.addEventListener("mouseenter", () => {
      storyImage.classList.add("image-hover");
    });

    storyImage.addEventListener("mouseleave", () => {
      storyImage.classList.remove("image-hover");
    });
  }

  /* =====================================================
       CURRENT PAGE SAFETY
       Ensures About remains active if shared script
       hasn't detected the path correctly.
    ===================================================== */

  const aboutLink = document.querySelector('.nav-link[href="about.html"]');

  if (aboutLink) {
    aboutLink.classList.add("active");
  }

  /* =====================================================
       IMAGE FALLBACK
       Prevents broken-image icons from disturbing layout.
    ===================================================== */

  const images = document.querySelectorAll(".about-hero img, .story-image img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.opacity = "0.35";
    });
  });
});
