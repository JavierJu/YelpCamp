const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });

// module.exports.index = async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', { campgrounds });
// }

module.exports.index = async (req, res) => {
    const { search } = req.query; // location, maxDistance

    let query = {};
    let isSearching = false;

    // 텍스트 검색
    if (search) {
        query.$text = { $search: search };
        isSearching = true;
    }

    // 위치 검색
    // if (location) {
    //     const coordinates = location.split(',').map(Number); // "lng,lat"
    //     query.geometry = {
    //         $geoWithin: {
    //             $centerSphere: [coordinates, maxDistance / 6378.1] // 거리(킬로미터)를 구의 반지름으로 변환
    //         }
    //     };
    // isSearching = true;
    // }

    const campgrounds = await Campground.find(query).populate('reviews').sort({ createdAt: -1 }); // ✅ 최신순 정렬
    res.render('campgrounds/index', { campgrounds, isSearching });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res) => {
    const geoData = await geocodingClient.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    })
        .send()
    const newCampground = new Campground(req.body.campground);
    newCampground.geometry = geoData.body.features[0].geometry;
    newCampground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 } }, // 최신 순으로 정렬
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

//ChatGPT 수정 코드
module.exports.updateCampground = async (req, res) => {
    try {
        const { id } = req.params;
        const { campground: updatedData } = req.body;

        // Geocoding 데이터 추가
        const geoData = await geocodingClient.forwardGeocode({
            query: updatedData.location, // 사용자 입력에 기반한 위치 정보
            limit: 1
        }).send();

        // 데이터베이스 업데이트용 geometry 데이터 생성
        const geometry = geoData.body.features.length
            ? geoData.body.features[0].geometry
            : null;

        // 이미지 추가
        const images = req.files.map(f => ({ url: f.path, filename: f.filename }));

        // 데이터베이스 업데이트 (이미지 추가, 다른 데이터 업데이트, geometry 병합)
        const campground = await Campground.findByIdAndUpdate(
            id,
            { $push: { images }, ...updatedData, ...(geometry && { geometry }) },
            { runValidators: true, new: true }
        );

        // 이미지 삭제(ChatGPT코드)
        if (req.body.deleteImages && req.body.deleteImages.length > 0) {
            try {
                // Cloudinary 이미지 삭제 병렬 처리
                await Promise.all(
                    req.body.deleteImages.map(filename => cloudinary.uploader.destroy(filename))
                );

                // 데이터베이스에서 이미지 정보 제거
                await campground.updateOne({
                    $pull: { images: { filename: { $in: req.body.deleteImages } } },
                });
            } catch (err) {
                console.error('Error deleting images:', err);
                req.flash('error', 'Failed to delete images. Please try again.');
            }
        }

        // 성공 메시지와 리디렉션
        req.flash('success', 'Successfully updated campground!');
        res.redirect(`/campgrounds/${campground._id}`);
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update campground.');
        const campground = await Campground.findById(id);
        res.redirect(`/campgrounds/${campground._id}`);
    }
};

module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
};
