/* =========================================
   1. MOBILE NAVIGATION
========================================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.textContent = "☰";
  document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the mobile menu if the screen becomes wide.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

/* =========================================
   2. PROFILE IMAGE FALLBACK
========================================= */
const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");

if (profilePhoto && photoFallback) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
    photoFallback.style.display = "grid";
  });
}

/* =========================================
   3. PROJECT DETAILS POPUP
========================================= */
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModalButton = document.getElementById("closeModal");

function closeModal() {
  if (!projectModal) return;

  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".project-button").forEach((button) => {
  button.addEventListener("click", () => {
    const projectName = button.dataset.project || "Project";

    if (modalTitle) modalTitle.textContent = projectName;

    if (modalDescription) {
      modalDescription.textContent =
        `The detailed project page, screenshots and live link for ${projectName} will be added here when they are ready.`;
    }

    if (projectModal) {
      projectModal.classList.add("open");
      projectModal.setAttribute("aria-hidden", "false");
    }

    if (closeModalButton) closeModalButton.focus();
  });
});

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) closeModal();
  });
}

/* =========================================
   4. KEYBOARD SUPPORT
========================================= */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMenu();
  }
});

/* =========================================
   5. AUTOMATIC FOOTER YEAR
========================================= */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}