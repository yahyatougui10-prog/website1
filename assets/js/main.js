/* =====================================================
   DockerBloom — HYPER-FLUID CORE v5 (3D & GSAP Edition)
   ===================================================== */

'use strict';

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

/* ─────────────────────────────────────────────────────
   1. STATE & DATA MANAGEMENT
   ───────────────────────────────────────────────────── */
const state = {
  mastery: 0,
  unlockedConcepts: new Set(),
  containers: [],
  paletteOpen: false
};

async function initContent() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Populate Concepts (Bento Grid)
    const conceptsGrid = document.getElementById('concepts-grid');
    if (conceptsGrid) {
      data.concepts.forEach((concept, index) => {
        const item = document.createElement('div');
        const sizeClass = index === 0 ? 'large' : (index === 1 ? 'tall' : '');
        item.className = `bento-item ${sizeClass}`;
        item.dataset.id = concept.id;
        item.dataset.points = concept.mastery_points;
        item.innerHTML = `
          <span class="bento-icon">${concept.icon}</span>
          <h3 class="bento-title">${concept.title}</h3>
          <p class="bento-desc">${concept.desc}</p>
          <div class="bento-tags">
            ${concept.tags.map(tag => `<span class="bento-tag">${tag}</span>`).join('')}
          </div>
        `;

        item.onmouseenter = () => {
          if (!state.unlockedConcepts.has(concept.id)) {
            state.unlockedConcepts.add(concept.id);
            updateMastery(concept.mastery_points);
            showNotification(`+${concept.mastery_points} points: ${concept.title}`);
          }
        };
        conceptsGrid.appendChild(item);
      });
    }

    // Populate Apps Grid
    const appsGrid = document.getElementById('apps-grid');
    if (appsGrid) {
      data.apps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
          <span class="app-icon" style="background: ${app.color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${app.icon}</span>
          <h3 class="app-name">${app.name}</h3>
          <span class="app-cat">${app.cat}</span>
          <div class="app-cmd"><code>${app.cmd}</code></div>
        `;
        appsGrid.appendChild(card);
      });
    }
  } catch (e) {
    console.error("Failed to load site data:", e);
  }
}

function updateMastery(points) {
  state.mastery = Math.min(state.mastery + points, 100);
  const fill = document.getElementById('mastery-fill');
  const percent = document.getElementById('mastery-percent');
  if (fill) fill.style.width = `${state.mastery}%`;
  if (percent) percent.textContent = `${state.mastery}%`;
}

function showNotification(msg) {
  const toast = document.getElementById('notification-toast');
  const toastMsg = toast.querySelector('.toast-msg');
  if (toast) {
    toastMsg.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  }
}

/* ─────────────────────────────────────────────────────
   2. CINEMATIC BLOOM INTRO (GSAP Powered)
   ───────────────────────────────────────────────────── */
(function initBloomIntro() {
  const loader = document.getElementById('intro-loader');
  const status = document.getElementById('bloom-status');
  const title = document.querySelector('.bloom-title');
  const core = document.querySelector('.bloom-core');
  if (!loader) return;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        scale: 1.5,
        filter: 'blur(20px)',
        duration: 1.5,
        ease: 'expo.inOut',
        onComplete: () => {
          loader.classList.add('hidden');
          document.body.classList.add('loaded');
          revealSite();
        }
      });
    }
  });

  const stages = [
    'Initialisation du noyau...',
    'Calibrage du coeur Bloom...',
    'Expansion des couches réseau...',
    'Synchronisation des containers...',
    'Déploiement de l\'élégance...',
    'Système opérationnel.'
  ];

  stages.forEach((msg, i) => {
    tl.to(status, {
      duration: 0.1,
      onStart: () => { if(status) status.textContent = msg; }
    }, i * 0.8);
  });

  tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'back.out' }, 3);
  tl.to(core, { scale: 1.2, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0);

  tl.to({}, { duration: 1 });

  function revealSite() {
    gsap.to('#navbar', { opacity: 1, y: 0, duration: 1, ease: 'back.out' });
    gsap.to('#hero', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' });

    const sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.5 + (i * 0.2),
        ease: 'power3.out'
      });
    });
  }
})();

/* ─────────────────────────────────────────────────────
   3. 3D STARFIELD BACKGROUND (Three.js)
   ───────────────────────────────────────────────────── */
(function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particlesGeometry = new THREE.BufferGeometry();
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  camera.position.z = 2;

  function animate() {
    requestAnimationFrame(animate);

    // Subtle rotation
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;

    // Scroll-linked movement
    const scrollY = window.scrollY;
    camera.position.z = 2 - (scrollY * 0.001);
    camera.position.y = -scrollY * 0.0005;

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
})();

/* ─────────────────────────────────────────────────────
   4. COMMAND PALETTE (Ctrl+K)
   ───────────────────────────────────────────────────── */
(function initPalette() {
  const palette = document.getElementById('command-palette');
  const input = document.getElementById('palette-input');
  const results = document.getElementById('palette-results');

  window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      palette.classList.toggle('active');
      if (palette.classList.contains('active')) input.focus();
    }
    if (e.key === 'Escape') palette.classList.remove('active');
  });

  input.addEventListener('input', async () => {
    const query = input.value;
    if (!query) {
      results.innerHTML = '';
      return;
    }

    const res = await fetch(\`/api/suggest?query=\${encodeURIComponent(query)}\`);
    const data = await res.json();

    results.innerHTML = data.suggestions.map(s => \`
      <div class="palette-item" onclick="window.location.hash='playground'; document.getElementById('play-input').value='\${s}'; document.getElementById('play-submit').click();">
        <span>\${s}</span>
        <span class="kbd">Enter</span>
      </div>
    \`).join('') || '<div class="palette-item">Aucun résultat</div>';
  });
})();

/* ─────────────────────────────────────────────────────
   5. ADVANCED ARCHITECTURE VISUALIZER
   ───────────────────────────────────────────────────── */
(function initPlayground() {
  const playInput = document.getElementById('play-input');
  const playSubmit = document.getElementById('play-submit');
  const playOutput = document.getElementById('play-output');
  const containerNodes = document.getElementById('container-nodes');
  const vizSvg = document.getElementById('viz-svg');

  if (!playInput || !playSubmit) return;

  function drawConnection(fromId, toId, active = false) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    if (!from || !to) return;

    const r1 = from.getBoundingClientRect();
    const r2 = to.getBoundingClientRect();
    const canvasR = document.getElementById('viz-canvas').getBoundingClientRect();

    const x1 = r1.left + r1.width/2 - canvasR.left;
    const y1 = r1.top + r1.height/2 - canvasR.top;
    const x2 = r2.left + r2.width/2 - canvasR.left;
    const y2 = r2.top + r2.height/2 - canvasR.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = \`M \${x1} \${y1} C \${x1} \${y1}, \${x2} \${y1}, \${x2} \${y2}\`;
    line.setAttribute("d", d);
    line.setAttribute("class", \`viz-line \${active ? 'active' : ''}\`);
    vizSvg.appendChild(line);
    if (active) {
      setTimeout(() => line.remove(), 2000);
    }
  }

  async function handleCmd(cmd) {
    const line = document.createElement('div');
    line.className = 'play-line';
    line.innerHTML = \`<span class="prompt">❯</span> \${cmd}\`;
    playOutput.appendChild(line);

    try {
      const res = await fetch(\`/api/execute?cmd=\${encodeURIComponent(cmd)}\`);
      const text = await res.text();
      const resp = document.createElement('div');
      resp.className = 'play-response';
      resp.textContent = text;
      playOutput.appendChild(resp);

      if (cmd.includes('docker run')) {
        const id = 'cnt-' + Math.random().toString(36).substr(2, 5);
        const node = document.createElement('div');
        node.id = id;
        node.className = 'node container-node';
        node.textContent = 'Container';
        node.style.left = \`\${20 + Math.random() * 60}%\`;
        node.style.top = \`\${30 + Math.random() * 40}%\`;
        containerNodes.appendChild(node);

        setTimeout(() => {
          drawConnection('node-host', id, true);
          drawConnection(id, 'node-net', true);
        }, 100);
      }
    } catch (e) {
      const err = document.createElement('div');
      err.className = 'play-error';
      err.textContent = 'Docker Engine Offline';
      playOutput.appendChild(err);
    }
    playOutput.scrollTop = playOutput.scrollHeight;
  }

  playSubmit.onclick = () => {
    const cmd = playInput.value;
    if (cmd) handleCmd(cmd);
    playInput.value = '';
  };
  playInput.onkeypress = (e) => { if (e.key === 'Enter') playSubmit.click(); };
})();

/* ─────────────────────────────────────────────────────
   6. FLUIDITY & MOUSE
   ───────────────────────────────────────────────────── */
(function initFluidity() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  function animate() {
    glowX = lerp(glowX, mouseX, 0.1);
    glowY = lerp(glowY, mouseY, 0.1);
    glow.style.left = \`\${glowX}px\`;
    glow.style.top = \`\${glowY}px\`;
    requestAnimationFrame(animate);
  }
  animate();
})();

(function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// GSAP Scroll Animations for the About Section
(function initAboutAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.about-card-main', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    },
    scale: 0.8,
    opacity: 0,
    duration: 1
  });

  gsap.from('.about-blob', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      scrub: 2
    },
    x: (i) => (i % 2 === 0 ? -100 : 100),
    y: (i) => (i % 2 === 0 ? 50 : -50),
    opacity: 0,
    stagger: 0.2
  });
})();

window.addEventListener('DOMContentLoaded', initContent);
