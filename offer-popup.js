/* ===== LIMITED-TIME COMBO OFFER POPUP =====
   Shows once per visitor (first visit). Remove the <script src="offer-popup.js"> line in index.html to disable.
   Test again: open the site with ?offer=1, or run showComboOffer() in the console. */
(function () {
  const KEY = "cs_combo_offer_seen_v1"; // change the suffix to show a new offer to everyone again
  const DELAY = 1500;
  const WA = "918240320833";
  const COMBOS = [
    { name: "The Ultimate Combo Pack", desc: "2 Mango + Strawberry + Kesar Pista", price: 319, save: "Save ₹7", img: "assets/combo_pak.webp" },
    { name: "The 4 in 1 Bucket Combo Pack", desc: "Mango, Kesar Pista, Butterscotch & Strawberry", price: 329, save: "Save ₹7", img: "assets/4_in_1_combo_pack.webp" }
  ];

  const css = `
.co-backdrop{position:fixed;inset:0;z-index:1400;background:rgba(20,16,14,.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .3s ease}
.co-backdrop.open{opacity:1;pointer-events:auto}
.co-modal{position:relative;width:100%;max-width:640px;max-height:calc(100vh - 40px);overflow:auto;background:var(--paper,#F6F3EE);border-radius:16px;box-shadow:0 40px 90px rgba(0,0,0,.35);padding:clamp(24px,4vw,36px);transform:translateY(24px) scale(.96);transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
.co-backdrop.open .co-modal{transform:none}
.co-close{position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:50%;border:1px solid var(--line,rgba(26,22,20,.12));background:#fff;color:var(--ink,#1A1614);font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}
.co-close:hover{background:var(--ink,#1A1614);color:#fff}
.co-tag{display:inline-flex;align-items:center;gap:8px;background:var(--accent,#0F766E);color:#fff;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:7px 14px;border-radius:999px;margin-bottom:14px}
.co-tag i{animation:coPulse 1.4s ease-in-out infinite}
@keyframes coPulse{0%,100%{opacity:1}50%{opacity:.35}}
.co-modal h2{font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.1;margin:0 0 8px;padding-right:36px}
.co-modal h2 em{color:var(--accent,#0F766E)}
.co-sub{color:var(--muted,#6F655C);font-size:.98rem;margin:0 0 22px}
.co-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr));gap:16px}
.co-card{background:#fff;border:1px solid var(--line,rgba(26,22,20,.12));border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:transform .3s ease,box-shadow .3s ease}
.co-card:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(26,22,20,.14)}
.co-img{position:relative;aspect-ratio:4/3;overflow:hidden;background:rgba(26,22,20,.05)}
.co-img img{width:100%;height:100%;object-fit:cover;display:block}
.co-save{position:absolute;top:10px;left:10px;background:var(--accent,#0F766E);color:#fff;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 11px;border-radius:999px}
.co-body{padding:16px;display:flex;flex-direction:column;gap:6px;flex:1}
.co-body h3{font-size:1.15rem;margin:0}
.co-body p{color:var(--muted,#6F655C);font-size:.88rem;margin:0;flex:1}
.co-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;flex-wrap:wrap}
.co-price{font-family:'Newsreader',Georgia,serif;font-size:1.6rem;line-height:1}
.co-order{display:inline-flex;align-items:center;gap:7px;padding:11px 16px;min-height:44px;border:none;border-radius:999px;background:var(--accent,#0F766E);color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background .2s,transform .2s}
.co-order:hover{background:var(--ink,#1A1614);transform:scale(1.04)}
.co-later{display:block;margin:18px auto 0;background:none;border:none;color:var(--muted,#6F655C);font-family:inherit;font-size:13px;text-decoration:underline;cursor:pointer;min-height:44px}
.co-later:hover{color:var(--ink,#1A1614)}
body.co-lock{overflow:hidden}
@media (prefers-reduced-motion:reduce){.co-modal,.co-backdrop{transition:none}.co-tag i{animation:none}}`;

  function build() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const wrap = document.createElement("div");
    wrap.className = "co-backdrop";
    wrap.id = "comboOffer";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "coTitle");
    wrap.innerHTML = `
      <div class="co-modal">
        <button class="co-close" aria-label="Close offer">&times;</button>
        <span class="co-tag"><i class="fas fa-bolt"></i> Limited Time Offer</span>
        <h2 id="coTitle">Our Combo Packs, <em>now at a special price</em></h2>
        <p class="co-sub">Can’t pick one flavour? Grab a combo and save — made fresh today.</p>
        <div class="co-grid">
          ${COMBOS.map((c, i) => `
          <div class="co-card">
            <div class="co-img"><img src="${c.img}" alt="${c.name}"><span class="co-save">${c.save}</span></div>
            <div class="co-body">
              <h3>${c.name}</h3>
              <p>${c.desc}</p>
              <div class="co-foot">
                <span class="co-price">₹${c.price}</span>
                <button class="co-order" data-i="${i}"><i class="fab fa-whatsapp"></i> Order Now</button>
              </div>
            </div>
          </div>`).join("")}
        </div>
        <button class="co-later">Maybe later</button>
      </div>`;
    document.body.appendChild(wrap);

    wrap.addEventListener("click", e => { if (e.target === wrap) hide(); });
    wrap.querySelector(".co-close").addEventListener("click", hide);
    wrap.querySelector(".co-later").addEventListener("click", hide);
    wrap.querySelectorAll(".co-order").forEach(b => b.addEventListener("click", () => {
      const c = COMBOS[+b.dataset.i];
      if (typeof gtag !== "undefined") gtag("event", "select_promotion", { promotion_name: "combo_offer", items: [{ item_name: c.name, price: c.price }] });
      hide();
      if (typeof order === "function") order(c.name, c.price, 1);
      else window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Creamie Spoon! 🍨\n\nI'd like to order:\n${c.name} x 1\nTotal: ₹${c.price}\n\n(Limited time combo offer)`)}`, "_blank");
    }));
    document.addEventListener("keydown", e => { if (e.key === "Escape") hide(); });
    return wrap;
  }

  let el;
  function show() {
    el = el || build();
    document.body.classList.add("co-lock");
    requestAnimationFrame(() => el.classList.add("open"));
    if (typeof gtag !== "undefined") gtag("event", "view_promotion", { promotion_name: "combo_offer" });
  }
  function hide() {
    if (!el) return;
    el.classList.remove("open");
    document.body.classList.remove("co-lock");
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  }
  window.showComboOffer = show;

  function init() {
    let seen = false;
    try { seen = localStorage.getItem(KEY) === "1"; } catch (e) {}
    if (!seen || /[?&]offer=1/.test(location.search)) setTimeout(show, DELAY);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
