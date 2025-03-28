# Étape 1 : Build Angular
FROM node:18 AS build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist/hotel-booking-app /usr/share/nginx/html
COPY frontend/docker/nginx.conf /etc/nginx/conf.d/default.conf