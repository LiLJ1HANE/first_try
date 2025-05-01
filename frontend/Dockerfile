# Étape de build Angular
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev

# Étape de production avec NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
