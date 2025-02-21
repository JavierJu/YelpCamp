// GeoJSON 형식으로 변환
const CampgroundGeojsonData = {
    type: 'FeatureCollection',
    features: campgrounds.map(campground => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: campground.geometry.coordinates
        },
        properties: {
            id: campground._id,
            title: campground.title,
            description: campground.description,
            location: campground.location,
            price: campground.price,
            images: campground.images
        }
    }))
};

// GeoJSON 데이터 출력
// console.log(JSON.stringify(CampgroundGeojsonData, null, 2));

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'cluster-map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11',
    center: [138.2529, 36.2048], // starting position [lng, lat]
    zoom: 2
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('campgrounds', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: CampgroundGeojsonData,  // MongoDB에서 변환한 GeoJSON 데이터
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#99d98c',
                10,
                '#52b69a',
                20,
                '#168aad',
                30,
                '#1e6091',
                40,
                '#184e77'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20, // Size
                10, // Qty
                25,
                20,
                30,
                30,
                35,
                40,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#d9ed92',
            'circle-radius': 8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        const properties = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // images 배열 파싱
        let images = properties.images;
        if (typeof images === 'string') {
            try {
                images = JSON.parse(images);
            } catch (error) {
                console.error('Failed to parse images:', error);
                images = [];
            }
        }

        // 첫 번째 이미지 처리
        const firstImageUrl = images.length > 0 ? images[0].url : null;

        const imageHtml = firstImageUrl
            ? `<img src="${firstImageUrl}" alt="Image" style="width: 100%; height: auto;" />`
            : `<p>No image available</p>`;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }

        new mapboxgl.Popup({ offset: 25, closeOnClick: true, closeButton: true, keepInView: false, anchor: 'top' })
            .setLngLat(coordinates)
            .setHTML(
                `<h6><a href="/campgrounds/${e.features[0].properties.id}">${e.features[0].properties.title}</a></h6>
                 <p>${e.features[0].properties.description.substring(0, 40)}...</p>
                 ${imageHtml}`
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    });
});
