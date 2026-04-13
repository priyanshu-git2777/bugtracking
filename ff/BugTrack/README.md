# 🐛 Automated Bug Tracking System — P6

MERN Stack: MongoDB · Express · React · Node.js

---

## 📁 Project Structure

```
BugTrack/
├── backend/
│   ├── config/db.js              ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     ← Register / Login
│   │   └── bugController.js      ← Bug CRUD + Stats
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Bug.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bugRoutes.js
│   ├── .env                      ← YOUR CONFIG FILE
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/Navbar.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── CreateBug.js
│   │   │   └── BugList.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

## ═══════════════════════════════════════════
## ✅ STEP-BY-STEP: HOW TO RUN (READ CAREFULLY)
## ═══════════════════════════════════════════

You need to open 3 terminals in VS Code.
Press Ctrl+` to open terminal, then click + to add more.

---

### ══════════════════════════════════
### TERMINAL 1 — Start MongoDB First!
### ══════════════════════════════════

You have MongoDB 8.2 installed. Run this command:

```
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```

✅ Wait until you see this line:
```
"msg":"mongod startup complete"
```

⚠️  KEEP THIS TERMINAL OPEN THE WHOLE TIME.
    Do NOT close it. Do not press Ctrl+C here.

If you see error "C:\data\db not found":
```
mkdir C:\data\db
```
Then run the mongod command again.

---

### ══════════════════════════════════
### TERMINAL 2 — Start Backend
### ══════════════════════════════════

Click + to open a new terminal, then:

```
cd backend
npm install
node server.js
```

✅ You should see:
```
🔄 Connecting to MongoDB...
✅ MongoDB Connected: localhost
📦 Database: bugtracking
🚀 Server running → http://localhost:5000
```

If you see ❌ error:
→ Make sure Terminal 1 (mongod) is still running
→ Check backend/.env has correct MONGO_URI

---

### ══════════════════════════════════
### TERMINAL 3 — Start Frontend
### ══════════════════════════════════

Click + to open another terminal, then:

```
cd frontend
npm install
npm start
```

✅ Browser opens automatically at:
   http://localhost:3000

---

## 🔧 Your backend/.env file

Make sure it looks EXACTLY like this (no extra spaces):

```
MONGO_URI=mongodb://localhost:27017/bugtracking
PORT=5000
JWT_SECRET=bugtrack_secret_key_2024
```

---

## 🧭 How to verify in MongoDB Compass

1. Open MongoDB Compass
2. In the URI box type:
   mongodb://localhost:27017
3. Click Connect
4. After you register a user, you will see:
   - bugtracking → users  (your registered accounts)
   - bugtracking → bugs   (bugs you report)

---

## 🌐 How to use MongoDB Atlas instead (Cloud)

If you want to use Atlas instead of local:

STEP 1: Go to https://cloud.mongodb.com
STEP 2: Login → your cluster → Click "Connect"
STEP 3: Choose "Drivers" → copy the connection string
STEP 4: In backend/.env, replace MONGO_URI with:

```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/bugtracking?retryWrites=true&w=majority
```

STEP 5: Go to Atlas → Network Access → Add IP Address
        → Click "Allow Access From Anywhere" (0.0.0.0/0)
        → Confirm → Wait 2 minutes

STEP 6: Restart backend: node server.js

⚠️  If Atlas shows querySrv error on your network,
    use local MongoDB (Terminal 1 method above) instead.
    Local MongoDB always works!

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| ECONNRESET | mongod terminal closed — restart Terminal 1 |
| ECONNREFUSED 27017 | mongod not running — run Terminal 1 first |
| querySrv ECONNREFUSED | Network blocking Atlas — use local MongoDB |
| Cannot find module | Run npm install in that folder |
| Port 5000 in use | Change PORT=5001 in .env |
| 500 Internal Server Error | Backend not connected to MongoDB |
| 401 Unauthorized | Token expired — logout and login again |

---

## 📋 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET  | /api/auth/profile | My profile |
| GET  | /api/bugs | All bugs |
| GET  | /api/bugs/stats | Dashboard stats |
| POST | /api/bugs | Report new bug |
| PUT  | /api/bugs/:id | Update bug |
| DELETE | /api/bugs/:id | Delete bug |

---

## 👥 User Roles

| Role | Can Do |
|------|--------|
| Developer | Report bugs, edit own bugs, view all |
| Tester | Report bugs, view all |
| Admin | Full access — edit and delete any bug |

---

## 🚀 Every time you open the project

Always start in this order:
1. Terminal 1 → mongod (wait for startup complete)
2. Terminal 2 → cd backend → node server.js
3. Terminal 3 → cd frontend → npm start

Then open: http://localhost:3000

---

*College Project P6 — Automated Bug Tracking System*
*Stack: React + Node.js/Express + MongoDB + JWT Auth*
