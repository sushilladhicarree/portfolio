/* =====================================================
   DUAL-THEME PORTFOLIO - JAVASCRIPT
   Spider-Man vs Batman Effects & Interactions
   ===================================================== */

// ===== MAIN CONTROLLER =====
class PortfolioController {
    constructor() {
        this.currentTheme = 'spidey';
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Effect instances
        this.rainEffect = null;
        this.isRaining = false;
        
        // Animation frame
        this.animationId = null;
        
        // Init
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupThemeToggle();
        this.setupCursor();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.startAnimation();
        
        // Start periodic bats (only active in Batman mode)
        this.startPeriodicBats();
        
        // Start lightning (only active in Batman mode)
        this.startLightning();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ===== THEME TOGGLE =====
    setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        
        toggle.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'spidey' ? 'batman' : 'spidey';
            this.switchTheme(newTheme);
        });
    }

    switchTheme(newTheme) {
        const body = document.body;
        const overlay = document.getElementById('transition-overlay');
        
        // Trigger transition animation
        if (newTheme === 'batman') {
            this.playBatTransition();
        } else {
            this.playWebTransition();
        }
        
        // After animation, switch theme
        setTimeout(() => {
            body.classList.remove(`theme-${this.currentTheme}`);
            body.classList.add(`theme-${newTheme}`);
            this.currentTheme = newTheme;
            
            // Toggle effects
            if (newTheme === 'batman') {
                this.startRain();
            } else {
                this.stopRain();
            }
        }, 500);
    }

    // ===== BAT TRANSITION =====
    playBatTransition() {
        // Create flying bats that cover the screen
        const overlay = document.getElementById('transition-overlay');
        overlay.innerHTML = '';
        overlay.style.pointerEvents = 'all';
        overlay.style.background = 'transparent';
        
        // Spawn many bats
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const bat = document.createElement('div');
                bat.innerHTML = '🦇';
                bat.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 40 + 20}px;
                    left: ${Math.random() * 100}%;
                    bottom: -50px;
                    animation: batFlyUp 0.8s ease-out forwards;
                    opacity: 0;
                `;
                overlay.appendChild(bat);
                
                // Remove after animation
                setTimeout(() => bat.remove(), 800);
            }, i * 20);
        }
        
        // Add keyframe dynamically
        if (!document.getElementById('bat-transition-style')) {
            const style = document.createElement('style');
            style.id = 'bat-transition-style';
            style.textContent = `
                @keyframes batFlyUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-120vh) rotate(-20deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            overlay.style.pointerEvents = 'none';
        }, 1000);
    }

    // ===== WEB TRANSITION =====
    playWebTransition() {
        const overlay = document.getElementById('transition-overlay');
        overlay.innerHTML = '';
        overlay.style.pointerEvents = 'all';
        
        // Create web shooting effect
        const web = document.createElement('div');
        web.style.cssText = `
            position: absolute;
            top: 50%;
            left: -100%;
            width: 200%;
            height: 4px;
            background: linear-gradient(90deg, transparent, white, transparent);
            animation: webShoot 0.6s ease-out forwards;
        `;
        overlay.appendChild(web);
        
        // Add keyframe
        if (!document.getElementById('web-transition-style')) {
            const style = document.createElement('style');
            style.id = 'web-transition-style';
            style.textContent = `
                @keyframes webShoot {
                    0% {
                        left: -100%;
                        opacity: 0;
                    }
                    30% {
                        opacity: 1;
                    }
                    100% {
                        left: 100%;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            overlay.innerHTML = '';
            overlay.style.pointerEvents = 'none';
        }, 600);
    }

    // ===== RAIN EFFECT =====
    startRain() {
        if (this.isRaining) return;
        this.isRaining = true;
        
        this.rainDrops = [];
        for (let i = 0; i < 300; i++) {
            this.rainDrops.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 15 + 10,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    stopRain() {
        this.isRaining = false;
        this.rainDrops = [];
    }

    drawRain() {
        if (!this.isRaining || !this.rainDrops) return;
        
        this.ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        
        this.rainDrops.forEach(drop => {
            drop.y += drop.speed;
            if (drop.y > this.canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.canvas.width;
            }
            
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x + 1, drop.y + drop.length);
        });
        
        this.ctx.stroke();
    }

    // ===== LIGHTNING EFFECT =====
    startLightning() {
        const flash = document.getElementById('lightning-flash');
        
        const triggerLightning = () => {
            if (this.currentTheme !== 'batman') {
                setTimeout(triggerLightning, 5000);
                return;
            }
            
            // Random timing for next flash
            const nextFlash = Math.random() * 10000 + 5000;
            
            // Flash sequence
            flash.classList.add('flash');
            setTimeout(() => flash.classList.remove('flash'), 100);
            setTimeout(() => flash.classList.add('flash'), 150);
            setTimeout(() => flash.classList.remove('flash'), 200);
            
            setTimeout(triggerLightning, nextFlash);
        };
        
        // Start after initial delay
        setTimeout(triggerLightning, 3000);
    }

    // ===== PERIODIC BATS =====
    startPeriodicBats() {
        const container = document.getElementById('periodic-bats');
        
        const spawnBat = () => {
            if (this.currentTheme !== 'batman') {
                setTimeout(spawnBat, 5000);
                return;
            }
            
            const bat = document.createElement('div');
            bat.className = 'flying-bat';
            bat.innerHTML = '🦇';
            bat.style.top = `${Math.random() * 60 + 10}%`;
            bat.style.animationDuration = `${Math.random() * 2 + 3}s`;
            container.appendChild(bat);
            
            setTimeout(() => bat.remove(), 5000);
            
            // Next bat
            setTimeout(spawnBat, Math.random() * 8000 + 4000);
        };
        
        setTimeout(spawnBat, 2000);
    }

    // ===== CUSTOM CURSOR =====
    setupCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .play-card, .demo-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // ===== SMOOTH SCROLL =====
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section, .project-card, .stat-card, .play-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add visible class styles
        const style = document.createElement('style');
        style.textContent = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== ANIMATION LOOP =====
    startAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw effects based on theme
            if (this.currentTheme === 'batman') {
                this.drawRain();
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new PortfolioController();
});

// ===== SPIDEY GLITCH EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    // Add random glitch to hero title on hover
    const glitchContainers = document.querySelectorAll('.glitch-container');
    
    glitchContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            if (document.body.classList.contains('theme-spidey')) {
                container.style.animation = 'glitch 0.1s ease infinite';
                
                // Random color shift
                const text = container.querySelector('.glitch-text');
                if (text) {
                    const randomOffset = Math.random() * 4 - 2;
                    text.style.textShadow = `
                        ${randomOffset}px 0 #E23636,
                        ${-randomOffset}px 0 #1E3A8A
                    `;
                }
            }
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.animation = 'none';
            const text = container.querySelector('.glitch-text');
            if (text) {
                text.style.textShadow = '';
            }
        });
    });
});

// ===== EASTER EGG: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.transition = 'filter 0.5s ease';
        document.body.style.filter = 'hue-rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
        
        alert('🕷️ With great power comes great responsibility! 🦇');
    }
});
