const express = require('express');
const router = express.Router();
const { getLogin, postLogin } = require('../controllers/logincontroller');

router.get('/login', getLogin);
router.post('/login', postLogin);

module.exports = router;