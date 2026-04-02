import {
  getCycleStates,
  resolveAutoState,
  resolveClickReaction,
  shouldEnterMiniMode,
} from './logic/petState.js?v=2';

const stage = document.getElementById('stage');
const petDock = document.getElementById('pet-dock');
const petShell = document.getElementById('pet-shell');
const currentStateEl = document.getElementById('current-state');
const stateDescriptionEl = document.getElementById('state-description');
const autoToggleButton = document.getElementById('auto-toggle');
const stateButtons = [...document.querySelectorAll('.state-button')];
const pupils = [...document.querySelectorAll('.pupil')];

const descriptions = {
  idle: '待机，轻微呼吸、眨眼和眼神跟随。',
  thinking: '思考中，头顶冒小点，眼神会往上飘一点。',
  'working-typing': '工作：打字，屏幕跃动，敲击小键盘。',
  'working-building': '工作：建造，头戴安全帽挥舞小锤子。',
  'juggling-single': '杂耍：抛接单组方块，展现灵活度。',
  'juggling-multi': '陪伴：多色彩色方块在身旁围绕弹跳并杂耍。',
  error: '报错：红字 ERROR 飘起，眼部宕机变 X 并重重摔下。',
  happy: '汪意：开心蹦跳，向四周发射闪闪的小星星。',
  notification: '通知：跳跃提醒，旁边冒出大红感叹号。',
  sweeping: '扫地：手持木制长扫把执行清理旧缓存动画。',
  carrying: '搬运：带蓝帽头盔，抱着厚重的黄色封箱胶带纸箱小跑。',
  sleeping: '睡觉中，缩扁成一团，极其缓慢呼吸，冒 z。',
};

const cycleStates = getCycleStates();
let cycleIndex = 0;
let currentState = 'idle';
let autoPlay = true;
let autoTimer = null;
let clickCount = 0;
let clickTimer = null;
let lookTimer = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dockX = stage.clientWidth * 0.38;
let dockY = stage.clientHeight * 0.58;
let dragging = false;
let miniMode = false;



function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function syncDockPosition() {
  const stageRect = stage.getBoundingClientRect();
  const xPercent = (dockX / stageRect.width) * 100;
  const yPercent = (dockY / stageRect.height) * 100;
  petDock.style.setProperty('--dock-x', `${xPercent}%`);
  petDock.style.setProperty('--dock-y', `${yPercent}%`);
}

function updateButtonState() {
  stateButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.state === currentState);
  });
}

function setState(nextState) {
  currentState = resolveAutoState(nextState);
  petDock.dataset.state = currentState;
  currentStateEl.textContent = currentState;
  stateDescriptionEl.textContent = descriptions[currentState];
  updateButtonState();
}

function queueAutoPlay() {
  window.clearTimeout(autoTimer);
  if (!autoPlay) return;
  autoTimer = window.setTimeout(() => {
    cycleIndex = (cycleIndex + 1) % cycleStates.length;
    setState(cycleStates[cycleIndex]);
    queueAutoPlay();
  }, 2800);
}

function pointEyes(clientX, clientY) {
  const shellRect = petShell.getBoundingClientRect();
  const centerX = shellRect.left + shellRect.width / 2;
  const centerY = shellRect.top + shellRect.height / 2;
  const dx = clamp((clientX - centerX) / 22, -6, 6);
  const dy = clamp((clientY - centerY) / 22, -5, 5);
  pupils.forEach((pupil) => {
    pupil.style.transform = `translate(${dx}px, ${dy}px)`;
  });
}

function resetEyes() {
  pupils.forEach((pupil) => {
    pupil.style.transform = 'translate(0px, 0px)';
  });
}

function applyLook(side) {
  petDock.classList.remove('is-looking-left', 'is-looking-right');
  petDock.classList.add(side === 'left' ? 'is-looking-left' : 'is-looking-right');
  window.clearTimeout(lookTimer);
  lookTimer = window.setTimeout(() => {
    petDock.classList.remove('is-looking-left', 'is-looking-right');
  }, 700);
}

function applyBurst(side) {
  applyLook(side);
  petDock.classList.remove('is-bursting');
  void petDock.offsetWidth;
  petDock.classList.add('is-bursting');
  window.setTimeout(() => {
    petDock.classList.remove('is-bursting');
  }, 1700);
}

function handleClickReaction(event) {
  const shellRect = petShell.getBoundingClientRect();
  const side = event.clientX < shellRect.left + shellRect.width / 2 ? 'left' : 'right';
  clickCount += 1;

  window.clearTimeout(clickTimer);
  clickTimer = window.setTimeout(() => {
    const reaction = resolveClickReaction(clickCount, side);
    if (reaction.type === 'burst') {
      applyBurst(reaction.side);
    } else {
      applyLook(reaction.side);
    }
    clickCount = 0;
  }, 260);
}

function updateMiniState() {
  const threshold = 52;
  const shouldMini = shouldEnterMiniMode(dockX, stage.clientWidth, threshold);
  miniMode = shouldMini;
  petDock.dataset.mini = shouldMini ? 'true' : 'false';
  petDock.classList.toggle('is-mini', shouldMini);
  if (shouldMini) {
    dockX = stage.clientWidth - 28;
    syncDockPosition();
  }
}

stateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    autoPlay = false;
    autoToggleButton.textContent = '自动轮播：关';
    autoToggleButton.setAttribute('aria-pressed', 'false');
    setState(button.dataset.state || 'idle');
    window.clearTimeout(autoTimer);
  });
});

autoToggleButton.addEventListener('click', () => {
  autoPlay = !autoPlay;
  autoToggleButton.textContent = autoPlay ? '自动轮播：开' : '自动轮播：关';
  autoToggleButton.setAttribute('aria-pressed', autoPlay ? 'true' : 'false');
  if (autoPlay) {
    cycleIndex = cycleStates.indexOf(currentState);
    queueAutoPlay();
  } else {
    window.clearTimeout(autoTimer);
  }
});

stage.addEventListener('pointermove', (event) => {
  pointEyes(event.clientX, event.clientY);
  if (!dragging) return;
  const stageRect = stage.getBoundingClientRect();
  dockX = clamp(event.clientX - stageRect.left - dragOffsetX, 90, stageRect.width - 10);
  dockY = clamp(event.clientY - stageRect.top - dragOffsetY, 90, stageRect.height - 40);
  syncDockPosition();
  updateMiniState();
});

stage.addEventListener('pointerleave', () => {
  if (!dragging) resetEyes();
});

petShell.addEventListener('pointerdown', (event) => {
  const shellRect = petShell.getBoundingClientRect();
  dragging = true;
  miniMode = false;
  petDock.classList.remove('is-mini', 'is-peeking');
  petDock.classList.add('is-dragging');
  petShell.setPointerCapture(event.pointerId);
  dragOffsetX = event.clientX - shellRect.left - shellRect.width / 2;
  dragOffsetY = event.clientY - shellRect.top - shellRect.height / 2;
});

petShell.addEventListener('pointerup', (event) => {
  const wasDragging = dragging;
  dragging = false;
  petDock.classList.remove('is-dragging');
  if (petShell.hasPointerCapture(event.pointerId)) {
    petShell.releasePointerCapture(event.pointerId);
  }
  updateMiniState();
  if (!wasDragging) return;
});

petShell.addEventListener('click', (event) => {
  if (dragging) return;
  handleClickReaction(event);
});

petDock.addEventListener('mouseenter', () => {
  if (miniMode) {
    petDock.classList.add('is-peeking');
  }
});

petDock.addEventListener('mouseleave', () => {
  petDock.classList.remove('is-peeking');
});

window.addEventListener('resize', () => {
  const stageRect = stage.getBoundingClientRect();
  dockX = clamp(dockX, 90, stageRect.width - 10);
  dockY = clamp(dockY, 90, stageRect.height - 40);
  syncDockPosition();
  updateMiniState();
});

setState('idle');

syncDockPosition();
queueAutoPlay();
