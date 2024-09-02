const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playPauseBtn = document.querySelector('.play-pause');
const dotsContainer = document.querySelector('.dots');

let slideIndex = 0;
let intervalId = null;
const autoplay = true;
let isAutoplaying = autoplay;
const autoplayInterval = 5000;


function showSlide(n) {
    slides[slideIndex].classList.remove('active');
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    updateDots();
}

function handlePrevClick() {
    showSlide(slideIndex - 1);
    event.stopPropagation();
}

function handleNextClick() {
    showSlide(slideIndex + 1);
    event.stopPropagation();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}


function autoplaySlide() {
    if (isAutoplaying) {
        showSlide(slideIndex + 1);
    }
}

function createDots() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }
    updateDots();
}


prevBtn.addEventListener('click', handlePrevClick);
nextBtn.addEventListener('click', handleNextClick);


dotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        showSlide(Array.from(dotsContainer.children).indexOf(event.target));
    }
});

if (autoplay) {
    intervalId = setInterval(autoplaySlide, autoplayInterval);
}

createDots();

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        isAutoplaying = !isAutoplaying;
        if (isAutoplaying) {
            intervalId = setInterval(autoplaySlide, autoplayInterval);
        } else {
            clearInterval(intervalId);
        }
    });
}