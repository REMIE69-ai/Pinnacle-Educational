const dropdown = document.getElementById("timetableDropdown");
const timetableButton = document.getElementById("timetableButton");
const year = document.getElementById("year");
const revealSections = document.querySelectorAll(".reveal-on-scroll");
const rotatingWords = document.querySelectorAll(".rotating-word");

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

if (revealSections.length > 0) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  revealSections.forEach(function (section) {
    revealObserver.observe(section);
  });
}

rotatingWords.forEach(function (element) {
  const wordList = (element.dataset.words || "")
    .split(",")
    .map(function (word) {
      return word.trim();
    })
    .filter(Boolean);

  if (wordList.length === 0) {
    return;
  }

  let index = 0;
  element.textContent = wordList[index];

  setInterval(function () {
    index = (index + 1) % wordList.length;
    element.textContent = wordList[index];
    element.classList.remove("change");
    void element.offsetWidth;
    element.classList.add("change");
  }, 1800);
});
