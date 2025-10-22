// ====== HOME PAGE CARD TOGGLE ======
const toggleBtn = document.querySelector(".btn-toggle");
const card = document.querySelector(".profile-card");
if (toggleBtn && card) {
  let expanded = false;
  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    card.classList.toggle("active", expanded);

    toggleBtn.innerHTML = expanded
      ? `<i class="fa-solid fa-circle-xmark"></i> See less`
      : `<i class="fa-solid fa-circle-plus"></i> See more`;
  });
}

// ====== DISPLAY LIVE TIME ======
const timeElement = document.querySelector("[data-testid='test-user-time']");
if (timeElement) {
  const updateTime = () => {
    timeElement.textContent =
      "Current time: " + new Date().toLocaleTimeString();
  };
  updateTime();
  setInterval(updateTime, 1000);
}

// ====== NAVBAR HAMBURGER MENU ======
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });
}

// --- CONTACT FORM VALIDATION & submit
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvnblgq";

  const nameEl = document.getElementById("contact-name");
  const emailEl = document.getElementById("contact-email");
  const subjectEl = document.getElementById("contact-subject");
  const messageEl = document.getElementById("contact-message");

  const errName = document.getElementById("error-name");
  const errEmail = document.getElementById("error-email");
  const errSubject = document.getElementById("error-subject");
  const errMessage = document.getElementById("error-message");
  const successEl = document.getElementById("contact-success");

  const resetErrors = () => {
    [errName, errEmail, errSubject, errMessage].forEach((el) => {
      if (el) el.textContent = "";
    });
    if (successEl) {
      successEl.textContent = "";
      successEl.style.display = "none";
    }
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    resetErrors();

    let valid = true;
    if (!nameEl.value.trim()) {
      errName.textContent = "Full name is required.";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim()) {
      errEmail.textContent = "Email is required.";
      valid = false;
    } else if (!emailPattern.test(emailEl.value.trim())) {
      errEmail.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (!subjectEl.value.trim()) {
      errSubject.textContent = "Subject is required.";
      valid = false;
    }

    if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
      errMessage.textContent = "Message must be at least 10 characters.";
      valid = false;
    }

    if (!valid) return;

    if (!FORMSPREE_ENDPOINT) {
      successEl.textContent = "Your message has been successfully sent!";
      successEl.style.display = "block";
      contactForm.reset();
      return;
    }

    try {
      const payload = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        subject: subjectEl.value.trim(),
        message: messageEl.value.trim(),
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        successEl.textContent = "Your message has been successfully sent!";
        successEl.style.display = "block";
        contactForm.reset();
      } else {
        const data = await response.json();
        successEl.textContent =
          data?.error || "An error occurred while sending your message.";
        successEl.style.display = "block";
      }
    } catch (err) {
      successEl.textContent = "An error occurred while sending your message.";
      successEl.style.display = "block";
    }
  });
}
