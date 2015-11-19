deploy:
	sed -i '' -E 's/version": "([0-9\.]*)/version": "$(V)/g' package.json
	sed -i '' -E 's/version": "([0-9\.]*)/version": "$(V)/g' bower.json
	gulp bundle --production --cssprefix=dcal-

.PHONY: release

