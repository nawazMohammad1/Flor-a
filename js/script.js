/* =========================================================
   FLORÉA — MAIN JAVASCRIPT
   "Beautifully Arranged. Thoughtfully Given."
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       01. PRELOADER
    ====================================================== */

  const preloader = document.getElementById("preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hide");
      }, 700);
    });
  }

  /* =====================================================
       02. MOBILE NAVIGATION
    ====================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      document.body.classList.toggle("menu-open", isOpen);
    });

    /* Close menu when clicking a navigation link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
      });
    });

    /* Close menu when pressing Escape */

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
      }
    });
  }

  /* =====================================================
       03. STICKY HEADER
    ====================================================== */

  const header = document.getElementById("header");

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 45) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderScroll();

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* =====================================================
       04. SCROLL REVEAL ANIMATION
    ====================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
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
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
       05. ACTIVE NAVIGATION
    ====================================================== */

  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  const navigationLinks = document.querySelectorAll(".nav-link");

  navigationLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop().toLowerCase();

    if (linkPage === currentPage && linkPage !== "#") {
      navigationLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    }
  });

  /* =====================================================
       06. CURRENT YEAR
    ====================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       07. SMOOTH ANCHOR LINKS
    ====================================================== */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       08. BUTTON / CARD MICRO INTERACTION
    ====================================================== */

  const interactiveElements = document.querySelectorAll(
    ".btn, .nav-order, .text-link, .occasion-card, .bouquet-card",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("is-hovering");
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("is-hovering");
    });
  });

  /* =====================================================
       09. PREVENT MENU ISSUES ON RESIZE
    ====================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850 && navMenu && menuToggle) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    }
  });

  /* =====================================================
       10. IMAGE LOAD FALLBACK
    ====================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");

      /*
       * Keeps the layout intact if an external
       * image temporarily fails.
       */

      image.style.opacity = "0";
    });
  });

  /* =====================================================
       11. PAGE READY
    ====================================================== */

  document.body.classList.add("page-ready");
});
