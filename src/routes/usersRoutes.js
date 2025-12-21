// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const userController = require("../controllers/usersController");

router.post('/',
    userController.checkDuplicate,
    userController.createNewUser,
    userController.printNewUser
)
router.get('/', userController.readAllUsers);
router.get('/:user_id', userController.readUserById);
router.put('/:user_id', 
    userController.checkIdexist,
    userController.checkDuplicateusername,
    userController.updateUserbyId,
    userController.printupdatedUser

);

module.exports = router;