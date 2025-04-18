#!/bin/bash

# Create .env if not exists
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

# Generate app key
php artisan key:generate

# Fix permissions
chmod -R 775 storage bootstrap/cache

# Start Apache
apache2-foreground
