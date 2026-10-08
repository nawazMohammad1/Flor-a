/* =========================================================
   FLORÉA FAQ PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ====================================================== */

  const faqItems = document.querySelectorAll(".faq-item");
  const faqQuestions = document.querySelectorAll(".faq-question");
  const faqFilters = document.querySelectorAll(".faq-filter");

  const faqSearch = document.getElementById("faqSearch");
  const clearSearch = document.getElementById("clearSearch");
  const faqNoResults = document.getElementById("faqNoResults");

  /* =====================================================
       FAQ ACCORDION
    ====================================================== */

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentItem = question.closest(".faq-item");

      if (!currentItem) return;

      const isOpen = currentItem.classList.contains("open");

      /*
       * Close all other FAQ items
       */

      faqItems.forEach((item) => {
        if (item !== currentItem) {
          item.classList.remove("open");

          const button = item.querySelector(".faq-question");

          if (button) {
            button.setAttribute("aria-expanded", "false");
          }
        }
      });

      /*
       * Toggle current item
       */

      if (isOpen) {
        currentItem.classList.remove("open");

        question.setAttribute("aria-expanded", "false");
      } else {
        currentItem.classList.add("open");

        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* =====================================================
       CATEGORY FILTER
    ====================================================== */

  let activeCategory = "all";

  function applyFilters() {
    const searchTerm = faqSearch ? faqSearch.value.trim().toLowerCase() : "";

    let visibleCount = 0;

    faqItems.forEach((item) => {
      const category = item.dataset.category || "";

      const question =
        item.dataset.question ||
        item.querySelector(".faq-question-text")?.textContent ||
        "";

      const answer = item.querySelector(".faq-answer-inner")?.textContent || "";

      const searchableText = `${question} ${answer}`.toLowerCase();

      const categoryMatches =
        activeCategory === "all" || category === activeCategory;

      const searchMatches = !searchTerm || searchableText.includes(searchTerm);

      const shouldShow = categoryMatches && searchMatches;

      if (shouldShow) {
        item.classList.remove("is-hidden");

        visibleCount++;
      } else {
        item.classList.add("is-hidden");

        item.classList.remove("open");

        const button = item.querySelector(".faq-question");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      }
    });

    /*
     * Show / hide no-results message
     */

    if (faqNoResults) {
      if (visibleCount === 0) {
        faqNoResults.classList.add("visible");
        faqNoResults.setAttribute("aria-hidden", "false");
      } else {
        faqNoResults.classList.remove("visible");
        faqNoResults.setAttribute("aria-hidden", "true");
      }
    }

    /*
     * Search clear button
     */

    if (clearSearch && faqSearch) {
      if (faqSearch.value.trim() !== "") {
        clearSearch.classList.add("visible");
      } else {
        clearSearch.classList.remove("visible");
      }
    }
  }

  faqFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      faqFilters.forEach((button) => {
        button.classList.remove("active");
      });

      filter.classList.add("active");

      activeCategory = filter.dataset.category || "all";

      applyFilters();
    });
  });

  /* =====================================================
       FAQ SEARCH
    ====================================================== */

  if (faqSearch) {
    faqSearch.addEventListener("input", () => {
      applyFilters();
    });
  }

  /* =====================================================
       CLEAR SEARCH
    ====================================================== */

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (!faqSearch) return;

      faqSearch.value = "";

      faqSearch.focus();

      applyFilters();
    });
  }

  /* =====================================================
       ESCAPE KEY
    ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openItem = document.querySelector(".faq-item.open");

      if (openItem) {
        openItem.classList.remove("open");

        const button = openItem.querySelector(".faq-question");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

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
       FAQ ITEM MICRO INTERACTION
    ====================================================== */

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("mouseenter", () => {
      if (!item.classList.contains("open")) {
        item.style.transform = "translateY(-2px)";
      }
    });

    question.addEventListener("mouseleave", () => {
      if (!item.classList.contains("open")) {
        item.style.transform = "translateY(0)";
      }
    });
  });

  /* =====================================================
       HERO IMAGE FALLBACK
    ====================================================== */

  const heroImage = document.querySelector(".faq-flower-image img");

  if (heroImage) {
    heroImage.addEventListener("error", () => {
      heroImage.style.opacity = "0.25";
    });
  }

  /* =====================================================
       SMOOTH FAQ ANCHOR
    ====================================================== */

  const faqLinks = document.querySelectorAll('a[href="#faq-list"]');

  faqLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById("faq-list");

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =====================================================
       INITIAL STATE
    ====================================================== */

  activeCategory = "all";

  applyFilters();

  /* =====================================================
       PAGE READY
    ====================================================== */

  document.body.classList.add("faq-page-ready");
});
