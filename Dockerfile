FROM nginx:latest
COPY nginx/conf/default.conf /etc/nginx/conf.d/
COPY nginx/www/typhoon /usr/app/typhoon/frontend