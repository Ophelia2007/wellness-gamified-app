
const express = require('express');
const router = express.Router();

const challengesRoutes = require('./challengesRoutes.js');
const usersRoutes = require('./usersRoutes.js');

router.use("/challenges", challengesRoutes);
router.use("/users", usersRoutes);

module.exports = router;
