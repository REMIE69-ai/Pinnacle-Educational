const dropdown = document.getElementById("timetableDropdown");
const timetableButton = document.getElementById("timetableButton");
const year = document.getElementById("year");

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
