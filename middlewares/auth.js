module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in first!');
        req.session.returnTo = req.originalUrl; // 사용자가 요청했던 URL 저장
        return res.redirect('/login'); // 로그인 페이지로 리다이렉트
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo; // 세션에 저장된 URL을 로컬 변수로 설정
        delete req.session.returnTo; // 세션에서 URL 제거 (더 이상 필요하지 않음)
    }
    next();
}