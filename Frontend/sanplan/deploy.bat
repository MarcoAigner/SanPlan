@echo off
npm run build&&cd dist&&copy index.html 404.html&&git init&&git add -A&&git commit -m 'deploy'&&git push -f https://github.com/marcoaigner/SanPlan.git master:gh-pages&&cd ..
