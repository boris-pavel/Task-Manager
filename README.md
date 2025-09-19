# 📋 Task Manager App

A simple **Kanban-style Task Manager** built with **Angular, TypeScript, RxJS, Angular Material, and JSON Server**.
The app allows users to authenticate, create, edit, delete, and manage tasks across different statuses (`To Do`, `In Progress`, `Done`).

This project demonstrates:

* Angular (components, services, routing, reactive forms)
* TypeScript (strict typing, interfaces, clean code)
* RxJS (observables, subjects, operators like `map`, `filter`, `debounceTime`)
* REST API integration (GET/POST/PUT/DELETE with HttpClient)
* Angular Material UI & responsive design (Flexbox/Grid)
* Global HTTP Interceptors for error handling and auth token
* Docker & Docker Compose for containerized front-end + backend mock

---

## 🚀 Features

✅ Login page with mock JWT authentication
✅ Dashboard with tasks organized in a Kanban board
✅ Add, edit, and delete tasks using Reactive Forms
✅ Search & filter tasks with RxJS operators
✅ Dark Mode toggle (Angular Material theme switch)
✅ REST API powered by JSON Server
✅ Clean modular architecture (auth, tasks, shared)
✅ Docker Compose setup for easy deployment

---

## 🛠️ Tech Stack

* **Front-end:** Angular 17+, TypeScript, RxJS, Angular Material
* **Backend (mock):** JSON Server
* **Containerization:** Docker & Docker Compose

---

## 📂 Project Structure

```
task-manager/
│── src/app/
│   ├── auth/          # Login, authentication service
│   ├── tasks/         # Task components, services, models
│   ├── shared/        # Shared modules, interceptors
│   └── app.module.ts
│
│── db.json            # Mock backend data
│── docker-compose.yml # Container setup
│── README.md          # Project documentation
```

---

## ⚡ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the Angular app

```bash
ng serve
```

👉 The app will be available at `http://localhost:4200/`

### 4. Run the mock backend

```bash
npx json-server --watch db.json --port 3000
```

👉 The REST API will be available at `http://localhost:3000/tasks`

---

## 🐳 Run with Docker

Make sure you have **Docker** and **Docker Compose** installed.

```bash
docker-compose up --build
```

This will start:

* Angular app → `http://localhost:4200/`
* JSON Server → `http://localhost:3000/`

---

## 🔑 Example API Routes

* `GET /tasks` → Get all tasks
* `POST /tasks` → Add a new task
* `PUT /tasks/:id` → Update a task
* `DELETE /tasks/:id` → Delete a task

---

## 🎯 Future Improvements

* Real authentication with JWT + Node.js backend
* Drag & drop for Kanban tasks
* User-specific task management
* Unit & E2E testing with Jasmine/Karma

---

## 👤 Author

Built by **\[Boris-Andrei Pavel]**

* GitHub: [boris-pavel](https://github.com/boris-pavel)
* LinkedIn: [Boris-Andrei Pavel](https://www.linkedin.com/in/boris-pavel/)

---

🔥 This project was created as a **portfolio showcase** to demonstrate modern Angular development practices, REST API integration, and clean architecture.

---

