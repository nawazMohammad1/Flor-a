/* =========================================================
   FLORÉA TERMS & CONDITIONS
   Page-specific JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       REVEAL ANIMATIONS
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
       SIDEBAR NAVIGATION
    ====================================================== */

  const sideLinks = document.querySelectorAll(".terms-side-link");

  const sections = document.querySelectorAll(".terms-article[id]");

  sideLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      let target = null;

      try {
        target = document.querySelector(targetId);
      } catch (error) {
        return;
      }

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
       ACTIVE SECTION TRACKING
    ====================================================== */

  if ("IntersectionObserver" in window && sections.length && sideLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = entry.target.getAttribute("id");

          sideLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =====================================================
       HERO CARD MICRO INTERACTION
    ====================================================== */

  const heroCard = document.querySelector(".terms-card");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (heroCard && !reducedMotion) {
    heroCard.addEventListener("mousemove", (event) => {
      const rect = heroCard.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateX = y * -3;
      const rotateY = x * 3;

      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(1deg) translateY(-5px)`;
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "rotate(2deg)";
    });
  }

  /* =====================================================
       RESPONSIBILITY CARD INTERACTION
    ====================================================== */

  const responsibilityItems = document.querySelectorAll(".responsibility-item");

  responsibilityItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("item-active");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("item-active");
    });
  });

  /* =====================================================
       EMAIL LINK FEEDBACK
    ====================================================== */

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("email-opening");

      setTimeout(() => {
        link.classList.remove("email-opening");
      }, 450);
    });
  });

  /* =====================================================
       HASH SCROLL ON PAGE LOAD
    ====================================================== */

  if (window.location.hash) {
    const hash = window.location.hash;

    setTimeout(() => {
      let target = null;

      try {
        target = document.querySelector(hash);
      } catch (error) {
        return;
      }

      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 700);
  }

  /* =====================================================
       CONTACT BUTTON MICRO INTERACTION
    ====================================================== */

  const contactButton = document.querySelector(".contact-box-button");

  if (contactButton) {
    contactButton.addEventListener("mouseenter", () => {
      contactButton.classList.add("button-hover");
    });

    contactButton.addEventListener("mouseleave", () => {
      contactButton.classList.remove("button-hover");
    });
  }

  /* =====================================================
       PAGE READY
    ====================================================== */

  document.body.classList.add("terms-page-ready");
});
