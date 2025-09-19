# 📋 Task Manager

A Kanban-style task manager built with **Angular 17**, **Angular Material**, and **JSON Server**. The application demonstrates
modular architecture (auth, tasks, shared), strict TypeScript usage, global HTTP interceptors, and reactive forms enhanced by
RxJS operators (`debounceTime`, `filter`, `map`). Users can authenticate (mock JWT), create/edit/delete tasks, search across
tasks, and switch between light and dark themes.

---

## 🚀 Features

- **Authentication** – Reactive login form with validation and mock JWT storage.
- **Dashboard** – Tasks rendered in To Do, In Progress, and Done columns with quick status updates.
- **Task management** – Create, edit, and remove tasks with Material dialogs and global snackbar feedback.
- **Search & filter** – Instant filtering powered by RxJS operators (`debounceTime`, `filter`, `map`).
- **REST integration** – `HttpClient` CRUD operations against a JSON Server backend.
- **Global interceptor** – Automatically attaches tokens and surfaces HTTP errors.
- **Dark mode** – Angular Material theme toggle persisted in localStorage.
- **Docker-ready** – Compose file spins up Angular dev server and JSON Server together.

---

## 🛠️ Tech Stack

- **Front-end:** Angular 17+, TypeScript (strict mode), RxJS, Angular Material
- **Mock backend:** JSON Server (`db.json`)
- **Tooling:** Angular CLI, Docker & Docker Compose

---

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/            # Auth module, guard, login component
│   ├── shared/          # Shared module, material module, toolbar, dark mode service, interceptors, models
│   └── tasks/           # Task module, dashboard, task form & columns, task service
├── environments/        # Environment configuration (dev/prod)
└── assets/
```

Additional files:

- `db.json` – Seed data for JSON Server
- `docker-compose.yml` / `Dockerfile` – Containerised dev environment

---

## ⚙️ Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the mock API (port 3000)**

   ```bash
   npm run json-server
   ```

3. **Run the Angular app (port 4200)**

   ```bash
   npm run start:app
   ```

4. Visit `http://localhost:4200` – the app will proxy requests to `http://localhost:3000/tasks`.

Default credentials are not required: any valid email/password combination will produce a mock token.

---

## 🐳 Docker Compose

Ensure Docker and Docker Compose are installed, then run:

```bash
docker-compose up --build
```

Services started:

- **frontend** → Angular dev server on `http://localhost:4200`
- **json-server** → REST API on `http://localhost:3000`

Stop the stack with `Ctrl+C` and remove containers using `docker-compose down`.

---

## 🔗 Useful Commands

| Command | Description |
| ------- | ----------- |
| `npm run start` | Serve Angular app on all interfaces (used in Docker) |
| `npm run start:app` | Serve Angular locally (`http://localhost:4200`) |
| `npm run json-server` | Run JSON Server with `db.json` |
| `npm run build` | Production build |

---

## 📬 API Endpoints

All endpoints are served by JSON Server on `http://localhost:3000`:

- `GET /tasks` – List tasks
- `POST /tasks` – Create task
- `PUT /tasks/:id` – Update task
- `DELETE /tasks/:id` – Remove task

---

## 🧭 Next Steps (Ideas)

- Add drag & drop for Kanban columns
- Replace mock auth with a real backend
- Extend unit/e2e test coverage

---

Happy tasking! 🧑‍💻
