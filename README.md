# Hotel Reservation System (Laravel + Angular + Docker)

A full-stack web application with Laravel backend, Angular frontend, and MySQL database, containerized with Docker for easy development and deployment.

## 🚀 Features
- **Backend**: Laravel REST API
- **Frontend**: Angular SPA
- **Database**: MySQL 8.0
- **DevOps**: Dockerized environment with:
  - Hot-reloading for Angular
  - Persistent MySQL data
  - Pre-configured Apache/Nginx

## 📋 Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- Node.js 18+ (for frontend development)
- Git

## 🛠️ Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Taha7486/first_try.git
   cd first_try
   cp backend/laravel/.env.example backend/laravel/.env

2. **Start containers**

   docker-compose up -d --build

3. **Initialize Laravel**

   docker exec -it backend php artisan key:generate
   docker exec -it backend php artisan migrate

4. **Access applications**

    Frontend: http://localhost:4300

    Backend: http://localhost:8000

## Checks
   http://localhost:8000/api/example (Frontend-Backend Communication)
   http://localhost:8000/test-db     (Test API Endpoint)