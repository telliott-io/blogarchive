FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY _site/ /usr/share/nginx/html/