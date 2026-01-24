# 🚀 Portfolio Setup Guide

## 📋 Prerequisites

- Node.js installed
- MongoDB running (local or MongoDB Atlas)
- Cloudinary account for image storage

---

## ⚙️ Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` folder:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port
PORT=5000
```

### 3. Create Admin User
Run this command to create the default admin account:

```bash
node utils/seedAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials after first login!

### 4. Start Backend Server
```bash
npm run dev
# or
node server.js
```

Backend will run on: `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔐 Accessing the Admin Panel

### Method 1: Direct URL
Navigate to: `http://localhost:5173/login`

### Method 2: From Navbar
1. Look for the **"Admin"** button in the top-right of the navigation bar
2. Click it to go to the login page

### Method 3: From Mobile Menu
1. Click the hamburger menu (three lines) on mobile
2. Scroll down to find **"Admin Login"**
3. Click to access the login page

---

## 👤 Login to Admin Dashboard

1. Go to `/login` page
2. Enter credentials:
   - **Email:** `admin@portfolio.com`
   - **Password:** `admin123`
3. Click **"Sign In"**
4. You'll be redirected to `/admin` dashboard

---

## 📸 Adding Projects with Images (Cloudinary)

### How It Works:
- Your backend is configured to use **Cloudinary** for image storage
- When you upload images in the admin panel, they're automatically uploaded to Cloudinary
- The URLs are saved in your MongoDB database

### To Add a Project:

1. **Login to Admin Panel** (`/login`)
2. **Navigate to Admin Dashboard** (`/admin`)
3. **Click "Add Project"** or go to `/admin/add-project`
4. **Fill in the form:**
   - Project Title
   - Description
   - Tech Stack (comma-separated: React, Node.js, MongoDB)
   - Live Demo Link (optional)
   - GitHub Link (optional)
   - **Upload Images** (multiple files supported)
5. **Click "Save Project"**

Your images will be uploaded to Cloudinary and project will be saved!

---

## 🛠️ Admin Panel Features

### Dashboard (`/admin`)
- View total projects
- View total messages
- Recent projects list
- Recent messages list
- Quick action buttons

### Manage Projects (`/admin/projects`)
- View all projects
- Edit existing projects
- Delete projects
- View project details

### Add Project (`/admin/add-project`)
- Create new projects
- Upload multiple images
- Add project details

### Edit Project (`/admin/edit-project/:id`)
- Update project information
- View current images
- Modify links and tech stack

### Messages (`/admin/messages`)
- View contact form submissions
- Reply via email
- Delete messages

---

## 📝 Navigation Structure

### Public Routes:
- `/` - Home
- `/about` - About Me
- `/services` - Services I Offer
- `/projects` - Project Portfolio
- `/projects/:id` - Project Details
- `/contact` - Contact Form
- `/login` - Admin Login

### Protected Routes (Require Login):
- `/admin` - Dashboard
- `/admin/add-project` - Add New Project
- `/admin/projects` - Manage Projects
- `/admin/edit-project/:id` - Edit Project
- `/admin/messages` - View Messages

---

## 🔒 Security Notes

1. **Change Default Password:**
   - After first login, create a new admin user with secure credentials
   - Delete the default admin account

2. **Environment Variables:**
   - Never commit `.env` files to version control
   - Keep your JWT_SECRET secure
   - Protect your Cloudinary credentials

3. **MongoDB:**
   - Use a strong database password
   - Enable IP whitelist on MongoDB Atlas
   - Regularly backup your database

---

## 🐛 Troubleshooting

### Can't Access Admin Panel:
1. Make sure backend is running (`http://localhost:5000`)
2. Check if admin user was created (run `node utils/seedAdmin.js`)
3. Check browser console for errors
4. Verify `.env` files are configured correctly

### Images Not Uploading:
1. Verify Cloudinary credentials in backend `.env`
2. Check Cloudinary dashboard for upload activity
3. Ensure file size is within limits
4. Check browser console for errors

### Login Not Working:
1. Ensure backend server is running
2. Check MongoDB connection
3. Verify CORS is enabled in backend
4. Check network tab for API response errors

### Backend Not Connecting:
1. Verify MongoDB URI is correct
2. Check if MongoDB is running
3. Ensure all dependencies are installed
4. Check server logs for errors

---

## 📱 Contact Support

If you encounter issues:
1. Check the browser console (F12)
2. Check backend terminal logs
3. Verify all environment variables
4. Ensure all dependencies are installed

---

## 🎉 You're All Set!

Your portfolio is now fully functional with:
- ✅ Beautiful gradient design
- ✅ Admin panel for content management
- ✅ Cloudinary image hosting
- ✅ Contact form with message management
- ✅ Responsive design
- ✅ Dark/Light mode support

Happy coding! 🚀
