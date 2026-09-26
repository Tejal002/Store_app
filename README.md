"# Store_app" 


Full-stack web app where users can rate stores from 1 to 5 stars. The application supports three roles: Admin, Normal User, and Store Owner.

## Tech Stack

* Backend: Express.js + PostgreSQL
* Frontend: React.js + CSS
* Authentication: JWT
* API: REST APIs

## Project Structure

```text
store-rating-app/

  backend/
    controllers/
    middleware/
    routes/
    db/
    .env.example
    package.json

  frontend/
    src/
      components/
      pages/
      context/
      api/
      App.js
      index.js
    package.json
```

## Setup

### 1. Database

Create a PostgreSQL database and run the schema:

```bash
psql -U postgres -c "CREATE DATABASE store_rating_db;"

psql -U postgres -d store_rating_db -f backend/db/schema.sql
```

The schema also creates a default admin account:

```text
Email: admin@example.com
Password: Admin@123
```

### 2. Backend

```bash
cd backend

npm install

cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials and JWT secret.

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend

Open a new terminal:

```bash
cd frontend

npm install

npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Features

### Admin

* Login
* View dashboard statistics
* Add users and admins
* Add store owners
* Add stores
* Assign stores to owners
* View and search users
* View and search stores
* Sort users and stores
* View user details
* Logout

### Normal User

* Sign up and login
* View available stores
* Search stores by name and address
* View overall store rating
* View their own rating
* Submit a rating
* Modify their rating
* Change password
* Logout

### Store Owner

* Login
* View store dashboard
* View average store rating
* View users who rated their store
* View individual ratings
* Change password
* Logout

## Validation

* Name: 20–60 characters
* Address: Maximum 400 characters
* Password: 8–16 characters
* Password must contain at least one uppercase letter and one special character
* Email must be in a valid email format
* Rating must be between 1 and 5

## Authentication

The application uses JWT-based authentication with role-based access control.

Different roles have access to different features and routes:

```text
Admin
  ├── Admin Dashboard
  ├── Manage Users
  └── Manage Stores

Normal User
  ├── Browse Stores
  ├── Rate Stores
  └── Update Password

Store Owner
  ├── Owner Dashboard
  └── View Store Ratings
```

## Notes

* Admin can create users with the `admin`, `user`, or `owner` role.
* Admin can create stores and assign a store to an existing owner.
* Normal users can create their own accounts and are automatically assigned the `user` role.
* Store owner accounts must be created by an admin.
* Each store can be assigned to an owner.
* Normal users can submit one rating per store and modify their existing rating.
* All tables support searching, filtering, and sorting where applicable.
* The frontend uses plain CSS without Tailwind CSS or any UI component library.


