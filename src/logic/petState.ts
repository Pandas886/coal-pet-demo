export type PetState = 
  | 'idle' 
  | 'thinking' 
  | 'working-typing' 
  | 'working-building' 
  | 'juggling-single' 
  | 'juggling-multi' 
  | 'error' 
  | 'happy' 
  | 'notification' 
  | 'sweeping' 
  | 'carrying' 
  | 'sleeping';

export const KNOWN_STATES: PetState[] = [
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
];

const KNOWN_STATES_SET = new Set<string>(KNOWN_STATES);

export function resolveAutoState(mode: string): PetState {
  return KNOWN_STATES_SET.has(mode) ? (mode as PetState) : 'idle';
}

export type ReactionType = 'burst' | 'glance';
export type Side = 'left' | 'right';

export interface Reaction {
  type: ReactionType;
  side: Side;
}

export function resolveClickReaction(clickCount: number, side: string): Reaction {
  const resolvedSide: Side = side === 'left' ? 'left' : 'right';
  if (clickCount >= 3) {
    return { type: 'burst', side: resolvedSide };
  }
  return { type: 'glance', side: resolvedSide };
}

export function shouldEnterMiniMode(x: number, viewportWidth: number, threshold = 48): boolean {
  return x >= viewportWidth - threshold;
}

export function getCycleStates(): PetState[] {
  return [...KNOWN_STATES];
}
