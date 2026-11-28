# Web Performance Report

## 1. Introduction

This report describes the performance measurement and optimization of the frontend-lab React application using Lighthouse.

## 2. Lighthouse Results

### Before Optimization

- Performance Score: 93
- FCP: 1.9 s
- LCP: 3.1 s
- TBT: 0 ms
- CLS: 0
- Speed Index: 1.9 s

Report: `lighthouse/before.html`

### After Optimization

- Performance Score: 87
- FCP: 3.0 s
- LCP: 3.2 s
- TBT: 0 ms
- CLS: 0
- Speed Index: 3.0 s

Report: `lighthouse/after.html`

### Comparison

| Metric | Before | After |
|---|---:|---:|
| Performance | 93 | 87 |
| FCP | 1.9 s | 3.0 s |
| LCP | 3.1 s | 3.2 s |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0 |
| Speed Index | 1.9 s | 3.0 s |

Note: Results are from one Lighthouse run each. Scores may vary between runs. The recorded score decreased, so further optimization is needed.

## 3. Performance Optimizations

### Loading Skeleton

Added loading skeletons to the Users page to reserve space while data loads and reduce layout shifts.

### Code Splitting

The application uses React.lazy() and Suspense for lazy loading the UserStats component. Routes and vendor libraries are also split into separate JavaScript files.

### Images and Fonts

The current application does not use large content images or external custom fonts on its main page. Therefore, no additional image or font optimization was necessary.

### Preloading

No additional preload was added because there is no large critical hero image or external font.

## 4. Cache Headers

An Express production server was configured in `serve.js`.

| Resource | Cache-Control | Purpose |
|---|---|---|
| HTML | no-cache | Checks for updated HTML |
| Hashed JS/CSS | public, max-age=31536000, immutable | Caches versioned assets for one year |
| Images | Depends on deployment configuration | Browser caching |
| API | no-store recommended | Avoids storing API responses |

### Verification

HTML was checked using:

`curl -I http://localhost:4000/`

Verified: `Cache-Control: no-cache`

Hashed JavaScript was checked using:

`curl -I http://localhost:4000/assets/index-DC23jjva.js`

Verified: `Cache-Control: public, max-age=31536000, immutable`

Both headers were verified successfully.

## 5. Deployment and CDN Cache Purge Plan

- HTML should be revalidated to receive the latest version.
- Hashed JS and CSS files can be cached for one year.
- New builds generate new hashed filenames.
- CDN cache for HTML should be purged after deployment when required.
- Old hashed assets can remain cached safely.

## 6. Service Worker Strategy

A service worker can cache resources and support offline access. However, it requires additional setup and cache update management. This project uses HTTP cache headers for production assets.

## 7. Short Answer Questions

### 1. What blocks rendering?

Render-blocking CSS and synchronous JavaScript can delay the browser from displaying page content.

### 2. Difference between no-cache and no-store?

- no-cache allows storage but requires revalidation before reuse.
- no-store tells the browser not to store the response.

### 3. Why are hashed filenames paired with immutable?

Hashed filenames change when file content changes. Therefore, browsers can cache them for a