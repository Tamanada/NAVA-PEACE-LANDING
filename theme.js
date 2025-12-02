window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    const logo = document.getElementById("mainLogo");

    if (!btn || !logo) {
        console.error("Theme toggle: element not found");
        return;
    }

    // Thème par défaut : BLUE
    let currentTheme = "blue";
    document.documentElement.setAttribute("data-theme", "blue");

    btn.textContent = "Dark Theme";  // Le bouton propose d'aller vers le mode noir
    logo.src = "assets/logo_original.png"; // Logo pour le thème bleu

    btn.addEventListener("click", () => {
        if (currentTheme === "blue") {
            // Passer au thème noir
            document.documentElement.setAttribute("data-theme", "dark");
            btn.textContent = "Blue Theme"; 
            logo.src = "assets/logo_black.png";
            currentTheme = "dark";
        } else {
            // Revenir au thème bleu
            document.documentElement.setAttribute("data-theme", "blue");
            btn.textContent = "Dark Theme";
            logo.src = "assets/logo_original.png";
            currentTheme = "blue";
        }
    });

    console.log("Theme script loaded OK");
});
/* ======================================
   APP SCREEN AUTO-SLIDER
   ====================================== */

let currentSlide = 0;
const slides = document.querySelectorAll(".mockup-slide");

function changeSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 3000);
/* ======================================
   APP SCREEN AUTO-SLIDER (SAFE MODE)
   ====================================== */

window.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".mockup-slide");
    if (slides.length === 0) {
        console.error("No slides found");
        return;
    }

    let currentSlide = 0;
    slides[currentSlide].classList.add("active");

    function changeSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    setInterval(changeSlide, 4000);
    // ==============================
// LANGUAGE SYSTEM
// ==============================

const langSwitcher = document.getElementById("langSwitcher");

// Load language function
async function loadLanguage(lang) {
    const response = await fetch(`json/${lang}.json`);
    const translations = await response.json();

    // Replace all data-i18n text
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
            el.innerHTML = translations[key];
        }
    });

    localStorage.setItem("lang", lang);
}

// Detect saved language or default browser
const savedLang = localStorage.getItem("lang") || navigator.language.slice(0,2) || "en";
langSwitcher.value = savedLang;
loadLanguage(savedLang);

// When user changes the language
langSwitcher.addEventListener("change", (e) => {
    loadLanguage(e.target.value);
});

});
