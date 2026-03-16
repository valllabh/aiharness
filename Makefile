install:
	npm install

dev:
	npx concurrently "npx @11ty/eleventy --serve --port=4322" "npx @tailwindcss/cli -i src/styles/main.css -o _site/css/style.css --watch"

build:
	npx @tailwindcss/cli -i src/styles/main.css -o _site/css/style.css --minify
	npx @11ty/eleventy

preview: build
	npx serve _site -l 4322

deploy: build
	@rm -rf /tmp/gh-pages-deploy
	@cp -r _site /tmp/gh-pages-deploy
	@touch /tmp/gh-pages-deploy/.nojekyll
	git checkout gh-pages
	@git rm -rf . -q 2>/dev/null || true
	@cp -r /tmp/gh-pages-deploy/* .
	@cp /tmp/gh-pages-deploy/.nojekyll .
	git add -A
	git commit -m "Deploy" --allow-empty
	git push origin gh-pages
	git checkout main
	@rm -rf /tmp/gh-pages-deploy

clean:
	rm -rf _site

.PHONY: install dev build preview deploy clean
