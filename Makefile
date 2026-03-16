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
	git stash --include-untracked
	git checkout gh-pages
	git ls-files | xargs git rm -f
	git checkout main -- .gitignore
	git stash pop
	cp -r _site/* .
	touch .nojekyll
	git add .
	git commit -m "Deploy"
	git push origin gh-pages
	git checkout main
	npm install

clean:
	rm -rf _site

.PHONY: install dev build preview deploy clean
