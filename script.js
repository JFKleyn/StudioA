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
      window.location.href = "contact/index.html";
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
      {
        threshold: 0.4
      }
    );

    targets.forEach(target => observer.observe(target));
  }

  /* -------------------------
     CONTACT FORM SUBMIT
  -------------------------- */

  const contactForm = document.querySelector("form[name='contact']");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => {
          window.location.href = "/contact/success";
        })
        .catch(error => {
          alert("Form submission failed");
          console.error(error);
        });
    });
  }

});
