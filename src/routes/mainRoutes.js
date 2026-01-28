const express = require('express');
const router = express.Router();

// Import individual route modules (sub-routers)
const challengesRoutes = require('./challengesRoutes.js');
const usersRoutes = require('./usersRoutes.js');
const completionRoutes = require('./completionRoutes.js');
const gardenRoutes = require('./gardenRoutes.js');
const plantRoutes = require('./plantRoutes.js');
const reviewRoutes = require("./reviewRoutes.js");
const authRoutes = require('./authRoutes');

// Authentication routes (no /users prefix)
router.use('/auth', authRoutes); 

// Assigns specific URL prefixes to each router
router.use("/challenges", challengesRoutes); // Routes for challenge management
router.use("/users", usersRoutes);           // Routes for user profiles/accounts
router.use("/challenges", completionRoutes); // Additional challenge logic (e.g., finishing a task)
router.use('/garden', gardenRoutes);
router.use('/plants', plantRoutes)
router.use('/review', reviewRoutes)

// Exports the combined router to the main server file
module.exports = router;