const helmet = require('helmet');

const setupHelmet = () => {
    const scriptSrcUrls = [
        "https://stackpath.bootstrapcdn.com/",
        "https://api.tiles.mapbox.com/",
        "https://api.mapbox.com/",
        "https://kit.fontawesome.com/",
        "https://cdnjs.cloudflare.com/",
        "https://cdn.jsdelivr.net",
        "https://www.googletagmanager.com/",
        "https://www.google-analytics.com/",
    ];
    const styleSrcUrls = [
        "https://kit-free.fontawesome.com/",
        "https://stackpath.bootstrapcdn.com/",
        "https://api.mapbox.com/",
        "https://api.tiles.mapbox.com/",
        "https://fonts.googleapis.com/",
        "https://use.fontawesome.com/",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com/",
    ];
    const connectSrcUrls = [
        "https://api.mapbox.com/",
        "https://a.tiles.mapbox.com/",
        "https://b.tiles.mapbox.com/",
        "https://events.mapbox.com/",
        "https://www.google-analytics.com/",
        "https://analytics.google.com/",
    ];
    const fontSrcUrls = [
        "https://cdnjs.cloudflare.com",  // Font Awesome 폰트 허용
        "https://fonts.gstatic.com",     // Google Fonts 허용
    ];

    return helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"], // 기본적으로 같은 도메인에서 제공되는 리소스 허용
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: ["'none'"], // 객체 태그 사용 금지 (보안 강화)
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/", // Replace with your Cloudinary
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            manifestSrc: ["'self'"], // ✅ manifest.json 로딩 허용
            upgradeInsecureRequests: [], // ✅ HTTPS 강제 업그레이드 (기본적으로 포함됨)
        },
    });
};

module.exports = setupHelmet;
