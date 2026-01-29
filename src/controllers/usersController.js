const usersModel = require("../models/usersModel");

// ##############################################################
// CREATE USER FLOW
// ##############################################################

// Return the newly created user data
module.exports.printNewUser = (req, res, next) => {
  const data = { userId: req.insertId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printNewUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results[0]);
    }
  };
  usersModel.printNewUser(data, callback);
};

// ##############################################################
// READ ACTIONS
// ##############################################################

// Fetch all registered users
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUsers:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  usersModel.selectAll(callback);
};

// Fetch a single user by their specific ID
module.exports.readUserById = (req, res, next) => {
  const data = { userId: req.params.user_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({ message: "User Not found" });
      } else {
        res.status(200).json(results[0]);
      }
    }
  };
  usersModel.selectById(data, callback);
};

// ##############################################################
// UPDATE ACTIONS
// ##############################################################

// Perform the actual update in the database
module.exports.updateUserById = (req, res, next) => {
  const data = {
    userId: req.params.user_id,
    userName: req.body.username,
    points: req.body.points
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      next();
    }
  };
  usersModel.updateUser(data, callback);
};

// Return the updated user record
module.exports.printUpdatedUser = (req, res, next) => {
  const data = { userId: req.params.user_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printUpdatedUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results[0]);
    }
  };
  usersModel.printUpdatedUser(data, callback);
};