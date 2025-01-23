const express = require('express');
const router = express.Router({ mergeParams: true });
const home = require('../controllers/home');

router.route('/')
    .get(home.home);

module.exports = router;
