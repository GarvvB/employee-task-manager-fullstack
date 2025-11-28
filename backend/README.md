# Backend API - Employee Task Manager

A RESTful API built with Node.js, Express, and SQLite for managing employees and tasks.

## 🚀 Features

- Complete CRUD operations for Employees and Tasks
- SQLite database with proper foreign key relationships
- Input validation and error handling
- Request logging middleware
- Query filtering (tasks by status)
- Dashboard statistics endpoint
- CORS enabled for frontend integration

## 📦 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **better-sqlite3** - SQLite database driver
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
backend-api/
├── controllers/
│   ├── employeeController.js
│   ├── taskController.js
│   └── dashboardController.js
├── db/
│   ├── database.js
│   ├── init.js
│   ├── schema.sql
│   └── seed.sql
├── middleware/
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   ├── Employee.js
│   └── Task.js
├── routes/
│   ├── employeeRoutes.js
│   ├── taskRoutes.js
│   └── dashboardRoutes.js
├── utils/
│   └── validation.js
├── server.js
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The API will be available at: `http://localhost:3000`

## 📊 Database Schema

### Employees Table
```sql
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Pending', 'In Progress', 'Completed')),
    due_date DATE NOT NULL,
    employee_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3000
```

### Employees Endpoints

#### GET /employees
Get all employees

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "Frontend Developer",
      "email": "john.doe@company.com",
      "created_at": "2024-01-01 10:00:00"
    }
  ]
}
```

#### GET /employees/:id
Get employee by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "role": "Frontend Developer",
    "email": "john.doe@company.com"
  }
}
```

#### POST /employees
Create new employee

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Frontend Developer",
  "email": "john.doe@company.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "role": "Frontend Developer",
    "email": "john.doe@company.com"
  }
}
```

#### PUT /employees/:id
Update employee

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Senior Frontend Developer",
  "email": "john.doe@company.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "role": "Senior Frontend Developer",
    "email": "john.doe@company.com"
  }
}
```

#### DELETE /employees/:id
Delete employee

**Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

### Tasks Endpoints

#### GET /tasks
Get all tasks (with optional status filter)

**Query Parameters:**
- `status` (optional): Filter by status (Pending, In Progress, Completed)

**Example:** `GET /tasks?status=Completed`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Design landing page mockup",
      "status": "Completed",
      "due_date": "2024-01-15",
      "employee_id": 4,
      "created_at": "2024-01-01 10:00:00"
    }
  ]
}
```

#### GET /tasks/:id
Get task by ID

#### POST /tasks
Create new task

**Request Body:**
```json
{
  "title": "Design landing page mockup",
  "status": "Pending",
  "due_date": "2024-01-15",
  "employee_id": 4
}
```

#### PUT /tasks/:id
Update task

**Request Body:**
```json
{
  "title": "Design landing page mockup",
  "status": "Completed",
  "due_date": "2024-01-15",
  "employee_id": 4
}
```

#### DELETE /tasks/:id
Delete task

### Dashboard Endpoint

#### GET /dashboard
Get task statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 8,
    "completed": 3,
    "inProgress": 3,
    "pending": 2,
    "completionRate": "37.5"
  }
}
```

## ✅ Input Validation

### Employee Validation
- `name`: Required, non-empty string
- `role`: Required, non-empty string
- `email`: Required, valid email format, unique

### Task Validation
- `title`: Required, non-empty string
- `status`: Required, must be one of: "Pending", "In Progress", "Completed"
- `due_date`: Required, format: YYYY-MM-DD
- `employee_id`: Required, valid integer

## 🔒 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## 📝 Assumptions

1. SQLite database file is created in the `db/` directory
2. Foreign key constraints are enabled
3. Deleting an employee cascades to delete their tasks
4. All dates are stored in YYYY-MM-DD format
5. Task status is limited to three predefined values
6. Email addresses must be unique across employees
7. No authentication/authorization required
8. Single-threaded SQLite is sufficient for the use case

## 🧪 Testing with Postman

Import the provided Postman collection to test all endpoints. The collection includes:
- All CRUD operations for employees
- All CRUD operations for tasks
- Task filtering examples
- Dashboard statistics
- Error handling scenarios

## 📄 License

This project is created for educational purposes.
