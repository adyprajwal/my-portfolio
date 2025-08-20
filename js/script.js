// script.js — multipage-safe
document.addEventListener("DOMContentLoaded", () => {
  const typingEl  = document.querySelector(".typing");
  const articleEl = document.querySelector(".article");

  if (typingEl && articleEl && window.Typed) {
    const strings = [
      "",
      "GRC Analyst",
      "Information Systems Auditor",
      "Cybersecurity Professional"
    ];

    const pickArticle = (t = "") => {
      t = t.trim();
      if (!t) return "a";

      if (/^(hour|honest|honor|heir)/i.test(t)) return "an"; // vowel-sound exceptions
      if (/^(uni(vers|que|anim)|user|ubiquit|euro)/i.test(t)) return "a"; // consonant sound with vowels
      if (/^[A-Z]{2,}/.test(t)) return /^[FHLMNRSX]/.test(t[0]) ? "an" : "a"; // acronyms
      return /^[aeiou]/i.test(t) ? "an" : "a"; // default
    };

  // Create exactly ONE Typed instance (remove any other inits)
  const typed = new Typed(".typing", {
    strings,
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1200,
    smartBackspace: true,
    loop: true,
    // Set article for the first string immediately
    onBegin: (self) => {
      articleEl.textContent = pickArticle(self.strings[0]);
    },
    // Update article before each new string types
    preStringTyped: (idx, self) => {
      articleEl.textContent = pickArticle(self.strings[idx]);
    },
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
