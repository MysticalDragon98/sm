default:
	pnpm build
	cp -r lib/templates dist/lib/templates

update:
	git pull
	pnpm install
	pnpm build