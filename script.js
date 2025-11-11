(function () {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const submenuBtn = document.getElementById('submenu-btn');
  const submenu = document.getElementById('submenu');
  const submenuIcon = document.getElementById('submenu-icon');
  

  let menuOpen = false;
  let submenuOpen = false;

  menuBtn?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open'); // show menu via CSS .mobile-menu.open
      menuBtn.innerHTML = '<i class="ri-close-line"></i>';
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('open');
      menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  submenuBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    submenuOpen = !submenuOpen;
    if (submenuOpen) {
      submenu.classList.add('open');       // your CSS should display .submenu.open
      submenuIcon.classList.add('rotate'); // rotate icon (add .rotate rule in CSS)
    } else {
      submenu.classList.remove('open');
      submenuIcon.classList.remove('rotate');
    }
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
      menuBtn.setAttribute('aria-expanded', 'false');
      submenuOpen = false;
      submenu.classList.remove('open');
      submenuIcon.classList.remove('rotate');
    });
  });

  // Prevent '#' links from changing URL
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });
})();


// logic for dyanamic gallary images 

const galleryGrid = document.getElementById('galleryGrid');
const lightboxContainer = document.getElementById('galleryLightboxes');

const galleryImages = [
  'gallery_01.webp', 'gallery_02.webp', 'gallery_03.webp', 'gallery_04.webp',
  'gallery_05.webp', 'gallery_06.webp', 'gallery_07.webp',
  'galleryy_01.webp', 'galleryy_02.webp', 'galleryy_03.webp',
  'galleryy_04.webp', 'galleryy_05.webp', 'galleryy_06.webp', 'galleryy_07.webp'
];

galleryImages.forEach((img, i) => {
  const index = i + 1;
  const thumb = `./image/${img}`;
  const large = `./image/${img}`;

  /* ---------- GALLERY CARD ---------- */
  const card = document.createElement("a");
  card.className = "gal-card";
  card.href = `#img${index}`;
  card.innerHTML = `
    <figure style="
      overflow: hidden;
      border-radius: 14px;
      position: relative;
      cursor: pointer;
      background: #f9f9f9;
      transition: all 0.4s ease;
      box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    ">
      <img src="${thumb}" alt="Gallery ${index}" style="
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      ">
      <figcaption style="
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        background: linear-gradient(transparent, rgba(0,0,0,0.6));
        color: #fff;
        font-size: 0.9rem;
        padding: 10px 0;
        opacity: 0;
        transition: opacity 0.3s ease;
      ">Click to view</figcaption>
    </figure>
  `;
  card.onmouseenter = () => {
    const imgEl = card.querySelector("img");
    const cap = card.querySelector("figcaption");
    imgEl.style.transform = "scale(1.06)";
    cap.style.opacity = "1";
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
  };
  card.onmouseleave = () => {
    const imgEl = card.querySelector("img");
    const cap = card.querySelector("figcaption");
    imgEl.style.transform = "scale(1)";
    cap.style.opacity = "0";
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
  };

  galleryGrid.appendChild(card);

  /* ---------- LIGHTBOX ---------- */
  const box = document.createElement("div");
  box.id = `img${index}`;
  box.className = "gal-lightbox";
  box.style = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(8px);
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
    transition: opacity 0.4s ease;
  `;
  box.innerHTML = `
    <a href="#" class="gal-close" aria-label="Close" style="
      position: absolute;
      top: 20px;
      right: 30px;
      color: #fff;
      font-size: 2.2rem;
      text-decoration: none;
      cursor: pointer;
      z-index: 10;
      transition: transform 0.3s ease;
    ">&times;</a>
    <a class="gal-prev" style="
      position: absolute;
      left: 40px;
      color: #fff;
      font-size: 2.5rem;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      z-index: 10;
    ">&#10094;</a>
    <a class="gal-next" style="
      position: absolute;
      right: 40px;
      color: #fff;
      font-size: 2.5rem;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      z-index: 10;
    ">&#10095;</a>
    <img src="${large}" alt="Gallery ${index}" style="
      max-width: 90%;
      max-height: 80vh;
      border-radius: 12px;
      opacity: 0;
      transform: scale(0.95);
      box-shadow: 0 0 30px rgba(0,0,0,0.6);
      transition: opacity 0.4s ease, transform 0.4s ease;
    ">
  `;
  lightboxContainer.appendChild(box);

  /* ---------- OPEN LIGHTBOX ---------- */
  card.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".gal-lightbox").forEach(lb => (lb.style.display = "none"));
    box.style.display = "flex";
    setTimeout(() => {
      box.querySelector("img").style.opacity = "1";
      box.querySelector("img").style.transform = "scale(1)";
    }, 50);
  });

  /* ---------- CLOSE LIGHTBOX ---------- */
  const closeBtn = box.querySelector(".gal-close");
  closeBtn.addEventListener("click", e => {
    e.preventDefault();
    const imgEl = box.querySelector("img");
    imgEl.style.opacity = "0";
    imgEl.style.transform = "scale(0.95)";
    setTimeout(() => (box.style.display = "none"), 250);
  });

  /* ---------- NEXT / PREV ---------- */
  const nextBtn = box.querySelector(".gal-next");
  const prevBtn = box.querySelector(".gal-prev");
  nextBtn.addEventListener("click", e => {
    e.preventDefault();
    const nextIndex = (index % galleryImages.length) + 1;
    box.style.display = "none";
    document.querySelector(`#img${nextIndex}`).style.display = "flex";
    setTimeout(() => {
      const nextImg = document.querySelector(`#img${nextIndex} img`);
      nextImg.style.opacity = "1";
      nextImg.style.transform = "scale(1)";
    }, 50);
  });
  prevBtn.addEventListener("click", e => {
    e.preventDefault();
    const prevIndex = index - 1 <= 0 ? galleryImages.length : index - 1;
    box.style.display = "none";
    document.querySelector(`#img${prevIndex}`).style.display = "flex";
    setTimeout(() => {
      const prevImg = document.querySelector(`#img${prevIndex} img`);
      prevImg.style.opacity = "1";
      prevImg.style.transform = "scale(1)";
    }, 50);
  });

  /* ---------- ESC KEY CLOSE ---------- */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && box.style.display === "flex") {
      closeBtn.click();
    }
  });
});


document.addEventListener("click", (e) => {
  const img = e.target.closest(".gal-lightbox img");
  if (!img) return;
  img.classList.toggle("zoomed");
});

document.addEventListener("click", (e) => {
  const lightbox = e.target.closest(".gal-lightbox");

  // ✅ If clicking on image → toggle zoom
  if (e.target.matches(".gal-lightbox img")) {
    e.target.classList.toggle("zoomed");
    return;
  }

  // ✅ If clicked on background (outside image) → close the lightbox
  if (lightbox && !e.target.closest("img")) {
    window.location.hash = ""; // remove #id to close lightbox
  }
});



// =============== footer ================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.copyright').innerHTML =
      `${new Date().getFullYear()} © Dr Bhavin Brahmbhatt. All rights reserved.`;
  });