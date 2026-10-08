/* =========================================================
   FLORÉA
   CONTACT PAGE JAVASCRIPT

   Shared navbar / preloader / footer functionality
   is handled by script.js.

   This file handles only Contact page interactions.
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
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
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
       CONTACT LINKS
    ===================================================== */

  const enquiryLinks = document.querySelectorAll(
    'a[href*="docs.google.com/forms"]',
  );

  enquiryLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("form-opening");

      setTimeout(() => {
        link.classList.remove("form-opening");
      }, 700);
    });
  });

  /* =====================================================
       SUBTLE HERO PARALLAX
    ===================================================== */

  const heroImage = document.querySelector(".hero-flower-circle img");

  if (
    heroImage &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (ticking) {
        return;
      }

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        if (scrollPosition < 650) {
          const movement = Math.min(scrollPosition * 0.025, 14);

          heroImage.style.transform = `translateY(${movement}px)`;
        }

        ticking = false;
      });

      ticking = true;
    });
  }

  /* =====================================================
       CONTACT CARD MICRO INTERACTION
    ===================================================== */

  const contactCards = document.querySelectorAll(".contact-info-card");

  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("card-active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("card-active");
    });
  });

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
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

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =====================================================
       ACTIVE CONTACT NAVIGATION
    ===================================================== */

  const contactLink = document.querySelector('.nav-link[href="contact.html"]');

  if (contactLink) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    contactLink.classList.add("active");
  }

  /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

  const contactImages = document.querySelectorAll(
    ".contact-hero img, .enquiry-card img",
  );

  contactImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.opacity = "0.35";
    });
  });
});
