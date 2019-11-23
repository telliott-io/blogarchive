JEKYLL_VERSION = latest

build:
	docker run --rm --volume="$(PWD):/srv/jekyll" --volume "$(PWD)/vendor/bundle:/usr/local/bundle" jekyll/jekyll:$(JEKYLL_VERSION) jekyll build .
	docker build -t telliottio/blogarchive:latest .

push: build
	docker push telliottio/blogarchive:latest

deploy:
	kubectl apply -f deployment.yaml
	kubectl apply -f _site/ingress.yaml

all: push deploy