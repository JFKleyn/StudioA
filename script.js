document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     BUTTON NAVIGATION
  -------------------------- */

  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "contact/index.html";
    });
  }

  const returnBtn = document.getElementById("return-btn");
  if (returnBtn) {
    returnBtn.addEventListener("click", () => {
      window.location.href = "/contact/index.html";
    });
  }

  /* -------------------------
     INTERSECTION OBSERVER
     (OVERLAY ON SCROLL)
  -------------------------- */

  const targets = document.querySelectorAll(".image-wrapper");

  if (targets.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.4 }
    );

    targets.forEach(target => observer.observe(target));
  }

  /* -------------------------
     CONTACT FORM SUBMIT (CLOUDFLARE)
  -------------------------- */

  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (statusEl) statusEl.textContent = "Sending...";
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Contact API failed:", errText);
          if (statusEl) statusEl.textContent = "Failed to send. Please try again.";
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        // Optional popup handling if you want it before redirect:
        // const popup = document.getElementById("popup");
        // if (popup) popup.style.display = "block";

        window.location.href = "/contact/success";
      } catch (error) {
        console.error(error);
        if (statusEl) statusEl.textContent = "Failed to send. Please try again.";
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

});
