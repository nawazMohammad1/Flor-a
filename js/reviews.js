/* =========================================================
   FLORÉA
   REVIEWS PAGE JAVASCRIPT

   Shared navbar, preloader, header and footer functionality
   is handled by script.js.

   This file handles:
   1. Review filtering
   2. Reveal animation
   3. Image fallback
   4. Small interaction enhancements
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const reviewFilters = document.querySelectorAll(".review-filter");

  const reviewCards = Array.from(document.querySelectorAll(".review-card"));

  const reviewsEmpty = document.getElementById("reviewsEmpty");

  /* =====================================================
       REVIEW FILTER
    ===================================================== */

  function filterReviews(filter) {
    let visibleCount = 0;

    reviewCards.forEach((card, index) => {
      const category = card.dataset.reviewCategory;

      const shouldShow = filter === "all" || category === filter;

      if (shouldShow) {
        card.classList.remove("review-hidden");

        card.classList.remove("review-filter-hide");

        visibleCount++;

        /*
         * Small staggered animation.
         */
        card.style.animationDelay = `${index * 0.05}s`;
      } else {
        card.classList.add("review-filter-hide");

        setTimeout(() => {
          card.classList.add("review-hidden");
        }, 300);
      }
    });

    if (reviewsEmpty) {
      reviewsEmpty.hidden = visibleCount !== 0;
    }
  }

  reviewFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      reviewFilters.forEach((filterButton) => {
        filterButton.classList.remove("active");
      });

      button.classList.add("active");

      filterReviews(filter);
    });
  });

  /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

  const revealElements = document.querySelectorAll(
    ".reviews-hero .reveal, " +
      ".reviews-summary .reveal, " +
      ".reviews-list-section .reveal, " +
      ".review-moment .reveal, " +
      ".reviews-final .reveal",
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
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
  }

  /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

  const reviewImages = document.querySelectorAll(
    ".reviews-hero img, .moment-image img",
  );

  reviewImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =====================================================
       RATING BAR ANIMATION
    ===================================================== */

  const ratingBars = document.querySelectorAll(".rating-bar span");

  if (!reducedMotion && "IntersectionObserver" in window) {
    ratingBars.forEach((bar) => {
      const targetWidth = bar.style.width;

      bar.dataset.width = targetWidth;

      bar.style.width = "0";
    });

    const ratingObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const bar = entry.target;

          setTimeout(() => {
            bar.style.transition = "width 1s cubic-bezier(0.22, 1, 0.36, 1)";

            bar.style.width = bar.dataset.width;
          }, 150);

          observer.unobserve(bar);
        });
      },
      {
        threshold: 0.5,
      },
    );

    ratingBars.forEach((bar) => {
      ratingObserver.observe(bar);
    });
  }

  /* =====================================================
       REVIEW CARD MICRO INTERACTION
    ===================================================== */

  reviewCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("review-card-active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("review-card-active");
    });
  });

  /* =====================================================
       INITIAL FILTER
    ===================================================== */

  filterReviews("all");

  /* =====================================================
       PAGE READY
    ===================================================== */

  document.body.classList.add("reviews-page-ready");
});
