# Student CRUD App

This is a React + Vite student management app connected to a FastAPI backend.

## Backend URL

For Vercel deployments, set the backend in **Environment Variables** instead of hardcoding it in source code.

Use this variable name:

```bash
VITE_API_BASE_URL
```

Example value:

```bash
https://student-crud-backend-fb9o1q1t4-sasis-projects-45f4814e.vercel.app
```

Vite reads client-side env values with the `VITE_` prefix, so the frontend can access this value during build time.

After changing the variable in Vercel, redeploy the frontend so the new value is applied.

## Local Development

Copy `.env.example` to `.env.local` if you want to override the backend locally.
