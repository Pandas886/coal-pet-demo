const KNOWN_STATES = new Set([
  'idle', 
  'thinking', 
  'working-typing', 
  'working-building', 
  'juggling-single', 
  'juggling-multi', 
  'error', 
  'happy', 
  'notification', 
  'sweeping', 
  'carrying', 
  'sleeping'
]);

export function resolveAutoState(mode) {
  return KNOWN_STATES.has(mode) ? mode : 'idle';
}

export function resolveClickReaction(clickCount, side) {
  const resolvedSide = side === 'left' ? 'left' : 'right';
  if (clickCount >= 3) {
    return { type: 'burst', side: resolvedSide };
  }
  return { type: 'glance', side: resolvedSide };
}

export function shouldEnterMiniMode(x, viewportWidth, threshold = 48) {
  return x >= viewportWidth - threshold;
}

export function getCycleStates() {
  return Array.from(KNOWN_STATES);
}
