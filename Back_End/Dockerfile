# Étape 1 : Build avec Composer
FROM php:8.2-apache AS builder

RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libpng-dev \
    && docker-php-ext-install pdo_mysql zip gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html
COPY backend/composer.json .
RUN composer install --no-dev --optimize-autoloader

# Étape 2 : Image finale
FROM php:8.2-apache

COPY --from=builder /var/www/html/vendor /var/www/html/vendor
COPY backend /var/www/html

RUN a2enmod rewrite
COPY backend/docker/000-default.conf /etc/apache2/sites-available/000-default.conf