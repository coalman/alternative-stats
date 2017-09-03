# add any binaries from installed node_modules to path
export PATH := node_modules/.bin:$(PATH)

.PHONY: dev
dev:
	webpack-dev-server --open

