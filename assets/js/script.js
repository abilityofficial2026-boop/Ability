/*====================================================
ABILITY 2.0 — Main JavaScript
File: assets/js/script.js
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

  /*====================================================
  1. STICKY HEADER SCROLL EFFECT
  ====================================================*/
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /*====================================================
  2. MOUSE GLOW FOLLOWER
  ====================================================*/
  const glow = document.querySelector(".mouse-glow");

  if (glow) {
    document.addEventListener("mousemove", (e) => {
      window.requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });
    });
  }

  /*====================================================
  3. KNOWLEDGE NETWORK PARALLAX EFFECT
  ====================================================*/
  const heroNetwork = document.querySelector(".knowledge-network");

  if (heroNetwork) {
    document.addEventListener("mousemove", (e) => {
      window.requestAnimationFrame(() => {
        const x = (window.innerWidth / 2 - e.clientX) / 45;
        const y = (window.innerHeight / 2 - e.clientY) / 45;
        heroNetwork.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  /*====================================================
  4. INTERSECTION OBSERVER (SCROLL REVEAL)
  ====================================================*/
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Optional: Un-observe after revealing once for performance
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /*====================================================
  5. MOBILE HAMBURGER MENU TOGGLE
  ====================================================*/
  const menuBtn = document.querySelector(".menu-btn") || document.querySelector("#menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }

  /*====================================================
  6. SMOOTH ANCHOR SCROLL WITH HEADER OFFSET CLEARANCE
  ====================================================*/
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 90; // Height of sticky header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /*====================================================
  7. PAGE LOADED STATE
  ====================================================*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

});