# 🐛 Automated Bug Tracking System

<div align="center">

![Bug Tracking](https://img.shields.io/badge/Project-P6-ff4d6d?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-00d4aa?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-black?style=for-the-badge&logo=express)

**A centralized platform where developers can report, categorize, and track software bugs.**

</div>

---

## 📌 Objective

To develop a centralized platform where developers can **report**, **categorize** (Critical, Major, Minor), and **track the status** of software bugs during a project — making the development process faster and more efficient.

---

## ✨ Features

- 🔐 **User Authentication** — Register & Login with JWT tokens
- 👥 **Role-based Access** — Developer / Admin / Tester
- 🐛 **Bug Reporting** — Report bugs with severity levels
- 📊 **Dashboard** — Live charts showing bug stats (Doughnut & Bar charts)
- 📋 **Bug List** — Filter, search, edit and delete bugs
- 🔔 **Status Tracking** — Open → In Progress → Resolved → Closed
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🖥️ Core Modules

| Module | Description |
|--------|-------------|
| **User Authentication** | Register/Login with Dev/Admin/Tester roles |
| **Bug Reporting Form** | Title, Description, Severity, Project, Assignee |
| **Dashboard** | Status Charts, Stat Cards, Recent Bugs Table |
| **Bug Management** | View, Filter, Search, Edit, Delete bugs |
| **Notification System** | Toast notifications for all actions |

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js 18 | UI Framework |
| React Router v6 | Page Navigation |
| Axios | API Calls |
| Chart.js + React-Chartjs-2 | Dashboard Charts |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password Hashing |

---

## 📁 Project Structure

```
BugTrack/
│
├── backend/
│   ├── config/
│   │   └── db.js               ← MongoDB Connection
│   ├── controllers/
│   │   ├── authController.js   ← Register / Login
│   │   └── bugController.js    ← Bug CRUD + Stats
│   ├── middleware/
│   │   └── authMiddleware.js   ← JWT Protection
│   ├── models/
│   │   ├── User.js             ← User Schema
│   │   └── Bug.js              ← Bug Schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bugRoutes.js
│   ├── .env                    ← Environment Variables
│   ├── server.js               ← Entry Point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   └── Navbar.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── CreateBug.js
│       │   └── BugList.js
│       ├── App.js
│       ├── index.js
│       └── index.css
│
├── README.md
└── START.bat
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)
- Git

### Step 1 — Clone the Repository
```bash
git clone https://github.com/priyanshu-git2777/bugtracking.git
cd bugtracking
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGO_URI=mongodb://localhost:27017/bugtracking
PORT=5000
JWT_SECRET=bugtrack_secret_key_2024
```

### Step 3 — Setup Frontend
```bash
cd ../frontend
npm install
```

---

## 🚀 Running the Project

### Start MongoDB (Terminal 1)
```bash
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```
Wait for: `mongod startup complete`

### Start Backend (Terminal 2)
```bash
cd backend
node server.js
```
✅ You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running → http://localhost:5000
```

### Start Frontend (Terminal 3)
```bash
cd frontend
npm start
```
✅ Opens at: **http://localhost:3000**

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

### Bugs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs/stats` | Get dashboard stats |
| POST | `/api/bugs` | Create new bug |
| PUT | `/api/bugs/:id` | Update bug |
| DELETE | `/api/bugs/:id` | Delete bug |

---

## 👥 User Roles & Permissions

| Role | Report Bug | Edit Own | Edit Any | Delete Any |
|------|-----------|----------|----------|------------|
| **Developer** | ✅ | ✅ | ❌ | ❌ |
| **Tester** | ✅ | ✅ | ❌ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

---

## 📊 Bug Severity Levels

| Severity | Description | Color |
|----------|-------------|-------|
| 🔴 **Critical** | System crash, data loss, security breach | Red |
| 🟡 **Major** | Feature broken, significant impact | Yellow |
| 🟢 **Minor** | Small UI issues, minor inconvenience | Green |

---

## 📸 Screenshots

### Register Page
- Role selection (Developer / Admin / Tester)
- Email & Password validation

### Dashboard
- Total bugs stat cards
- Doughnut chart — Bugs by Severity
- Bar chart — Bugs by Status
- Recent bugs table

### Bug List
- Search and filter by severity/status
- Edit bug inline via modal
- Delete bug (Admin or owner only)

### Report Bug
- Severity selector (Critical/Major/Minor)
- Project name and assignee fields

---

## 🐛 Common Issues & Fixes

| Error | Fix |
|-------|-----|
| `ECONNRESET` | mongod terminal closed — restart MongoDB |
| `ECONNREFUSED 27017` | MongoDB not running — start mongod first |
| `Cannot find module` | Run `npm install` in that folder |
| `Port 5000 in use` | Change `PORT=5001` in `.env` |
| `500 Internal Server Error` | Backend not connected to MongoDB |
| `401 Unauthorized` | Session expired — logout and login again |

---

## 👨‍💻 Developer

**Priyanshu**
- GitHub: [@priyanshu-git2777](https://github.com/priyanshu-git2777)

---

## 📄 License

This project is developed as a **College Project — P6**.

---

<div align="center">
Made with ❤️ using MERN Stack
</div>
