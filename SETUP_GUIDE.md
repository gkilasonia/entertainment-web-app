# Full-Stack Setup Guide: Entertainment Web App

This guide walks you through setting up and running both the frontend (React/Vite) and backend (Node.js/Express) of the Entertainment Web App.

## Quick Start (TL;DR)

```bash
# Terminal 1: Start MongoDB (Windows)
# MongoDB should run automatically as a service

# Terminal 2: Start the backend
cd server
npm run dev

# Terminal 3: Start the frontend
npm run dev
```

Then visit: `http://localhost:5173`

## Detailed Setup

### Step 1: Ensure MongoDB is Running

#### Windows

1. MongoDB should be installed and running as a service automatically
2. Verify by checking Services app or running:
   ```bash
   netstat -ano | findstr :27017
   ```
3. If not running, start it:
   - Go to Services (services.msc) and look for "MongoDB Server"
   - Or manually start from MongoDB installation directory

#### macOS

```bash
brew services start mongodb-community
```

#### Linux

```bash
sudo systemctl start mongod
```

#### Verify Connection

When you start the backend, you should see:

```
✓ MongoDB connected successfully
```

### Step 2: Start the Backend Server

```bash
cd server
npm run dev
```

Expected output:

```
🚀 Server running on http://localhost:5000
📱 Frontend runs on http://localhost:5173
```

**Note**: Keep this terminal open

### Step 3: Start the Frontend (in a new terminal)

```bash
npm run dev
```

Expected output:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open your browser to `http://localhost:5173/`

## Using the Application

### First Time Setup

1. **Sign Up**:
   - Click the avatar button in the top right → "Sign up" (or toggle on login form)
   - Enter email and password
   - Click "Sign up"

2. **Login**:
   - Navigate to `/login` or click avatar (if logged out)
   - Enter your credentials
   - Click "Login"

3. **Logout**:
   - Click the avatar in the top right
   - Click "Logout" in the dropdown menu

### Features

- ✅ User authentication with email/password
- ✅ JWT token-based sessions
- ✅ Password hashing with bcryptjs
- ✅ Bookmarks (managed client-side with localStorage)
- ✅ Search functionality
- ✅ Responsive design

## Architecture Overview

```
entertainment-web-app/
├── src/                           # Frontend (React/Vite)
│   ├── pages/
│   │   ├── LoginSignup/          # Auth forms (login + signup)
│   │   ├── Navbar/               # Navigation with logout
│   │   ├── Home/
│   │   ├── Movies/
│   │   ├── TvSeries/
│   │   └── Bookmarked/
│   ├── utils/
│   │   ├── auth.js               # API calls to backend
│   │   └── media.js
│   ├── components/
│   ├── context/
│   ├── App.jsx                   # Main component & routing
│   └── main.jsx                  # Entry point
│
├── server/                        # Backend (Node.js/Express)
│   ├── server.js                 # Express app & MongoDB setup
│   ├── controllers/
│   │   └── authController.js     # Register/Login logic
│   ├── models/
│   │   └── User.js               # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js         # POST /register, /login
│   ├── .env                      # Config (MONGO_URI, JWT_SECRET, PORT)
│   └── package.json
│
├── .gitignore                    # Updated to exclude /server/.env and /server/node_modules
└── package.json                  # Frontend dependencies
```

## Communication Flow

```
React Frontend (5173)
        ↓
    fetch() calls to http://localhost:5000
        ↓
Express Backend (5000)
        ↓
    Mongoose → MongoDB (27017)
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create new user
  - Body: `{ email, password, passwordConfirm }`
  - Returns: `{ success, token, user }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ success, token, user }`

- Health Check: `GET /api/health` - Returns server status

## Environment Variables

### Backend (server/.env)

```env
MONGO_URI=mongodb://localhost:27017/entertainment-app
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Frontend

No special env vars needed for local dev. CORS is configured to allow `http://localhost:5173`.

## Common Issues & Solutions

### Issue: "Cannot GET /api/health"

**Solution**: Ensure backend is running (`npm run dev` in server directory)

### Issue: "MongoDB connection error"

**Solution**:

1. Verify MongoDB is running (see Step 1)
2. Check `MONGO_URI` in `server/.env`
3. For MongoDB Atlas, ensure IP is whitelisted

### Issue: "CORS error" when calling backend

**Solution**: Backend CORS is configured for `http://localhost:5173`. If using different port, update `server/server.js`

### Issue: "Email already in use"

**Solution**: This error is normal if you've registered that email. Either login or use a different email.

### Issue: Port 5000 is already in use

**Solution**:

```bash
# Find process
netstat -ano | findstr :5000

# Kill it
taskkill /PID <PID> /F

# Or change PORT in server/.env
```

### Issue: Port 5173 is already in use

**Solution**:

```bash
# Kill the process or change Vite port in vite.config.js
```

## Development Tips

### Debugging Backend

Enable detailed logging in `server/server.js` to see incoming requests:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Checking Database

Use MongoDB Compass to visually browse the database:

1. Download MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Browse `entertainment-app` → `users` collection

### Clearing User Data

To start fresh, delete the `entertainment-app` database in MongoDB Compass or from MongoDB shell:

```javascript
use entertainment-app
db.users.deleteMany({})
```

### API Testing

Use REST Client (VS Code extension) or Postman to test endpoints:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

## What's Next?

### Optional Enhancements

1. **Protected Routes**: Redirect unauthenticated users to login
2. **User Profile**: Create endpoint to fetch user profile
3. **Email Verification**: Send confirmation emails
4. **Password Reset**: Implement password recovery
5. **Refresh Tokens**: Implement token refresh for better security
6. **Database Backups**: Set up MongoDB Atlas automated backups

### Production Deployment

1. Deploy backend to Heroku, Render, or Railway
2. Deploy frontend to Vercel, Netlify, or GitHub Pages
3. Update API URLs in frontend to point to production backend
4. Use strong JWT_SECRET and database credentials
5. Enable HTTPS

## File Edits Made

### Created Files:

- `server/` - Complete backend directory
- `server/server.js` - Express app
- `server/models/User.js` - User schema
- `server/controllers/authController.js` - Auth logic
- `server/routes/authRoutes.js` - Routes
- `server/package.json` - Dependencies
- `server/.env` - Configuration
- `server/README.md` - Backend docs
- `src/utils/auth.js` - Frontend auth utilities

### Modified Files:

- `src/pages/LoginSignup/LoginSignup.jsx` - Added auth form with login/signup toggle
- `src/pages/Navbar/Navbar.jsx` - Added logout functionality
- `.gitignore` - Added `/server/.env` and `/server/node_modules`

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review `server/README.md` for backend-specific docs
3. Check browser console for frontend errors
4. Check terminal output for backend errors

Happy coding! 🚀
