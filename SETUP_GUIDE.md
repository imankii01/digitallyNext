# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
npx prisma migrate dev --name init
```

This will:
- Create SQLite database (`dev.db`)
- Run all migrations
- Generate Prisma client

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 4. Test the App

1. Go to http://localhost:3000
2. You'll be redirected to `/auth` page
3. Click "Sign Up" to create a new account
4. Fill in your details and sign up
5. You'll be automatically logged in to the dashboard
6. Create some tasks and test status updates
7. Click logout to test login flow

## File Structure Overview

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # Backend API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   │   ├── signup/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── me/route.ts
│   │   │   └── tasks/          # Task endpoints
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── auth/               # Auth page (signup/login)
│   │   ├── dashboard/          # Main task board page
│   │   ├── page.tsx            # Home page (redirect logic)
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   └── lib/
│       └── prisma.ts           # Prisma client singleton
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── next.config.js              # Next.js config
├── .env.local                  # Environment variables (not in git)
└── .env.example                # Example env file
```

## Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js + React + TypeScript | UI Components |
| **Styling** | Tailwind CSS | Responsive design |
| **Backend** | Next.js API Routes | REST API |
| **Database** | SQLite + Prisma ORM | Data persistence |
| **Auth** | JWT + Bcrypt | Security |

## Database Schema

### Users Table
```
- id: number (primary key)
- email: string (unique)
- name: string
- password: string (hashed with bcrypt)
- createdAt: datetime
- updatedAt: datetime
```

### Tasks Table
```
- id: number (primary key)
- title: string
- status: string (Todo | In Progress | Done)
- userId: number (foreign key → Users)
- createdAt: datetime
- updatedAt: datetime
```

## API Reference

### POST /api/auth/signup
```json
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### POST /api/auth/login
```json
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
// Also sets HTTP-only cookie with JWT token
```

### GET /api/auth/me
```
Response (200):
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe"
}
```

### GET /api/tasks
```
Response (200):
{
  "tasks": [
    {
      "id": 1,
      "title": "Learn Next.js",
      "status": "In Progress",
      "createdAt": "2026-02-13T..."
    }
  ]
}
```

### POST /api/tasks
```json
Request Body:
{
  "title": "Learn Prisma"
}

Response (201):
{
  "task": {
    "id": 2,
    "title": "Learn Prisma",
    "status": "Todo",
    "createdAt": "2026-02-13T..."
  }
}
```

### PATCH /api/tasks/[id]
```json
Request Body:
{
  "status": "In Progress"
}

Response (200):
{
  "id": 1,
  "title": "Learn Next.js",
  "status": "In Progress",
  "createdAt": "2026-02-13T..."
}
```

## Troubleshooting

### Database already exists
If you get an error about database already existing, just delete `prisma/dev.db` and run migrations again:
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear all data and reset database
```bash
npx prisma migrate reset
```

## Environment Variables

Set these in `.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database path | `file:./dev.db` |
| `NEXTAUTH_SECRET` | JWT signing secret | Change in production! |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` |

## Next Steps

After setup:
1. ✅ Backend API is ready
2. ✅ Frontend is ready
3. ✅ Database is configured
4. ✅ Authentication is implemented
5. Next: Deploy to production (Vercel recommended for Next.js)

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy

```bash
# Before pushing to production
# 1. Change NEXTAUTH_SECRET to a random string
# 2. Use a real database (PostgreSQL recommended)
# 3. Set NEXTAUTH_URL to your production domain
```

## Support

For issues or questions:
1. Check the README.md
2. Review code comments
3. Check Prisma docs: https://www.prisma.io/docs/
4. Check Next.js docs: https://nextjs.org/docs
