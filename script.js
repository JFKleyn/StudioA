document.getElementById("contact-btn").addEventListener("click", function () {
    window.location.href = "contact.html";
  });

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); // optional
      }
    });
  },
  {
    threshold: 0.4
  }
);

cards.forEach(card => observer.observe(card));
