const express = require('express');
const router = express.Router();
const { getCreateMessage, postCreateMessage, getIndex, deleteMessage } = require('../controllers/createmessagecontroller');
const { ensureAuthenticated, ensureAdmin } = require('../lib/authmiddleware');

router.get('/', getIndex);
router.get('/create-message', ensureAuthenticated, getCreateMessage);
router.post('/create-message', ensureAuthenticated, postCreateMessage);
router.post('/delete-message/:id', ensureAdmin, deleteMessage);

module.exports = router;