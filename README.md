# Gamified Wellness Challenge System 🌿

A Node.js backend API for a gamified wellness platform that encourages healthy habits through challenges and rewards.

## 🎮 Gamification Theme: Digital Garden

The Digital Garden transforms wellness into a visual journey where users grow virtual plants by completing challenges. Each challenge automatically nurtures plants, progressing them from seed to bloom through distinct growth stages. Accumulated points unlock plant species (common to legendary), encouraging sustained engagement while creating emotional attachment and tangible progress visualization in a low-pressure, rewarding environment.

**Additional Features:**

- Plant Growth System -> Plants evolve through 4 stages (seed → sprout → growing → bloomed) as users complete challenges
- Rarity Tiers -> Unlock progressively rarer plants (Common, Rare, Epic, Legendary) based on accumulated points
- Plant Personalization -> Users can nickname their plants, creating emotional connection and ownership
- Health Monitoring -> Plants maintain health levels that reflect user engagement consistency
- Visual Progress Tracking -> Clear growth stages provide immediate feedback and motivation

## 🏗️ Architecture

**MVC Pattern with Callback-Based Design**

BED-CA1-OPHELIA2007/
├── src/
│ ├── configs/
│ │ ├── createSchema.js # Database schema creation
│ │ └── initTables.js # Table initialization
│ ├── controllers/
│ │ ├── challengesController.js
│ │ ├── completionController.js
│ │ └── usersController.js
│ │ └── gardenController.js
│ │ └── plantController.js
│ ├── middleware/
│ │ ├── challengesMiddleware.js
│ │ ├── completionMiddleware.js
│ │ └── userMiddleware.js
│ │ └── gardenMiddleware.js
│ ├── models/
│ │ ├── challengesModel.js
│ │ ├── completionModel.js
│ │ └── usersModel.js
│ │ └── gardenModel.js
│ │ └── plantModel.js
│ ├── routes/
│ │ ├── challengesRoutes.js
│ │ ├── completionRoutes.js
│ │ ├── gardenRoutes.js
│ │ ├── plantRoutes.js
│ │ ├── usersRoutes.js
│ │ └── mainRoutes.js # Route aggregator
│ └── services/
│ └── db.js # Database connection
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
- **nodemon** (dev) - Auto-restart

## 🚀 Setup Instructions

1. **Clone Repository**

1. Open VS Code
1. Click View and open Command Palette
1. Type `Git: Clone` and select it
1. Paste the repository URL: `https://github.com/ST0503-BED/bed-ca1-Ophelia2007`
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
```

4. **Initialize Database**

```bash
   npm run init_tables
```

This creates all required tables including gamification tables.

5. **Start Server**

```bash
   npm run dev      # Development (with nodemon)
```

## 📡 API Endpoints

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

- `User` - Stores user profiles and points
- `WellnessChallenge` - Challenge definitions
- `UserCompletion` - Tracks completed challenges

**Gamification Tables:**

- `plant_types` - Catalog of all available plant species with rarity levels (common, rare, epic, legendary), unlock requirements, growth specifications, and visual assets
- `user_garden` - Individual planted plants with growth stages, health levels, custom nicknames, completion counts, and timestamps

**ERD:** See the erd diagram image for complete database schema in the report document.

## 🛡️ Error Handling

Comprehensive HTTP status codes:

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Missing required fields
- `403 Forbidden` - Authorization failure (e.g., wrong creator)
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Duplicate username
- `500 Internal Server Error` - Database/server errors

## ✅ Testing

All endpoints tested via Postman with screenshots included in:

- Individual Report document

Each screenshot includes:

- Request URL & HTTP method
- Request body (if applicable)
- Response body
- Status code

## 📋 Middleware

- **bodyParser** - JSON request parsing
- **validateUser** - Checks user existence before garden operations
- **validateChallenge** - Validates challenge ownership for updates/deletes
- **checkUserCompletion** - Verifies user and challenge exist before completion
- **checkPlantUnlock** - Validates user has sufficient points to plant specific seeds

## 🔒 Security & Best Practices

- **SQL Injection Prevention:** Parameterized queries using `?` placeholders
- **Input Validation:** Required fields checked in controllers
- **Data Integrity:** Unique username constraints, foreign key relationships
- **Authorization Checks:** Challenge creators verified before modifications
- **Point Validation:** Unlock requirements enforced for rare plants

## 🐛 Known Issues / Future Enhancements

**Planned Enhancements:**

- Auto-watering system triggered directly by challenge completion
- Time-based plant health decay for increased engagement ( the reason for the growth_time_hours's existence)
- Achievement badges for garden milestones (first bloom, rare collector, etc.)
- Garden sharing/comparison features between users
- Daily login rewards (bonus coins and water drops)
- Challenge streak bonuses for consecutive day completions
- Right now, 1 user have multiple garden where 1 garden have 1 plant. In future, adding a feature that a garden can have multiple plants.

**Current Limitations:**

- Plant health doesn't automatically decrease over time (future feature)
- Maximum garden size not enforced (unlimited planting currently allowed)
- No plant trading/gifting system between users
- Single currency system (points only) - no separate shop economy yet
- No real-time notifications for plant status changes

## 📝 Code Quality

- Modular design with separation of concerns
- Consistent callback error-first pattern
- Descriptive variable/function names
- Inline comments for complex logic
- Middleware chaining for clean request flow
- DRY principles applied across controllers and models

## 📄 License

## Academic project for ST0503 Backend Web Development (2025/2026 S2)

**Author:** Thoon Wai Si  
**Student ID:** p2532633  
**Submission Date:** 5 Jan 2026
