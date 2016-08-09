.PHONY: check release test dev dev-test

check:
	if gsed 2> /dev/null; then brew install gnu-sed; fi;

release:
	@make check
	NODE_ENV=production webpack -p
	gsed -i -e "1s@^@\/\/ `date +%Y%m%d%H%M%S`\n@" 'dist/bundle.js'

test:
	karma start --single-run=true

dev:
	webpack-dev-server

dev-test:
	karma start
