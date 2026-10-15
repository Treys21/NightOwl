globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { teams } = NightOwl;
  const { escape: escapeHtml } = NightOwl.format;

  const SPARK_COUNT = 36;
  const SPARK_MIN_DISTANCE = 70;
  const SPARK_EXTRA_DISTANCE = 150;
  const SPARK_LIFETIME_MS = 1600;
  const TREND_WIDTH = 300;
  const TREND_HEIGHT = 44;
  const COUNT_UP_MS = 900;

  const score = (value) => (Math.round(value * 100) / 100).toFixed(2);

  function figureHtml(event, player, team, colors) {
    if (event.pos === 'DEF' || teams.isDefenseId(event.pid)) {
      return `<img class="logo" alt="" src="${teams.logo(team)}">`;
    }
    const jerseyLabel = escapeHtml(player.number || event.pos || '');
    return `
      <svg class="jersey" viewBox="0 0 120 112" aria-hidden="true">
        <path d="M34 8 L50 2 Q60 12 70 2 L86 8 L116 30 L102 54 L90 47 L90 110 L30 110 L30 47 L18 54 L4 30 Z"
              fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M12 40 L22 46 M108 40 L98 46" stroke="${colors.secondary}" stroke-width="5"/>
        <path d="M14 35 L24 41 M106 35 L96 41" stroke="${colors.ink}" stroke-width="2" opacity=".7"/>
        <text x="60" y="92" text-anchor="middle" font-family="Poppins, Inter, sans-serif" font-weight="800"
              font-size="${jerseyLabel.length > 2 ? 26 : 38}" fill="${colors.ink}" stroke="${colors.secondary}" stroke-width="1.5"
              paint-order="stroke">${jerseyLabel}</text>
      </svg>
      <img class="head" alt="" src="${teams.headshot(event.pid)}">`;
  }

  function spawnSparks(layer, mood, teamColors) {
    const sparkColors = [teamColors.primary, teamColors.secondary, '#ffffff', mood === 'bad' ? '#f75c8d' : '#00ceb8', teamColors.secondary];
    for (let i = 0; i < SPARK_COUNT; i++) {
      const spark = document.createElement('i');
      spark.className = 'spark';
      const angle = (Math.PI * 2 * i) / SPARK_COUNT + Math.random() * 0.3;
      const distance = SPARK_MIN_DISTANCE + Math.random() * SPARK_EXTRA_DISTANCE;
      spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--dy', `${Math.sin(angle) * distance * 0.6 + 30}px`);
      spark.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      spark.style.background = sparkColors[i % sparkColors.length];
      spark.style.animationDelay = `${Math.random() * 120}ms`;
      layer.append(spark);
      setTimeout(() => spark.remove(), SPARK_LIFETIME_MS);
    }
  }

  function countUp(element) {
    const startValue = parseFloat(element.dataset.from);
    const target = parseFloat(element.dataset.to);
    if (!Number.isFinite(startValue) || !Number.isFinite(target) || startValue === target) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / COUNT_UP_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = score(startValue + (target - startValue) * eased);
      if (progress < 1 && element.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }


  function trendSvg(series) {
    if (!series || series.length < 2) return '';
    const width = TREND_WIDTH;
    const height = TREND_HEIGHT;
    const startTime = series[0][0];
    const span = Math.max(1, series[series.length - 1][0] - startTime);
    const points = series.map(([time, chance]) => `${((time - startTime) / span * width).toFixed(1)},${((1 - chance) * height).toFixed(1)}`).join(' ');
    const end = series[series.length - 1][1];
    return `<div class="trend"><span class="muted small">Win chance today</span>
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" class="mid"/>
        <polyline points="${points}" class="${end >= 0.5 ? 'good' : 'bad'}"/>
      </svg></div>`;
  }

  NightOwl.liveEffects = { figureHtml, spawnSparks, countUp, score, trendSvg };
})(globalThis.NightOwl);
