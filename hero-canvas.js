/* ==========================================================================
   TECHNOSOFT MASTERS INC. - Comprehensive Global Cyber Network & Globe Engine
   Features:
   - Full Hero Background Canvas
   - Deep Navy Space & Twinkling Stars
   - High-Density 3D Cyber Mesh Globe with Rotating Constellations & Hub Arcs
   - 3D Perspective Optical Fiber Data Highway with Streaming Light Beams
   - Three Holographic Pedestals at Bottom (Cloud, Server, Shield)
   - Interactive Mouse Parallax & Responsive DPI Scaling
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Globe parameters
  let globeRadius = 250;
  let globeCX = 0;
  let globeCY = 0;
  let rotY = 0;
  let rotX = 0.28;
  let rotSpeed = 0.0035;
  const fov = 500;

  // Interactivity
  let mouse = { x: null, y: null };
  let mouseTiltX = 0;
  let mouseTiltY = 0;

  // Data Arrays
  let sphereDots = [];
  let stars = [];
  let hubs = [];
  let arcs = [];
  let dataPackets = [];
  let fiberLines = [];
  let streamPackets = [];
  let outerConstellations = [];

  // Hub Definitions
  const hubDefs = [
    { name: 'Toronto/Mississauga (HQ)', lat: 0.76, lon: -1.38, isHQ: true, color: '#f3c64c' },
    { name: 'New York', lat: 0.71, lon: -1.29, isHQ: false, color: '#00d2ff' },
    { name: 'San Francisco', lat: 0.65, lon: -2.13, isHQ: false, color: '#00d2ff' },
    { name: 'London', lat: 0.90, lon: 0.00, isHQ: false, color: '#00d2ff' },
    { name: 'Frankfurt', lat: 0.87, lon: 0.15, isHQ: false, color: '#00d2ff' },
    { name: 'Tokyo', lat: 0.62, lon: 2.43, isHQ: false, color: '#f3c64c' },
    { name: 'Singapore', lat: 0.02, lon: 1.81, isHQ: false, color: '#00d2ff' },
    { name: 'Sydney', lat: -0.59, lon: 2.64, isHQ: false, color: '#00d2ff' },
    { name: 'São Paulo', lat: -0.41, lon: -0.81, isHQ: false, color: '#00d2ff' },
    { name: 'Dubai', lat: 0.44, lon: 0.96, isHQ: false, color: '#f3c64c' }
  ];

  const arcPairs = [
    [0, 1], [0, 2], [0, 3], [1, 8], [3, 4], [3, 9], [4, 5], [5, 6], [6, 7], [9, 6], [2, 5]
  ];

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Responsive Positioning
    if (width > 992) {
      globeCX = width * 0.73;
      globeCY = height * 0.44;
      globeRadius = Math.min(width * 0.28, height * 0.45, 275);
    } else {
      globeCX = width * 0.5;
      globeCY = height * 0.62;
      globeRadius = Math.min(width * 0.42, 200);
    }

    initScene();
  }

  function initScene() {
    sphereDots = [];
    stars = [];
    hubs = [];
    arcs = [];
    dataPackets = [];
    fiberLines = [];
    streamPackets = [];
    outerConstellations = [];

    const isMobile = width < 768;

    // 1. Generate 3D Sphere Lattice
    const dotCount = isMobile ? 550 : 950;
    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = 2 * Math.PI * i / phi;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      sphereDots.push({
        x: x,
        y: y,
        z: z,
        baseSize: Math.random() * 1.6 + 0.8,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent: Math.random() < 0.12
      });
    }

    // 2. Hubs & Arcs
    hubDefs.forEach((hub, idx) => {
      const x = Math.cos(hub.lat) * Math.sin(hub.lon);
      const y = -Math.sin(hub.lat);
      const z = Math.cos(hub.lat) * Math.cos(hub.lon);

      hubs.push({
        index: idx,
        name: hub.name,
        isHQ: hub.isHQ,
        color: hub.color,
        x: x, y: y, z: z,
        pulseVal: Math.random() * Math.PI * 2
      });
    });

    arcPairs.forEach(pair => {
      const h1 = hubs[pair[0]];
      const h2 = hubs[pair[1]];
      if (h1 && h2) {
        arcs.push({
          h1: h1, h2: h2,
          color: h1.isHQ || h2.isHQ ? 'rgba(243, 198, 76, 0.55)' : 'rgba(0, 210, 255, 0.45)'
        });

        // 2 packets per arc
        for (let k = 0; k < 2; k++) {
          dataPackets.push({
            h1: h1, h2: h2,
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.007,
            isHQ: h1.isHQ || h2.isHQ,
            color: h1.isHQ || h2.isHQ ? '#f3c64c' : '#00d2ff',
            size: Math.random() * 2 + 1.8
          });
        }
      }
    });

    // 3. Outer Constellation Links (Extending from Globe)
    const constCount = isMobile ? 8 : 16;
    for (let i = 0; i < constCount; i++) {
      const angle = (i / constCount) * Math.PI * 2;
      const dist = globeRadius * (1.2 + Math.random() * 0.45);
      outerConstellations.push({
        angle: angle,
        dist: dist,
        size: Math.random() * 2.5 + 1.5,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() < 0.25 ? '#f3c64c' : '#00d2ff'
      });
    }

    // 4. Background Twinkling Tech Stars
    const starCount = isMobile ? 40 : 80;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinkleVal: Math.random() * Math.PI * 2,
        color: Math.random() < 0.2 ? '#f3c64c' : '#00d2ff'
      });
    }

    // 5. Optical Fiber Perspective Lines (Bottom Highway)
    const fiberCount = isMobile ? 35 : 70;
    const vpX = width * 0.52;
    const vpY = height * 0.52;

    for (let i = 0; i < fiberCount; i++) {
      const spreadX = (i / (fiberCount - 1) - 0.5) * (width * 1.6);
      const endX = vpX + spreadX;
      const endY = height + 40;

      fiberLines.push({
        startX: vpX,
        startY: vpY,
        endX: endX,
        endY: endY,
        color: Math.random() < 0.18 ? 'rgba(243, 198, 76, 0.4)' : 'rgba(0, 210, 255, 0.35)',
        width: Math.random() * 1.2 + 0.6
      });
    }

    // 6. Traveling Light Stream Packets on Highway
    const streamCount = isMobile ? 25 : 55;
    for (let i = 0; i < streamCount; i++) {
      const line = fiberLines[Math.floor(Math.random() * fiberLines.length)];
      streamPackets.push({
        line: line,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014,
        length: Math.random() * 40 + 20,
        color: Math.random() < 0.2 ? '#f3c64c' : '#00d2ff',
        size: Math.random() * 2 + 1.2
      });
    }
  }

  function project3D(x, y, z, cx, cy, rad, currentRotY, currentRotX) {
    const cosY = Math.cos(currentRotY);
    const sinY = Math.sin(currentRotY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    const cosX = Math.cos(currentRotX);
    const sinX = Math.sin(currentRotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    const scale = fov / (fov + z2 * rad);
    const px = cx + x1 * rad * scale;
    const py = cy + y2 * rad * scale;

    return {
      x: px,
      y: py,
      z: z2,
      scale: scale,
      visible: z2 > -0.3
    };
  }

  function drawSphericalArc(h1, h2, cx, cy, rad, currentRotY, currentRotX, color) {
    const steps = 22;
    const p1 = { x: h1.x, y: h1.y, z: h1.z };
    const p2 = { x: h2.x, y: h2.y, z: h2.z };

    ctx.beginPath();
    let first = true;
    let anyVisible = false;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      let ix = p1.x * (1 - t) + p2.x * t;
      let iy = p1.y * (1 - t) + p2.y * t;
      let iz = p1.z * (1 - t) + p2.z * t;
      const len = Math.sqrt(ix * ix + iy * iy + iz * iz);
      const arcLift = 1 + Math.sin(t * Math.PI) * 0.16;
      const r = (arcLift / len);

      const proj = project3D(ix * r, iy * r, iz * r, cx, cy, rad, currentRotY, currentRotX);

      if (proj.z > -0.2) anyVisible = true;

      if (first) {
        ctx.moveTo(proj.x, proj.y);
        first = false;
      } else {
        ctx.lineTo(proj.x, proj.y);
      }
    }

    if (anyVisible) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  // Draw 3 Holographic Pedestals at the bottom
  function drawPedestals() {
    const pedestals = [
      { x: width * 0.12, y: height * 0.88, rx: 44, ry: 14, icon: 'cloud', label: 'Cloud' },
      { x: width * 0.36, y: height * 0.88, rx: 44, ry: 14, icon: 'server', label: 'Infrastructure' },
      { x: width * 0.62, y: height * 0.88, rx: 44, ry: 14, icon: 'shield', label: 'Security' }
    ];

    if (width < 768) return; // Hide pedestals on small screens for clarity

    const t = Date.now() * 0.002;

    pedestals.forEach((p, idx) => {
      // Outer glowing ring
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 210, 255, 0.6)';
      ctx.stroke();

      // Inner rotating dashed ring
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.rx * 0.72, p.ry * 0.72, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(243, 198, 76, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -t * 10;
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertical pedestal light beam
      const beamGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y - 45);
      beamGrad.addColorStop(0, 'rgba(0, 210, 255, 0.35)');
      beamGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(p.x - p.rx * 0.5, p.y);
      ctx.lineTo(p.x + p.rx * 0.5, p.y);
      ctx.lineTo(p.x + p.rx * 0.3, p.y - 40);
      ctx.lineTo(p.x - p.rx * 0.3, p.y - 40);
      ctx.closePath();
      ctx.fill();

      // Holographic Floating Icon Above Pedestal
      const floatY = p.y - 32 + Math.sin(t + idx) * 4;

      // Icon Hexagon Badge
      ctx.beginPath();
      ctx.arc(p.x, floatY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 14, 30, 0.85)';
      ctx.strokeStyle = idx === 1 ? 'rgba(243, 198, 76, 0.6)' : 'rgba(0, 210, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = idx === 1 ? '#f3c64c' : '#00d2ff';
      ctx.fill();
      ctx.stroke();

      // Render simplified cyber icon glyph inside
      ctx.fillStyle = idx === 1 ? '#f3c64c' : '#00d2ff';
      ctx.strokeStyle = idx === 1 ? '#f3c64c' : '#00d2ff';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;

      if (p.icon === 'cloud') {
        // Cloud glyph
        ctx.beginPath();
        ctx.arc(p.x - 4, floatY - 2, 5, 0, Math.PI * 2);
        ctx.arc(p.x + 4, floatY - 3, 6, 0, Math.PI * 2);
        ctx.rect(p.x - 8, floatY, 16, 4);
        ctx.stroke();
      } else if (p.icon === 'server') {
        // Server stack glyph
        ctx.strokeRect(p.x - 8, floatY - 8, 16, 5);
        ctx.strokeRect(p.x - 8, floatY - 1, 16, 5);
        ctx.strokeRect(p.x - 8, floatY + 6, 16, 5);
      } else if (p.icon === 'shield') {
        // Shield glyph
        ctx.beginPath();
        ctx.moveTo(p.x, floatY - 9);
        ctx.lineTo(p.x + 8, floatY - 5);
        ctx.lineTo(p.x + 6, floatY + 4);
        ctx.lineTo(p.x, floatY + 9);
        ctx.lineTo(p.x - 6, floatY + 4);
        ctx.lineTo(p.x - 8, floatY - 5);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    rotY += rotSpeed;
    const currentRotX = rotX + mouseTiltY;
    const currentRotY = rotY + mouseTiltX;

    // 1. Draw Twinkling Tech Stars
    stars.forEach(star => {
      star.twinkleVal += star.twinkleSpeed;
      const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.twinkleVal));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = currentAlpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 2. Draw Optical Fiber Highway Lines (Perspective Bottom)
    fiberLines.forEach(f => {
      ctx.beginPath();
      ctx.moveTo(f.startX, f.startY);
      ctx.lineTo(f.endX, f.endY);
      ctx.strokeStyle = f.color;
      ctx.lineWidth = f.width;
      ctx.stroke();
    });

    // 3. Draw Streaming Data Packets along Highway
    streamPackets.forEach(sp => {
      sp.progress += sp.speed;
      if (sp.progress > 1) sp.progress = 0;

      const pX = sp.line.startX + (sp.line.endX - sp.line.startX) * sp.progress;
      const pY = sp.line.startY + (sp.line.endY - sp.line.startY) * sp.progress;
      const tailX = sp.line.startX + (sp.line.endX - sp.line.startX) * Math.max(0, sp.progress - 0.05);
      const tailY = sp.line.startY + (sp.line.endY - sp.line.startY) * Math.max(0, sp.progress - 0.05);

      const grad = ctx.createLinearGradient(tailX, tailY, pX, pY);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, sp.color);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(pX, pY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = sp.size * (1 + sp.progress * 1.5);
      ctx.shadowBlur = 8;
      ctx.shadowColor = sp.color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // 4. Globe Atmospheric Halo Glow
    const haloGrad = ctx.createRadialGradient(
      globeCX, globeCY, globeRadius * 0.5,
      globeCX, globeCY, globeRadius * 1.38
    );
    haloGrad.addColorStop(0, 'rgba(0, 114, 245, 0.28)');
    haloGrad.addColorStop(0.55, 'rgba(0, 210, 255, 0.12)');
    haloGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(globeCX, globeCY, globeRadius * 1.38, 0, Math.PI * 2);
    ctx.fill();

    // 5. Outer Constellation Network Lines & Flares
    outerConstellations.forEach(c => {
      c.pulse += 0.03;
      const curDist = c.dist + Math.sin(c.pulse) * 6;
      const x = globeCX + Math.cos(c.angle + rotY * 0.5) * curDist;
      const y = globeCY + Math.sin(c.angle + rotY * 0.5) * (curDist * 0.6);

      // Connecting line to center/surface
      ctx.beginPath();
      ctx.moveTo(globeCX + Math.cos(c.angle + rotY * 0.5) * globeRadius * 0.9, globeCY + Math.sin(c.angle + rotY * 0.5) * (globeRadius * 0.55));
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Flare Dot
      ctx.beginPath();
      ctx.arc(x, y, c.size, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = c.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 6. Project & Draw Globe Dots (Depth Sorted)
    const projectedDots = [];
    sphereDots.forEach(dot => {
      const p = project3D(dot.x, dot.y, dot.z, globeCX, globeCY, globeRadius, currentRotY, currentRotX);
      projectedDots.push({ p: p, dot: dot });
    });

    projectedDots.sort((a, b) => a.p.z - b.p.z);

    projectedDots.forEach(item => {
      const p = item.p;
      const dot = item.dot;

      const isFront = p.z > 0;
      const depthAlpha = isFront
        ? Math.min(1, 0.4 + p.z * 0.6)
        : Math.max(0.08, 0.25 + p.z * 0.3);

      const dotSize = Math.max(0.6, dot.baseSize * p.scale * (isFront ? 1.2 : 0.8));

      ctx.beginPath();
      ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);

      if (dot.isAccent && isFront) {
        ctx.fillStyle = '#f3c64c';
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(243, 198, 76, 0.8)';
      } else if (isFront) {
        ctx.fillStyle = '#00d2ff';
        ctx.shadowBlur = p.z > 0.35 ? 6 : 0;
        ctx.shadowColor = 'rgba(0, 210, 255, 0.7)';
      } else {
        ctx.fillStyle = '#0052cc';
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = depthAlpha;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1.0;

    // 7. Draw Global Arcs
    arcs.forEach(arc => {
      drawSphericalArc(arc.h1, arc.h2, globeCX, globeCY, globeRadius, currentRotY, currentRotX, arc.color);
    });

    // 8. Draw Traveling Data Packets along Arcs
    dataPackets.forEach(dp => {
      dp.progress += dp.speed;
      if (dp.progress > 1) dp.progress = 0;

      const p1 = { x: dp.h1.x, y: dp.h1.y, z: dp.h1.z };
      const p2 = { x: dp.h2.x, y: dp.h2.y, z: dp.h2.z };
      const t = dp.progress;

      let ix = p1.x * (1 - t) + p2.x * t;
      let iy = p1.y * (1 - t) + p2.y * t;
      let iz = p1.z * (1 - t) + p2.z * t;
      const len = Math.sqrt(ix * ix + iy * iy + iz * iz);
      const arcLift = 1 + Math.sin(t * Math.PI) * 0.16;
      const r = (arcLift / len);

      const proj = project3D(ix * r, iy * r, iz * r, globeCX, globeCY, globeRadius, currentRotY, currentRotX);

      if (proj.z > -0.2) {
        const alpha = Math.min(1, Math.max(0.2, (proj.z + 0.2) * 1.5));
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, dp.size * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = dp.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = dp.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }
    });

    // 9. Draw Regional Hub Beacons
    hubs.forEach(hub => {
      hub.pulseVal += 0.04;
      const proj = project3D(hub.x, hub.y, hub.z, globeCX, globeCY, globeRadius, currentRotY, currentRotX);

      if (proj.z > -0.1) {
        const alpha = Math.min(1, Math.max(0.3, (proj.z + 0.1) * 1.4));
        const pulseSize = (hub.isHQ ? 5.5 : 3.8) * proj.scale;

        const ringRadius = pulseSize + (Math.sin(hub.pulseVal) * 0.5 + 0.5) * 8 * proj.scale;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = hub.color;
        ctx.globalAlpha = alpha * (1 - (ringRadius - pulseSize) / (8 * proj.scale + 0.1));
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = hub.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = hub.isHQ ? 16 : 8;
        ctx.shadowColor = hub.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        if (hub.isHQ && proj.z > 0.3) {
          ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#f3c64c';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#000000';
          ctx.fillText('HQ: MISSISSAUGA', proj.x + 10, proj.y - 6);
          ctx.shadowBlur = 0;
        }
      }
    });

    // 10. Draw 3 Holographic Pedestals at Bottom
    drawPedestals();

    animationFrameId = requestAnimationFrame(render);
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.x = x;
    mouse.y = y;

    const normX = (x / width - 0.5) * 2;
    const normY = (y / height - 0.5) * 2;
    mouseTiltX = normX * 0.25;
    mouseTiltY = normY * 0.15;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
    mouseTiltX = 0;
    mouseTiltY = 0;
  }

  window.addEventListener('resize', debounce(resize, 150));
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    }
  });

  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }

  resize();
  animationFrameId = requestAnimationFrame(render);
})();
