# Blockchain Institute - Full-Stack Web Application

A comprehensive blockchain education platform built with Next.js, featuring both frontend and backend functionality. This website is inspired by the Indian Blockchain Institute and provides a complete learning management system for blockchain education.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Interactive header, footer, and page components
- **Course Catalog**: Dynamic course listing with filtering and sorting
- **Contact System**: Working contact form with validation
- **About Page**: Comprehensive information about the institute
- **Professional Layout**: Modern gradient designs and animations

### Backend Features
- **REST API**: Built with Next.js API routes
- **Contact Form Handling**: Server-side form processing
- **Course Management**: Dynamic course data with API endpoints
- **Enrollment System**: Student enrollment processing
- **Input Validation**: Server-side validation and error handling

### Pages Included
1. **Home Page** (`/`) - Hero section, features, testimonials, and call-to-action
2. **About Page** (`/about`) - Mission, vision, team, and company history
3. **Courses Page** (`/courses`) - Dynamic course catalog with filtering
4. **Contact Page** (`/contact`) - Contact form and company information

### API Endpoints
- `POST /api/contact` - Handle contact form submissions
- `GET /api/courses` - Retrieve course catalog
- `POST /api/enrollment` - Process course enrollments

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Hooks** - State management

### Backend
- **Next.js API Routes** - Server-side functionality
- **TypeScript** - Type-safe backend development
- **JSON Validation** - Input validation and sanitization

## 📁 Project Structure

```
blockchain-institute/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── courses/route.ts
│   │   │   └── enrollment/route.ts
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Header.tsx
│       └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd blockchain-institute
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Features

This blockchain education platform includes a complete course management system with responsive design, working contact forms, and a comprehensive course catalog. The website is built with modern web technologies and includes both frontend and backend functionality.

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
