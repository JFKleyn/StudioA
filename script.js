document.getElementById("contact-btn").addEventListener("click", function () {
    window.location.href = "contact.html";
  });

// Select all cards
const cards = document.querySelectorAll('.card');

// IntersectionObserver callback
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); // optional
      }
    });
  },
  {
    threshold: 0.4, // trigger when 40% of the element is visible
    rootMargin: '0px', // optional: tweak if elements are partially offscreen
  }
);

// Observe each card
cards.forEach((card) => {
  observer.observe(card);
});

// Optional: Force hardware acceleration for iOS Safari
cards.forEach((card) => {
  card.style.transform = 'translateZ(0)';
  card.style.backfaceVisibility = 'hidden';
});

