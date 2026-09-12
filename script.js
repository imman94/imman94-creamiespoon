const WA = "918240320833";  

const MENU = [
  { name: "Mango Custard", desc: "Rich, creamy custard blended with real mango goodness—smooth, refreshing, and irresistibly delicious in every spoon.", price: 70, img: "assets/mango_c.webp", discount: "🔥 Bestseller" },
  { name: "Strawberry Custard", desc: "Fresh, juicy strawberries blended into rich creamy, refreshing, and bursting with fruity flavor, perfect for every craving.", price: 70, img: "assets/strawberry_c.webp" },
  { name: "Kesar Pista Custard", desc: "Rich, creamy custard with aromatic saffron and crunchy pistachios—smooth, royal, and irresistibly indulgent in every spoon.", price: 80, img: "assets/kesarP_c.webp" },
  { name: "Butterscotch Custard", desc: "Creamy caramel custard with crunchy butterscotch—sweet, rich, and delightful in every bite.", price: 80, img: "assets/buttercotch_c.webp" },
  { name: "The Ultimate Combo Pack", desc: "Two Mango Custards paired with Strawberry and Kesar Pista, perfectly balanced blend of fruity, creamy & royal indulgence.", price: 269, img: "assets/combo_pak.webp", discount: "Save ₹21" },
  { name: "The 4 in 1 Bucket Combo Pack", desc: "Can’t pick one? Get all four! A curated blend of Mango, Kesar Pista, Butterscotch & Strawberry Crafted for the perfect balance of flavor and indulgence.", price: 279, img: "assets/4_in_1_combo_pack.webp", discount: "Save ₹21" }
];

const FLAVORS = [
  { name: "Mango Custard", desc: "Sweet, creamy mango flavor using seasonal seasonal mangoes.", badge: "Most Popular", img: "assets/mango_c.webp" },
  { name: "Kesar Pista Custard", desc: "Premium saffron & pistachio blend, perfect for celebrations.", badge: "Premium", img: "assets/kesarP_c.webp" },
  { name: "Strawberry Custard", desc: "Fresh strawberry flavor with real fruit pieces.", badge: "Fresh", img: "assets/strawberry_c.webp" },
  { name: "Butterscotch Custard", desc: "Rich and creamy butterscotch flavor with a hint of vanilla.", badge: "Newly Added", img: "assets/buttercotch_c.webp" }
];

const FAQS = [
  { q: "How long does delivery take?", a: "We deliver within 30-45 minutes in south Kolkata. Same-day delivery available for orders before 2 PM." },
  { q: "Are your custards made fresh?", a: "Yes! All custards are made fresh daily in the morning. We don't store or freeze them." },
  { q: "Do you use artificial flavors?", a: "No! We use 100% natural ingredients. No artificial colors or flavors added." },
  { q: "Can I customize flavors for bulk orders?", a: "Absolutely! We can create custom recipes for weddings and corporate events." },
  { q: "What's your delivery area?", a: "We deliver across south Kolkata. Minimum 10+ orders. Extra charges apply for areas beyond 5km." },
  { q: "Can I pre-order for future dates?", a: "Yes! Pre-orders are available for 30+ orders. Contact us for bulk bookings." }
];

function order(name, price) {
  const msg = `Hi Creamie Spoon! 🍨\n\nI'd like to order:\n${name}\nPrice: ₹${price}\n\nPlease confirm availability and delivery time.`;
  if (typeof gtag !== "undefined") gtag("event", "add_to_cart", { items: [{ item_name: name, price }] });
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  closeOrderSheet();
}

function renderFlavors() {
  document.getElementById("flavorsGrid").innerHTML = FLAVORS.map(f => `
    <article class="flavor-card">
      <div class="zoom"><img src="${f.img}" alt="${f.name}" loading="lazy"></div>
      <div class="flavor-head"><h3>${f.name}</h3><span class="flavor-badge">${f.badge}</span></div>
      <p>${f.desc}</p>
    </article>`).join("");
}

function renderMenu() {
  document.getElementById("menuGrid").innerHTML = MENU.map((m, i) => `
    <article class="menu-card" data-idx="${i}">
      <div class="img-wrap">
        <img src="${m.img}" alt="${m.name}" loading="lazy">
        ${m.discount ? `<span class="menu-badge">${m.discount}</span>` : ""}
      </div>
      <div class="menu-body">
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="menu-foot">
          <span class="menu-price">₹${m.price}</span>
          <button class="menu-order" data-idx="${i}">Add to Order</button>
        </div>
      </div>
    </article>`).join("");

  document.querySelectorAll(".menu-order").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const m = MENU[+btn.dataset.idx];
      order(m.name, m.price);
    });
  });
  document.querySelectorAll(".menu-card .img-wrap").forEach((el, i) => {
    el.addEventListener("click", () => openZoom(MENU[i].img, MENU[i].name));
  });
}

function renderFaqs() {
  document.getElementById("faqGrid").innerHTML = FAQS.map((f, i) => `
    <div class="faq-item">
      <span class="num">${String(i + 1).padStart(2, "0")}</span>
      <div><h3>${f.q}</h3><p>${f.a}</p></div>
    </div>`).join("");
}

function renderSheet() {
  document.getElementById("sheetList").innerHTML = MENU.map((m, i) => `
    <div class="sheet-row" data-idx="${i}">
      <img src="${m.img}" alt="${m.name}">
      <div class="info"><div>${m.name}</div><div>₹${m.price}</div></div>
      <i class="fab fa-whatsapp"></i>
    </div>`).join("");
  document.querySelectorAll(".sheet-row").forEach(row => {
    row.addEventListener("click", () => {
      const m = MENU[+row.dataset.idx];
      order(m.name, m.price);
    });
  });
}

/* zoom lightbox */
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImgEl = document.getElementById("zoomImg");
function openZoom(src, alt) {
  zoomImgEl.src = src;
  zoomImgEl.alt = alt;
  zoomOverlay.classList.add("open");
}
function closeZoom() { zoomOverlay.classList.remove("open"); }
zoomOverlay.addEventListener("click", closeZoom);
document.getElementById("zoomClose").addEventListener("click", closeZoom);

/* order sheet */
const orderSheet = document.getElementById("orderSheet");
const sheetBackdrop = document.getElementById("sheetBackdrop");
function toggleOrderSheet() {
  orderSheet.classList.toggle("open");
  sheetBackdrop.classList.toggle("open");
}
function closeOrderSheet() {
  orderSheet.classList.remove("open");
  sheetBackdrop.classList.remove("open");
}
document.getElementById("stickyOrder").addEventListener("click", toggleOrderSheet);
document.getElementById("stickyInfo").addEventListener("click", toggleOrderSheet);
sheetBackdrop.addEventListener("click", closeOrderSheet);
document.getElementById("sheetClose").addEventListener("click", closeOrderSheet);

/* mobile nav */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if (menuToggle) menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
document.querySelectorAll(".nav-menu a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("active")));

/* scroll progress */
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  document.getElementById("scrollProgress").style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
}, { passive: true });

/* reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

/* whatsapp contact form */
function sendWhatsApp() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  if (!name || !phone) { alert("Please fill Name and Phone"); return; }
  const text = `Hi 👋\n\nName: ${name}\nPhone: ${phone}\n\nMessage:\n${message}\n\nI want to know more about your custards 🍨`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  renderFlavors();
  renderMenu();
  renderFaqs();
  renderSheet();
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
});
