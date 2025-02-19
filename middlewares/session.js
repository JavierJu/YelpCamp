const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = (dbUrl, secret) => {
    const store = MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 60 * 60,
        crypto: { secret },
    });

    store.on('error', (e) => {
        console.log('SESSION STORE ERROR', e);
    });

    return session({
        store,
        name: 'session',
        secret,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            HttpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 쿠키 전송
            sameSite: 'Lax', // EJS 서버 렌더링에서는 'Lax'로 두는 게 일반적
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1주일
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1주일        
        },
    });
};

module.exports = sessionConfig;
