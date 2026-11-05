// --- CONFIGURATION ---
// Editable data arrays

const reasons = [
    "You are thoughtful",
    "Your smile lightens up the mood",
    "You possess a generous spirit",
    "Your presence is calming",
    "You inspire others to be better",
    "Your laugh is contagious",
    "You show empathy toward everyone",
    "You are incredibly intelligent",
    "You have a unique perspective on life",
    "Your creativity knows no bounds",
    "You are resilient",
    "You are an excellent listener",
    "Your honesty is refreshing",
    "You bring out the best in me",
    "You make ordinary days special",
    "Your dedication is inspiring",
    "You have a heart of gold",
    "You are simply unforgettable",
    "You are beautiful inside and out",
    "You possess quiet strength",
    "You are authentically yourself",
    "Your life makes the world brighter"
];

const memories = [
    { title: "Special Moment 1", date: "Placeholder Date", description: "You can edit this memory in script.js later." },
    { title: "Special Moment 2", date: "Placeholder Date", description: "This is another example of a memory you can add." },
    { title: "Special Moment 3", date: "Placeholder Date", description: "Add a third unforgettable memory here." }
];

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initOpening();
    initScrolling();
    initReasons();
    initTimeline();
    initEnvelope();
    initSurprise();
    initMusic();
});

// --- 1. OPENING EXPERIENCE ---
function initOpening() {
    const enterBtn = document.getElementById('enterBtn');
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');

    if (!enterBtn || !opening || !mainContent) return; // Null check

    enterBtn.addEventListener('click', () => {
        opening.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            opening.style.display = 'none';
            mainContent.classList.add('fade-in');
        }, 1000); // Wait for fade-out transition
    });
}

// --- BACKGROUND (STARS) ---
function initStars() {
    const canvas = document.getElementById('stars');
    if (!canvas) return; // Null check
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Null check
    
    let width, height, stars = [];
    let animationFrameId;

    function setCanvasSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5;
            this.speed = Math.random() * 0.05;
            this.opacity = Math.random();
            this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.fading = Math.random() < 0.5;
        }
        
        update() {
            this.y -= this.speed;
            if (this.y < 0) this.y = height;
            
            // Twinkle effect
            if (this.fading) {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0.1) this.fading = false;
            } else {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 1) this.fading = true;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(214, 180, 106, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 200; i++) {
        stars.push(new Star());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    // Clean up animation on resize to prevent resource leak
    window.addEventListener('unload', () => {
        cancelAnimationFrame(animationFrameId);
    });
}

// --- UTILITIES ---
function initScrolling() {
    document.querySelectorAll('.scrollTo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) { // Null check
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// --- 6. GALLERY LIGHTBOX ---
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

if (lightbox && lightboxImg) { // Null checks
    function openLightbox(index) {
        if (galleryItems[index]) { // Check if index exists
            lightbox.classList.add('active');
            lightboxImg.src = galleryItems[index].src;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // Close lightbox on 'Esc' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// --- 7. 22 REASONS ---
function initReasons() {
    const grid = document.getElementById('reasonsGrid');
    if (!grid) return; // Null check
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <div class="reason-card-inner">
                <div class="reason-front serif">${index + 1}</div>
                <div class="reason-back">${reason}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        grid.appendChild(card);
    });
}

// --- 8. TIMELINE ---
function initTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return; // Null check
    memories.forEach((memory, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        item.innerHTML = `
            <div class="timeline-content">
                <h4 class="serif">${memory.title}</h4>
                <p class="italic">${memory.date}</p>
                <p>${memory.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// --- 9. ENVELOPE (LETTER) ---
function initEnvelope() {
    // Envelope functionality is handled via CSS (:hover)
    // You could add click-to-open on mobile here if needed.
}

// --- 10. FINAL SURPRISE ---
function initSurprise() {
    const revealBtn = document.getElementById('revealBtn');
    const content = document.getElementById('surpriseContent');
    const message = document.getElementById('finalMessage');

    if (!revealBtn || !content || !message) return; // Null checks

    revealBtn.addEventListener('click', () => {
        content.classList.add('hidden');
        message.classList.remove('hidden');
        
        // Trigger extra star effect or confetti if desired
        for (let i = 0; i < 50; i++) {
            // Placeholder: you can add momentary intensive twinkling here
        }
    });
}

// --- 11. MUSIC EXPERIENCE ---
function initMusic() {
    const control = document.getElementById('musicControl');
    const text = control ? control.querySelector('.music-text') : null;
    const audio = document.getElementById('bgMusic');

    if (!control || !text || !audio) return; // Null checks

    control.addEventListener('click', () => {
        if (audio.muted || audio.paused) {
            audio.muted = false;
            audio.play().then(() => {
                control.classList.remove('muted');
                text.innerText = "Playing";
            }).catch(error => {
                // Autoplay was prevented
                console.warn("Autoplay prevented by browser.");
                text.innerText = "Error";
            });
        } else {
            audio.pause();
            control.classList.add('muted');
            text.innerText = "Paused";
        }
    });
}
