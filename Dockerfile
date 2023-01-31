# install stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate

# production stage
FROM nginxinc/nginx-unprivileged:stable-alpine as production-stage

USER root
# hadolint ignore=DL3018
RUN apk add --no-cache \
    jq
COPY nginx/app.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage --chown=101 /app/dist /app

EXPOSE 8080
VOLUME [ "/tmp", "/run/nginx" ]
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

USER 101
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
