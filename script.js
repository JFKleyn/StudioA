document.getElementById("contact-btn").addEventListener("click", function () {
    window.location.href = "contact.html";
  });

const targets = document.querySelectorAll('overlay');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  },
  {
    threshold: 0.4
  }
);

targets.forEach(target => observer.observe(target));





