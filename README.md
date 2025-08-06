## To Do Application: TodoBuddy

## Tech Stack

- Node.js + Typescript + Express
- TypeORM + PostgreSQL
- JWT Authentication
- Nodemailer (for invitations)
- bcrypt (for password hashing)

## Quick Start

### 1. Clone and Install Dependencies
git clone <repository-url>
cd node-typescript-psql
npm install

### 2. Database Setup
Create a PostgreSQL database:

CREATE DATABASE todobuddy;

### 3. Environment Configuration

Create a `.env` file in the root directory:

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=todobuddy

# Server Configuration
PORT=8080

### 4. Start the Application
npm run start:dev

## 5. API Documentation

Base URL: `http://localhost:8080`

## 5.1. POST - /api/login 
Description: Login and receive JWT token
json:
 {
  "email": "admin@todobody.com",
  "password": "admin@123"
 }

## 5.2. POST - /api/invite
Description: Invite user (send email & credentials)
json:
{
   "name": "Ashish Arora",
   "email": "ashish.arora@mindbowser.com",
   "role": "admin"
 }
 headers:
Key: Authorization      Value: Bearer <JWT_TOKEN>
Key: Content-Type       Value: application/json

##### Login using email and password received #####

## 5.3. GET - /api/users
Description: List all users

## 5.4. POST - /api/todos
Description: Create a new todo
json:
{
  "title": "Grocery",
  "description": "Buy milk, eggs, bread, and cheese",
  "status": "done",
  "priority": "high",
  "expected_completion_at": "2025-08-10T00:00:00.000Z",
  "user_id": "user-id"
}

## 5.5. GET - /api/todos
Description: List Todos 

## 5.6. GET - /api/todos?page=2&limit=5
Description: Listing todos with pagination

## 5.7. GET - /api/todos?status=todo&priority=high&title=grocery&page=1&limit=6
Description: Listing todos with filtering and searching

## 5.8. GET - /api/todos/todo-id
Description: Get details of a single Todo

## 5.8. PUT - /api/todos/todo-id
Description: Update a Todo (all fields)
json: 
{
  "title": "updated",
  "description": "Buy milk, eggs, bread, and cheese",
  "status": "todo",
  "priority": "high",
  "expected_completion_at": "2025-08-10T00:00:00.000Z",
  "user_id": "user-id"
}

## 5.9. PATCH - /api/todos/todo-id
Description: Partially update fields of a Todo
json:
{
    "status": "todo"
}

## 5.10. DELETE - /api/todos/todo-id
Description: Soft delete a Todo