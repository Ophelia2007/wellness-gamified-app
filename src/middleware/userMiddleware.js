const usersModel = require("../models/usersModel");

// Check if the username is already taken before allowing registration
module.exports.checkDuplicate = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).send({ message: "Missing required data." });
  }
  const data = { userName: req.body.username };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkDuplicate:", error);
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        return res.status(409).json({ message: "Username already exists." });
      }
      next();
    }
  };
  usersModel.findByUsername(data, callback);
};


// Middleware to verify user exists before update
module.exports.checkIdExist = (req, res, next) => {
  const data = { userId: req.params.user_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkIdExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({ message: "User Not found" });
      } else {
        next();
      }
    }
  };
  usersModel.selectById(data, callback);
};

// Ensure the new username isn't already used by someone else
module.exports.checkDuplicateUsername = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).send({ message: "Missing required data." });
  }

  if (req.body.points !== undefined && typeof req.body.points !== 'number') {
    return res.status(400).send({ message: 'Invalid input: points must be a number' });
  }

  const data = {
    userId: req.params.user_id,
    userName: req.body.username
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkDuplicateUsername:", error);
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        return res.status(409).json({ message: "Username already exists." });
      }
      next();
    }
  };
  usersModel.findByUsername(data, callback);
};
