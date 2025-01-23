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
        saveUninitialized: true,
        cookie: {
            HttpOnly: true,
            secure: process.env.NODE_ENV === 'production', // 배포 시 true, 개발 시 false
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1주일
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1주일        
        },
    });
};

module.exports = sessionConfig;
