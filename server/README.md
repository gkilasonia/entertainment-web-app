# Entertainment Web App - Backend Server

This is the Node.js/Express backend for the Entertainment Web App, providing user authentication with JWT tokens and MongoDB integration.

## Prerequisites

- **Node.js**: v20.x or higher
- **MongoDB**: Local instance running on `localhost:27017` or a MongoDB Atlas connection string
- **npm**: Comes with Node.js

## Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Dependencies are already installed (run this if needed):
   ```bash
   npm install
   ```

## Configuration

### Environment Variables

The `.env` file in the `server` directory contains configuration for:

```env
MONGO_URI=mongodb://localhost:27017/entertainment-app
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Important**: Before deploying to production:

- Change `JWT_SECRET` to a strong, random value
- Update `MONGO_URI` if using MongoDB Atlas
- Set `NODE_ENV=production`

## Running the Server

### Development (with auto-reload)

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Production

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## Database Setup

### Local MongoDB

1. **Install MongoDB** (if not already installed):
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**:
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: Run `brew services start mongodb-community`
   - **Linux**: Run `sudo systemctl start mongod`

3. **Verify connection**: The server will log "✓ MongoDB connected successfully" on startup

### MongoDB Atlas (Cloud)

1. Create a cluster at [atlas.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/entertainment-app`)
3. Update `MONGO_URI` in `.env` with your connection string
4. Make sure your IP is whitelisted in Atlas Network Access

## API Endpoints

### Base URL

```
http://localhost:5000/api/auth
```

### POST `/register`

Register a new user

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "passwordConfirm": "securePassword123"
}
```

**Success Response (201)**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com"
  }
}
```

**Error Response (400)**:

```json
{
  "success": false,
  "message": "Email already in use"
}
```

### POST `/login`

Login an existing user

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200)**:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com"
  }
}
```

**Error Response (401)**:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Frontend Integration

The React frontend is configured to communicate with this backend at `http://localhost:5000`.

### Key Integration Points

1. **Authentication Utility** (`src/utils/auth.js`):
   - `loginUser(email, password)` - Login endpoint
   - `registerUser(email, password, passwordConfirm)` - Register endpoint
   - `saveAuthData(authData)` - Store token in localStorage
   - `getAuthData()` - Retrieve auth data
   - `clearAuthData()` - Logout (clear storage)
   - `isAuthenticated()` - Check if user is logged in
   - `getToken()` - Get JWT token

2. **LoginSignup Component** (`src/pages/LoginSignup/LoginSignup.jsx`):
   - Form handles both login and sign-up
   - Saves JWT to localStorage on success
   - Redirects to home on successful auth

3. **Navbar Component** (`src/pages/Navbar/Navbar.jsx`):
   - Shows avatar with logout option when authenticated
   - Links to login when not authenticated

## Troubleshooting

### Server won't start / Port 5000 already in use

```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Kill the process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # macOS/Linux
```

### MongoDB connection failed

1. Verify MongoDB is running
2. Check `MONGO_URI` in `.env` is correct
3. Ensure you're using the right credentials for MongoDB Atlas
4. Check network connectivity and IP whitelisting

### CORS errors

The backend allows requests from `http://localhost:5173` (Vite frontend). If running on a different port, update the CORS configuration in `server.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:YOUR_PORT",
    credentials: true,
  }),
);
```

### JWT token errors

Tokens expire after 30 days. Users will need to login again. For development, you can modify the expiration time in `controllers/authController.js`:

```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Change this value
  });
};
```

## Project Structure

```
server/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env                   # Environment variables
├── controllers/
│   └── authController.js  # Auth logic (register, login)
├── models/
│   └── User.js           # MongoDB User schema
└── routes/
    └── authRoutes.js     # API route definitions
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **nodemon** (dev): Auto-reload on file changes

## Notes

- Passwords are hashed using bcryptjs with 10 salt rounds
- JWT tokens are valid for 30 days
- User emails are stored in lowercase and must be unique
- Password confirmation is required during registration
- All requests use JSON content type

## License

ISC
