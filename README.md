# 🎯 Employee Task Manager - Full Stack Application

A complete full-stack web application for managing employees and tasks. Built with React, Node.js, Express, and SQLite. Features a modern UI, real-time updates, and comprehensive CRUD operations.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### Frontend
- ✅ **Multi-Page Application** - Dashboard, Employees, Tasks, and Task Form pages
- ✅ **Real-Time Updates** - Data syncs with backend API
- ✅ **Advanced Filtering** - Filter tasks by status and employee
- ✅ **CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Modern UI** - Gradient backgrounds, animations, and responsive design
- ✅ **Employee Statistics** - Task progress bars and completion rates
- ✅ **Error Handling** - User-friendly error messages with retry options

### Backend
- ✅ **RESTful API** - Complete REST API with proper HTTP methods
- ✅ **SQLite Database** - Persistent data storage with foreign keys
- ✅ **Input Validation** - Comprehensive validation with error messages
- ✅ **CORS Enabled** - Ready for frontend integration
- ✅ **Request Logging** - All requests logged with timestamps
- ✅ **Dashboard Statistics** - Aggregated metrics endpoint


## 🎥 Screenshots

### Dashboard
<img width="1898" height="1026" alt="image" src="https://github.com/user-attachments/assets/9a793153-690b-433c-8dc8-c03e143292d2" />

*Dashboard with statistics cards, recent tasks, and quick actions*

### Employees Page
<img width="1911" height="1017" alt="image" src="https://github.com/user-attachments/assets/72e39fc5-a000-4ff7-a769-3654a858acc5" />

*Employee cards with avatars, task statistics, and progress bars*

### Tasks Page
<img width="1900" height="1021" alt="image" src="https://github.com/user-attachments/assets/0b6ccafa-0b20-48c0-b4ed-487436f0dafd" />

*Task list with advanced filtering and inline status updates*

### Task Form
<img width="1916" height="1009" alt="image" src="https://github.com/user-attachments/assets/355d2fb2-603e-4588-bb11-ab84b997bf43" />

*Beautiful form for creating and editing tasks*

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI Library |
| **Vite** | 5.0 | Build Tool |
| **Tailwind CSS** | 3.3 | Styling |
| **React Router** | 6.20 | Routing |
| **Axios** | 1.6 | HTTP Client |
| **Framer Motion** | 10.16 | Animations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 16+ | Runtime |
| **Express** | 4.18 | Web Framework |
| **SQLite3** | 5.1 | Database |
| **CORS** | 2.8 | Cross-Origin Support |

## 📁 Project Structure

```
fullstack/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── employeeService.js
│   │   │   ├── taskService.js
│   │   │   └── dashboardService.js
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd fullstack/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize database**
   ```bash
   npm run init-db
   ```

4. **Start backend server**
   ```bash
   npm start
   ```
   
   Backend will run on `http://localhost:3000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend**
   ```bash
   cd fullstack/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

4. **Open your browser**
   
   Navigate to `http://localhost:5173`

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

## 🔌 API Endpoints

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks?status=Completed` - Filter tasks by status
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Dashboard
- `GET /dashboard` - Get task statistics

## 🎯 Key Features Explained

### Dashboard
- Real-time statistics cards
- Recent tasks with employee avatars
- Quick action buttons
- Team members preview

### Employees Page
- Employee cards with avatars
- Task progress bars
- Completion rate display
- Active status indicators

### Tasks Page
- Advanced filtering (status + employee)
- Inline status updates
- Edit and delete actions
- Task count display

### Task Form
- Create new tasks
- Edit existing tasks
- Employee dropdown selection
- Form validation

## 📝 Assumptions

1. Backend runs on port 3000, frontend on port 5173
2. SQLite database is sufficient (no PostgreSQL/MySQL needed)
3. No authentication/authorization required
4. Single-user application
5. CORS enabled for all origins (development mode)
6. All dates in YYYY-MM-DD format
7. Task status limited to: Pending, In Progress, Completed
8. Employee email must be unique
9. Deleting an employee cascades to delete their tasks
10. Frontend uses environment variables for API URL

## ✨ Bonus Features Implemented

### Frontend
- ✅ **Framer Motion Animations** - Smooth page transitions
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Loading States** - Spinners for async operations
- ✅ **Empty States** - Helpful messages when no data
- ✅ **Responsive Design** - Works on all devices
- ✅ **Employee Avatars** - Visual user representation
- ✅ **Progress Bars** - Task completion visualization
- ✅ **Quick Actions** - Sidebar for common tasks

### Backend
- ✅ **Request Logging** - All requests logged
- ✅ **Dashboard Statistics** - Aggregated metrics
- ✅ **Query Filtering** - Filter tasks by status
- ✅ **Foreign Key Constraints** - Data integrity
- ✅ **Cascade Delete** - Automatic cleanup
- ✅ **Comprehensive Validation** - Detailed errors
- ✅ **Postman Collection** - API testing ready

## 🔄 Available Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with auto-reload
npm run init-db    # Initialize database
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🌐 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Backend not connecting
- Ensure backend is running on port 3000
- Check if database is initialized
- Verify CORS is enabled

### Frontend API errors
- Check `.env` file has correct API URL
- Ensure backend is running
- Check browser console for errors

### Database issues
- Run `npm run init-db` to reset database
- Check if `tasks.db` file exists in `backend/db/`

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

**Garvv B**
- GitHub: [@GarvvB](https://github.com/GarvvB)

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js for the robust framework
- Tailwind CSS for beautiful styling
- Framer Motion for smooth animations
- SQLite for lightweight database

---
Track - 3: ProU Technology Fullstack Web Application 
