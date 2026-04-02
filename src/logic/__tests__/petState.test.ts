import test from 'node:test';
import assert from 'node:assert/strict';

import {
  resolveAutoState,
  resolveClickReaction,
  shouldEnterMiniMode,
} from '../petState';

test('resolveAutoState maps control modes to concrete pet states', () => {
  assert.strictEqual(resolveAutoState('idle'), 'idle');
  assert.strictEqual(resolveAutoState('thinking'), 'thinking');
  assert.strictEqual(resolveAutoState('working-typing'), 'working-typing');
  assert.strictEqual(resolveAutoState('working-building'), 'working-building');
  assert.strictEqual(resolveAutoState('juggling-single'), 'juggling-single');
  assert.strictEqual(resolveAutoState('juggling-multi'), 'juggling-multi');
  assert.strictEqual(resolveAutoState('error'), 'error');
  assert.strictEqual(resolveAutoState('happy'), 'happy');
  assert.strictEqual(resolveAutoState('notification'), 'notification');
  assert.strictEqual(resolveAutoState('sweeping'), 'sweeping');
  assert.strictEqual(resolveAutoState('carrying'), 'carrying');
  assert.strictEqual(resolveAutoState('sleeping'), 'sleeping');
  assert.strictEqual(resolveAutoState('unknown'), 'idle');
});

test('resolveClickReaction returns directional look for first click', () => {
  assert.deepStrictEqual(resolveClickReaction(1, 'left'), { type: 'glance', side: 'left' });
  assert.deepStrictEqual(resolveClickReaction(1, 'right'), { type: 'glance', side: 'right' });
});

test('resolveClickReaction escalates repeated clicks into burst reaction', () => {
  assert.deepStrictEqual(resolveClickReaction(3, 'left'), { type: 'burst', side: 'left' });
  assert.deepStrictEqual(resolveClickReaction(5, 'right'), { type: 'burst', side: 'right' });
});

test('shouldEnterMiniMode only triggers near the right edge', () => {
  assert.strictEqual(shouldEnterMiniMode(990, 1000, 48), true);
  assert.strictEqual(shouldEnterMiniMode(949, 1000, 48), false);
  assert.strictEqual(shouldEnterMiniMode(600, 1000, 48), false);
});
