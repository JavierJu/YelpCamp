const express = require('express');
const router = express.Router({ mergeParams: true });

const { storeReturnTo } = require('../middlewares');
const users = require('../controllers/users');

require('express-async-errors');

const passport = require('passport');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.registerNewUser);

// router.route('/login')
//     .get(users.renderLoginForm)
//     .post(
//         storeReturnTo,
//         passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
//         users.login
//     );

router.route('/login')
    .get(users.renderLoginForm)
    .post(
        storeReturnTo,
        async (req, res, next) => {
            passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }, (err, user, info) => {
                if (err) return next(err);
                if (!user) return res.redirect('/login');

                req.logIn(user, (err) => {
                    if (err) return next(err);

                    req.session.save(() => { // ✅ 세션 저장 후 리다이렉트 실행
                        users.login(req, res);
                    });
                });
            })(req, res, next);
        });

router.route('/logout')
    .get(users.logout);

module.exports = router;
