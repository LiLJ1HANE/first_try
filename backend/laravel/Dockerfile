FROM php:8.2-apache

# 1. Enable Apache rewrite module
RUN a2enmod rewrite

# 2. Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# 4. Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Set working directory
WORKDIR /var/www/html

# 6. Copy application files
COPY . .

# 7. Install dependencies (no scripts to avoid permission issues)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 8. CRITICAL PERMISSION FIXES (must come after COPY)
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && mkdir -p storage/logs \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache \
    && chmod 644 .env* || true

# 9. Generate key if .env doesn't exist
RUN if [ ! -f .env ]; then \
    cp .env.example .env && \
    php artisan key:generate; \
    fi

# 10. Fix Apache warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80
CMD ["apache2-foreground"]