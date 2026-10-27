
/* =====================================================
   EL PROFESSOR — DIGITAL ORDERS
   Premium interactions, neon effects & order success
   ===================================================== */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const PURPLE_COLORS = [
    "#8B2CFF",
    "#B44DFF",
    "#D7B6FF",
    "#E8E8F0",
    "#6500FF",
    "#A78BFA"
  ];

  let sparkleTimer = null;

  // Support both the new HTML and the previous button structure.
  const getButtons = () =>
    document.querySelectorAll(
      ".buttons .btn, .premium-btn"
    );

  /* =====================================================
     1. PURPLE & SILVER CONFETTI
     ===================================================== */

  function createConfetti(count = 45) {
    const container = document.querySelector(".confetti-container");

    if (!container || prefersReducedMotion.matches) return;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      const size = Math.random() * 7 + 4;
      const drift = Math.random() * 160 - 80;
      const rotation = Math.random() * 720 - 360;
      const duration = 2600 + Math.random() * 2200;
      const delay = Math.random() * 700;

      piece.setAttribute("aria-hidden", "true");

      Object.assign(piece.style, {
        position: "fixed",
        zIndex: "1000",
        top: "-20px",
        left: `${Math.random() * 100}vw`,
        width: `${size}px`,
        height: `${size * (Math.random() > 0.5 ? 1 : 1.6)}px`,
        background:
          PURPLE_COLORS[
            Math.floor(Math.random() * PURPLE_COLORS.length)
          ],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        opacity: "0",
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(180, 77, 255, 0.45)"
      });

      container.appendChild(piece);

      const animation = piece.animate(
        [
          {
            transform: "translate3d(0, 0, 0) rotate(0deg)",
            opacity: 0
          },
          {
            transform: "translate3d(0, 60px, 0) rotate(60deg)",
            opacity: 0.9,
            offset: 0.15
          },
          {
            transform:
              `translate3d(${drift}px, 100vh, 0) rotate(${rotation}deg)`,
            opacity: 0
          }
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          fill: "forwards"
        }
      );

      animation.onfinish = () => piece.remove();
    }
  }

  /* =====================================================
     2. PREMIUM NEON BUTTON SPARKLES
     ===================================================== */

  function addButtonSparkle(button) {
    if (
      prefersReducedMotion.matches ||
      !button.isConnected
    ) {
      return;
    }

    const rect = button.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const sparkle = document.createElement("span");

    sparkle.className = "btn-sparkle";
    sparkle.setAttribute("aria-hidden", "true");

    Object.assign(sparkle.style, {
      position: "absolute",
      left: `${Math.random() * rect.width}px`,
      top: `${Math.random() * rect.height}px`,
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#FFFFFF",
      boxShadow:
        "0 0 6px #FFFFFF, 0 0 14px #B44DFF",
      pointerEvents: "none",
      zIndex: "2"
    });

    // Works with both the old and new button HTML.
    const target =
      button.querySelector(".btn-inner") || button;

    target.appendChild(sparkle);

    const animation = sparkle.animate(
      [
        {
          opacity: 0,
          transform: "scale(0)"
        },
        {
          opacity: 1,
          transform: "scale(1.4)",
          offset: 0.45
        },
        {
          opacity: 0,
          transform: "scale(0)"
        }
      ],
      {
        duration: 850,
        easing: "ease-out"
      }
    );

    animation.onfinish = () => sparkle.remove();
  }

  function startButtonSparkles() {
    if (prefersReducedMotion.matches) return;

    stopButtonSparkles();

    // One occasional sparkle instead of a permanent interval
    // for every button.
    function scheduleNextSparkle() {
      sparkleTimer = window.setTimeout(() => {
        const buttons = Array.from(getButtons());

        if (buttons.length) {
          const button =
            buttons[Math.floor(Math.random() * buttons.length)];

          addButtonSparkle(button);
        }

        scheduleNextSparkle();
      }, 1100 + Math.random() * 1100);
    }

    scheduleNextSparkle();
  }

  function stopButtonSparkles() {
    if (sparkleTimer !== null) {
      window.clearTimeout(sparkleTimer);
      sparkleTimer = null;
    }
  }

  /* =====================================================
     3. CLICK RIPPLE EFFECT
     ===================================================== */

  function addRipple(button, event) {
    if (prefersReducedMotion.matches) return;

    const rect = button.getBoundingClientRect();

    const ripple = document.createElement("span");

    ripple.className = "click-ripple";
    ripple.setAttribute("aria-hidden", "true");

    const x =
      typeof event.clientX === "number"
        ? event.clientX - rect.left
        : rect.width / 2;

    const y =
      typeof event.clientY === "number"
        ? event.clientY - rect.top
        : rect.height / 2;

    Object.assign(ripple.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.4)",
      transform: "translate(-50%, -50%) scale(0)",
      pointerEvents: "none",
      zIndex: "1"
    });

    button.appendChild(ripple);

    const animation = ripple.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0.8
        },
        {
          transform: "translate(-50%, -50%) scale(18)",
          opacity: 0
        }
      ],
      {
        duration: 550,
        easing: "ease-out"
      }
    );

    animation.onfinish = () => ripple.remove();
  }

  /* =====================================================
     4. POST-PURCHASE NOSTALGIA / CINEMATIC ARRIVAL
     ===================================================== */

  function playNostalgiaEffect() {
    if (prefersReducedMotion.matches) return;

    document.body.classList.remove("purchase-success");

    // Restart CSS animations when the page is revisited.
    void document.body.offsetWidth;

    document.body.classList.add("purchase-success");

    window.setTimeout(() => {
      document.body.classList.remove("purchase-success");
    }, 2800);
  }

  /* =====================================================
     5. VIDEO AUTOPLAY
     ===================================================== */

  function initializeVideo() {
    const video = document.querySelector("video");

    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Browsers may block autoplay.
          // The video remains available for manual playback.
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, {
        once: true
      });
    }
  }

  /* =====================================================
     6. INITIALIZE PAGE EFFECTS
     ===================================================== */

  function initialize() {
    initializeVideo();

    // Use these effects on the order-confirmation page.
    playNostalgiaEffect();

    if (!prefersReducedMotion.matches) {
      window.setTimeout(() => createConfetti(45), 450);
      window.setTimeout(() => createConfetti(25), 1200);

      startButtonSparkles();
    }

    getButtons().forEach((button) => {
      button.addEventListener("pointerdown", (event) => {
        addRipple(button, event);
      });
    });
  }

  // Respect changes to the user's motion preference.
  prefersReducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) {
      stopButtonSparkles();

      document
        .querySelectorAll(".btn-sparkle, .click-ripple")
        .forEach((element) => element.remove());
    } else {
      startButtonSparkles();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
