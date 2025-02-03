const helmet = require('helmet');

const setupHelmet = () => {
    const scriptSrcUrls = [
        "https://stackpath.bootstrapcdn.com/",
        "https://api.tiles.mapbox.com/",
        "https://api.mapbox.com/",
        "https://kit.fontawesome.com/",
        "https://cdnjs.cloudflare.com/",
        "https://cdn.jsdelivr.net",
    ];
    const styleSrcUrls = [
        "https://kit-free.fontawesome.com/",
        "https://stackpath.bootstrapcdn.com/",
        "https://api.mapbox.com/",
        "https://api.tiles.mapbox.com/",
        "https://fonts.googleapis.com/",
        "https://use.fontawesome.com/",
        "https://cdn.jsdelivr.net", // 누락된 CDN 추가
        "https://cdnjs.cloudflare.com/", // 누락된 CDN 추가
    ];
    const connectSrcUrls = [
        "https://api.mapbox.com/",
        "https://a.tiles.mapbox.com/",
        "https://b.tiles.mapbox.com/",
        "https://events.mapbox.com/",
    ];
    const fontSrcUrls = [
        "https://cdnjs.cloudflare.com",  // Font Awesome 폰트 허용
        "https://fonts.gstatic.com",    // Google Fonts 허용
    ];

    return helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/", // Replace with your Cloudinary
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls], // 폰트 출처 추가됨
        },
    });
};

module.exports = setupHelmet;
