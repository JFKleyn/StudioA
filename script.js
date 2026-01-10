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

const handleSubmit = event => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => {
    document.getElementById("popup").style.display = "block";
    myForm.reset();
})
    .catch(error => alert(error));
};

document.getElementById("contact-form").addEventListener("submit", handleSubmit);









