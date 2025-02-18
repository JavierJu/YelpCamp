const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const mongoose = require('mongoose');
const Campground = require('../models/campground'); // Campground 모델 불러오기
require('dotenv').config(); // 환경변수 로드

const generateSitemap = async () => {
    try {
        // MongoDB 연결
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        // 고정된 URL 목록
        const links = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/campgrounds', changefreq: 'weekly', priority: 0.9 },
        ];

        // 동적으로 캠프그라운드 추가
        const campgrounds = await Campground.find({}, '_id'); // ID만 가져오기
        campgrounds.forEach(campground => {
            links.push({
                url: `/campgrounds/${campground._id}`,
                changefreq: 'weekly',
                priority: 0.8
            });
        });

        // SitemapStream 생성
        const stream = new SitemapStream({ hostname: 'https://www.yelp-camp.com/' });

        // 파일 저장을 위한 파이프라인 설정
        const writeStream = fs.createWriteStream('./public/sitemap.xml');
        stream.pipe(writeStream);

        // 링크들을 스트림에 하나씩 추가
        links.forEach(link => stream.write(link));

        // 스트림 종료
        stream.end();

        // 스트림이 종료될 때까지 기다림
        await streamToPromise(stream);

        console.log('✅ Sitemap successfully generated: /public/sitemap.xml');

        // MongoDB 연결 종료
        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        mongoose.connection.close();
    }
};

// 다른 파일에서 불러올 수 있도록 export
module.exports = generateSitemap;

// 터미널에서 직접 실행 가능하도록 설정
if (require.main === module) {
    generateSitemap();
}
