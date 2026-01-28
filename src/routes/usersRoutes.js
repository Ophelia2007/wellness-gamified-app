// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
// Importing logic handlers from the controller file
const userController = require("../controllers/usersController");
const userMiddleware = require("../middleware/userMiddleware");
const { authenticateToken } = require('../middleware/authMiddleware');
const authController = require("../controllers/authController")

// READ ALL: Handles GET requests to fetch every user in the database
router.get('/', 
    authenticateToken,
    userController.readAllUsers);

// READ ONE: Handles GET requests for a specific ID (e.g., /users/5)
router.get('/:user_id', 
    authenticateToken,
    userController.readUserById);

// UPDATE: Handles PUT requests to modify an existing user
// Runs checks (exists? name taken?) before applying the update
router.put('/:user_id', 
    authenticateToken,
    userMiddleware.checkIdExist,
    userMiddleware.checkDuplicateUsername,
    userController.updateUserById,
    userController.printUpdatedUser
);

// Export the router so it can be used in the main app (e.g., server.js)
module.exports = router;