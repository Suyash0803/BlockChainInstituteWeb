# Blockchain Institute - Deployment Guide

## 🚀 Deploy to Netlify

This guide will help you deploy your blockchain education website to Netlify.

### Prerequisites

1. GitHub account
2. Netlify account (free)
3. Your project should be in a GitHub repository

### Step 1: Push to GitHub

First, ensure your project is in a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit - Blockchain Institute website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/blockchain-institute.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. **Go to Netlify**: Visit [netlify.com](https://netlify.com) and sign up/log in

2. **Import from Git**: 
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account

3. **Select Repository**:
   - Choose your `blockchain-institute` repository

4. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18` (set in Environment variables)

5. **Environment Variables** (Optional for basic deployment):
   - `NODE_VERSION`: `18`
   - `NEXT_TELEMETRY_DISABLED`: `1`

6. **Deploy**: Click "Deploy site"

### Step 3: Custom Domain (Optional)

1. Go to "Domain settings" in your Netlify dashboard
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

### Features Included

✅ **Complete Website**: Home, About, Courses, Events, Certification, Contact  
✅ **User Authentication**: Registration, Login, Dashboard  
✅ **Responsive Design**: Works on all devices  
✅ **Course Enrollment**: Functional enrollment system  
✅ **Contact Forms**: Working contact and inquiry forms  

### Test Accounts

For demonstration purposes, use these credentials:

- **Admin Account**: 
  - Email: `admin@blockchaininstitute.com`
  - Password: `admin123`

### Troubleshooting

**Build Issues:**
- Ensure all TypeScript errors are resolved
- Check that all dependencies are listed in `package.json`

**Runtime Issues:**
- Remember that this uses in-memory storage for demo purposes
- User data will reset on each deployment
- For production, integrate with a real database

### Support

The website includes:
- Modern React/Next.js architecture
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design
- SEO-friendly structure
- Performance optimized

---

**Live Demo**: Your site will be available at `https://YOUR_SITE_NAME.netlify.app`
