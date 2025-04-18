FROM php:8.2-apache

# System dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    libonig-dev \
    libxml2-dev \
    curl \
    git \
    && docker-php-ext-install pdo pdo_mysql zip

# Apache rewrite module
RUN a2enmod rewrite

# Set working directory and copy project
WORKDIR /var/www/html
COPY . /var/www/html

# Composer install
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

# Fix public directory and Apache settings
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

RUN mkdir -p storage/framework/{sessions,views,cache} && \
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Copy entrypoint
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
