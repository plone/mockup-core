GIT = git
NPM = npm

GRUNT = ./node_modules/grunt-cli/bin/grunt
BOWER = ./node_modules/bower/bin/bower
NODE_PATH = ./node_modules


bootstrap-common: clean
	mkdir -p build

bootstrap: clean bootstrap-common
	@echo $(NODE_VERSION)
ifeq (,$(findstring 1.4, $(NPM_VERSION)))
	# for node < v0.10.30, npm < 1.4.x
	$(NPM) link --prefix=$(NODE_PATH)
else
	$(NPM) link
endif
	NODE_PATH=$(NODE_PATH) $(BOWER) install --config.interactive=0
	NODE_PATH=$(NODE_PATH) $(GRUNT) sed:bootstrap

bootstrap-nix: bootstrap-common
	nix-build default.nix -A build -o nixenv
	ln -s nixenv/lib/node_modules/mockup-core/node_modules
	ln -s nixenv/bower_components

jshint:
	NODE_PATH=$(NODE_PATH) $(GRUNT) jshint jscs

test:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test --pattern=$(pattern)

test-once:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_once --pattern=$(pattern)

test-dev:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_dev --pattern=$(pattern)

test-ci:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_ci

clean:
	rm -rf node_modules
	rm -rf bower_components

clean-deep: clean
	if test -f $(BOWER); then NODE_PATH=$(NODE_PATH) $(BOWER) cache clean; fi

.PHONY: bootstrap jshint test test-once test-dev test-ci clean clean-deep
