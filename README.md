# Gamified Wellness Challenge System 🌿

A Node.js backend API for a gamified wellness platform that encourages healthy habits through challenges and rewards.

## 🎮 Gamification Theme: Digital Garden

The Digital Garden transforms wellness into a visual journey where users grow virtual plants by completing challenges. Each challenge automatically nurtures plants, progressing them from seed to bloom through distinct growth stages. Accumulated points unlock plant species (common to legendary), encouraging sustained engagement while creating emotional attachment and tangible progress visualization in a low-pressure, rewarding environment.

**Additional Features:**

- Plant Growth System → Plants evolve through 4 stages (seed → sprout → growing → bloomed) as users complete challenges
- Rarity Tiers → Unlock progressively rarer plants (Common, Rare, Epic, Legendary) based on accumulated points
- Plant Personalization → Users can nickname their plants, creating emotional connection and ownership
- Health Monitoring → Plants maintain health levels that reflect user engagement consistency
- Visual Progress Tracking → Clear growth stages provide immediate feedback and motivation

## 🏗️ Architecture

**MVC Pattern with Callback-Based Design**

BED-CA2-OPHELIA2007/
├── src/
│ ├── configs/
│ │ ├── createSchema.js # Database schema creation
│ │ └── initTables.js # Table initialization
│ ├── controllers/
│ │ ├── authController.js # Authentication (login/register)
│ │ ├── challengesController.js
│ │ ├── completionController.js
│ │ ├── usersController.js
│ │ ├── gardenController.js
│ │ └── plantController.js
│ ├── middleware/
│ │ ├── authMiddleware.js # JWT token verification
│ │ ├── challengesMiddleware.js
│ │ ├── completionMiddleware.js
│ │ ├── userMiddleware.js
│ │ └── gardenMiddleware.js
│ ├── models/
│ │ ├── challengesModel.js
│ │ ├── completionModel.js
│ │ ├── usersModel.js
│ │ ├── gardenModel.js
│ │ └── plantModel.js
│ ├── routes/
│ │ ├── authRoutes.js # Authentication routes
│ │ ├── challengesRoutes.js
│ │ ├── completionRoutes.js
│ │ ├── gardenRoutes.js
│ │ ├── plantRoutes.js
│ │ ├── usersRoutes.js
│ │ └── mainRoutes.js # Route aggregator
│ └── services/
│ ├── db.js # Database connection
│ └── emailService.js #Email notifications
├── app.js # Express app configuration
├── index.js # Server entry point
├── .env # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

**Technical Constraints:** Uses callbacks for all async operations (no Promises/async-await) as per assignment requirements.

## 📦 Dependencies

- **express** ^5.x - Web framework
- **mysql2** ^3.x - Database driver
- **dotenv** - Environment configuration
- **bcrypt** ^6.x - Password hashing for secure authentication
- **jsonwebtoken** ^9.x - JWT token generation and verification
- **nodemailer** ^7.x - Email service for welcome messages
- **cors** ^2.x - Cross-Origin Resource Sharing
- **nodemon** (dev) - Auto-restart during development
- **live-server** (dev) - Frontend development server

## 🚀 Setup Instructions

1. **Clone Repository**

1. Open VS Code
1. Click View and open Command Palette
1. Type `Git: Clone` and select it
1. Paste the repository URL: `https://github.com/ST0503-BED/bed-ca2-Ophelia2007`
1. Select your desired folder location (for me, Desktop)
1. Click "Open" when prompted

1. **Install Dependencies**

```bash
   npm install
```

3. **Configure Environment**
   Create `.env` file:

```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=wellness
   JWT_SECRET_KEY=your_secret_key_here
   JWT_EXPIRES_IN=15m
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
```

**Note:** For email functionality, you need to:

- Use a Gmail account or configure your SMTP provider
- Generate an App Password (for Gmail: Google Account → Security → 2-Step Verification → App Passwords)
- Replace `EMAIL_USER` and `EMAIL_PASS` with your credentials

4. **Initialize Database**

```bash
   npm run init_tables
```

This creates all required tables including gamification tables.

5. **Start Server**

```bash
   npm run dev      # Development (with nodemon)
   npm start        # Production
```

6. **Start Frontend** (Optional)

```bash
   npm run frontend # Starts live-server on port 5500
```

## 📡 API Endpoints

### Authentication (3 endpoints)

- `POST /register` - Register new user account
  - **Required fields:** `username`, `email`, `password`
  - **Process:**
    - Validates username uniqueness (returns 409 if exists)
    - Validates email uniqueness (returns 409 if exists)
    - Hashes password using bcrypt (10 salt rounds)
    - Creates user account with initial 0 points
    - Sends welcome email (non-blocking)
  - **Response:** Returns `user_id`, `username`, and `email` with confirmation message
  - **Middleware:** `checkDuplicate` - validates no duplicate username/email before processing
  - **Example Request:**
    ```json
    {
      "username": "jane_doe",
      "email": "jane@example.com",
      "password": "SecurePass123!"
    }
    ```
- `POST /login` - Authenticate user and get access token
  - **Required fields:** `username`, `password`
  - **Process:**
    - Validates username exists (returns 404 if not found)
    - Compares password with bcrypt hash (returns 401 if invalid)
    - Generates JWT token with user_id and username
    - Token expires based on JWT_EXPIRES_IN env variable
  - **Response:** Returns JWT `token` and user object (`user_id`, `username`, `points`)
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

- `POST /challenges` - Create new challenge (requires: description, user_id, points)
- `GET /challenges` - List all challenges
- `PUT /challenges/:challenge_id` - Update challenge (validates creator ownership)
- `DELETE /challenges/:challenge_id` - Delete challenge (cascades to completions)

### Challenge Completions (2 endpoints)

- `POST /challenges/:challenge_id` - Mark challenge complete (auto-awards points)
- `GET /challenges/:challenge_id` - View all completions for a challenge

### Gamification Endpoints

#### **Plant Catalog Management**

- `GET /plants` - Retrieve all available plant types with their rarity tiers and unlock requirements
- `GET /plants/unlocked/:user_id` - View plants unlocked for specific user based on accumulated points

#### **Garden Management**

- `GET /garden/:user_id` - View user's complete garden with all planted plants and their growth status
- `POST /garden/plant` - Plant a new seed in garden (validates unlock status based on user points)
- `PUT /garden/:garden_id/water` - Water a plant to increase growth stage (seed → sprout → growing → bloomed)
- `DELETE /garden/:garden_id` - Remove a plant from user's garden

## 🗄️ Database Design

**Core Tables:**

- `User` - Stores user profiles, points, email, and hashed passwords
- `WellnessChallenge` - Challenge definitions
- `UserCompletion` - Tracks completed challenges

**Gamification Tables:**

- `plant_types` - Catalog of all available plant species with rarity levels (common, rare, epic, legendary), unlock requirements, growth specifications, and visual assets
- `user_garden` - Individual planted plants with growth stages, health levels, custom nicknames, completion counts, and timestamps

**ERD:** See the erd diagram image for complete database schema in the report document.

## 🔐 Authentication Flow

1. **User Registration:**
   - User submits username, email, and password
   - System checks for duplicates
   - Password is hashed with bcrypt
   - User record created in database
   - Welcome email sent asynchronously
   - User receives confirmation with user_id

2. **User Login:**
   - User submits username and password
   - System retrieves user by username
   - Password compared with stored hash
   - JWT token generated with expiration
   - Token and user info returned to client

3. **Protected Routes:**
   - Client includes JWT token in Authorization header
   - Middleware verifies token signature and expiration
   - User info extracted from token
   - Request proceeds if valid, rejected if invalid/expired

## 🛡️ Error Handling

Comprehensive HTTP status codes:

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid credentials or missing token
- `403 Forbidden` - Authorization failure (e.g., wrong creator, expired token)
- `404 Not Found` - Resource doesn't exist (user, challenge, etc.)
- `409 Conflict` - Duplicate username or email
- `500 Internal Server Error` - Database/server errors

## ✅ Testing

All endpoints tested via Postman with screenshots included in:

- Individual Report document

Each screenshot includes:

- Request URL & HTTP method
- Request headers (including Authorization for protected routes)
- Request body (if applicable)
- Response body
- Status code

## 📋 Middleware

- **bodyParser** - JSON request parsing
- **authenticateToken** - Verifies JWT token for protected routes
- **validateUser** - Checks user existence before garden operations
- **validateChallenge** - Validates challenge ownership for updates/deletes
- **checkUserCompletion** - Verifies user and challenge exist before completion
- **checkPlantUnlock** - Validates user has sufficient points to plant specific seeds
- **checkDuplicate** - Validates unique username/email during registration

## 🔒 Security & Best Practices

- **Password Security:** Bcrypt hashing with 10 salt rounds
- **SQL Injection Prevention:** Parameterized queries using `?` placeholders
- **JWT Security:** Tokens expire after configured time (default 15m)
- **Input Validation:** Required fields checked in controllers
- **Data Integrity:** Unique username/email constraints, foreign key relationships
- **Authorization Checks:** Challenge creators verified before modifications
- **Point Validation:** Unlock requirements enforced for rare plants
- **Email Privacy:** Sensitive credentials stored in environment variables
- **CORS Configuration:** Enabled for frontend-backend communication

## 🐛 Known Issues / Future Enhancements

**Planned Enhancements:**

- Password reset functionality via email
- Email verification before account activation
- Refresh token mechanism for extended sessions
- Social authentication (Google, Facebook OAuth)
- Auto-watering system triggered directly by challenge completion
- Time-based plant health decay for increased engagement
- Garden sharing/comparison features between users
- Daily login rewards (bonus coins and water drops)
- Multi-plant gardens (currently 1 garden = 1 plant)

**Current Limitations:**

- Plant health doesn't automatically decrease over time (future feature)
- Maximum garden size not enforced (unlimited planting currently allowed)
- No plant trading/gifting system between users
- Single currency system (points only) - no separate shop economy yet

## 📝 Code Quality

- Modular design with separation of concerns
- Consistent callback error-first pattern
- Descriptive variable/function names
- Inline comments for complex logic
- Middleware chaining for clean request flow
- DRY principles applied across controllers and models
- Secure password handling (never stored in plain text)
- Environment-based configuration

## 📄 License

## Academic project for ST0503 Backend Web Development (2025/2026 S2)

**Author:** Thoon Wai Si  
**Student ID:** p2532633  
**Submission Date:** 5 Jan 2026
