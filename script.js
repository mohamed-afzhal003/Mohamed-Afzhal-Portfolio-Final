const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const topBtn = document.getElementById("topBtn");
const year = document.getElementById("year");
const typed = document.getElementById("typed");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const words = ["Full Stack Developer", "Java Developer", "Software Developer"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];
  typed.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
  let delay = deleting ? 55 : 90;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    charIndex = 0;
    delay = 450;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
