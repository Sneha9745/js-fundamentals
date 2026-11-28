import express from 'express';
import path from 'node:path';

const app = express();
const dist = path.resolve('dist');

// Cache hashed assets for one year
app.use(
  '/assets',
  express.static(path.join(dist, 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// Do not cache HTML
app.use(
  express.static(dist, {
    setHeaders: (res, file) => {
      if (file.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// React Router fallback
app.get('/{*splat}', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(4000, () => {
  console.log('Production server running at http://localhost:4000');
});