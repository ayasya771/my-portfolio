// Update slider.js with auto-play functionality
const images = [
    'img/achievements/1.jpg',
    'img/achievements/2.jpg',
    'img/achievements/3.jpg',
    'img/achievements/4.jpg',
    'img/achievements/5.jpg',
];

let currentIndex = 0;
let autoPlayInterval;
const AUTO_PLAY_DELAY = 3000; // 3 seconds between slides

function $(selector) {
    return document.querySelector(selector);
}

function next() {
    const hideEl = $('.hide');
    if (hideEl) {
        hideEl.remove();
    }

    const prevEl = $('.prev');
    if (prevEl) {
        prevEl.classList.add('hide');
        prevEl.classList.remove('prev');
    }

    $('.act').classList.add('prev');
    $('.act').classList.remove('act');

    $('.next').classList.add('act');
    $('.next').classList.remove('next');

    $('.new-next').classList.add('next');
    $('.new-next').classList.remove('new-next');

    currentIndex = (currentIndex + 1) % images.length;
    
    const addedEl = document.createElement('li');
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.alt = `Achievement ${currentIndex + 1}`;
    addedEl.appendChild(img);
    
    $('.list').appendChild(addedEl);
    addedEl.classList.add('new-next');
}

function prev() {
    $('.new-next').remove();
    
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    
    $('.next').classList.add('new-next');
    
    $('.act').classList.add('next');
    $('.act').classList.remove('act');
    
    $('.prev').classList.add('act');
    $('.prev').classList.remove('prev');
    
    $('.hide').classList.add('prev');
    $('.hide').classList.remove('hide');
    
    const addedEl = document.createElement('li');
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.alt = `Achievement ${currentIndex + 1}`;
    addedEl.appendChild(img);
    
    $('.list').insertBefore(addedEl, $('.list').firstChild);
    addedEl.classList.add('hide');
}

function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(next, AUTO_PLAY_DELAY);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const swipe = $('.swipe');
    let startX;

    // Start autoplay when page loads
    startAutoPlay();

    // Pause on hover
    $('.carousel-container').addEventListener('mouseenter', stopAutoPlay);
    $('.carousel-container').addEventListener('mouseleave', startAutoPlay);

    // Pause on touch/mouse interaction
    swipe.addEventListener('mousedown', (e) => {
        stopAutoPlay();
        startX = e.pageX;
    });

    swipe.addEventListener('mouseup', (e) => {
        const diffX = e.pageX - startX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                prev();
            } else {
                next();
            }
        }
        startAutoPlay();
    });

    swipe.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        startX = e.touches[0].pageX;
    });

    swipe.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].pageX - startX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                prev();
            } else {
                next();
            }
        }
        startAutoPlay();
    });
});