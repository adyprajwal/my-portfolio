/* ========================= Toggle Style Switcher ========================= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});

// Hide style-switcher on scroll
window.addEventListener("scroll", () => {
  const switcher = document.querySelector(".style-switcher");
  if (switcher.classList.contains("open")) {
    switcher.classList.remove("open");
  }
});

/* ========================= Theme Colors ========================= */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
      localStorage.setItem("color", color); // Save selection
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

// On page load, apply saved color
window.addEventListener("DOMContentLoaded", () => {
  const savedColor = localStorage.getItem("color");
  if (savedColor) {
    setActiveStyle(savedColor);
  }
});

/* ========================= Theme Light and Dark Mode ========================= */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
  dayNight.querySelector("em").classList.toggle("fa-sun");
  dayNight.querySelector("em").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// On page load, restore saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    dayNight.querySelector("em").classList.add("fa-sun");
  } else {
    document.body.classList.remove("dark");
    dayNight.querySelector("em").classList.add("fa-moon");
  }
});
