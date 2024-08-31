const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playPauseBtn = document.querySelector('.play-pause');
const dotsContainer = document.querySelector('.dots');

let slideIndex = 0;
let intervalId;
const autoplay = true;
const autoplayInterval = 3000;


const createDots = () => {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }
};


const showSlide = (n) => {
    slides[slideIndex].classList.remove('active');
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    updateDots();
};


const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
};


const autoplaySlide = () => {
    showSlide(slideIndex + 1);
};


prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
playPauseBtn.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        playPauseBtn.textContent = 'Відновити';
    } else {
        intervalId = setInterval(autoplaySlide, autoplayInterval);
        playPauseBtn.textContent = 'Пауза';
    }
});


dotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        showSlide(Array.from(dotsContainer.children).indexOf(event.target));
    }
});


createDots();
showSlide(slideIndex);
if (autoplay) {
    intervalId = setInterval(autoplaySlide, autoplayInterval);
}