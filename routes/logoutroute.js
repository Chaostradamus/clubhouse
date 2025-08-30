const express = require('express');
const router = express.Router();
const { logout } = require('../controllers/logoutcontroller');

router.get('/logout', logout);

module.exports = router;