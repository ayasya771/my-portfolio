const images = [
    'img/achievements/1.jpg',
    'img/achievements/2.jpg',
    'img/achievements/3.jpg',
    'img/achievements/4.jpg',
    'img/achievements/5.jpg',
];

let currentIndex = 0;
let autoPlayInterval;
const AUTO_PLAY_DELAY = 4000;

function $(selector) {
    // Always return jQuery object if jQuery is available
    if (window.jQuery) {
        return jQuery(selector);
    }
    // Fallback to native DOM element
    return document.querySelector(selector);
}

function next() {
    // Get elements and check if they exist
    const hideEl = document.querySelector('.hide');
    const prevEl = document.querySelector('.prev');
    const actEl = document.querySelector('.act');
    const nextEl = document.querySelector('.next');
    const newNextEl = document.querySelector('.new-next');
    const listEl = document.querySelector('.list');

    if (hideEl) {
        hideEl.remove();
    }

    if (prevEl) {
        prevEl.classList.add('hide');
        prevEl.classList.remove('prev');
    }

    if (actEl) {
        actEl.classList.add('prev');
        actEl.classList.remove('act');
    }

    if (nextEl) {
        nextEl.classList.add('act');
        nextEl.classList.remove('next');
    }

    if (newNextEl) {
        newNextEl.classList.add('next');
        newNextEl.classList.remove('new-next');
    }

    currentIndex = (currentIndex + 1) % images.length;
    
    if (listEl) {
        const addedEl = document.createElement('li');
        const img = document.createElement('img');
        img.src = images[currentIndex];
        img.alt = `Achievement ${currentIndex + 1}`;
        addedEl.appendChild(img);
        listEl.appendChild(addedEl);
        addedEl.classList.add('new-next');
    }
}

// Add these handler functions before the event listeners
function handleMouseDown(e) {
    stopAutoPlay();
    startX = e.pageX;
}

function handleMouseUp(e) {
    const diffX = e.pageX - startX;
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            prev();
        } else {
            next();
        }
    }
    startAutoPlay();
}

function handleTouchStart(e) {
    stopAutoPlay();
    startX = e.touches[0].pageX;
}

function handleTouchEnd(e) {
    const diffX = e.changedTouches[0].pageX - startX;
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            prev();
        } else {
            next();
        }
    }
    startAutoPlay();
}

// Update event listener section
document.addEventListener('DOMContentLoaded', () => {
    const swipe = document.querySelector('.swipe');
    if (!swipe) return;

    let startX;
    
    // Start autoplay
    startAutoPlay();

    // Mouse and touch events
    swipe.addEventListener('mousedown', handleMouseDown);
    swipe.addEventListener('mouseup', handleMouseUp);
    swipe.addEventListener('touchstart', handleTouchStart);
    swipe.addEventListener('touchend', handleTouchEnd);
});

// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
    const swipe = document.querySelector('.swipe');
    if (!swipe) return;

    let startX;
    
    // Start autoplay
    startAutoPlay();

    // Touch and mouse events using native DOM methods
    swipe.addEventListener('mousedown', handleMouseDown);
    swipe.addEventListener('mouseup', handleMouseUp);
    swipe.addEventListener('touchstart', handleTouchStart);
    swipe.addEventListener('touchend', handleTouchEnd);
});

function startAutoPlay() {
    stopAutoPlay();
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