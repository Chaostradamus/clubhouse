const express = require('express');
const router = express.Router();
const { getJoinClub, postJoinClub, getBecomeAdmin, postBecomeAdmin } = require('../controllers/membercontroller');

router.get('/join-club', getJoinClub);
router.post('/join-club', postJoinClub);
router.get('/become-admin', getBecomeAdmin);
router.post('/become-admin', postBecomeAdmin);

module.exports = router;