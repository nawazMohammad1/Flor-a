/* =========================================================
   FLORÉA PRIVACY PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -45px 0px",
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
       PRIVACY SIDEBAR NAVIGATION
    ====================================================== */

  const sideLinks = document.querySelectorAll(".privacy-side-link");

  const sections = document.querySelectorAll(".privacy-article[id]");

  sideLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =====================================================
       ACTIVE SECTION ON SCROLL
    ====================================================== */

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const currentId = entry.target.getAttribute("id");

          sideLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle("active", linkTarget === `#${currentId}`);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =====================================================
       HERO IMAGE / VISUAL MICRO PARALLAX
    ====================================================== */

  const heroVisual = document.querySelector(".privacy-hero-visual");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (heroVisual && !reducedMotion) {
    let ticking = false;

    const updateHeroVisual = () => {
      const scrollY = window.scrollY;

      if (scrollY < 650) {
        const movement = Math.min(scrollY * 0.018, 10);

        heroVisual.style.setProperty("--privacy-parallax", `${movement}px`);
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) {
          return;
        }

        ticking = true;

        window.requestAnimationFrame(updateHeroVisual);
      },
      {
        passive: true,
      },
    );
  }

  /* =====================================================
       ARTICLE MICRO INTERACTIONS
    ====================================================== */

  const articles = document.querySelectorAll(".privacy-article");

  articles.forEach((article) => {
    article.addEventListener("mouseenter", () => {
      article.classList.add("privacy-article-hover");
    });

    article.addEventListener("mouseleave", () => {
      article.classList.remove("privacy-article-hover");
    });
  });

  /* =====================================================
       EMAIL LINK FEEDBACK
    ====================================================== */

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("privacy-email-active");

      setTimeout(() => {
        link.classList.remove("privacy-email-active");
      }, 500);
    });
  });

  /* =====================================================
       HASH ON PAGE LOAD
    ====================================================== */

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 700);
    }
  }

  /* =====================================================
       IMAGE ERROR FALLBACK
    ====================================================== */

  const images = document.querySelectorAll(".privacy-hero img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =====================================================
       PAGE READY
    ====================================================== */

  document.body.classList.add("privacy-page-ready");
});
