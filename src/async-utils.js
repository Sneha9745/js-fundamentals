
export const sleep = (ms, { signal } = {}) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new Error('Operation aborted'));
      return;
    }

    let timer;

    const cleanup = () => {
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(signal.reason ?? new Error('Operation aborted'));
    };

    timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    signal?.addEventListener('abort', onAbort, { once: true });
  });

export async function retry(
  fn,
  { retries = 3, delayMs = 100, signal } = {}
) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (signal?.aborted) {
      throw signal.reason ?? new Error('Operation aborted');
    }

    try {
      return await fn(attempt, signal);
    } catch (err) {
      if (signal?.aborted) {
        throw signal.reason ?? err;
      }

      lastError = err;

      if (attempt < retries) {
        await sleep(delayMs * 2 ** attempt, { signal });
      }
    }
  }

  throw lastError;
}

export function withTimeout(promise, ms, { signal } = {}) {
  let timer;
  let onAbort;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms`)),
      ms
    );
  });

  const aborted = new Promise((_, reject) => {
    if (!signal) return;

    onAbort = () => {
      reject(signal.reason ?? new Error('Operation aborted'));
    };

    if (signal.aborted) {
      onAbort();
    } else {
      signal.addEventListener('abort', onAbort, { once: true });
    }
  });

  return Promise.race([promise, timeout, aborted]).finally(() => {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  });
}

// Run async tasks with at most limit in flight
export async function pool(tasks, limit = 2) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, worker)
  );

  return results;
}
