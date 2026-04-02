import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getVariants,
  resolveVariant,
} from '../logic/variants.js';

test('getVariants exposes the two approved exploration directions', () => {
  const variants = getVariants();
  assert.equal(variants.length, 2);
  assert.deepEqual(
    variants.map((variant) => variant.id),
    ['clawdish', 'hybrid'],
  );
});

test('resolveVariant falls back to the clawdish baseline', () => {
  assert.equal(resolveVariant('clawdish').id, 'clawdish');
  assert.equal(resolveVariant('hybrid').id, 'hybrid');
  assert.equal(resolveVariant('unknown').id, 'clawdish');
});
