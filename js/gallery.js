/* =========================================================
   FLORÉA
   GALLERY PAGE JAVASCRIPT

   Shared navbar, preloader, header and footer functionality
   is handled by script.js.

   This file handles:
   1. Gallery filters
   2. Lightbox
   3. Previous / next navigation
   4. Keyboard controls
   5. Image fallback
   6. Gallery reveal animation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const galleryGrid = document.getElementById("galleryGrid");

  const filterButtons = document.querySelectorAll(".gallery-filter-btn");

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

  const emptyState = document.getElementById("galleryEmpty");

  /* =====================================================
       GALLERY FILTER
    ===================================================== */

  let currentFilter = "all";

  function filterGallery(filter) {
    currentFilter = filter;

    let visibleCount = 0;

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      const shouldShow = filter === "all" || category === filter;

      if (shouldShow) {
        item.classList.remove("is-hidden");

        visibleCount++;

        item.style.animation = "galleryItemIn 0.45s ease both";
      } else {
        item.classList.add("is-hidden");

        item.style.animation = "none";
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      filterGallery(filter);
    });
  });

  /* =====================================================
       LIGHTBOX ELEMENTS
    ===================================================== */

  const lightbox = document.getElementById("galleryLightbox");

  const lightboxImage = document.getElementById("lightboxImage");

  const lightboxTitle = document.getElementById("lightboxTitle");

  const lightboxCategory = document.getElementById("lightboxCategory");

  const lightboxClose = document.getElementById("lightboxClose");

  const lightboxPrev = document.getElementById("lightboxPrev");

  const lightboxNext = document.getElementById("lightboxNext");

  let visibleGalleryItems = [];

  let currentIndex = 0;

  /* =====================================================
       GET VISIBLE ITEMS
    ===================================================== */

  function updateVisibleItems() {
    visibleGalleryItems = galleryItems.filter((item) => {
      return !item.classList.contains("is-hidden");
    });
  }

  /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

  function openLightbox(index) {
    updateVisibleItems();

    if (!visibleGalleryItems.length) {
      return;
    }

    currentIndex = Math.max(0, Math.min(index, visibleGalleryItems.length - 1));

    showLightboxImage(currentIndex);

    if (!lightbox) {
      return;
    }

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("gallery-lightbox-open");

    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  /* =====================================================
       DISPLAY LIGHTBOX IMAGE
    ===================================================== */

  function showLightboxImage(index) {
    const item = visibleGalleryItems[index];

    if (!item) {
      return;
    }

    const button = item.querySelector(".gallery-image-button");

    if (!button) {
      return;
    }

    const imageUrl = button.dataset.image;

    const title = button.dataset.title || "Flower Arrangement";

    const category = button.dataset.category || "Floréa";

    if (lightboxImage) {
      lightboxImage.src = imageUrl;

      lightboxImage.alt = title;
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = title;
    }

    if (lightboxCategory) {
      lightboxCategory.textContent = category;
    }
  }

  /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("gallery-lightbox-open");
  }

  /* =====================================================
       NEXT IMAGE
    ===================================================== */

  function showNextImage() {
    updateVisibleItems();

    if (!visibleGalleryItems.length) {
      return;
    }

    currentIndex = (currentIndex + 1) % visibleGalleryItems.length;

    showLightboxImage(currentIndex);
  }

  /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

  function showPreviousImage() {
    updateVisibleItems();

    if (!visibleGalleryItems.length) {
      return;
    }

    currentIndex =
      (currentIndex - 1 + visibleGalleryItems.length) %
      visibleGalleryItems.length;

    showLightboxImage(currentIndex);
  }

  /* =====================================================
       GALLERY IMAGE BUTTONS
    ===================================================== */

  galleryItems.forEach((item) => {
    const button = item.querySelector(".gallery-image-button");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      updateVisibleItems();

      const index = visibleGalleryItems.indexOf(item);

      openLightbox(index);
    });
  });

  /* =====================================================
       LIGHTBOX CONTROLS
    ===================================================== */

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPreviousImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
  }

  /* =====================================================
       CLOSE WHEN CLICKING BACKDROP
    ===================================================== */

  const backdrop = document.querySelector("[data-close-lightbox]");

  if (backdrop) {
    backdrop.addEventListener("click", closeLightbox);
  }

  /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();

      return;
    }

    if (event.key === "ArrowRight") {
      showNextImage();

      return;
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();

      return;
    }
  });

  /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

  const galleryImages = document.querySelectorAll(".gallery-image-button img");

  galleryImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

  const revealElements = document.querySelectorAll(
    ".gallery-showcase .reveal, " +
      ".gallery-intro .reveal, " +
      ".gallery-quote .reveal, " +
      ".gallery-final .reveal",
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
       GALLERY ITEM ANIMATION
    ===================================================== */

  const galleryStyle = document.createElement("style");

  galleryStyle.textContent = `
        @keyframes galleryItemIn {
            from {
                opacity: 0;
                transform: translateY(12px) scale(0.98);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;

  document.head.appendChild(galleryStyle);

  /* =====================================================
       INITIAL GALLERY STATE
    ===================================================== */

  filterGallery("all");

  /* =====================================================
       PREVENT BACKGROUND SCROLL
    ===================================================== */

  if (lightbox) {
    const observer = new MutationObserver(() => {
      const isOpen = lightbox.classList.contains("active");

      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    observer.observe(lightbox, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  /* =====================================================
       PAGE READY
    ===================================================== */

  document.body.classList.add("gallery-page-ready");
});
