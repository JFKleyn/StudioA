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

form.addEventListener("submit", function(event) {
  event.preventDefault(); // ⚠️ Prevent default Netlify popup

  const formData = new FormData(form);

  // Submit to Netlify using fetch
  fetch("/", {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/x-www-form-urlencoded" }
  })
  .then(() => {
    // Show custom popup
    popup.style.display = "block";
    form.reset();
  })
  .catch((error) => {
    alert("There was an error submitting the form.");
    console.error(error);
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});








