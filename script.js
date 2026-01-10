document.getElementById("contact-btn").addEventListener("click", function () {
    window.location.href = "contact.html";
  });

  document.getElementById("return-btn").addEventListener("click", function () {
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
  event.preventDefault(); // prevent default form submission

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => {
      // redirect to success page after successful submission
      window.location.href = "/contact/success";
    })
    .catch(error => alert(error));
};

// attach the handler to your form
document.querySelector("form[name='contact']").addEventListener("submit", handleSubmit);










