/* =========================================================
   FLORÉA — BOUQUETS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       BOUQUET FILTER
    ====================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const bouquetCards = document.querySelectorAll(".bouquet-card");

  const noResults = document.getElementById("noResults");

  if (filterButtons.length && bouquetCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        /* Active button */

        filterButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        let visibleCount = 0;

        bouquetCards.forEach((card) => {
          const category = card.dataset.category;

          const shouldShow = filter === "all" || category === filter;

          if (shouldShow) {
            visibleCount++;

            card.classList.remove("is-hidden", "filter-out");

            card.style.display = "";
          } else {
            card.classList.add("filter-out");

            setTimeout(() => {
              card.classList.add("is-hidden");
            }, 250);
          }
        });

        /* No results */

        if (noResults) {
          if (visibleCount === 0) {
            noResults.classList.add("show");
          } else {
            noResults.classList.remove("show");
          }
        }
      });
    });
  }

  /* =====================================================
       QUICK VIEW
    ====================================================== */

  const quickViewButtons = document.querySelectorAll(".quick-view");

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest(".bouquet-card");

      if (!card) return;

      const name = card.querySelector(".bouquet-top h3");

      const price = card.querySelector(".bouquet-price");

      const image = card.querySelector(".bouquet-image img");

      if (!name || !price || !image) {
        return;
      }

      openBouquetModal(
        name.textContent.trim(),
        price.textContent.trim(),
        image.src,
      );
    });
  });

  /* =====================================================
       MODAL
    ====================================================== */

  function openBouquetModal(name, price, image) {
    const existingModal = document.querySelector(".bouquet-modal");

    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");

    modal.className = "bouquet-modal";

    modal.innerHTML = `
            <div class="bouquet-modal-overlay"></div>

            <div class="bouquet-modal-content">

                <button
                    class="bouquet-modal-close"
                    type="button"
                    aria-label="Close"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="bouquet-modal-image">
                    <img
                        src="${image}"
                        alt="${name}"
                    >
                </div>

                <div class="bouquet-modal-info">

                    <span>
                        FLORÉA BOUQUET
                    </span>

                    <h2>
                        ${name}
                    </h2>

                    <strong>
                        ${price}
                    </strong>

                    <p>
                        Beautifully arranged with fresh seasonal
                        flowers and Floréa's signature attention
                        to detail.
                    </p>

                    <a
                        href="custom-orders.html"
                        class="modal-order-btn"
                    >
                        Order This Bouquet
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>

            </div>
        `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.classList.add("show");
    });

    document.body.classList.add("modal-open");

    const closeButton = modal.querySelector(".bouquet-modal-close");

    const overlay = modal.querySelector(".bouquet-modal-overlay");

    function closeModal() {
      modal.classList.remove("show");

      document.body.classList.remove("modal-open");

      setTimeout(() => {
        modal.remove();
      }, 300);
    }

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", function escapeHandler(event) {
      if (event.key === "Escape") {
        closeModal();

        document.removeEventListener("keydown", escapeHandler);
      }
    });
  }

  /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

  const images = document.querySelectorAll(
    ".bouquet-image img, .hero-image-frame img",
  );

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.opacity = "0";

      const parent = image.parentElement;

      if (parent) {
        parent.classList.add("image-load-error");
      }
    });
  });

  /* =====================================================
       CARD MOUSE MOVEMENT
       Very subtle interaction
    ====================================================== */

  const cards = document.querySelectorAll(".bouquet-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 850) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1.2;

      const rotateY = ((x - centerX) / centerX) * 1.2;

      card.style.transform = `translateY(-9px)
                     perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* =====================================================
       SMOOTH HERO LINK
    ====================================================== */

  const heroLink = document.querySelector(".hero-scroll-link");

  if (heroLink) {
    heroLink.addEventListener("click", (event) => {
      const target = document.querySelector("#bouquetCollection");

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  /* =====================================================
       REDUCE MOTION SUPPORT
    ====================================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    cards.forEach((card) => {
      card.style.transition = "none";
    });
  }
});
