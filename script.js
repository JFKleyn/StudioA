document.getElementById("contact-btn").addEventListener("click", function () {
    window.location.href = "contact.html";
  });

const targets = document.querySelectorAll('.image-wrapper');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  },
  { threshold: 0.4 }
);

targets.forEach(target => observer.observe(target));

const form = document.getElementById("contact-form");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");

form.addEventListener("submit", function() {
  // Show custom popup
  setTimeout(() => {
    popup.style.display = "block";
    form.reset();
  }, 100);
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});








