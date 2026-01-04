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

// CREATE: Handles POST requests to create a new user
// Uses "Middleware" to check for duplicates before saving
router.post('/',
    userMiddleware.checkDuplicate,
    userController.createNewUser,
    userController.printNewUser
)

// READ ALL: Handles GET requests to fetch every user in the database
router.get('/', userController.readAllUsers);

// READ ONE: Handles GET requests for a specific ID (e.g., /users/5)
router.get('/:user_id', userController.readUserById);

// UPDATE: Handles PUT requests to modify an existing user
// Runs checks (exists? name taken?) before applying the update
router.put('/:user_id', 
    userMiddleware.checkIdExist,
    userMiddleware.checkDuplicateUsername,
    userController.updateUserById,
    userController.printUpdatedUser
);

// Export the router so it can be used in the main app (e.g., server.js)
module.exports = router;