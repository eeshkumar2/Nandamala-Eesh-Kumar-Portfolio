/* ============================================
   PREMIUM PORTFOLIO — MAIN JAVASCRIPT
   ============================================ */

'use strict';

// ---- CONFIG ----
const CONFIG = {
  name: "N. Eesh Kumar",
  role: "Aspiring UI/UX Designer",
  tagline: "Designing intuitive, user-centered digital experiences for web and mobile.",
  email: "eeshnandamala@gmail.com",
  phone: "+916303459586",
  linkedin: "https://www.linkedin.com/in/eeshkumar2",
  linkedinName: "Nandamala Eesh Kumar",
  github: "https://github.com/eeshkumar2",
  resumePath: "resume/resume.pdf",
  available: true,
};

// ---- STATE ----
let projectsData = [];
let activeFilter = 'All';
let carouselIndex = 0;

/* ============================================
   LOADER
   ============================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initRevealObserver();
    initSkillBars();
  }, 1800);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mx = 0, my = 0, fx = 0, fy = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  const hoverTargets = 'a, button, .project-card, .skill-card, .cert-card, .contact-link, .magnetic';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    }
  });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ============================================
   SCROLL PROGRESS
   ============================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================
   NAVBAR SCROLL
   ============================================ */
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeBtn?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // Active link
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        link?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   PARALLAX
   ============================================ */
function initParallax() {
  const hero = document.querySelector('#hero');
  if (!hero) return;
  const orbs = hero.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.1 + i * 0.05;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });

  // Mouse parallax on hero
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX / rect.width - 0.5) * 20;
    const y = (e.clientY / rect.height - 0.5) * 20;
    orbs.forEach((orb, i) => {
      const depth = 0.5 + i * 0.3;
      orb.style.transform += ` translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar');
        const pct = bar?.dataset.pct;
        if (bar && pct) {
          requestAnimationFrame(() => { bar.style.width = pct + '%'; });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const from = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

/* ============================================
   PROJECTS — LOAD & RENDER
   ============================================ */
async function loadProjects() {
  try {
    const res = await fetch('projects/data.json');
    const data = await res.json();
    projectsData = data.projects;
    renderProjects(projectsData);
    renderProjectFilters();
  } catch (err) {
    console.warn('Could not load projects/data.json', err);
  }
}

function renderProjectFilters() {
  const filterBar = document.querySelector('.projects-filter');
  if (!filterBar || !projectsData.length) return;
  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  filterBar.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    const filtered = activeFilter === 'All' ? projectsData : projectsData.filter(p => p.category === activeFilter);
    renderProjects(filtered);
  });
}

function renderProjects(projects) {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => {
    const isFeatured = p.featured && i === 0 && activeFilter === 'All';
    const thumbHTML = p.thumbnail
      ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">`
      : `<div class="project-thumb-placeholder">${p.title.charAt(0)}</div>`;

    const links = [];
    if (p.liveLink) links.push(`<a href="${p.liveLink}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live</a>`);
    if (p.dashboardEmbed && !p.liveLink) links.push(`<a href="${p.dashboardEmbed}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>Dashboard</a>`);
    if (p.githubLink) links.push(`<a href="${p.githubLink}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>Code</a>`);
    if (p.figmaLink) links.push(`<a href="${p.figmaLink}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>Figma</a>`);

    return `
    <div class="project-card ${isFeatured ? 'featured' : ''} reveal reveal-delay-${(i % 3) + 1}"
         style="--card-color: ${p.color || '#7c6dfa'}"
         data-id="${p.id}"
         onclick="openProjectModal('${p.id}')">
      <div class="project-thumb">
        <div class="project-thumb-inner" style="background: linear-gradient(135deg, ${p.color || '#7c6dfa'}18 0%, transparent 60%)">
          ${thumbHTML}
        </div>
        <div class="project-overlay">
          ${links.join('')}
        </div>
      </div>
      <div class="project-info">
        <div>
          <div class="project-category">${p.category}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
        </div>
        <div>
          <div class="project-tags">
            ${p.technologies.slice(0, 4).map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <span class="project-year">${p.year}</span>
            <div class="project-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Re-observe reveals
  initRevealObserver();
}

/* ============================================
   PROJECT MODAL
   ============================================ */
function buildFigmaEmbed(project) {
  if (!project.figmaLink || project.figmaLink === 'https://figma.com') return '';
  const figmaSrc = project.figmaLink.includes('embed.figma.com')
    ? project.figmaLink
    : `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(project.figmaLink)}`;
  const figmaScale = Number(project.figmaEmbedScale) > 0 ? Number(project.figmaEmbedScale) : 1;
  const figmaHeight = Number(project.figmaEmbedHeight) > 0 ? Number(project.figmaEmbedHeight) : 600;
  return `<div class="figma-embed-container" style="height:${figmaHeight}px;"><iframe src="${figmaSrc}" style="height:${figmaHeight}px; transform: scale(${figmaScale}); transform-origin: center top;" allowfullscreen title="${project.title} Figma prototype"></iframe></div>`;
}

function buildDashboardEmbed(project) {
  if (!project.dashboardEmbed) return '';
  const height = Number(project.dashboardEmbedHeight) > 0 ? Number(project.dashboardEmbedHeight) : 720;
  return `<div class="dashboard-embed-container" style="height:${height}px;"><iframe src="${project.dashboardEmbed}" style="height:${height}px;" title="${project.title} dashboard UI" loading="lazy"></iframe></div>`;
}

function buildScreenshotsGallery(project) {
  const shots = (project.screenshots || []).filter(Boolean);
  if (!shots.length) return '';
  return `<div class="project-screenshots">${shots.map((src, i) => `<figure class="project-screenshot"><img src="${src}" alt="${project.title} screenshot ${i + 1}" loading="lazy"></figure>`).join('')}</div>`;
}

function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('project-modal-body');
  if (!modal || !body) return;

  const cs = project.caseStudy || {};
  const figmaEmbed = buildFigmaEmbed(project);
  const dashboardEmbed = buildDashboardEmbed(project);
  const screenshotsGallery = buildScreenshotsGallery(project);
  const hasDashboard = Boolean(project.dashboardEmbed);
  const hasFigma = Boolean(figmaEmbed);

  body.innerHTML = `
    <div style="padding: 0 48px 48px;">
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
        <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--accent); letter-spacing: 0.2em; text-transform: uppercase;">${project.category}</span>
        <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-3); letter-spacing: 0.1em;">${project.year}</span>
        <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-3); letter-spacing: 0.1em;">${project.duration || ''}</span>
      </div>
      <h2 style="font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.6rem); color: var(--text-0); letter-spacing: -0.025em; margin-bottom: 8px;">${project.title}</h2>
      <p style="font-size: 1.1rem; color: var(--text-2); font-style: italic; font-family: var(--font-display); margin-bottom: 32px;">${project.subtitle || ''}</p>

      ${project.technologies.length ? `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--border);">
        ${project.technologies.map(t => `<span style="font-size: 0.75rem; color: var(--text-2); background: var(--surface-2); border: 1px solid var(--border); padding: 4px 12px; border-radius: 999px;">${t}</span>`).join('')}
      </div>` : ''}

      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;">
        ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="btn btn-primary" style="text-decoration:none;">${hasDashboard ? iconDashboard + 'View Dashboard' : iconExternal + 'Live Demo'}</a>` : ''}
        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-ghost" style="text-decoration:none;">${iconGithub}View Code</a>` : ''}
        ${project.figmaLink ? `<a href="${project.figmaLink}" target="_blank" class="btn btn-ghost" style="text-decoration:none;">${iconFigma}Open in Figma</a>` : ''}
      </div>

      ${cs.overview ? `
      <div style="margin-bottom: 40px;">
        <div class="case-section-label" style="display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;"><span style="width:20px;height:1px;background:var(--accent);display:inline-block"></span>Overview</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.overview}</p>
      </div>` : ''}

      ${cs.problem ? `
      <div style="margin-bottom: 40px; padding: 28px; background: rgba(244,114,182,0.05); border: 1px solid rgba(244,114,182,0.15); border-radius: 16px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:#f472b6;letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Problem Statement</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.problem}</p>
      </div>` : ''}

      ${cs.research ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--cyan);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Research</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.research}</p>
      </div>` : ''}

      ${cs.userFlow ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">User Flow</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.userFlow}</p>
      </div>` : ''}

      ${cs.wireframes ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Wireframes</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.wireframes}</p>
      </div>` : ''}

      ${cs.designSystem ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Design System</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.designSystem}</p>
      </div>` : ''}

      ${hasDashboard ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Dashboard UI</div>
        <p style="font-size: 0.9rem; color: var(--text-3); margin-bottom: 16px; line-height: 1.6;">Interactive preview of the ${project.title} dashboard UI${project.id === 'autoguard' ? ' (Streamlit · <code style="font-family:var(--font-mono);font-size:.8em;color:var(--text-2)">dashboard.py</code> major project)' : ''}.</p>
        ${dashboardEmbed}
      </div>` : ''}

      ${screenshotsGallery ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Screenshots</div>
        ${screenshotsGallery}
      </div>` : ''}

      ${hasFigma ? `
      <div style="margin-bottom: 40px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Figma Prototype</div>
        ${figmaEmbed}
      </div>` : ''}

      ${cs.results ? `
      <div style="margin-bottom: 40px; padding: 28px; background: rgba(52,211,153,0.05); border: 1px solid rgba(52,211,153,0.15); border-radius: 16px;">
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--emerald);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Results</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8;">${cs.results}</p>
      </div>` : ''}

      ${cs.lessons ? `
      <div>
        <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--text-3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;">Lessons Learned</div>
        <p style="font-size: 1rem; color: var(--text-2); line-height: 1.8; font-style: italic; font-family: var(--font-display); font-size: 1.1rem;">"${cs.lessons}"</p>
      </div>` : ''}
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// SVG icons for modal
const iconExternal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const iconGithub = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`;
const iconFigma = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><circle cx="12" cy="12" r="10"/></svg>`;
const iconDashboard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;

function initModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  document.getElementById('project-modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================
   RESUME MODAL
   ============================================ */
function initResumeModal() {
  const btn = document.getElementById('resume-preview-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  if (!btn || !modal) return;
  btn.addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  });
}

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */
function initCarousel() {
  const track = document.querySelector('.testimonials-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const total = slides.length;
  if (!total) return;
  let slideWidth = () => slides[0]?.offsetWidth + 24 || 0;

  function updateDots() {
    dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === carouselIndex);
    });
  }

  function goTo(i) {
    carouselIndex = Math.max(0, Math.min(i, total - 1));
    track.style.transform = `translateX(-${carouselIndex * (slideWidth())}px)`;
    updateDots();
  }

  prevBtn?.addEventListener('click', () => goTo(carouselIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(carouselIndex + 1));
  dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance
  let autoTimer = setInterval(() => goTo((carouselIndex + 1) % total), 5000);
  track.closest('.testimonials-carousel')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.testimonials-carousel')?.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo((carouselIndex + 1) % total), 5000);
  });

  // Touch
  let touchStart = 0;
  track.addEventListener('touchstart', e => touchStart = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? carouselIndex + 1 : carouselIndex - 1);
  });
}

/* ============================================
   CONTACT LINKS (from CONFIG)
   ============================================ */
function initContactLinks() {
  document.querySelectorAll('[data-contact="linkedin"]').forEach(el => {
    el.href = CONFIG.linkedin;
    const label = el.querySelector('[data-contact-label]');
    if (label) label.textContent = CONFIG.linkedinName;
  });
  document.querySelectorAll('[data-contact="email"]').forEach(el => {
    el.href = `mailto:${CONFIG.email}`;
    const label = el.querySelector('[data-contact-label]');
    if (label) label.textContent = CONFIG.email;
  });
  document.querySelectorAll('[data-contact="phone"]').forEach(el => {
    el.href = `tel:${CONFIG.phone}`;
    const label = el.querySelector('[data-contact-label]');
    if (label) label.textContent = '+91 63034 59586';
  });
  document.querySelectorAll('[data-contact="github"]').forEach(el => {
    el.href = CONFIG.github;
  });
}

/* ============================================
   CONTACT FORM (FormSubmit with mailto fallback)
   ============================================ */
function buildMailtoUrl(name, email, subjectLabel, message) {
  const subject = encodeURIComponent(`Portfolio: ${subjectLabel} — ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nTopic: ${subjectLabel}\n\n${message}`
  );
  return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successDefault = '✓ Message sent! I\'ll get back to you within 24 hours.';
  const successMailto = '✓ Your email app is opening — click Send there to deliver the message.';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const success = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');
    const btnDefaultHtml = btn.innerHTML;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    if (errorEl) errorEl.style.display = 'none';
    if (success) success.style.display = 'none';

    if (!name || !email || !message) {
      if (errorEl) {
        errorEl.textContent = 'Please fill in your name, email, and message.';
        errorEl.style.display = 'block';
      }
      return;
    }

    const subjectLabels = {
      internship: 'Internship opportunity',
      fulltime: 'Entry-level role',
      collab: 'Project collaboration',
      other: 'General inquiry',
    };
    const subjectLabel = subjectLabels[subject] || 'Portfolio inquiry';

    btn.disabled = true;
    btn.innerHTML = 'Sending...';

    const payload = new FormData();
    payload.append('name', name);
    payload.append('email', email);
    payload.append('message', message);
    payload.append('_subject', `Portfolio: ${subjectLabel} — ${name}`);
    payload.append('_replyto', email);
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');

    function finishMailto() {
      window.location.href = buildMailtoUrl(name, email, subjectLabel, message);
      if (success) {
        success.textContent = successMailto;
        success.style.display = 'block';
      }
      form.reset();
      btn.innerHTML = 'Opening email...';
      setTimeout(() => {
        btn.innerHTML = btnDefaultHtml;
        btn.disabled = false;
        if (success) success.textContent = successDefault;
      }, 5000);
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.email)}`, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Could not send message.');
      }

      if (success) {
        success.textContent = successDefault;
        success.style.display = 'block';
      }
      form.reset();
      btn.innerHTML = 'Message Sent!';
      setTimeout(() => {
        btn.innerHTML = btnDefaultHtml;
        btn.disabled = false;
      }, 4000);
    } catch {
      finishMailto();
    }
  });
}

/* ============================================
   CERTIFICATE MODAL
   ============================================ */
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  const img = document.getElementById('cert-modal-img');
  const titleEl = document.getElementById('cert-modal-title');
  if (!modal || !img) return;

  function openCert(src, title) {
    img.src = src;
    img.alt = title || 'Certificate';
    if (titleEl) titleEl.textContent = title || 'Certificate';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCert() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.querySelectorAll('[data-cert]').forEach(el => {
    el.addEventListener('click', () => {
      openCert(el.dataset.cert, el.dataset.certTitle);
    });
  });

  document.getElementById('cert-modal-close')?.addEventListener('click', closeCert);
  modal.addEventListener('click', e => { if (e.target === modal) closeCert(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeCert();
  });
}

/* ============================================
   TYPED TEXT EFFECT
   ============================================ */
function initTyped() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const roles = ['UI/UX Designer', 'Figma Designer', 'Wireframing', 'Prototyping'];
  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const full = roles[ri];
    el.textContent = deleting ? full.substring(0, ci--) : full.substring(0, ci++);
    let delay = deleting ? 50 : 80;
    if (!deleting && ci === full.length + 1) { delay = 2000; deleting = true; }
    if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ============================================
   INIT
   ============================================ */
window.openProjectModal = openProjectModal;

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden'; // blocked until loader done
  initLoader();
  initCursor();
  initScrollProgress();
  initNav();
  initParallax();
  initCounters();
  initModal();
  initResumeModal();
  initCertModal();
  initCarousel();
  initContactLinks();
  initContactForm();
  initTyped();
  initMagnetic();
  loadProjects();
});