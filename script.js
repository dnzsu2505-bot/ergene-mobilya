let currentCategory = [];
let currentIndex = 0;
const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");

let zoom = 1;

function loadCategory(cat) {
  gallery.innerHTML = "";
  currentCategory = PHOTOS[cat] || [];

  currentCategory.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => openImage(index);
    gallery.appendChild(img);
  });
}


function openImage(index) {
  currentIndex = index;
  overlay.style.display = "flex";
  overlayImg.src = currentCategory[currentIndex];
  zoom = 1;
  overlayImg.style.transform = "scale(1)";
}


overlay.addEventListener("wheel", e => {
  e.preventDefault();
  zoom += e.deltaY * -0.001;
  zoom = Math.min(Math.max(1, zoom), 3);
  overlayImg.style.transform = `scale(${zoom})`;
});



overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

document.querySelectorAll(".sidebar button").forEach(btn => {
  btn.onclick = () => loadCategory(btn.dataset.cat);
});

loadCategory("fabrika_tanitimi");
const translations = {
  tr: {
    title: "Ergene Mobilya Sunumu",
    fabrika_tanitimi: "Fabrika Tanıtımı",
    kapi_modelleri: "Kapı Modelleri",
    mutfak_dolabi: "Mutfak Dolapları",
    banyo_dolabi: "Banyo Dolapları",
    calisma_odasi: "Çalışma Odası",
    yatak_odasi: "Yatak Odası",
    tv_unitesi: "TV Ünitesi",
    ayakkabilik: "Ayakkabılık"
  },
  en: {
    title: "Ergene Furniture Presentation",
    fabrika_tanitimi: "Factory Overview",
    kapi_modelleri: "Door Models",
    mutfak_dolabi: "Kitchen Cabinets",
    banyo_dolabi: "Bathroom Cabinets",
    calisma_odasi: "Study Room",
    yatak_odasi: "Bedroom",
    tv_unitesi: "TV Unit",
    ayakkabilik: "Shoe Cabinet"
  }
};

function setLanguage(lang) {
  document.querySelector(".title").innerText = translations[lang].title;

  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.innerText = translations[lang][btn.dataset.cat];
  });
}

document.getElementById("tr").onclick = () => setLanguage("tr");
document.getElementById("en").onclick = () => setLanguage("en");

document.querySelector(".nav.left").onclick = e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentCategory.length) % currentCategory.length;
  overlayImg.src = currentCategory[currentIndex];
};

document.querySelector(".nav.right").onclick = e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentCategory.length;
  overlayImg.src = currentCategory[currentIndex];
};


