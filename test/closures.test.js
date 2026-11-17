
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeCounter, memoize } from '../src/closures.js';
import { TaskQueue } from '../src/task-queue.js';

test('makeCounter increments and decrements', () => {
  const counter = makeCounter(5);

  assert.equal(counter.value, 5);
  assert.equal(counter.inc(), 6);
  assert.equal(counter.dec(), 5);
});

test('memoize caches results', () => {
  let calls = 0;

  const double = memoize((n) => {
    calls++;
    return n * 2;
  });

  assert.equal(double(5), 10);
  assert.equal(double(5), 10);
  assert.equal(calls, 1);
});

test('TaskQueue runs tasks in order and clears queue', async () => {
  const queue = new TaskQueue('test');

  queue.push(async () => 'first');
  queue.push(async () => 'second');

  assert.equal(queue.size, 2);

  const results = await queue.runAll();

  assert.deepEqual(results, ['first', 'second']);
  assert.equal(queue.size, 0);
});
