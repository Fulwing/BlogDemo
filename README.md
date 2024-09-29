# Blog Project

This project is a full-stack blog application built with modern web technologies.

## Demo

You can view a [live demo](https://module3-tan.vercel.app/) of the project

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Fulwing/BlogDemo.git
   cd BlogDemo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your database URL and any other necessary environment variables.

4. Run database migrations:
   ```bash
   pnpm drizzle-kit push:pg
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

The application should now be running on `http://localhost:3000`.

## Tech Stack

This project utilizes a modern and robust tech stack:

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework that enables server-side rendering and generates static websites for React based web applications.

### Backend
- **Next.js API Routes**: Serverless functions that can be deployed as API endpoints.

### Database
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Drizzle ORM**: A lightweight and performant TypeScript ORM for SQL databases.

### Authentication
- **NextAuth.js**: A complete authentication solution for Next.js applications.

### Form Handling and Validation
- **React Hook Form**: Performant, flexible and extensible forms with easy-to-use validation.
- **Zod**: TypeScript-first schema declaration and validation library.

### Styling
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

### Notifications
- **React-Toastify**: A React notification library for adding toast notifications to your app.

### Markdown Processing
- **Remark**: A Markdown processor powered by plugins.

### Date Formatting
- **date-fns**: Modern JavaScript date utility library.

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete blog posts
- Markdown support for writing blog posts
- Cover image upload for blog posts
- Comments system for blog posts
- Responsive design with dark mode support
- Server-side rendering and static site generation capabilities
- Toast notifications for user feedback

## Project Structure

The project follows a typical Next.js structure with some additional directories for better organization:

- `src/`: Contains the main source code
  - `app/`: Next.js 13+ app directory
    - `_components/`: Reusable React components
    - `auth/`: Authentication-related pages and components
    - `posts/`: Blog post pages
    - `protected/`: Protected routes (e.g., add post, edit post)
  - `db/`: Database-related code
    - `queries/`: Database query functions
    - `utils/`: Utility functions for database operations
  - `interfaces/`: TypeScript interfaces
  - `lib/`: Utility functions and constants
- `public/`: Static assets
- `migrations/`: Database migration files
- `_posts/`: Markdown files for static blog posts (if applicable)

Key files:
- `src/app/layout.tsx`: Root layout component
- `src/app/page.tsx`: Home page component
- `src/db/schema.ts`: Database schema definitions
- `src/auth.ts`: NextAuth.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `next.config.js`: Next.js configuration
