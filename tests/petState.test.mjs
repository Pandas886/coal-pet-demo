import test from 'node:test';
import assert from 'node:assert/strict';

import {
  resolveAutoState,
  resolveClickReaction,
  shouldEnterMiniMode,
} from '../logic/petState.js';

test('resolveAutoState maps control modes to concrete pet states', () => {
  assert.equal(resolveAutoState('idle'), 'idle');
  assert.equal(resolveAutoState('thinking'), 'thinking');
  assert.equal(resolveAutoState('working'), 'working');
  assert.equal(resolveAutoState('juggling'), 'juggling');
  assert.equal(resolveAutoState('reminder'), 'reminder');
  assert.equal(resolveAutoState('sleeping'), 'sleeping');
  assert.equal(resolveAutoState('unknown'), 'idle');
});

test('resolveClickReaction returns directional look for first click', () => {
  assert.deepEqual(resolveClickReaction(1, 'left'), { type: 'glance', side: 'left' });
  assert.deepEqual(resolveClickReaction(1, 'right'), { type: 'glance', side: 'right' });
});

test('resolveClickReaction escalates repeated clicks into burst reaction', () => {
  assert.deepEqual(resolveClickReaction(3, 'left'), { type: 'burst', side: 'left' });
  assert.deepEqual(resolveClickReaction(5, 'right'), { type: 'burst', side: 'right' });
});

test('shouldEnterMiniMode only triggers near the right edge', () => {
  assert.equal(shouldEnterMiniMode(990, 1000, 48), true);
  assert.equal(shouldEnterMiniMode(949, 1000, 48), false);
  assert.equal(shouldEnterMiniMode(600, 1000, 48), false);
});
