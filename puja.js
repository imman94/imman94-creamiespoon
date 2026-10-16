/* ===== DURGA PUJA FESTIVE THEME =====
   Active automatically 16 Oct 2026 00:00 – 21 Oct 2026 23:59 (IST). Outside those dates the site looks normal.
   Preview anytime:  yoursite.com/?puja=1   ·   Force off:  ?puja=0
   Festive photos: drop files at the paths in PHOTOS — each one only replaces the original if the file exists. */
(function () {
  const START = Date.UTC(2026, 9, 15, 18, 30); // 16 Oct 2026 00:00 IST
  const END = Date.UTC(2026, 9, 21, 18, 30);   // 22 Oct 2026 00:00 IST
  const PHOTOS = {
    ".hero-img": "assets/puja/hero.webp",
    ".about-grid .img-frame img": "assets/puja/about.webp",
    ".insta-img-wrap img": "assets/puja/instagram.webp"
  };
  const DURGA = "assets/durga.webp"; // Maa Durga face — faded background behind the hero text

  const q = location.search;
  const now = Date.now();
  const on = /[?&]puja=1/.test(q) || (!/[?&]puja=0/.test(q) && now >= START && now < END);
  if (!on) return;

  document.documentElement.classList.add("puja");
  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap";
  document.head.appendChild(font);

  function mandala() {
    let p = "";
    for (let i = 0; i < 16; i++) p += `<path d="M200 118C216 148 216 170 200 190C184 170 184 148 200 118Z" transform="rotate(${i * 22.5} 200 200)"/>`;
    for (let i = 0; i < 24; i++) p += `<path d="M200 40C211 60 211 74 200 88C189 74 189 60 200 40Z" transform="rotate(${i * 15} 200 200)"/>`;
    let d = "";
    for (let i = 0; i < 36; i++) d += `<circle cx="200" cy="24" r="3" transform="rotate(${i * 10} 200 200)"/>`;
    for (let i = 0; i < 16; i++) d += `<circle cx="200" cy="100" r="2.4" transform="rotate(${i * 22.5 + 11.25} 200 200)"/>`;
    return `<svg viewBox="0 0 400 400" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="200" cy="200" r="12"/><circle cx="200" cy="200" r="82"/><circle cx="200" cy="200" r="112" stroke-dasharray="3 6"/><circle cx="200" cy="200" r="162"/>${p}</g><g fill="currentColor">${d}</g></svg>`;
  }

  function decorate() {
    const header = document.querySelector(".navbar");
    if (header) header.insertAdjacentHTML("beforebegin",
      `<div class="pj-ribbon"><i class="fas fa-drum" aria-hidden="true"></i><span lang="bn">শুভ শারদীয়া</span><span>Celebrate Pujo with fresh homemade custards</span><i class="fas fa-drum" aria-hidden="true"></i></div>`);

    const heroCol = document.querySelector(".hero-grid > div:first-child");
    if (heroCol) heroCol.insertAdjacentHTML("afterbegin",
      `<div class="pj-greet hero-anim"><span lang="bn">শুভ শারদীয়া</span><small><i class="fas fa-drum" aria-hidden="true"></i> Durga Puja 2026</small></div>`);

    const imgWrap = document.querySelector(".hero-img-wrap");
    if (imgWrap) imgWrap.insertAdjacentHTML("afterbegin", `<div class="pj-mandala">${mandala()}</div>`);

    const heroSec = document.querySelector(".hero");
    if (heroSec) {
      const live = /creamiespoon\.com$/.test(location.hostname);
      const durga = new Image();
      durga.onload = () => heroSec.insertAdjacentHTML("afterbegin",
        `<div class="pj-durga-bg" aria-hidden="true" style="background-image:url('${DURGA}')"></div>`);
      durga.onerror = () => { if (!live) heroSec.insertAdjacentHTML("afterbegin",
        `<div class="pj-durga-bg pj-durga-empty" aria-hidden="true"><span>Maa Durga background<br><b>assets/durga.webp</b></span></div>`); };
      durga.src = DURGA;
    }

    const hero = document.querySelector(".hero");
    if (hero) {
      const spots = [["8%", "3%", -10, 0], ["93%", "4%", 20, 1.2], ["30%", "46%", 40, 2.1], ["93%", "40%", -25, .6], ["12%", "92%", 15, 1.8], ["62%", "94%", -30, 2.8]];
      hero.insertAdjacentHTML("beforeend", spots.map(([t, l, r, dl]) =>
        `<span class="pj-shiuli" aria-hidden="true" style="top:${t};left:${l};--r:${r}deg;animation-delay:${dl}s"></span>`).join(""));
    }

    const fb = document.querySelector(".footer-bottom");
    if (fb) fb.insertAdjacentHTML("afterbegin", `<p class="pj-foot-greet" lang="bn">শুভ শারদীয়া — from all of us at Creamie Spoon</p>`);

    Object.entries(PHOTOS).forEach(([sel, src]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const im = new Image();
      im.onload = () => { el.src = src; };
      im.src = src;
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", decorate);
  else decorate();
})();
