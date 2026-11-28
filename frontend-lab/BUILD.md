# Assignment 1.5 - Build Tools

## 1. Introduction
This assignment focuses on improving application performance using Vite build tools, code splitting, and lazy loading.

## 2. Lazy Loading
React lazy() and Suspense were used to load route components only when required.

The following pages were lazy-loaded:
- Home
- Users
- UserDetail
- Login
- Profile
- NotFound

A loading fallback was added using Suspense.

## 3. Component-Level Code Splitting
The UserStats component was also lazy-loaded. It loads only when the user clicks the Show Statistics button.

## 4. Manual Code Splitting
Vite manualChunks was configured to separate third-party libraries into vendor chunks:
- react-vendor
- router-vendor
- query-vendor
- state-vendor

## 5. Bundle Analysis
The rollup-plugin-visualizer was used to generate a treemap report at dist/stats.html.

### Main Vendor Chunk Sizes

| Chunk | Size |
|---|---:|
| React Vendor | 217.04 KB |
| Router Vendor | 89.18 KB |
| Query Vendor | 35.99 KB |
| State Vendor | 2.65 KB |

## 6. Bundle Size Budget (Bonus)
A Node.js script was created at scripts/check-bundle-budget.js.

It checks all JavaScript files inside dist/assets and fails if any file exceeds 250 KB.

Command:
`node scripts/check-bundle-budget.js`

Result:
`SUCCESS: All JS chunks are within 250 KB budget.`

## 7. Conclusion
Lazy loading and code splitting divide the application into smaller chunks. This helps reduce the initial JavaScript loading requirement and improves application loading performance. The bundle visualizer helps analyze chunk sizes, while the budget checker prevents JavaScript chunks from exceeding the defined size limit.
