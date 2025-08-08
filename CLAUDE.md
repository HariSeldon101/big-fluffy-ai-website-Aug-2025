# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

KEY RULES TO FOLLOW

* 1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
* 2. The plan should have a list of todo items that you can check off as you complete them
* 3. Before you begin working, check in with me and I will verify the plan.
* 4. Then, begin working on the todo items, marking them as complete as you go.
* 5. Please every step of the way just give me a high level explanation of what changes you made
* 6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.

## Project Overview

Big Fluffy AI - A modern AI consultancy website built with NextJS, featuring a client dashboard and service showcase. The site uses a dark theme with animated components and provides client project management functionality.

## Tech Stack

- **Frontend**: NextJS 14+ (App Router)
- **Database**: Supabase (PostgreSQL with real-time features)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Animations**: Motion.dev (Framer Motion)
- **Theme**: Dark theme with animated backgrounds

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Install Shadcn UI components
npx shadcn-ui@latest add [component-name]

# Generate Supabase types
npm run supabase:types
```

## Project Architecture

### Core Pages Structure
- `/` - Homepage with hero animation and 6 service cards
- `/services/[service]` - Individual service pages
- `/dashboard` - Client dashboard (protected route)
- `/auth` - Authentication pages (login/signup)

### Key Components Organization
- `components/ui/` - Shadcn UI components
- `components/hero/` - Hero section with background animation
- `components/services/` - Service cards and related components
- `components/dashboard/` - Client dashboard components
- `components/auth/` - Authentication components

### Service Cards (6 Core Services)
1. AI Consultancy
2. AI Automation  
3. Project & Risk Management
4. Project Implementation
5. Outsource AI Expertise
6. AI Training

### Database Schema (Supabase)
- `clients` - Client information and authentication
- `projects` - Client projects with timelines
- `documents` - Project documents and files
- `services` - Service offerings and descriptions
- `project_timelines` - Project milestones and progress tracking

### Authentication & Authorization
- Supabase Auth for client authentication
- Row Level Security (RLS) policies for data protection
- Protected routes using NextJS middleware
- Role-based access (admin/client)

### Client Dashboard Features
- Project timeline visualization
- Document management (view/download/upload)
- Progress tracking
- Secure file uploads via Supabase Storage

### Animation Strategy
- Motion.dev for page transitions and micro-interactions
- Background animations in hero section (preferably subtle and performant)
- Service card animations on scroll/hover
- Loading states and skeleton components

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextJS
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## File Upload Handling
- Use Supabase Storage for secure file uploads
- Implement file type validation
- Set upload size limits
- Generate secure upload URLs for client documents

## Development Best Practices
- Use TypeScript for all components
- Implement proper error boundaries
- Use Supabase RLS policies for security
- Optimize images with NextJS Image component
- Implement proper loading states
- Follow Shadcn UI patterns for consistent styling

## Contact Information
- **Email**: woof@bigfluffy.ai
- **Phone**: +44 (0) 7727 847722
- **Address**: London, UK
- **Domain**: bigfluffy.ai