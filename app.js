if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
require('express-async-errors');
const ejsMate = require('ejs-mate');
const cors = require('cors');

const connectDB = require('./config/db');
const sessionConfig = require('./middlewares/session');
const setupHelmet = require('./middlewares/helmet');
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');
const generateSitemap = require('./utils/sitemap');

const methodOverride = require('method-override');
const morgan = require('morgan');

// Routes
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const homeRoutes = require('./routes/home');

const app = express();
connectDB();

// AWS, Nginx, 로드밸런서 환경에서 필요
app.set('trust proxy', 1);

// CORS 설정
// app.use(cors({
//     origin: 'https://www.javierju.com', // EC2의 실제 배포된 URL
//     credentials: true
// }));

// EJS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('tiny'));

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
const secret = process.env.SECRET || 'thisisnotagoodsecret';

// Session
app.use(sessionConfig(dbUrl, secret));

//HelmsetupHt
app.use(setupHelmet());

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals
app.use((req, res, next) => {
    // 특정 URL을 제외하고, 사용자가 요청한 URL을 세션에 저장
    if (!['/login', '/', '/register'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    // 현재 사용자 정보를 `res.locals`에 저장
    res.locals.currentUser = req.user;

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);
app.use('/', homeRoutes);

// Error handlling
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(status).render('error', { err });
})

// 서버 시작할 때 Sitemap 생성
// generateSitemap().then(() => {
//     console.log('✅ Sitemap generated successfully!');
// }).catch(err => {
//     console.error('❌ Failed to generate sitemap:', err);
// });

// Sitemap 정적 제공
app.use('/sitemap.xml', express.static(path.join(__dirname, 'public', 'sitemap.xml')));

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})