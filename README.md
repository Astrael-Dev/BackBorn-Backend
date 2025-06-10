![version](https://img.shields.io/badge/Version-1.0.0-blue)
![status-In development-yellow](https://img.shields.io/badge/Status-In%20development-yellow)
![platform: Render](https://img.shields.io/badge/platform-Render-8e44ad?logo=render&logoColor=white)

---
![JavaScript](https://img.shields.io/badge/javascript-ES6+-f7df1e?logo=javascript&logoColor=black)
![Node.js v22.15.0](https://img.shields.io/badge/node-v22.15.0-339933?logo=node.js&logoColor=white)
![Express v5.1.0](https://img.shields.io/badge/express-5.1.0-orange?logo=express&logoColor=white)
![SQLite3 v5.1.7](https://img.shields.io/badge/sqlite3-5.1.7-20b2aa?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

---

# BackBorn Backend

Welcome to **BackBorn Backend** — a simple Node.js REST API for user authentication, registration, and profile management, built with Express and SQLite3.

---

## 🚀 Features

- **User Registration & Login**  
    Secure authentication with hashed passwords and JWT tokens.

- **Profile Picture Upload**  
    Users can upload a profile image during signup.

- **Protected Routes**  
    Access user data and stats only with a valid JWT.

- **SQLite Database**  
    Lightweight, file-based storage for easy setup and portability.

- **Environment-Based Configuration**  
    Seamless switching between development and production using `.env` files and [dotenv-flow](https://www.npmjs.com/package/dotenv-flow).

---

## 📁 Project Structure

```
📁 BACKBORN BACKEND
├── 📁 node_modules
├── 📁 src
│   ├── 📁 controllers
│   │   └── 📄 authController.js
│   ├── 📁 database
│   │   ├── 📄 db.js
│   │   ├── 📄 init.sql
│   │   └── 💾 users.db
│   ├── 📁 middlewares
│   │   ├── 📄 authMiddleware.js
│   │   └── 📄 uploadImgMiddleware.js
│   ├── 📁 routes
│   │   ├── 📄 auth.js
│   │   └── 📄 user.js
│   ├─ 📁 uploads
│   ├── 📄 app.js
│   ├── 📄 reset.js
│   └──  📄 seed.js
│
│
├── 📄 .env.development
├── 📄 .env.production
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📘 README.md
```

---

## ⚡️ Quick Start

### 1. **Clone the repository**

```bash
git clone https://github.com/yourusername/BackBorn-Backend.git
cd BackBorn-Backend
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Configure environment variables**

Create `.env.development` and/or `.env.production` and set your secrets:

```env
JWT_SECRET=your_jwt_secret
PORT=10000
```

### 4. **Initialize the database**

```bash
npm run reset
```

### 5. **Start the server**

```bash
npm run dev    # For development (with nodemon)
npm start      # For production
```

The server will run on [http://localhost:10000](http://localhost:10000) by default.

---

## 🛠️ API Endpoints

### **Auth**
- `POST /api/signup` — Register a new user (with optional profile picture)
- `POST /api/login` — Authenticate and receive a JWT token

### **User**
- `GET /api/users/profile` — Get the authenticated user's profile (JWT required)
- *(Add more user routes as needed)*

---

## 🖼️ Profile Image Uploads

- Uploaded images are stored in `src/uploads/` (created automatically if missing).
- The folder is **gitignored** for security and cleanliness.

---

## 🧑‍💻 Development & Deployment

- Uses [dotenv-flow](https://www.npmjs.com/package/dotenv-flow) for multi-environment support.
- On deployment (e.g., Render), set `NODE_ENV=production` and configure your environment variables in the dashboard or via `.env.production`.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

**BackBorn Backend** — Simple, modern, and ready for the BackBorn project.
