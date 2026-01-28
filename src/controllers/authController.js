const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const emailService = require('../services/emailService'); // NEW!

// ##############################################################
// REGISTER NEW USER (with welcome email)
// ##############################################################
module.exports.register = (req, res, next) => {
    // Validate input
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Missing required fields: username, email, and password are required."
        });
    }
  const { username, email, password } = req.body;

    // Check if username already exists
    usersModel.findByUsername({ username }, (error, results) => {
        if (error) {
            console.error("Error checking username:", error);
            return res.status(500).json(error);
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: "Username already exists."
            });
        }

        // Check if email already exists
        usersModel.checkEmailExists({ email }, (error, results) => {
            if (error) {
                console.error("Error checking email:", error);
                return res.status(500).json(error);
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "Email already exists."
                });
            }

            // Hash password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({
                        message: "Error processing password."
                    });
                }

                // Create user with hashed password
const data = {
      userName: username,
      email: email,
      password: hashedPassword  // Use hashed password instead of plain text
    };

                usersModel.insertSingle(data, (error, results) => {
                    if (error) {
                        console.error("Error creating user:", error);
                        return res.status(500).json(error);
                    }

                    const newUser = {
                        user_id: results.insertId,
                        userName: username,
                        email: email
                    };

                    // Send welcome email (don't wait for it)
                    emailService.sendWelcomeEmail(newUser, (emailError, info) => {
                        if (emailError) {
                            console.error("Error sending welcome email:", emailError);
                            // Don't fail registration if email fails
                        } else {
                            console.log("Welcome email sent:", info.messageId);
                        }
                    });

                    // Return success response
                    res.status(201).json({
                        message: "User registered successfully! Check your email for welcome message.",
                        user_id: newUser.user_id,
                        username: newUser.userName,
                        email: newUser.email
                    });
                });
            });
        });
    });
};

module.exports.login = (req, res) => {
  const { username, password } = req.body;
const userName = username;
  usersModel.findByUsername({ userName }, (error, results) => {
    if (error) return res.status(500).json(error);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          points: user.points
        }
      });
    });
  });
};
