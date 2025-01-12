const express = require('express');
const router = express.Router({ mergeParams: true });

const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

require('express-async-errors');

const passport = require('passport');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.registerNewUser);

router.route('/login')
    .get(users.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        users.login
    );

router.route('/logout')
    .get(users.logout);

module.exports = router;
