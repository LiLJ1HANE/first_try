#!/bin/bash

# Wait for MySQL to be ready (important!)
while ! mysqladmin ping -h"mysql" -P"3306" -u"root" -p"password" --silent; do
    echo "Waiting for MySQL..."
    sleep 2
done

# Copy .env if missing
[ ! -f .env ] && cp .env.example .env

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h"mysql" -P"3306" -u"${DB_USERNAME}" -p"${DB_PASSWORD}" --silent; do
    sleep 2
done

# Run migrations
php artisan migrate --force

# Start Apache
exec apache2-foreground