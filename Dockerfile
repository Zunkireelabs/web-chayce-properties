# syntax=docker/dockerfile:1
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY .eleventy.js ./
COPY src/ ./src/
# Image conversion (avif/webp/jpeg) is the slow part of the build. Keep the
# converted files in a persistent cache so only new or changed images are
# reprocessed on each deploy. eleventy-img skips files that already exist.
RUN --mount=type=cache,target=/cache/optimized \
    mkdir -p _site/images/optimized \
    && cp -a /cache/optimized/. _site/images/optimized/ \
    && npx eleventy \
    && cp -a _site/images/optimized/. /cache/optimized/

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/snippets/ /etc/nginx/snippets/
COPY --from=build /app/_site/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
