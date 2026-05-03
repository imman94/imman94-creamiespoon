// ===== MENU DATA (SCALABLE) =====
const menuData = [
  {
    name: "Mango Custard",
    desc: "100gms Fresh Mango",
    price: 70,
    img: "assets/mango_c.PNG",
    //tag: "🔥 Bestseller"
  },
  {
    name: "Strawberry Custard",
    desc: "100gms Fresh Strawberry",
    price: 70,
    img: "assets/strawberry_c.PNG"
  },
  {
    name: "Kesar Pista Custard",
    desc: "100gms Premium Saffron & Pistachio",
    price: 80,
    img: "assets/kesarP_c.PNG"
  },
  {
    name: "Buttercotch Custard",
    desc: "100gms Rich & Creamy Buttercotch",
    price: 80,
    img: "assets/buttercotch_c.PNG"
  },
  {
    name: "Combo Pack",
    desc: "All 3 Flavors (100gms each)",
    price: 249,
    img: "assets/combo_pak.PNG",
    highlight: true,
    discount: "Save ₹51"
  }
];

// ===== RENDER MENU =====
function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = menuData.map(item => `
    <div class="menu-card ${item.highlight ? 'highlight' : ''}">
      ${item.tag ? `<span class="tag">${item.tag}</span>` : ""}
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="price">
        ₹${item.price}
        ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
      </div>
      <button class="btn btn-primary" onclick="order('${item.name}', ${item.price})">
        Add to Order
      </button>
    </div>
  `).join('');
}

// CALL ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  updateImages(); // important for popup
});


// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL TO SECTIONS =====
function scrollToMenu() {
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } 
}

function scrollToContact() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// ===== ORDER FUNCTION (WHATSAPP INTEGRATION) =====
function order(itemName, price) {
  const message = `Hi Creamie Spoon! 🍨\n\nI'd like to order:\n${itemName}\nPrice: ₹${price}\n\nPlease confirm availability and delivery time.`;

  // Track with Google Analytics
  if (typeof gtag !== "undefined") {
    gtag('event', 'add_to_cart', {
      'items': [{
        'item_name': itemName,
        'price': price
      }]
    });
  }

  // Open WhatsApp
  const whatsappNumber = '918240320833'; // Update with your number
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// ===== INSTAGRAM TRACKING =====
function trackInsta() {
  if (typeof gtag !== "undefined") {
    gtag('event', 'view_item', {
      'content_type': 'social_media',
      'content_id': 'instagram'
    });
  }
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;

    // WhatsApp message
    const whatsappMessage = `Hi Creamie Spoon!\n\nI'm ${name}.\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`;

    // Track form submission
    if (typeof gtag !== "undefined") {
      gtag('event', 'generate_lead', {
        'value': 0,
        'currency': 'INR'
      });
    }

    // Send via WhatsApp
    const whatsappNumber = '918240320833'; // Update with your number
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Show success message
    alert('Thank you! We will contact you soon via WhatsApp.');
    this.reset();

    // Open WhatsApp (optional)
    // window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  });
}

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', function() {
  // Fade in elements on load
  const elements = document.querySelectorAll('.section, .hero, .menu-card, .feature-card');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transition = 'opacity 0.6s ease-in';
    }, index * 50);
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and elements
document.querySelectorAll('.menu-card, .feature-card, .flavor-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== PHONE NUMBER FORMATTER (OPTIONAL) =====
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 10) {
    value = value.slice(0, 10);
  }
  input.value = value;
}

// Apply formatter to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', function() {
    formatPhoneNumber(this);
  });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top';
scrollTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: none;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollTopButton.style.display = 'flex';
    scrollTopButton.style.alignItems = 'center';
    scrollTopButton.style.justifyContent = 'center';
  } else {
    scrollTopButton.style.display = 'none';
  }
});

scrollTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollTopButton.addEventListener('mouseover', function() {
  this.style.background = '#f57c00';
  this.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseout', function() {
  this.style.background = '#ff9800';
  this.style.transform = 'scale(1)';
});




// ===== ADVANCED IMAGE POPUP (GALLERY + SWIPE + PINCH) =====
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.querySelector(".close-popup");

let images = [];

function updateImages() {
  images = document.querySelectorAll(".flavor-image img, .menu-card img");

  images.forEach((img, index) => {
    img.style.cursor = "pointer";

    img.onclick = function () {
      currentIndex = index;
      showImage();
      popup.classList.add("active");
      document.body.classList.add("popup-open");
    };
  });
}
let currentIndex = 0;

// OPEN POPUP
images.forEach((img, index) => {
  img.style.cursor = "pointer";

  img.addEventListener("click", function () {
    currentIndex = index;
    showImage();
    popup.classList.add("active");
    document.body.classList.add("popup-open");
  });
});

function showImage() {
  popupImg.src = images[currentIndex].src;
}

// ===== SWIPE (MOBILE) =====
let startX = 0;

popup.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

popup.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextImage();
  } else if (endX - startX > 50) {
    prevImage();
  }
});

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}


// ===== DESKTOP ARROW NAV =====
document.addEventListener("keydown", (e) => {
  if (!popup.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closePopupFunc();
});

// ===== PINCH ZOOM (MOBILE) =====
let scale = 1;
let startDist = 0;

popupImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    startDist = getDistance(e.touches);
  }
});

popupImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    let newDist = getDistance(e.touches);
    scale = Math.min(Math.max(1, scale * (newDist / startDist)), 3);
    popupImg.style.transform = `scale(${scale})`;
    startDist = newDist;
  }
});

function getDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

// RESET ZOOM WHEN IMAGE CHANGES
function resetZoom() {
  scale = 1;
  popupImg.style.transform = "scale(1)";
}

// MODIFY showImage
function showImage() {
  popupImg.src = images[currentIndex].src;
  resetZoom();
}

// ===== CLOSE =====
function closePopupFunc() {
  popup.classList.remove("active");
  document.body.classList.remove("popup-open");
  resetZoom();
}

closePopup.addEventListener("click", closePopupFunc);

popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopupFunc();
});