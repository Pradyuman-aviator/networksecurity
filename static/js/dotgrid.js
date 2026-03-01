/**
 * SENTINEL — Aceternity-style Interactive Dot Grid
 * Creates a canvas-based dot pattern with mouse proximity glow effect.
 */
(function () {
    'use strict';

    const canvas = document.createElement('canvas');
    canvas.id = 'dotGrid';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    // --- Configuration ---
    const DOT_SPACING = 28;
    const DOT_BASE_RADIUS = 1;
    const DOT_MAX_RADIUS = 2.8;
    const GLOW_RADIUS = 180;          // px influence zone around cursor
    const GLOW_INTENSITY = 1;

    let cols, rows;
    let mouseX = -9999, mouseY = -9999;
    let animId;
    let isDark = true; // tracks current theme for dot colour

    // --- Resize handler ---
    function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(window.innerWidth / DOT_SPACING) + 1;
        rows = Math.ceil(window.innerHeight / DOT_SPACING) + 1;
    }

    // --- Mouse tracking (uses pointer-events:none on canvas, tracks via document) ---
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseX = -9999;
        mouseY = -9999;
    });

    // --- Draw loop ---
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const baseDotColor = isDark
            ? { r: 255, g: 255, b: 255, a: 0.12 }
            : { r: 0, g: 0, b: 0, a: 0.10 };

        const glowColor = isDark
            ? { r: 0, g: 212, b: 255 }   // cyan
            : { r: 0, g: 140, b: 200 };   // teal

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * DOT_SPACING;
                const y = row * DOT_SPACING;

                const dx = x - mouseX;
                const dy = y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let radius = DOT_BASE_RADIUS;
                let r = baseDotColor.r;
                let g = baseDotColor.g;
                let b = baseDotColor.b;
                let a = baseDotColor.a;

                if (dist < GLOW_RADIUS) {
                    const t = 1 - (dist / GLOW_RADIUS);
                    const ease = t * t * (3 - 2 * t); // smoothstep

                    radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * ease;

                    // Blend toward glow colour
                    const blend = ease * GLOW_INTENSITY;
                    r = Math.round(baseDotColor.r + (glowColor.r - baseDotColor.r) * blend);
                    g = Math.round(baseDotColor.g + (glowColor.g - baseDotColor.g) * blend);
                    b = Math.round(baseDotColor.b + (glowColor.b - baseDotColor.b) * blend);
                    a = baseDotColor.a + (0.9 - baseDotColor.a) * ease;
                }

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.fill();

                // Outer glow for close dots
                if (dist < GLOW_RADIUS * 0.5) {
                    const gt = 1 - (dist / (GLOW_RADIUS * 0.5));
                    ctx.beginPath();
                    ctx.arc(x, y, radius + 3 * gt, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${glowColor.r},${glowColor.g},${glowColor.b},${0.08 * gt})`;
                    ctx.fill();
                }
            }
        }

        animId = requestAnimationFrame(draw);
    }

    // --- Theme observer ---
    function updateTheme() {
        isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    }

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // --- Init ---
    window.addEventListener('resize', resize);
    resize();
    updateTheme();
    draw();

    // Expose for cleanup if needed
    window.__dotGrid = { destroy: () => { cancelAnimationFrame(animId); canvas.remove(); } };
})();
