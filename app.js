(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Preloader
  --------------------------------------------------------------------- */
  window.addEventListener("load", function () {
    var welcome = document.getElementById("welcome-screen");
    setTimeout(function () {
      if (welcome) welcome.classList.add("hidden");
    }, 1400);
  });

  /* ---------------------------------------------------------------------
     AOS init
  --------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ---------------------------------------------------------------------
     Typed.js rotating titles
  --------------------------------------------------------------------- */
  if (window.Typed) {
    new Typed(".typed-text", {
      strings: [
        "Python Developer",
        "Django Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Freelancer",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------------------------------------------------------------------
     particles.js ambient field
  --------------------------------------------------------------------- */
  if (window.particlesJS) {
    particlesJS("tsparticles", {
      particles: {
        number: { value: 46, density: { enable: true, value_area: 900 } },
        color: { value: ["#6c8cff", "#b285f7", "#4fd6c4"] },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 2.2, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#6c8cff",
          opacity: 0.15,
          width: 1,
        },
        move: { enable: true, speed: 0.6, out_mode: "out" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true,
        },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.25 } } },
      },
      retina_detect: true,
    });
  }

  /* ---------------------------------------------------------------------
     VanillaTilt
  --------------------------------------------------------------------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

  /* ---------------------------------------------------------------------
     Mouse spotlight
  --------------------------------------------------------------------- */
  var root = document.documentElement;
  window.addEventListener(
    "pointermove",
    function (e) {
      root.style.setProperty("--sx", e.clientX + "px");
      root.style.setProperty("--sy", e.clientY + "px");
    },
    { passive: true }
  );

  /* ---------------------------------------------------------------------
     Custom cursor
  --------------------------------------------------------------------- */
  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  if (dot && ring && !window.matchMedia("(pointer: coarse)").matches) {
    var rx = 0,
      ry = 0,
      tx = 0,
      ty = 0;
    window.addEventListener(
      "pointermove",
      function (e) {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );
    (function raf() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(raf);
    })();
    var hoverables = document.querySelectorAll(
      "a, button, .project-card, .skill-card, [data-tilt], input, textarea"
    );
    hoverables.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        ring.classList.add("hovered");
      });
      el.addEventListener("mouseleave", function () {
        ring.classList.remove("hovered");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------------------- */
  var progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    var h = document.documentElement;
    var scrollTop = h.scrollTop || document.body.scrollTop;
    var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------------------
     Navbar: scrolled state + hide on scroll down / show on scroll up
  --------------------------------------------------------------------- */
  var navbar = document.getElementById("mainNav");
  var lastScroll = 0;
  window.addEventListener(
    "scroll",
    function () {
      var current = window.scrollY;
      if (current > 40) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }
      if (current > lastScroll && current > 160) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }
      lastScroll = current;
    },
    { passive: true }
  );

  /* ---------------------------------------------------------------------
     Active nav link highlighting
  --------------------------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinkEls = document.querySelectorAll(".nav-link");
  function updateActiveLink() {
    var current = "";
    sections.forEach(function (section) {
      var top = section.offsetTop - 220;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinkEls.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
  }
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------------------------------------------------------------
     Skill rings (CSS conic/SVG circle animation)
  --------------------------------------------------------------------- */
  var ringObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var circle = entry.target.querySelector(".fill");
          var pct = parseFloat(circle.dataset.pct);
          var r = 50;
          var circumference = 2 * Math.PI * r;
          circle.style.strokeDasharray = circumference;
          var offset = circumference - (pct / 100) * circumference;
          requestAnimationFrame(function () {
            circle.style.strokeDashoffset = offset;
          });
          ringObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-ring").forEach(function (r) {
    ringObserver.observe(r);
  });

  /* ---------------------------------------------------------------------
     Timeline reveal
  --------------------------------------------------------------------- */
  var timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".timeline-item").forEach(function (item, i) {
            setTimeout(function () {
              item.classList.add("visible");
            }, i * 180);
          });
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".timeline").forEach(function (tl) {
    timelineObserver.observe(tl);
  });

  /* ---------------------------------------------------------------------
     CountUp.js counters
  --------------------------------------------------------------------- */
  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseFloat(el.dataset.countup);
          if (window.CountUp) {
            var counter = new countUp.CountUp(el, target, { duration: 1.6 });
            if (!counter.error) counter.start();
            else el.textContent = target;
          } else {
            el.textContent = target;
          }
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll("[data-countup]").forEach(function (el) {
    countObserver.observe(el);
  });

  /* ---------------------------------------------------------------------
     Ripple effect on hero / project buttons
  --------------------------------------------------------------------- */
  document.querySelectorAll(".btn-ripple").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var span = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      span.className = "ripple-span";
      span.style.width = span.style.height = size + "px";
      span.style.left = e.clientX - rect.left - size / 2 + "px";
      span.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(span);
      setTimeout(function () {
        span.remove();
      }, 650);
    });
  });

  /* ---------------------------------------------------------------------
     Scroll to top button
  --------------------------------------------------------------------- */
  var scrollBtn = document.getElementById("scrollToTop");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 500) scrollBtn.classList.add("visible");
      else scrollBtn.classList.remove("visible");
    },
    { passive: true }
  );
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------------------
     Theme switcher (dark / light) with localStorage
  --------------------------------------------------------------------- */
  var htmlEl = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var themeIcon = document.getElementById("themeIcon");
  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "light" ? "bi bi-sun" : "bi bi-moon-stars";
    }
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (err) {}
  }
  var savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  } catch (err) {}
  applyTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  /* ---------------------------------------------------------------------
     Project filter pills
  --------------------------------------------------------------------- */
  var filterPills = document.querySelectorAll(".filter-pill");
  var projectCards = document.querySelectorAll(".project-card");
  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach(function (p) {
        p.classList.remove("active");
      });
      pill.classList.add("active");
      var filter = pill.dataset.filter;
      projectCards.forEach(function (card) {
        var match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------------------------------------------------------------------
     Project case-study modal population
  --------------------------------------------------------------------- */
  var projectModal = document.getElementById("projectModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", function (event) {
      var btn = event.relatedTarget;
      if (!btn) return;
      var title = btn.getAttribute("data-title") || "Project";
      var tags = (btn.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var desc = btn.getAttribute("data-desc") || "";
      var challenges = btn.getAttribute("data-challenges") || "";
      var solutions = btn.getAttribute("data-solutions") || "";
      var live = btn.getAttribute("data-live") || "";
      var gh = btn.getAttribute("data-github") || "";
      var grad1 = btn.getAttribute("data-grad1") || "#6c8cff";
      var grad2 = btn.getAttribute("data-grad2") || "#b285f7";
      var icon = btn.getAttribute("data-icon") || "💻";

      projectModal.querySelector("#projectModalLabel").textContent = title;
      projectModal.querySelector("#modalDesc").textContent = desc;
      projectModal.querySelector("#modalChallenges").textContent = challenges;
      projectModal.querySelector("#modalSolutions").textContent = solutions;

      var visual = projectModal.querySelector("#modalVisual");
      visual.style.background = "linear-gradient(135deg," + grad1 + "," + grad2 + ")";
      visual.textContent = icon;

      var tagsWrap = projectModal.querySelector("#modalTags");
      tagsWrap.innerHTML = "";
      tags.forEach(function (t) {
        var span = document.createElement("span");
        span.className = "tech-tag";
        span.textContent = t;
        tagsWrap.appendChild(span);
      });

      var liveBtn = projectModal.querySelector("#modalLiveBtn");
      var ghBtn = projectModal.querySelector("#modalGithubBtn");
      if (live) {
        liveBtn.href = live;
        liveBtn.style.display = "inline-flex";
      } else {
        liveBtn.style.display = "none";
      }
      if (gh) {
        ghBtn.href = gh;
        ghBtn.style.display = "inline-flex";
      } else {
        ghBtn.style.display = "none";
      }
    });
  }

  /* ---------------------------------------------------------------------
     Swiper — certifications
  --------------------------------------------------------------------- */
  if (window.Swiper) {
    new Swiper(".certSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      pagination: { el: ".certSwiper .swiper-pagination", clickable: true },
      navigation: { nextEl: ".cert-next", prevEl: ".cert-prev" },
      breakpoints: {
        700: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      },
    });
  }

  /* ---------------------------------------------------------------------
     Contact form validation + fake submit + confetti
  --------------------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cName");
      var email = document.getElementById("cEmail");
      var message = document.getElementById("cMessage");
      var errName = document.getElementById("errName");
      var errEmail = document.getElementById("errEmail");
      var errMessage = document.getElementById("errMessage");

      var valid = true;
      errName.textContent = "";
      errEmail.textContent = "";
      errMessage.textContent = "";

      if (!name.value.trim()) {
        errName.textContent = "Please enter your name.";
        valid = false;
      }
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        errEmail.textContent = "Please enter a valid email.";
        valid = false;
      }
      if (!message.value.trim()) {
        errMessage.textContent = "Please write a short message.";
        valid = false;
      }
      if (!valid) return;

      var submitBtn = form.querySelector(".btn-submit");
      submitBtn.classList.add("loading");

      setTimeout(function () {
        submitBtn.classList.remove("loading");
        form.reset();
        showToast();
        fireConfetti();
      }, 1200);
    });
  }

  function showToast() {
    var toast = document.getElementById("successToast");
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3800);
  }

  function fireConfetti() {
    var canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var colors = ["#6c8cff", "#b285f7", "#4fd6c4", "#ffb86b"];
    var pieces = [];
    for (var i = 0; i < 120; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.25,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -10 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        gravity: 0.35,
      });
    }
    var frame = 0;
    function draw() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      pieces.forEach(function (p) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (alive && frame < 220) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  /* ---------------------------------------------------------------------
     Command palette (Ctrl/Cmd + K)
  --------------------------------------------------------------------- */
  var cmdkModalEl = document.getElementById("cmdkModal");
  var cmdkModal = cmdkModalEl && window.bootstrap ? new bootstrap.Modal(cmdkModalEl) : null;
  var cmdkTrigger = document.getElementById("cmdkTrigger");
  var cmdkInput = document.getElementById("cmdkInput");
  var cmdkItems = document.querySelectorAll(".cmdk-item");

  function openPalette() {
    if (cmdkModal) {
      cmdkModal.show();
      setTimeout(function () {
        if (cmdkInput) cmdkInput.focus();
      }, 250);
    }
  }

  if (cmdkTrigger) cmdkTrigger.addEventListener("click", openPalette);

  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openPalette();
    }
  });

  cmdkItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var target = item.getAttribute("data-target");
      var external = item.getAttribute("data-external");
      if (cmdkModal) cmdkModal.hide();
      setTimeout(function () {
        if (external) {
          window.open(target, "_blank");
        } else {
          var el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    });
  });

  if (cmdkInput) {
    cmdkInput.addEventListener("input", function () {
      var q = cmdkInput.value.toLowerCase();
      cmdkItems.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = text.indexOf(q) > -1 ? "flex" : "none";
      });
    });
  }

  /* ---------------------------------------------------------------------
     Mobile offcanvas menu links: close menu then smooth scroll to section
  --------------------------------------------------------------------- */
  var mobileMenuEl = document.getElementById("mobileMenu");
  if (mobileMenuEl) {
    var mainNavEl = document.getElementById("mainNav");
    mobileMenuEl.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = link.getAttribute("href");
        if (!target || target.charAt(0) !== "#") return;
        e.preventDefault();
        var el = document.querySelector(target);
        var navigate = function () {
          if (el) {
            var navH = (mainNavEl && mainNavEl.offsetHeight) || 70;
            var y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        };
        var off = window.bootstrap
          ? bootstrap.Offcanvas.getInstance(mobileMenuEl)
          : null;
        if (off) {
          mobileMenuEl.addEventListener("hidden.bs.offcanvas", navigate, { once: true });
          off.hide();
        } else {
          navigate();
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Close mobile offcanvas on nav link click (handled via JS above)
  --------------------------------------------------------------------- */
})();
