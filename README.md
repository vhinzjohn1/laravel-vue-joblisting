<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Job Listing & Application Platform

A comprehensive job listing and application platform built with Laravel and Vue.js. This application streamlines the recruitment process by connecting HR Personnel with qualified Applicants through an organized job listing system.

## Features

- **User Authentication**

    - Role-based access for HR Personnel, Applicants, and Admin
    - Secure login and profile management

- **For HR Personnel**

    - Create, edit, and manage job listings
    - Review and filter job applications
    - Dashboard with analytics on job posting performance
    - Track applicant status and communicate with candidates
    - Schedule interviews and provide feedback

- **For Applicants**

    - Browse job listings with advanced search and filtering
    - Save favorite jobs
    - Easy application process with resume attachment
    - Application history tracking
    - Profile and resume management
    - Receive notifications on application status

- **For Admin**
    - User management and role assignment
    - Content moderation and approval
    - Platform statistics and analytics
    - System configuration and maintenance
    - Generate reports on recruitment activities

## Technologies Used

- **Backend**: Laravel 10.x
- **Frontend**: Vue.js 3
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **File Storage**: Laravel Storage with S3 compatibility
- **UI Components**: Tailwind CSS

## Installation

Follow these steps to get the project up and running on your local machine:

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 16.x and npm
- MySQL
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/job-listing-platform.git
cd job-listing-platform
```

### Step 2: Install PHP dependencies

```bash
composer install
```

### Step 3: Set up environment variables

```bash
cp .env.example .env
```

Then, edit the `.env` file with your database credentials and other configuration settings.

### Step 4: Generate application key

```bash
php artisan key:generate
```

### Step 5: Run database migrations and seeders

```bash
php artisan migrate
```

### Step 6: Install JavaScript dependencies

```bash
npm install
```

### Step 7: Build frontend assets

```bash
npm run dev
```

For production:

```bash
npm run build
```

### Step 8: Create symbolic link for storage

```bash
php artisan storage:link
```

### Step 9: Start the development server

```bash
php artisan serve
```

Your application should now be running at `http://localhost:8000`.

## Usage

After installation, you can:

1. Log in with your assigned role (HR Personnel, Applicant, or Admin)
2. HR Personnel can create and manage job listings
3. Applicants can browse jobs and submit applications
4. Admin can manage users and monitor system performance

Default admin credentials:

- Email: admin@gmail.com
- Password: admin123

(Remember to change these in production)

## Testing

Run the test suite:

```bash
php artisan test
```

## Deployment

For production deployment:

1. Set APP_ENV to production in your .env file
2. Configure proper database credentials
3. Optimize the application:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Contributing

Thank you for considering contributing to this project! Please review our [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
