# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying your portfolio to production, complete these steps:

---

## 🔧 Backend Deployment

### 1. **Choose a Hosting Platform**

Popular options:
- **Render** (Free tier available, easy setup)
- **Railway** (Simple deployment)
- **Heroku** (Paid, but reliable)
- **DigitalOcean** (More control)
- **AWS/Azure** (Enterprise level)

### 2. **Prepare Backend for Production**

#### Update `backend/.env` for Production:
```env
# MongoDB - Use MongoDB Atlas for production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Secret - Use a strong random string
JWT_SECRET=your_super_secure_random_secret_key_here_change_this

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port (will be provided by hosting platform)
PORT=5000

# Node Environment
NODE_ENV=production
```

#### Update CORS in `backend/server.js`:
```javascript
// Replace:
app.use(cors());

// With:
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'http://localhost:5173' // Keep for local testing
  ],
  credentials: true
}));
```

### 3. **Deploy Backend**

#### Example: Deploying to Render

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for production"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Connect your GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`

3. **Add Environment Variables**
   - Go to "Environment" tab
   - Add all variables from your `.env` file
   - Save changes

4. **Deploy**
   - Render will automatically deploy
   - Note your backend URL: `https://your-app.onrender.com`

---

## 🎨 Frontend Deployment

### 1. **Update Frontend `.env` for Production**

```env
# Production Backend API URL
VITE_API_URL=https://your-backend-domain.onrender.com/api

# Example:
# VITE_API_URL=https://portfolio-backend-abc123.onrender.com/api
```

### 2. **Choose a Hosting Platform**

Popular options:
- **Vercel** (Recommended for Vite/React)
- **Netlify** (Great for static sites)
- **Cloudflare Pages** (Fast CDN)
- **GitHub Pages** (Free but requires configuration)

### 3. **Deploy Frontend**

#### Example: Deploying to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Configure:
     - Framework Preset: **Vite**
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` with your backend URL
   - Save

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at: `https://your-site.vercel.app`

---

## 🔐 Security Best Practices

### 1. **Backend Security**

```javascript
// Install security packages
npm install helmet express-rate-limit cors

// Add to server.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Use helmet for security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Strict CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 2. **Environment Variables**

✅ **DO:**
- Use strong random secrets for JWT_SECRET
- Never commit `.env` files to git
- Use environment variable management from hosting platforms
- Rotate secrets periodically

❌ **DON'T:**
- Hardcode sensitive data in code
- Use default passwords
- Expose API keys in frontend code
- Commit production credentials

### 3. **Change Default Admin Credentials**

After first production deployment:
```bash
# Create new admin with secure credentials
# Delete the default admin@portfolio.com account
```

---

## 📱 Domain Configuration

### 1. **Custom Domain Setup**

#### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain: `www.yourportfolio.com`
3. Follow DNS configuration instructions
4. Add DNS records to your domain registrar

#### For Render (Backend):
1. Go to Dashboard → Custom Domains
2. Add: `api.yourportfolio.com`
3. Update DNS records:
   ```
   Type: CNAME
   Name: api
   Value: your-app.onrender.com
   ```

### 2. **SSL Certificates**

- Both Vercel and Render provide **free SSL certificates**
- Automatically enabled for custom domains
- Force HTTPS in production

---

## 🗄️ Database Setup (MongoDB Atlas)

### 1. **Create Production Database**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user:
   - Username: `admin`
   - Password: [Strong random password]
4. Whitelist IP addresses:
   - Add your backend hosting IP
   - Or use `0.0.0.0/0` (allow from anywhere)
5. Get connection string:
   ```
   mongodb+srv://admin:password@cluster.mongodb.net/portfolio
   ```

### 2. **Seed Admin User in Production**

```bash
# SSH into your backend server or run via hosting platform console
NODE_ENV=production node utils/seedAdmin.js
```

---

## ☁️ Cloudinary Configuration

Your Cloudinary setup is already production-ready! Just ensure:

1. ✅ Images are being uploaded correctly
2. ✅ Credentials are in backend `.env`
3. ✅ Free tier has sufficient quota

---

## 🧪 Testing Before Going Live

### 1. **Test Backend API**
```bash
# Test health endpoint
curl https://your-backend.onrender.com/api/projects

# Test login
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### 2. **Test Frontend**
- Login to admin panel
- Add a test project with images
- Submit contact form
- Check all pages load correctly
- Test on mobile devices

### 3. **Performance Testing**
- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Check [GTmetrix](https://gtmetrix.com/)
- Test loading speeds

---

## 📊 Monitoring & Maintenance

### 1. **Monitor Backend**
- Check logs regularly on hosting platform
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor database storage usage

### 2. **Monitor Frontend**
- Check Vercel/Netlify analytics
- Use Google Analytics (optional)
- Monitor Core Web Vitals

### 3. **Regular Updates**
```bash
# Update dependencies periodically
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

---

## 🚨 Common Production Issues

### Backend Can't Connect to MongoDB
- ✅ Check MongoDB Atlas IP whitelist
- ✅ Verify connection string in `.env`
- ✅ Ensure database user has correct permissions

### Frontend Can't Reach Backend
- ✅ Verify `VITE_API_URL` is correct
- ✅ Check CORS settings in backend
- ✅ Ensure backend is running

### Images Not Uploading
- ✅ Check Cloudinary credentials
- ✅ Verify file size limits
- ✅ Check Cloudinary quota

### 401 Unauthorized Errors
- ✅ Check JWT_SECRET matches
- ✅ Verify token is being sent in headers
- ✅ Check if admin user exists

---

## 🎉 Launch Checklist

Before announcing your portfolio:

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (HTTPS)
- [ ] Default admin password changed
- [ ] All features tested in production
- [ ] Contact form working
- [ ] Images uploading to Cloudinary
- [ ] Mobile responsive
- [ ] Fast loading times (< 3 seconds)
- [ ] SEO optimized (meta tags, descriptions)
- [ ] Analytics setup (optional)
- [ ] Error monitoring setup (optional)

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Automatic Build & Deploy**
   - Vercel/Render detects changes
   - Automatically builds and deploys
   - Updates live in ~2-3 minutes

### Rollback if Needed
- Vercel: Go to Deployments → Previous deployment → Promote
- Render: Go to Events → Previous deploy → Restore

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary**: https://cloudinary.com/documentation

---

## 🎊 Congratulations!

Your portfolio is now live in production! 🚀

**Next Steps:**
1. Share your portfolio URL
2. Add to LinkedIn/Resume
3. Monitor performance
4. Keep content updated
5. Add new projects regularly

---

**Need Help?** Check the troubleshooting section or reach out to the hosting platform's support team.
