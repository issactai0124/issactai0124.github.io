// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburgerBtn.addEventListener('click', function() {
    mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});
window.addEventListener('resize', function() {
    if(window.innerWidth > 800) {
        mobileMenu.style.display = 'none';
    }
});

// Portfolio slideshow JS (W3Schools style)
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("portfolio-slide");
  let dots = document.getElementsByClassName("portfolio-dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Portfolio Lightbox JS (single modal, classic overlay)
const lightboxModal = document.getElementById('portfolioLightboxModal');
const lightboxImg = document.getElementById('portfolioLightboxImg');
const lightboxClose = document.getElementById('portfolioLightboxClose');
document.querySelectorAll('.portfolio-img-thumb').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        lightboxModal.style.display = 'flex';
        lightboxImg.src = this.getAttribute('data-img') || this.src;
        lightboxImg.alt = this.alt;
    });
});
function closeLightbox() {
    lightboxModal.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.alt = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
