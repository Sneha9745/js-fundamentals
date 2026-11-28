# Web Performance Report

## 1. Introduction

This report describes the performance measurement and optimization of the frontend-lab React application using Lighthouse. Testing was performed on the production build, not the Vite development server.

## 2. Lighthouse Results

### Before Optimization

Baseline Lighthouse report: `lighthouse/before.html`

| Metric | Result |
|---|---:|
| Performance Score | 93 |
| FCP | 1.9 s |
| LCP | 3.1 s |
| TBT | 0 ms |
| CLS | 0 |
| Speed Index | 1.9 s |
| JavaScript transferred | 117.3 KiB |
| Images transferred | 0 KiB |
| Total transferred | 126.3 KiB |

The baseline was captured in one Lighthouse run.

### After Optimization

Three mobile Lighthouse runs were performed against the production Express server at `http://localhost:4000/`.

Reports:
- `lighthouse/after-run-1.html`
- `lighthouse/after-run-2.html`
- `lighthouse/after-run-3.html`

| Metric | Run 1 | Run 2 | Run 3 | Median |
|---|---:|---:|---:|---:|
| Performance | 86 | 86 | 86 | 86 |
| FCP | 3.1 s | 3.1 s | 3.1 s | 3.1 s |
| LCP | 3.4 s | 3.3 s | 3.3 s | 3.3 s |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Speed Index | 3.1 s | 3.1 s | 3.1 s | 3.1 s |

Resource summary from After Run 1:
- JavaScript transferred: 367,869 bytes (approximately 359.2 KiB).
- Images transferred: 0 bytes.
- Total transferred: 395,868 bytes (approximately 386.6 KiB).

### Before and After Comparison

| Metric | Before (1 run) | After (3-run median) | Change |
|---|---:|---:|---:|
| Performance | 93 | 86 | -7 points |
| FCP | 1.9 s | 3.1 s | +1.2 s |
| LCP | 3.1 s | 3.3 s | +0.2 s |
| TBT | 0 ms | 0 ms | No change |
| CLS | 0 | 0 | No change |
| Speed Index | 1.9 s | 3.1 s | +1.2 s |
| JavaScript transferred | 117.3 KiB | 359.2 KiB | +241.9 KiB |
| Images transferred | 0 KiB | 0 KiB | No change |
| Total transferred | 126.3 KiB | 386.6 KiB | +260.3 KiB |

Note: The baseline has one saved run, while the optimized version has three runs. The baseline and after reports were generated using different Lighthouse environments/versions, so the score comparison is not a perfectly controlled experiment. The after results are the median of three consistent mobile runs. The score decreased from 93 to 86, so the performance target of 90 was not achieved. The increased JavaScript transfer size and slower FCP indicate that further investigation and optimization are needed.

## 3. Performance Optimizations

### Loading Skeleton

Added a loading skeleton to the Users page. It reserves space while user data loads and helps prevent unexpected layout shifts.

### Code Splitting

The application uses React.lazy() and Suspense to lazy-load the UserStats component. Routes and vendor libraries are also split into separate JavaScript files.

### Images and Fonts

The current application does not use large content images or external custom fonts on its main page. Lighthouse reported zero transferred images and fonts. Therefore, image compression, responsive image sizes, and font preloading were not applicable to the current page.

### Preloading

No additional preload was added because the page does not contain a large critical hero image or an external font that needs preloading.

### Web Vitals Monitoring

Added the web-vitals package and `src/reportWebVitals.js` to measure and log Core Web Vitals in the browser console:
- LCP (Largest Contentful Paint)
- INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)

## 4. Cache Headers

An Express production server was configured in `serve.js`.

| Resource | Cache-Control | Purpose |
|---|---|---|
| HTML | no-cache | Revalidates HTML before reuse |
| Hashed JS/CSS | public, max-age=31536000, immutable | Caches versioned assets for one year |
| Images | Depends on deployment configuration | Allows browser caching |
| API | no-store recommended | Prevents storing sensitive or frequently changing responses |

### Verification

HTML was checked using:

`curl -I http://localhost:4000/`

Verified: `Cache-Control: no-cache`

Hashed JavaScript was checked using:

`curl -I http://localhost:4000/assets/index-xqzkOvql.js`

Verified: `Cache-Control: public, max-age=31536000, immutable`

Both headers were verified successfully.

## 5. Deployment and CDN Cache Purge Plan

- HTML should be revalidated to receive the latest version.
- Hashed JS and CSS files can be cached for one year.
- New builds generate new hashed filenames when file contents change.
- CDN cache for HTML should be purged after deployment when required.
- Old hashed assets can remain cached safely because their filenames identify their contents.

## 6. Service Worker Strategy

A service worker can cache resources and support offline access. However, it requires additional setup and cache update management. This project uses HTTP cache headers for production assets instead of implementing a service worker.

## 7. Short Answer Questions

### 1. What blocks rendering?

Render-blocking CSS and synchronous JavaScript can delay the browser from displaying page content. The browser may need to download and process these resources before rendering the page.

### 2. Difference between no-cache and no-store?

- `no-cache` allows a response to be stored, but it must be revalidated before reuse.
- `no-store` tells the browser and intermediate caches not to store the response.

### 3. Why are hashed filenames paired with immutable?

Hashed filenames change when file content changes. Therefore, browsers can safely cache these files for a long time using `immutable`, because a new version receives a different filename.

### 4. What causes CLS and how can it be fixed?

CLS can happen when images, fonts, advertisements, or dynamic content load without reserved space and move existing page elements. It can be reduced by setting image dimensions, reserving space for dynamic content, and using loading skeletons.

## 8. Remaining Opportunities

- Investigate the increased JavaScript transfer size and identify unnecessary dependencies.
- Analyze the JavaScript bundle and reduce unnecessary code.
- Continue improving FCP and LCP through profiling and Lighthouse diagnostics.
- Repeat baseline and optimized tests under the same Lighthouse version and testing environment for a more controlled comparison.
- Reassess performance after further optimization.

## 9. Conclusion

The project now includes a production Express server with cache headers, a loading skeleton, code splitting, and Web Vitals monitoring. Cache headers were verified successfully. However, the measured Lighthouse performance score decreased from the recorded baseline of 93 to an after-optimization median of 86. The results show that additional JavaScript and loading-performance optimization is still required.
