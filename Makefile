default: clean
	pnpm build
	cp -r lib/templates dist/lib/templates
	chmod +x dist/index.js

clean:
	rm -rf dist

update: clean
	git pull
	pnpm install
	make