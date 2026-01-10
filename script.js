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

const form = document.getElementById("contact");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop the default page reload

  // Use fetch to submit the form to Netlify
  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      // Show popup
      popup.style.display = "block";
      form.reset(); // optional: clear form
    })
    .catch(err => alert("Error submitting form: " + err));
});

// Close popup button
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});







