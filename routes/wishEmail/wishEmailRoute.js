const express = require('express');
const { sendWishEmail } = require('../../controller/wishEmail/wishEmailController');

const router = express.Router();

router.post('/send-wish-email', sendWishEmail);

module.exports = router;