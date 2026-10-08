/* =========================================================
   FLORÉA
   CUSTOM ORDERS JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
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
       HEADER SCROLL
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

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

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
       FLOWER DATA
    ====================================================== */

  const flowerInputs = document.querySelectorAll('input[name="flower"]');

  const colorInputs = document.querySelectorAll('input[name="color"]');

  const sizeInputs = document.querySelectorAll('input[name="size"]');

  const occasionInputs = document.querySelectorAll('input[name="occasion"]');

  /* =====================================================
       SUMMARY ELEMENTS
    ====================================================== */

  const summaryFlower = document.getElementById("summaryFlower");

  const summaryFlowerType = document.getElementById("summaryFlowerType");

  const summaryColor = document.getElementById("summaryColor");

  const summarySize = document.getElementById("summarySize");

  const summaryOccasion = document.getElementById("summaryOccasion");

  const summaryPrice = document.getElementById("summaryPrice");

  const summaryImage = document.getElementById("summaryImage");

  const summaryMessage = document.getElementById("summaryMessage");

  /* =====================================================
       FLOWER IMAGE MAP
    ====================================================== */

  const flowerImages = {
    Roses:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfYKWCHsewERI2KuiUFd2QdcGHeoj0LrPVIL_fhoQJA&s=10",

    Tulips:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=85",

    Lilies:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=85",

    "Mixed Flowers":
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
  };

  /* =====================================================
       BASE PRICE
    ====================================================== */

  const basePrice = 899;

  /* =====================================================
       UPDATE ORDER SUMMARY
    ====================================================== */

  function updateSummary() {
    const selectedFlower = document.querySelector(
      'input[name="flower"]:checked',
    );

    const selectedColor = document.querySelector('input[name="color"]:checked');

    const selectedSize = document.querySelector('input[name="size"]:checked');

    const selectedOccasion = document.querySelector(
      'input[name="occasion"]:checked',
    );

    let total = basePrice;

    /* FLOWER */

    if (selectedFlower) {
      total += Number(selectedFlower.dataset.price || 0);

      const flower = selectedFlower.value;

      if (summaryFlowerType) {
        summaryFlowerType.textContent = flower;
      }

      if (summaryFlower) {
        summaryFlower.textContent = flower + " Bouquet";
      }

      if (summaryImage && flowerImages[flower]) {
        summaryImage.src = flowerImages[flower];
      }
    }

    /* COLOR */

    if (selectedColor) {
      total += Number(selectedColor.dataset.price || 0);

      if (summaryColor) {
        summaryColor.textContent = selectedColor.value;
      }
    }

    /* SIZE */

    if (selectedSize) {
      total += Number(selectedSize.dataset.price || 0);

      if (summarySize) {
        summarySize.textContent = selectedSize.value;
      }
    }

    /* OCCASION */

    if (selectedOccasion) {
      if (summaryOccasion) {
        summaryOccasion.textContent = selectedOccasion.value;
      }
    } else {
      if (summaryOccasion) {
        summaryOccasion.textContent = "Not selected";
      }
    }

    /* PRICE */

    if (summaryPrice) {
      summaryPrice.textContent = "₹" + total.toLocaleString("en-IN");
    }

    updateProgress();
  }

  /* =====================================================
       LISTEN FOR CHANGES
    ====================================================== */

  [...flowerInputs, ...colorInputs, ...sizeInputs, ...occasionInputs].forEach(
    (input) => {
      input.addEventListener("change", updateSummary);
    },
  );

  /* =====================================================
       SIZE SELECTED CLASS
    ====================================================== */

  sizeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll(".size-card").forEach((card) => {
        card.classList.remove("selected");
      });

      const card = input.closest(".size-card");

      if (card) {
        card.classList.add("selected");
      }
    });
  });

  /* =====================================================
       PERSONAL MESSAGE
    ====================================================== */

  const messageInput = document.getElementById("message");

  const messageCount = document.getElementById("messageCount");

  if (messageInput && messageCount) {
    messageInput.addEventListener("input", () => {
      const length = messageInput.value.length;

      messageCount.textContent = length;

      if (summaryMessage) {
        if (messageInput.value.trim()) {
          summaryMessage.textContent = messageInput.value;
        } else {
          summaryMessage.textContent =
            "Your personal message will appear here.";
        }
      }
    });
  }

  /* =====================================================
       PROGRESS
    ====================================================== */

  const progressBar = document.getElementById("progressBar");

  const progressText = document.getElementById("progressText");

  function updateProgress() {
    let completed = 1;

    if (document.querySelector('input[name="flower"]:checked')) {
      completed++;
    }

    if (document.querySelector('input[name="color"]:checked')) {
      completed++;
    }

    if (document.querySelector('input[name="size"]:checked')) {
      completed++;
    }

    if (document.getElementById("customerName")?.value.trim()) {
      completed++;
    }

    if (document.getElementById("phone")?.value.trim()) {
      completed++;
    }

    if (document.getElementById("deliveryDate")?.value) {
      completed++;
    }

    const percentage = Math.min(Math.round((completed / 7) * 100), 100);

    if (progressBar) {
      progressBar.style.width = percentage + "%";
    }

    if (progressText) {
      progressText.textContent = percentage + "%";
    }
  }

  /* =====================================================
       INPUT PROGRESS LISTENERS
    ====================================================== */

  ["customerName", "phone", "deliveryDate", "deliveryTime", "address"].forEach(
    (id) => {
      const input = document.getElementById(id);

      if (input) {
        input.addEventListener("input", updateProgress);

        input.addEventListener("change", updateProgress);
      }
    },
  );

  /* =====================================================
       SET MINIMUM DELIVERY DATE
    ====================================================== */

  const deliveryDate = document.getElementById("deliveryDate");

  if (deliveryDate) {
    const today = new Date();

    const minimumDate = new Date(today);

    minimumDate.setDate(minimumDate.getDate() + 1);

    const year = minimumDate.getFullYear();

    const month = String(minimumDate.getMonth() + 1).padStart(2, "0");

    const day = String(minimumDate.getDate()).padStart(2, "0");

    deliveryDate.min = `${year}-${month}-${day}`;
  }

  /* =====================================================
       SUBMIT CUSTOM ORDER
    ====================================================== */

  const submitOrder = document.getElementById("submitOrder");

  if (submitOrder) {
    submitOrder.addEventListener("click", () => {
      const customerName = document
        .getElementById("customerName")
        ?.value.trim();

      const phone = document.getElementById("phone")?.value.trim();

      const date = document.getElementById("deliveryDate")?.value;

      const address = document.getElementById("address")?.value.trim();

      if (!customerName) {
        showFormMessage("Please enter your name.");

        document.getElementById("customerName")?.focus();

        return;
      }

      if (!phone) {
        showFormMessage("Please enter your phone number.");

        document.getElementById("phone")?.focus();

        return;
      }

      if (!date) {
        showFormMessage("Please select a delivery date.");

        document.getElementById("deliveryDate")?.focus();

        return;
      }

      if (!address) {
        showFormMessage("Please enter the delivery address.");

        document.getElementById("address")?.focus();

        return;
      }

      const flower =
        document.querySelector('input[name="flower"]:checked')?.value ||
        "Not selected";

      const color =
        document.querySelector('input[name="color"]:checked')?.value ||
        "Not selected";

      const size =
        document.querySelector('input[name="size"]:checked')?.value ||
        "Not selected";

      const occasion =
        document.querySelector('input[name="occasion"]:checked')?.value ||
        "Not specified";

      const message = messageInput?.value.trim() || "No personal message";

      const deliveryTime =
        document.getElementById("deliveryTime")?.value || "Not specified";

      const price = summaryPrice?.textContent || "To be confirmed";

      const orderText = `Hello Floréa! I would like to place a custom bouquet order.

Name: ${customerName}
Phone: ${phone}
Flowers: ${flower}
Color: ${color}
Size: ${size}
Occasion: ${occasion}
Delivery Date: ${date}
Delivery Time: ${deliveryTime}
Address: ${address}
Message: ${message}
Estimated Price: ${price}`;

      const whatsappNumber = "919876543210";

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(orderText);

      window.open(whatsappURL, "_blank");
    });
  }

  /* =====================================================
       FORM MESSAGE
    ====================================================== */

  function showFormMessage(message) {
    let notification = document.querySelector(".custom-notification");

    if (!notification) {
      notification = document.createElement("div");

      notification.className = "custom-notification";

      document.body.appendChild(notification);
    }

    notification.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>${message}</span>
        `;

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  /* =====================================================
       SMOOTH ANCHOR LINKS
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
       IMAGE ERROR HANDLING
    ====================================================== */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.opacity = "0";
    });
  });

  /* =====================================================
       INITIAL SUMMARY
    ====================================================== */

  updateSummary();

  updateProgress();

  /* =====================================================
       PAGE READY
    ====================================================== */

  document.body.classList.add("page-ready");
});
