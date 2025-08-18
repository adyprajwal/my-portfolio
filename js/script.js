// script.js — multipage-safe

document.addEventListener("DOMContentLoaded", () => {
  /* ========================= Typing Animation (guarded) ========================= */
  const typingEl = document.querySelector(".typing");
  if (typingEl && window.Typed) {
    // Note: 'backSpeed' (lowercase 'b') is the correct option
    new Typed(".typing", {
      strings: [
        "",
        "Cybersecurity Professional",
        "GRC Analyst",
        "Information Systems Auditor",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }

  /* ========================= Mobile Aside Toggler (multipage) ========================= */
  const navTogglerBtn = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");
  const sections = document.querySelectorAll(".section"); // okay if empty

  function toggleAside(open) {
    const method = open === true ? "add" : open === false ? "remove" : "toggle";
    if (aside) aside.classList[method]("open");
    if (navTogglerBtn) navTogglerBtn.classList[method]("open");
    if (sections && sections.length) sections.forEach(s => s.classList[method]("open"));
  }

  if (navTogglerBtn) {
    navTogglerBtn.addEventListener("click", () => toggleAside());
  }

  /* ========================= Close menu after clicking a nav link (mobile) ========================= */
  const nav = document.querySelector(".nav");
  if (nav) {
    nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      // Let normal navigation happen; just close the drawer for nicer UX on small screens
      if (window.innerWidth < 1200) toggleAside(false);
    });
  }

  /* ========================= Highlight active link by URL ========================= */
  if (nav) {
    const current = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const normalized = href === "#" || href === "" ? "index.html" : href;
      if (normalized === current) a.classList.add("active");
      else a.classList.remove("active");
    });
  }

  /* ========================= "Hire me" button (optional) ========================= */
  const hireBtn = document.querySelector(".hire-me");
  if (hireBtn) {
    hireBtn.addEventListener("click", (e) => {
      // Use data-href if provided; default to contact page
      const targetPage = hireBtn.dataset.href || "contact.html";
      window.location.href = targetPage;
    });
  }
});
