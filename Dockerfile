FROM nginx:alpine

ENV nginx_vhost /etc/nginx/sites-available/default
ENV nginx_conf /etc/nginx/nginx.conf


RUN mkdir -p /run/js && \
	chown -R www-data:www-data /var/www/html && \
	chown -R www-data:www-data /run/js

CMD ["./index.js"]

EXPOSE 8081