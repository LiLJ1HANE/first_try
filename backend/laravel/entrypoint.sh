#!/bin/bash

# Copy .env if missing
[ ! -f .env ] && cp .env.example .env

# Start Apache
exec apache2-foreground