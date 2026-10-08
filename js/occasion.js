/* =========================================================
   FLORÉA — OCCASION PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
       Same behavior as index.html / bouquets.html
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
       MOBILE NAVIGATION
       Same behavior as shared script.js
    ====================================================== */

  const menuToggle = document.getElementById("menuToggle");

  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    const closeMenu = () => {
      menuToggle.classList.remove("active");

      navMenu.classList.remove("active");

      document.body.classList.remove("menu-open");

      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }

  /* =====================================================
       STICKY HEADER
    ====================================================== */

  const header = document.getElementById("header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 45) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
       SCROLL REVEAL
    ====================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);
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
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       CURRENT YEAR
    ====================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
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
       OCCASION CARD INTERACTION
    ====================================================== */

  const occasionCards = document.querySelectorAll(".occasion-card");

  occasionCards.forEach((card) => {
    const viewButton = card.querySelector(".occasion-view");

    if (!viewButton) {
      return;
    }

    viewButton.addEventListener("click", () => {
      card.classList.toggle("card-highlight");

      setTimeout(() => {
        card.classList.remove("card-highlight");
      }, 900);
    });
  });

  /* =====================================================
       CARD HOVER TILT
       Very subtle effect
    ====================================================== */

  const canHover = window.matchMedia("(hover: hover)").matches;

  if (canHover) {
    occasionCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -1.5;

        const rotateY = ((x - centerX) / centerX) * 1.5;

        card.style.transform = `translateY(-8px)
                         perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-load-error");

      image.style.opacity = "0";
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")?.split("/").pop().toLowerCase();

    link.classList.remove("active");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* =====================================================
       PAGE READY
    ====================================================== */

  document.body.classList.add("page-ready");
});
