const dropdown = document.getElementById("timetableDropdown");
const timetableButton = document.getElementById("timetableButton");
const year = document.getElementById("year");
const rotatingWords = document.querySelectorAll(".rotating-word");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (dropdown && timetableButton) {
  timetableButton.addEventListener("click", function () {
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
}

function setActiveNavLink() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".top-nav a").forEach(function (link) {
    const target = (link.getAttribute("href") || "").trim();
    if (target === page) {
      link.classList.add("is-active");
    }
  });
}

function prepareRevealItems() {
  const defaults = [
    ".hero-card",
    ".hero-foreground",
    ".panel",
    ".contact-panel",
    ".media-card",
    ".payment-card",
    ".method-card",
    ".legend-card",
    ".book-card",
    ".bank-detail-card",
    ".table-wrap"
  ];

  defaults.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (item) {
      if (!item.classList.contains("reveal-on-scroll")) {
        item.classList.add("reveal-on-scroll");
      }
    });
  });
}

function observeRevealItems() {
  const revealSections = document.querySelectorAll(".reveal-on-scroll");
  if (!revealSections.length) return;

  if (reduceMotion) {
    revealSections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
  );

  revealSections.forEach(function (section, index) {
    section.style.transitionDelay = Math.min(index * 45, 280) + "ms";
    revealObserver.observe(section);
  });
}

function setupRotatingWords() {
  rotatingWords.forEach(function (element) {
    const wordList = (element.dataset.words || "")
      .split(",")
      .map(function (word) {
        return word.trim();
      })
      .filter(Boolean);

    if (wordList.length === 0) return;

    let index = 0;
    element.textContent = wordList[index];

    if (reduceMotion) return;

    setInterval(function () {
      index = (index + 1) % wordList.length;
      element.textContent = wordList[index];
      element.classList.remove("change");
      void element.offsetWidth;
      element.classList.add("change");
    }, 1800);
  });
}

function setupParallaxStory() {
  if (reduceMotion) return;

  const stories = document.querySelectorAll(".scroll-story");
  if (!stories.length) return;

  const updateParallax = function () {
    stories.forEach(function (story) {
      const img = story.querySelector(".story-image-wrap img");
      const copy = story.querySelector(".story-copy");
      if (!img || !copy) return;

      const rect = story.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (rect.top + rect.height * 0.5) / viewportHeight;
      const offset = (progress - 0.5) * 16;

      img.style.transform = "scale(1.06) translateY(" + offset * -1 + "px)";
      copy.style.transform = "translateY(" + offset * 0.8 + "px)";
    });
  };

  let ticking = false;
  const requestTick = function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
}

function setupTiltCards() {
  if (reduceMotion) return;

  const cards = document.querySelectorAll(
    ".media-card, .payment-card, .method-card, .bank-detail-card, .legend-card, .book-card"
  );

  cards.forEach(function (card) {
    card.classList.add("js-tilt-card");

    card.addEventListener("mousemove", function (event) {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) * 2 - 1) * 5;
      const rotateX = (1 - (y / bounds.height) * 2) * 5;

      card.style.transform =
        "perspective(900px) rotateX(" +
        rotateX.toFixed(2) +
        "deg) rotateY(" +
        rotateY.toFixed(2) +
        "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
}

setActiveNavLink();
prepareRevealItems();
observeRevealItems();
setupRotatingWords();
setupParallaxStory();
setupTiltCards();
