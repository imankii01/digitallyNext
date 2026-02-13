# Task Board App

A minimal full-stack task management application built with Next.js, Prisma, and SQLite.

## Features

- ✅ User Authentication (Signup/Login)
- ✅ Create Tasks
- ✅ Update Task Status (Todo → In Progress → Done)
- ✅ View Only Your Tasks
- ✅ Responsive UI
- ✅ Password Hashing with Bcrypt
- ✅ JWT-based Authentication

## Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Auth**: JWT + Bcrypt
- **Styling**: Tailwind CSS

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── signup/route.ts
│   │   │       ├── login/route.ts
│   │   │       ├── logout/route.ts
│   │   │       └── me/route.ts
│   │   │   └── tasks/
│   │   │       └── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── auth/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── lib/
│       └── prisma.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

```bash
npx prisma migrate dev --name init
```

This creates the SQLite database and tables.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/[id]` - Update task status

## Database Schema

### User
- `id` (Int) - Primary Key
- `email` (String) - Unique
- `name` (String)
- `password` (String) - Hashed
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Task
- `id` (Int) - Primary Key
- `title` (String)
- `status` (String) - "Todo", "In Progress", "Done"
- `userId` (Int) - Foreign Key to User
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## How to Use

1. **Sign Up**: Create a new account with email and password
2. **Log In**: Sign in with your credentials
3. **Create Task**: Enter a task title and click "Add Task"
4. **Update Status**: Click the status dropdown to change task status
5. **Log Out**: Click logout button in the top right

## Environment Variables

Create `.env.local`:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma migrate dev` - Create/update database migrations
- `npx prisma studio` - Open Prisma Studio (database admin)

## Notes

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens are valid for 7 days
- Tokens are stored in HTTP-only cookies for security
- Each user can only see their own tasks
- No task deletion feature (as per requirements)

## Future Enhancements

- Task priority levels
- Task filtering and search
- Task deletion
- Task editing
- Due dates
- Categories/Labels
- User profile management
# digitallyNext
