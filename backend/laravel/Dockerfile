# Use official PHP image with Apache
FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer securely
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer


# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

RUN composer install

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache


RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html 

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf


EXPOSE 80

# Set permissions
