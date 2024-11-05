# FROM nginx:1.16.1-alpine
FROM nginx:stable-alpine
RUN apk upgrade --force
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf
RUN rm -rf /www-data/*
# TODO: Change 'folde-name' to directory one level below build files
COPY ./dist/apps/myapp /www-data

RUN echo "nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]
