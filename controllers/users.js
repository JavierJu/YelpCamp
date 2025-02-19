const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

// module.exports.login = async (req, res) => {
//     req.flash('success', 'welcome back');

//     // res.locals.returnTo에 저장된 URL 검증 및 수정
//     let redirectUrl = res.locals.returnTo || '/campgrounds';

//     // '/campgrounds/:id/reviews'인 경우 부모 페이지로 수정
//     const match = redirectUrl.match(/^\/campgrounds\/([^/]+)\/reviews/);
//     if (match) {
//         redirectUrl = `/campgrounds/${match[1]}`;
//     }

//     res.redirect(redirectUrl); // 성공적으로 로그인 후 리다이렉트
// }

module.exports.login = async (req, res) => {
    req.flash('success', 'welcome back');

    let redirectUrl = res.locals.returnTo || '/campgrounds';

    const match = redirectUrl.match(/^\/campgrounds\/([^/]+)\/reviews/);
    if (match) {
        redirectUrl = `/campgrounds/${match[1]}`;
    }

    req.session.save(() => {  // ✅ 세션을 저장한 후 리다이렉트 실행
        res.redirect(redirectUrl);
    });
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}