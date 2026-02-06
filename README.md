# Gamified Wellness Challenge System 🌿

A full-stack Node.js wellness application that encourages healthy habits through challenges and rewards, featuring a beautiful Digital Garden visualization system with complete user authentication.

## 🎮 Gamification Theme: Digital Garden

The Digital Garden transforms wellness into a visual journey where users grow virtual plants by completing challenges. Each challenge automatically nurtures plants, progressing them from seed to bloom through distinct growth stages. Accumulated points unlock plant species (common to legendary), encouraging sustained engagement while creating emotional attachment and tangible progress visualization in a low-pressure, rewarding environment.

**Key Features:**

- **Plant Growth System** → Plants evolve through 4 stages (seed → sprout → growing → bloomed) as users complete challenges
- **Rarity Tiers** → Unlock progressively rarer plants (Common, Rare, Epic, Legendary) based on accumulated points
- **Plant Personalization** → Users can nickname their plants, creating emotional connection and ownership
- **Health Monitoring** → Plants maintain health levels that reflect user engagement consistency
- **Visual Progress Tracking** → Clear growth stages provide immediate feedback and motivation
- **Beautiful UI** → Calming aesthetic with sage green, soft cream, and warm taupe color palette

---

## 📁 Project Structure

```
BED-CA2-OPHELIA2007/
├── src/                          # Backend source code
│   ├── configs/
│   │   ├── createSchema.js       # Database schema creation
│   │   └── initTables.js         # Table initialization
│   ├── controllers/
│   │   ├── authController.js     # Authentication (login/register)
│   │   ├── challengesController.js
│   │   ├── completionController.js
│   │   ├── usersController.js
│   │   ├── gardenController.js
│   │   └── plantController.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT token verification
│   │   ├── challengesMiddleware.js
│   │   ├── completionMiddleware.js
│   │   ├── userMiddleware.js
│   │   └── gardenMiddleware.js
│   ├── models/
│   │   ├── challengesModel.js
│   │   ├── completionModel.js
│   │   ├── usersModel.js
│   │   ├── gardenModel.js
│   │   └── plantModel.js
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── challengesRoutes.js
│   │   ├── completionRoutes.js
│   │   ├── gardenRoutes.js
│   │   ├── plantRoutes.js
│   │   ├── usersRoutes.js
│   │   └── mainRoutes.js         # Route aggregator
│   └── services/
│       ├── db.js                 # Database connection
│       └── emailService.js       # Email notifications
├── public/                       # Frontend files (served by Express)
│   ├── css/
│   │   └── style.css             # Beautiful aesthetic styling
│   ├── js/
│   │   ├── utils.js              # Utility functions + API URL
│   │   ├── auth.js               # Authentication logic
│   │   ├── challenges.js         # Challenge management with view completions
│   │   ├── garden.js             # Garden management
│   │   ├── dashboard-enhanced.js # Dashboard with stats
│   │   └── profile.js            # User profile
│   ├── images/
│   │   └── background.jpg        # Background image
│   │   └── background2.gif        # Background image for the login page and register page
│   ├── index.html                # Landing page
│   ├── login.html                # Login page
│   ├── register.html             # Registration page
│   ├── dashboard.html            # User dashboard (protected)
│   ├── garden.html               # Plant garden view (protected)
│   ├── plants.html               # Plant catalog (protected)
│   ├── challenges.html           # Challenges page (protected)
│   ├── leaderboard.html          # Leaderboard (protected)
│   └── COLOR_PALETTE.html        # Design system reference
├── app.js                        # Express app configuration
├── index.js                      # Server entry point
├── .env                          # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

**Technical Constraints:** Backend uses callbacks for all async operations (no Promises/async-await) as per assignment requirements.

---

## 📦 Dependencies

### Backend Dependencies

- **express** ^5.x - Web framework
- **mysql2** ^3.x - Database driver
- **dotenv** - Environment configuration
- **bcrypt** ^6.x - Password hashing for secure authentication
- **jsonwebtoken** ^9.x - JWT token generation and verification
- **nodemailer** ^7.x - Email service for welcome messages
- **cors** ^2.x - Cross-Origin Resource Sharing

### Development Dependencies

- **nodemon** - Auto-restart during development
- **live-server** - Frontend development server (optional)

---

## 🚀 Setup Instructions

### 1. Clone Repository

1. Open VS Code
2. Click View and open Command Palette
3. Type `Git: Clone` and select it
4. Paste the repository URL: `https://github.com/ST0503-BED/bed-ca2-Ophelia2007`
5. Select your desired folder location
6. Click "Open" when prompted

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=wellness
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRES_IN=15m
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Email Setup (Optional but recommended):**

- Use a Gmail account or configure your SMTP provider
- Generate an App Password (for Gmail: Google Account → Security → 2-Step Verification → App Passwords)
- Replace `EMAIL_USER` and `EMAIL_PASS` with your credentials

### 4. Initialize Database

```bash
npm run init_tables
```

This creates all required tables including gamification tables.

### 5. Start the Application

```bash
npm run dev      # Development (with nodemon auto-reload)
# OR
npm start        # Production
```

The server will start on `http://localhost:3000`

### 6. Access the Application

**Recommended Method** (All-in-one):

- Backend serves the frontend automatically from the `public` folder
- Simply open: **`http://localhost:3000`**
- All API calls and frontend assets work seamlessly! ✅

### 7. Create Your Account

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" or "Get Started"
3. Fill in username, email, and password
4. Check your email for welcome message (if configured)
5. Login and start your wellness journey!

---

## 🔧 IMPORTANT: Bug Fixes & Updates

### Critical Updates Required After Cloning

The repository includes fixes for the "View Completions" feature that were implemented after initial development. Make sure these files are properly in place:

#### 1. Frontend Update: `public/js/challenges.js`

**What it fixes:**

- Enables the "View Completions" button functionality
- Shows actual usernames instead of "User 2, User 3"
- Displays beautiful completion modal with user avatars, timestamps, and notes
- Handles empty completion lists gracefully

**Features added:**

- `viewCompletions()` - Fetches and displays challenge completions
- `showCompletionsModal()` - Beautiful modal with user info and timestamps
- `closeCompletionsModal()` - Modal close functionality
- `formatDate()` - Formats dates nicely (e.g., "Feb 5, 2026, 07:38 PM")

#### 2. Backend Update: `src/models/completionModel.js`

**What it fixes:**

- Table name case sensitivity issues (`UserCompletion` vs `usercompletion`)
- Missing username in API responses (adds JOIN with User table)
- Column name mismatch (`completed_at` vs `completion_date`)

**Critical changes:**

```javascript
// BEFORE (incorrect - caused errors)
FROM usercompletion uc
LEFT JOIN user u ON uc.user_id = u.user_id

// AFTER (correct - matches schema)
FROM UserCompletion uc
LEFT JOIN User u ON uc.user_id = u.user_id
```

**What was added:**

- JOIN with User table to get `username` field
- Uses `completed_at` (correct column name from schema)
- Returns `completion_date` alias for frontend compatibility
- Orders by newest completions first

### Verification Steps

After setup, verify the fixes are working:

1. **Restart server** (critical!):

   ```bash
   npm start
   ```

2. **Clear browser cache**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

3. **Test completions feature**:
   - Login to your account
   - Create a challenge
   - Complete the challenge
   - Click "View Completions" button
   - You should see a modal with your username and timestamp! 🎉

### Database Schema Notes

Your database uses **PascalCase** table names:

- `User` (not `user`)
- `UserCompletion` (not `usercompletion`)
- `WellnessChallenge` (not `wellnesschallenge`)

Column in UserCompletion:

- `completed_at` (not `completion_date`)

All SQL queries must match these exact names (case-sensitive on Linux/Mac).

---

## 📡 API Endpoints

### Authentication (3 endpoints)

#### `POST /auth/register` - Register new user account

- **Required fields:** `username`, `email`, `password`
- **Process:**
  - Validates username uniqueness (returns 409 if exists)
  - Validates email uniqueness (returns 409 if exists)
  - Hashes password using bcrypt (10 salt rounds)
  - Creates user account with initial 0 points
  - Sends welcome email (non-blocking)
- **Response:** Returns `user_id`, `username`, and `email` with confirmation message
- **Middleware:** `checkDuplicate` - validates no duplicate username/email
- **Example Request:**
  ```json
  {
    "username": "jane_doe",
    "email": "jane@example.com",
    "password": "SecurePass123!"
  }
  ```

#### `POST /auth/login` - Authenticate user and get access token

- **Required fields:** `username`, `password`
- **Process:**
  - Validates username exists (returns 404 if not found)
  - Compares password with bcrypt hash (returns 401 if invalid)
  - Generates JWT token with user_id and username
  - Token expires based on JWT_EXPIRES_IN env variable (default: 15m)
- **Response:** Returns JWT `token` and user object
- **Token Usage:** Include in subsequent requests as `Authorization: Bearer <token>`
- **Example Request:**
  ```json
  {
    "username": "jane_doe",
    "password": "SecurePass123!"
  }
  ```
- **Example Response:**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": 1,
      "username": "jane_doe",
      "points": 150
    }
  }
  ```

### Users (4 endpoints)

- `POST /users` - Create new user (validates unique username)
- `GET /users` - Retrieve all users
- `GET /users/:user_id` - Get specific user details
- `PUT /users/:user_id` - Update user info (validates unique username, prevents duplicate)

### Wellness Challenges (4 endpoints)

- `POST /challenges` - Create new challenge
  - **Requires:** `description`, `user_id`, `points`
  - **Auth:** Required (JWT token)
- `GET /challenges` - List all challenges (public)
- `PUT /challenges/:challenge_id` - Update challenge
  - **Auth:** Required (must be creator)
  - **Validates:** Challenge ownership before allowing update
- `DELETE /challenges/:challenge_id` - Delete challenge
  - **Auth:** Required (must be creator)
  - **Cascades:** Deletes all related completions

### Challenge Completions (2 endpoints)

#### `POST /challenges/:challenge_id` - Mark challenge complete

- **Required fields:** `user_id`, `details` (optional)
- **Auth:** Required (JWT token)
- **Process:**
  - Validates user and challenge exist
  - Records completion with timestamp
  - Awards challenge points to user
  - Sends completion email notification (if configured)
- **Response:** Returns completion record with points earned
- **Example Request:**
  ```json
  {
    "user_id": 1,
    "details": "I completed the challenge by going for a 30-minute walk!"
  }
  ```

#### `GET /challenges/:challenge_id` - View all completions for a challenge

- **Auth:** Required (JWT token)
- **Returns:** Array of completions with user details
- **Response Format:**
  ```json
  [
    {
      "user_id": 2,
      "username": "john_doe",
      "details": "Challenge completed!",
      "completion_date": "2026-02-05T19:38:00.000Z"
    },
    {
      "user_id": 3,
      "username": "jane_smith",
      "details": "Great challenge!",
      "completion_date": "2026-02-05T18:15:00.000Z"
    }
  ]
  ```
- **Frontend Display:**
  - Shows user avatars (first letter of username)
  - Displays usernames and completion dates
  - Shows optional user notes/details
  - "No Completions Yet" if empty
  - Sorted by newest first

### Gamification Endpoints

#### Plant Catalog Management

- `GET /plants` - Retrieve all available plant types
  - Returns: Plant species with rarity tiers and unlock requirements
- `GET /plants/unlocked/:user_id` - View plants unlocked for specific user
  - Based on accumulated points

#### Garden Management

- `GET /garden/:user_id` - View user's complete garden
  - Returns: All planted plants with growth status
- `POST /garden/plant` - Plant a new seed
  - **Validates:** User has sufficient points to unlock plant
- `PUT /garden/:garden_id/water` - Water a plant
  - **Effect:** Increases growth stage (seed → sprout → growing → bloomed)
- `DELETE /garden/:garden_id` - Remove plant from garden

---

## 🗄️ Database Design

### Core Tables

**User**

- Stores user profiles, points, email, and hashed passwords
- Fields: `user_id`, `username`, `email`, `password`, `points`, `created_at`

**WellnessChallenge**

- Challenge definitions created by users
- Fields: `challenge_id`, `creator_id`, `description`, `points`

**UserCompletion**

- Tracks completed challenges with timestamps
- Fields: `completion_id`, `challenge_id`, `user_id`, `details`, `completed_at`

### Gamification Tables

**plant_types**

- Catalog of all available plant species
- Fields: `plant_type_id`, `plant_name`, `rarity`, `unlock_points`, `growth_time_hours`, `image_url`, `description`
- Rarity levels: common, rare, epic, legendary

**user_garden**

- Individual planted plants with growth tracking
- Fields: `garden_id`, `user_id`, `plant_type_id`, `plant_nickname`, `health`, `growth_stage`, `completion_count`, `planted_at`, `last_watered`
- Growth stages: seed, sprout, growing, bloomed

### Important Schema Notes

- **Table names use PascalCase**: `User`, `UserCompletion`, `WellnessChallenge`
- **Timestamp column**: `completed_at` (not `completion_date`)
- **Foreign keys**: Properly indexed with CASCADE delete behavior
- **Case-sensitivity**: Critical on Linux/Mac servers

**ERD:** See the erd diagram image for complete database schema in the report document.

---

## 🔐 Authentication & Security

### Registration Flow

1. User submits username, email, and password
2. System checks for duplicates (returns 409 if exists)
3. Password is hashed with bcrypt (10 salt rounds)
4. User record created in database
5. Welcome email sent asynchronously (non-blocking)
6. User receives confirmation with user_id
7. Redirected to login page

### Login Flow

1. User enters username and password
2. System retrieves user by username
3. Password compared with stored bcrypt hash
4. JWT token generated with expiration (default: 15m)
5. Token and user info returned to client
6. Frontend stores token in localStorage
7. User redirected to dashboard

### Protected Routes

Pages requiring authentication:

- `dashboard.html` - User statistics and overview
- `garden.html` - Virtual plant garden
- `plants.html` - Plant catalog
- `challenges.html` - Wellness challenges
- `leaderboard.html` - User rankings

**Protection mechanism:**

```javascript
// Check authentication
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
- Expires after configured time (JWT_EXPIRES_IN)

**Auto-logout Scenarios:**

- Token expired (default: 15 minutes)
- Invalid token (tampered/corrupted)
- Backend returns 401/403 status
- User clicks logout button

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

### Security Best Practices

- **Password Security:** Bcrypt hashing with 10 salt rounds
- **SQL Injection Prevention:** Parameterized queries using `?` placeholders
- **JWT Security:** Tokens expire after configured time
- **Input Validation:** Required fields checked in controllers
- **Data Integrity:** Unique username/email constraints, foreign key relationships
- **Authorization Checks:** Challenge creators verified before modifications
- **Point Validation:** Unlock requirements enforced for rare plants
- **Email Privacy:** Sensitive credentials stored in environment variables
- **CORS Configuration:** Enabled for frontend-backend communication
- **Token Security:** Never store passwords in localStorage (only JWT tokens)

---

## 🎨 Design System

### Color Palette

The Wellness Garden uses a calming, aesthetic neutral color scheme:

```css
Primary Colors:
- Sage Green:      #A8B5A0  /* Main brand color */
- Soft Cream:      #F5F1E8  /* Backgrounds */
- Warm Taupe:      #D4C5B9  /* Secondary elements */

Accent Colors:
- Dusty Rose:      #D4A5A5  /* Alerts, highlights */
- Soft Eucalyptus: #C9D5C0  /* Success states */
- Warm Sand:       #E8DCC8  /* Hover states */
- Misty Sage:      #B8C5B0  /* Borders */

Text Colors:
- Deep Forest:     #4A5D4F  /* Headings */
- Charcoal:        #5A5A5A  /* Body text */
- Light Sage:      #B8C5B0  /* Muted text */
```

See `public/COLOR_PALETTE.html` for complete design system reference.

### UI Features

- **Smooth Animations:** Hover effects, transitions, and subtle interactions
- **Modern UI:** Glassmorphism effects, soft shadows, and elegant typography
- **Responsive Design:** Looks beautiful on all screen sizes
- **Loading States:** Visual feedback for async operations
- **Toast Notifications:** Success/error messages with icons
- **Modal Windows:** Beautiful modals for completions and confirmations

---

## 🛡️ Error Handling

### HTTP Status Codes

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid credentials or missing token
- `403 Forbidden` - Authorization failure (e.g., wrong creator, expired token)
- `404 Not Found` - Resource doesn't exist (user, challenge, completions, etc.)
- `409 Conflict` - Duplicate username or email
- `500 Internal Server Error` - Database/server errors

### Frontend Error Handling

- Clear error messages displayed to users
- Console logging for debugging
- Automatic retry suggestions
- Connection status indicators
- Graceful fallbacks for missing data

---

## ✅ Testing

All endpoints tested via Postman with screenshots included in Individual Report document.

Each test includes:

- Request URL & HTTP method
- Request headers (including Authorization for protected routes)
- Request body (if applicable)
- Response body
- Status code verification

### Manual Testing Checklist

**Authentication:**

- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Access protected route without token (should redirect)
- [ ] Logout (should clear session)

**Challenges:**

- [ ] Create challenge
- [ ] View all challenges
- [ ] Edit own challenge
- [ ] Delete own challenge
- [ ] Try to edit someone else's challenge (should fail)

**Completions:**

- [ ] Complete a challenge
- [ ] View completions (should show username and timestamp)
- [ ] Verify points were awarded
- [ ] Check email notification (if configured)

**Garden:**

- [ ] Plant a seed
- [ ] Water a plant (should grow)
- [ ] View garden
- [ ] Try to plant locked plant (should fail)

---

## 🔍 Troubleshooting

### Token Expired / Auto-logout Issues

**Problem:** User gets logged out unexpectedly

**Solutions:**

1. Check `JWT_EXPIRES_IN` in `.env` file (default: 15m)
2. Extend token expiration if needed:
   ```env
   JWT_EXPIRES_IN=24h  # Lasts 24 hours
   ```
3. Verify system time is correct
4. Clear localStorage and login again
5. Check browser console for 401/403 errors

### Email Not Received

**Problem:** Welcome email not arriving

**Solutions:**

1. Check spam/junk folder
2. Verify `.env` has correct email credentials:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password  # Not your regular password!
   ```
3. Test email service:
   - Check backend console for email errors
   - Registration still works without email (it's optional)
4. For Gmail: Ensure "Less secure app access" or App Password is set up

---

## 📋 Middleware

- **bodyParser** - JSON request parsing
- **cors** - Cross-Origin Resource Sharing
- **authenticateToken** - Verifies JWT token for protected routes
- **validateUser** - Checks user existence before garden operations
- **validateChallenge** - Validates challenge ownership for updates/deletes
- **checkUserCompletion** - Verifies user and challenge exist before completion
- **checkPlantUnlock** - Validates user has sufficient points to plant specific seeds
- **checkDuplicate** - Validates unique username/email during registration

---

### Current Limitations

- Plant health doesn't automatically decrease over time
- Maximum garden size not enforced (unlimited planting allowed)
- No plant trading/gifting system between users
- Single currency system (points only) - no separate shop economy
- No password strength meter during registration
- No email verification (accounts active immediately)
- Token expiration requires re-login (no refresh tokens)

---

## 📝 Code Quality

- **Modular design** with separation of concerns (MVC pattern)
- **Consistent callback** error-first pattern throughout backend
- **Descriptive naming** for variables and functions
- **Inline comments** for complex logic
- **Middleware chaining** for clean request flow
- **DRY principles** applied across controllers and models
- **Secure password handling** (never stored in plain text)
- **Environment-based configuration** for flexibility
- **Frontend-backend separation** for maintainability
- **Responsive design** with mobile-first approach
- **Accessibility** considerations in UI

---

## 💡 Usage Guide

### Getting Started

1. **Create an Account:**
   - Navigate to `http://localhost:3000`
   - Click "Sign Up" or "Get Started"
   - Fill in username (unique), email, and password (6+ characters)
   - Submit and check email for welcome message

2. **Login:**
   - Enter your username and password
   - You'll be redirected to your dashboard
   - Session persists until logout or token expiration

3. **Explore Dashboard:**
   - View your total points and wellness stats
   - See active plants and growth stages
   - Quick access to challenges and garden
   - Check leaderboard position

### Using Features

**Complete Challenges:**

1. Browse available challenges
2. Click "Complete" on a challenge
3. Add optional notes about your experience
4. Receive instant points reward
5. See completion confirmation

**View Completions:**

1. Click "👥 View Completions" on any challenge
2. See who completed it with usernames and timestamps
3. Read others' completion notes for inspiration
4. Modal shows user avatars and dates

**Grow Your Garden:**

1. Complete challenges to earn points
2. Navigate to "Plants" to see available types
3. Unlock plants based on points:
   - Common: 0+ points
   - Rare: 500+ points
   - Epic: 1500+ points
   - Legendary: 3000+ points
4. Go to "Garden" and plant seeds
5. Water plants to progress: 🌱→🌿→🪴→🌸
6. Give plants custom nicknames

**Create Challenges:**

1. Go to Challenges page
2. Click "Create Challenge"
3. Enter description and points value
4. Submit to share with community

**Manage Profile:**

1. View your stats and achievements
2. Update account information
3. Track your progress over time

### Best Practices

- **Complete challenges regularly** to keep plants healthy
- **Create meaningful challenges** for the community
- **Share completion experiences** to inspire others
- **Water plants** to see them grow
- **Check leaderboard** for motivation
- **Use strong passwords** for account security
- **Keep browser updated** for best experience

---

## 🎯 Quick Reference

### Start Development

```bash
# Install dependencies
npm install

# Initialize database
npm run init_tables

# Start backend (serves frontend too)
npm run dev

# Optional: Start separate frontend server
npm run frontend
```

### Access URLs

- **API Base:** `http://localhost:3000`

### Testing API

- Base URL: `http://localhost:3000`
- Protected routes require: `Authorization: Bearer <token>`
- Use Postman for API testing
- Check browser console (F12) for frontend errors

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Edge 90+

**Requirements:**

- JavaScript enabled
- Cookies/localStorage enabled
- Modern ES6+ support
- Stable internet connection

---

## 📄 License & Attribution

Academic project for **ST0503 Backend Web Development (2025/2026 S2)**

**Author:** Thoon Wai Si  
**Student ID:** p2532633  
**Submission Date:** 6 February 2026  
**Institution:** Singapore Polytechnic

---

**Built with ❤️ for wellness and mindfulness**

_May your digital garden flourish as you nurture your wellbeing!_ 🌿✨
