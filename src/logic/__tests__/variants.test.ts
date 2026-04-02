import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getVariants,
  resolveVariant,
} from '../variants';

test('getVariants exposes the two approved exploration directions', () => {
  const variants = getVariants();
  assert.strictEqual(variants.length, 2);
  assert.deepStrictEqual(
    variants.map((variant) => variant.id),
    ['clawdish', 'hybrid'],
  );
});

test('resolveVariant falls back to the clawdish baseline', () => {
  assert.strictEqual(resolveVariant('clawdish').id, 'clawdish');
  assert.strictEqual(resolveVariant('hybrid').id, 'hybrid');
  assert.strictEqual(resolveVariant('unknown').id, 'clawdish');
});
