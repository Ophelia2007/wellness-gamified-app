
const express = require('express');
const router = express.Router();

const challengesRoutes = require('./challengesRoutes.js');
const usersRoutes = require('./usersRoutes.js');
const completionRoutes = require('./completionRoutes.js');

router.use("/challenges", challengesRoutes);
router.use("/users", usersRoutes);
router.use("/challenges", completionRoutes);

module.exports = router;
