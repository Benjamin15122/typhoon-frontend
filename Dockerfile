FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
ADD dist /usr/app/typhoon/frontend