# 🌱 Wellness Garden - Frontend

A beautiful, calming wellness application with an aesthetic neutral color palette and complete user authentication.

## ✨ What's New

### 🎨 Aesthetic Design Updates

- **Calming Color Palette**: Sage green, soft cream, warm taupe, dusty rose
- **Smooth Animations**: Hover effects, transitions, and subtle interactions
- **Modern UI**: Glassmorphism effects, soft shadows, and elegant typography
- **Responsive Design**: Looks beautiful on all screen sizes

### 🔐 Authentication Features

- **User Registration**: Secure account creation with email confirmation
- **User Login**: JWT-based authentication with persistent sessions
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Session Management**: Token-based auth stored in localStorage
- **Auto-logout**: Invalid/expired token handling with user feedback

### 🔧 Technical Improvements

- **Auto-detecting API URL**: Works on localhost and deployed environments
- **Better Error Handling**: Clear error messages for connection issues
- **Fixed hardcoded URLs**: All API calls now use the dynamic `API_URL`
- **Improved UX**: Loading states, smooth transitions, better feedback
- **Security**: JWT tokens, password validation, secure API communication

## 📁 Project Structure

```
wellness-garden-frontend/
├── css/
│   └── style.css         # Beautiful aesthetic styling
├── js/
│   ├── utils.js          # Utility functions + auto-detecting API URL
│   ├── auth.js           # Authentication logic (login/register)
│   ├── garden.js         # Garden management
│   ├── challenges.js     # Challenge system
│   ├── dashboard-enhanced.js # Dashboard with stats
│   └── profile.js        # User profile management
├── index.html            # Landing page (public)
├── login.html            # Login page
├── register.html         # Registration page
├── dashboard.html        # User dashboard (protected)
├── garden.html           # Plant garden view (protected)
├── plants.html           # Plant catalog (protected)
├── challenges.html       # Challenges page (protected)
├── leaderboard.html      # Leaderboard (protected)
└── COLOR_PALETTE.html    # Design system reference
```

## 🚀 Quick Start

### Prerequisites

- A backend server running on port 3000 (see backend setup)
- Modern web browser with JavaScript enabled
- Internet connection (for initial setup)

### Setup

1. **Extract the files** to your web server or local directory

2. **Start your backend server** (it should be running on port 3000)

   ```bash
   cd backend
   npm run dev
   ```

3. **Access the frontend**:

   Since your backend Express server serves the static files from the `public` folder, you can access the frontend in two ways:
   - **Option A** (Recommended - Via Backend Server):
     - Backend running on port 3000 serves the frontend automatically
     - Access at: `http://localhost:3000/index.html`
     - This is what you're currently doing! ✅
   - **Option B** (Separate Frontend Server - Optional):
     - Only needed if you want frontend on a different port
     - Use one of these methods:

       ```bash
       # Python (serves on port 8000)
       cd public
       python -m http.server 8000

       # Node.js http-server
       cd public
       npx http-server -p 8000

       # VS Code Live Server extension (port 5500)
       Right-click index.html → "Open with Live Server"
       ```

4. **Your URLs**:
   - **Backend API**: `http://localhost:3000`
   - **Frontend (via backend)**: `http://localhost:3000/index.html` ← You're using this!
   - **Frontend (separate server)**: `http://localhost:8000` or `http://localhost:5500` (only if using Option B)

5. **Create an account**:
   - Click "Sign Up" from the homepage
   - Fill in username, email, and password
   - Check your email for welcome message (if email service is configured)
   - Login with your credentials

## 🔐 Authentication System

### Registration Flow (`register.html`)

1. User fills in registration form with:
   - Username (must be unique)
   - Email (must be unique)
   - Password (validated for strength)
2. Frontend validates input and sends POST request to `/register`
3. Backend:
   - Checks for duplicate username/email
   - Hashes password with bcrypt
   - Creates user account
   - Sends welcome email
4. User receives confirmation and is redirected to login

**Key Features:**

- Client-side password validation
- Real-time duplicate checking
- Clear error messages
- Email confirmation message
- Automatic redirect to login on success

### Login Flow (`login.html`)

1. User enters username and password
2. Frontend sends POST request to `/login`
3. Backend:
   - Validates credentials
   - Generates JWT token
   - Returns token + user info
4. Frontend:
   - Stores token in localStorage
   - Stores user info (user_id, username, points)
   - Redirects to dashboard

**Key Features:**

- Secure credential transmission
- JWT token storage in localStorage
- Persistent sessions (token doesn't expire until configured time)
- "Remember me" functionality via localStorage
- Clear error messages for invalid credentials

### Protected Routes

The following pages require authentication:

- `dashboard.html` - User statistics and overview
- `garden.html` - Virtual plant garden
- `plants.html` - Plant catalog
- `challenges.html` - Wellness challenges
- `leaderboard.html` - User rankings

**Protection Mechanism:**
Each protected page includes the following in its JavaScript:

```javascript
// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

// Include token in API requests
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
```

### Session Management

**Token Storage:**

- Stored in browser's localStorage
- Persists across browser sessions
- Automatically included in API requests

**Auto-logout Scenarios:**

- Token expired (15min)
- Invalid token (tampered/corrupted)
- Backend returns 401/403 status
- User's kicked out

**Logout Process:**

```javascript
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("points");
  window.location.href = "index.html";
}
```

## 🎨 Color Palette

The Wellness Garden uses a calming, aesthetic neutral color scheme:

```css
Primary Colors:
- Sage Green:      #A8B5A0
- Soft Cream:      #F5F1E8
- Warm Taupe:      #D4C5B9

Accent Colors:
- Dusty Rose:      #D4A5A5
- Soft Eucalyptus: #C9D5C0
- Warm Sand:       #E8DCC8
- Misty Sage:      #B8C5B0

Text Colors:
- Deep Forest:     #4A5D4F (headings)
- Charcoal:        #5A5A5A (body text)
- Light Sage:      #B8C5B0 (muted text)
```

See `COLOR_PALETTE.html` for complete design system reference.

## 🐛 Troubleshooting

### "Failed to load" error

**Problem**: Frontend can't connect to backend

**Solutions**:

1. **Check backend is running**:

   ```bash
   # Should see your backend running
   netstat -an | grep 3000
   # Or on Windows:
   netstat -an | findstr 3000
   ```

2. **Check API URL in browser console**:
   - Open browser DevTools (F12)
   - Look for the API URL being used
   - It should match your backend URL (`http://localhost:3000`)

3. **CORS Issues**: Make sure your backend has CORS enabled:

   ```javascript
   // Backend should have:
   const cors = require("cors");
   app.use(cors());
   ```

4. **Different Port?**: If your backend runs on a different port, update `js/utils.js`:
   ```javascript
   const API_URL = "http://localhost:YOUR_PORT";
   ```

### Page looks broken / No styles

**Problem**: CSS not loading

**Solutions**:

1. Check `css/style.css` exists in the same directory structure
2. Open browser DevTools → Network tab → Look for CSS 404 errors
3. Make sure you're using a web server (not file://) for best results
4. Clear browser cache (Ctrl+Shift+Delete)

### Login/Register not working

**Problem**: Authentication fails

**Solutions**:

1. **Check browser console** for detailed error messages (F12 → Console)
2. **Verify backend** authentication endpoints are working:

   ```bash
   # Test registration
   curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"test123"}'

   # Test login
   curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"test123"}'
   ```

3. **Clear browser localStorage and cookies**:
   - F12 → Application → Storage → Clear All
4. **Try a different browser** or incognito mode
5. **Check password requirements**: Must be at least 6 characters

### "Token expired" or auto-logout issues

**Problem**: User gets logged out unexpectedly

**Solutions**:

1. Check JWT_EXPIRES_IN in backend `.env` file (default: 24h)
2. Verify system time is correct
3. Clear localStorage and login again
4. Check browser console for 401/403 errors

### Email not received after registration

**Problem**: Welcome email not arriving

**Solutions**:

1. Check spam/junk folder
2. Verify backend email service is configured:
   - Check `.env` file has EMAIL_USER and EMAIL_PASS
   - Test email service with `/test-email` endpoint
3. Email service is optional - registration still works without it
4. Check backend console for email errors

## 📱 Features

### Authentication & User Management

- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Protected routes with auto-redirect
- ✅ Session persistence via localStorage
- ✅ Logout functionality
- ✅ Password security (bcrypt hashing)
- ✅ Email confirmation (optional)

### Wellness Features

- ✅ Dashboard with user stats
- ✅ Virtual plant garden
- ✅ Plant catalog with rarity tiers
- ✅ Wellness challenges
- ✅ Point system
- ✅ Plant growth mechanics
- ✅ Leaderboard rankings
- ✅ User profile management

### UI/UX

- ✅ Beautiful responsive design
- ✅ Smooth animations and transitions
- ✅ Loading states for async operations
- ✅ Clear error messages
- ✅ Success notifications
- ✅ Mobile-friendly interface

## 🎯 Usage Guide

### Creating an Account

1. Navigate to the homepage (`index.html`)
2. Click "Sign Up" or "Get Started"
3. Fill in the registration form:
   - **Username**: Choose a unique username (letters, numbers, underscores)
   - **Email**: Valid email address (used for notifications)
   - **Password**: At least 6 characters (recommended: mix of letters, numbers, symbols)
4. Click "Sign Up"
5. Check your email for welcome message (if configured)
6. You'll be redirected to login page

### Logging In

1. Go to login page (`login.html`)
2. Enter your username and password
3. Click "Login"
4. You'll be redirected to your dashboard
5. Your session will persist until you logout or token expires

### Using the Dashboard

- View your total points and wellness stats
- See your active plants and their growth stages
- Quick access to challenges and garden
- Leaderboard position (if applicable)

### Growing Your Garden

1. Complete wellness challenges to earn points
2. Navigate to "Plants" to see available plant types
3. Unlock new plant types based on your points:
   - **Common**: 0+ points
   - **Rare**: 50+ points
   - **Epic**: 100+ points
   - **Legendary**: 200+ points
4. Go to "Garden" and plant seeds
5. Water your plants to help them grow through stages:
   - 🌱 Seed → 🌿 Sprout → 🪴 Growing → 🌸 Bloomed
6. Give your plants custom nicknames!

### Challenge System

- Browse available wellness challenges
- Complete challenges to earn points
- Create your own challenges for the community
- Track your completion progress
- Watch your points accumulate

### Logging Out

- Click the "Logout" button in the navigation
- You'll be redirected to the homepage
- All session data will be cleared
- You can login again anytime with your credentials

## 🔐 Environment Variables

The frontend automatically detects the environment:

- `localhost` or `127.0.0.1` → uses `http://localhost:3000`
- Other domains → uses current protocol and hostname with port 3000

To customize, edit `js/utils.js`:

```javascript
const API_URL = "YOUR_CUSTOM_API_URL";
```

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Requirements:**

- JavaScript enabled
- Cookies/localStorage enabled
- Modern ES6+ support

## 💡 Tips for Best Experience

1. **Use a modern browser** for the best visual effects and security features
2. **Allow cookies and localStorage** for authentication persistence
3. **Enable JavaScript** (required for all functionality)
4. **Check console** (F12) if something doesn't work - error messages are helpful
5. **Use strong passwords** - recommended: 8+ characters with mix of types
6. **Keep your token secure** - don't share your login credentials
7. **Regular backups** - authentication tokens are stored locally
8. **Use HTTPS in production** - for secure token transmission

## 📝 Implementation Notes

### Security Considerations

- Passwords are never stored in localStorage (only the JWT token)
- Tokens are validated on every protected API request
- Invalid/expired tokens automatically trigger logout
- CORS is required for frontend-backend communication
- All sensitive data is transmitted over HTTP (use HTTPS in production)

### Data Storage

- Authentication tokens stored in localStorage
- User info (user_id, username, points) cached in localStorage
- All dates formatted in US format
- Plant emojis rendered using Unicode

### Performance

- Animations use CSS transitions for smoothness
- API calls are asynchronous to prevent blocking
- Loading states provide user feedback
- Minimal DOM manipulation for better performance

---

**Built with ❤️ for wellness and mindfulness**

**Author:** Thoon Wai Si  
**Student ID:** p2532633  
**Course:** ST0503 Backend Web Development (2025/2026 S2)
