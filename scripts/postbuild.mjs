// GitHub Pages helpers. The app uses hash-based routes (#/section/page), so
// refreshing or opening a deep link always loads index.html. The 404.html copy
// is a safety net for anyone who types a path without the "#".
import { copyFileSync, writeFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');
console.log('postbuild: wrote dist/404.html and dist/.nojekyll');
