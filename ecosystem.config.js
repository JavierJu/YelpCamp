module.exports = {
    apps: [
        {
            name: "yelpcamp",
            script: "app.js",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};
