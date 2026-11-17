
# Part C: Event Loop Notes

## Predicted Order

1. 1 sync start
2. 2 sync inside async fn (before first await)
3. 2b sync end
4. 3 nextTick
5. 4 microtask: promise.then
6. 5 microtask: queueMicrotask
7. 5b microtask: after await
8. 6 macrotask: setTimeout 0
9. 7 macrotask: setImmediate

## Actual Output

1. 1 sync start
2. 2 sync inside async fn (before first await)
3. 2b sync end
4. 4 microtask: promise.then
5. 5 microtask: queueMicrotask
6. 5b microtask: after await
7. 3 nextTick
8. 7 macrotask: setImmediate
9. 6 macrotask: setTimeout 0

## Explanation

Synchronous code executes first.

After synchronous execution, microtasks are processed. In this ES module example, process.nextTick runs after the Promise and other microtasks.

After microtasks are completed, macrotasks such as setImmediate and setTimeout execute.

The order of setTimeout(0) and setImmediate can vary when running from the main module.
