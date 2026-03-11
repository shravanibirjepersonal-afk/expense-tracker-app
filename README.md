# Expense Tracker App

A full-stack expense tracker built with:

- **Frontend:** React + Vite + Tailwind CSS + React Router + Chart.js
- **Backend:** Node.js + Express + MongoDB Atlas
- **Database:** MongoDB Atlas

## Folder structure

```
expense-tracker-app/
  client/           # React frontend (Vite)
  server/           # Express backend
```

---

## Getting started (local)

### 1) Run the backend

1. Copy `server/.env.example` to `server/.env` and set your `MONGODB_URI`.
2. From the root:
   ```bash
   cd server
   npm install
   npm run dev
   ```

### 2) Run the frontend

1. Copy `client/.env.example` to `client/.env` (or set `VITE_API_BASE_URL` to your backend URL).
2. From the root:
   ```bash
   cd client
   npm install
   npm run dev
   ```

Your app will be available at http://localhost:5173

---

## Deploying

### Frontend (Vercel)
- Connect your repository in Vercel.
- Set the build command to `npm run build` and the output directory to `dist`.
- Add an environment variable `VITE_API_BASE_URL` pointing to your deployed backend.

### Backend (Render)
- Create a new Web Service in Render.
- Connect your repository and set the start command to:
  ```bash
  npm start
  ```
- Add environment variables:
  - `MONGODB_URI` (your MongoDB Atlas connection string)
  - `CLIENT_URL` (optional, e.g., `https://your-frontend.vercel.app`)

### Database (MongoDB Atlas)
- Create a free cluster.
- Create a database user and whitelist your IP (or allow access from anywhere for development).
- Copy the connection string into `MONGODB_URI`.

---

## API Endpoints

- `GET /transactions` - list all transactions
- `GET /transactions/:date` - list transactions for a specific date (YYYY-MM-DD)
- `POST /transactions` - create a transaction

