#!/bin/bash

# Copy .env if missing
[ ! -f .env ] && cp .env.example .env

# Wait for MySQL to be REALLY ready (not just accepting connections)
echo "Waiting for MySQL to start..."
timeout=60
while ! mysqladmin ping -h mysql --silent; do
    sleep 1
    timeout=$((timeout - 1))
    if [ $timeout -le 0 ]; then
        echo "MySQL did not start in time!"
        exit 1
    fi
done
echo "MySQL is ready!"

php artisan migrate --force

# Laravel production optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
exec apache2-foreground