JEKYLL_VERSION = latest

build:
	docker run --rm --volume="$(PWD):/srv/jekyll" --volume "$(PWD)/vendor/bundle:/usr/local/bundle" -it jekyll/jekyll:$(JEKYLL_VERSION) jekyll build .