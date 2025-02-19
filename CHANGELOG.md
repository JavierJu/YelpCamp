# CHANGELOG

## v1.3.0 - (2025-02-19)

### Major Updates

- **AWS-Based Deployment**: Server redeployed using AWS EC2 + Nginx
- **Network Optimization**: Integrated AWS Route 53, ACL, ELB, and CloudFront
- **Automated Deployment**: CI/CD pipeline using GitHub Actions (Auto-deploy to EC2, PM2 restart, CloudFront cache invalidation)
- **Sitemap Generation & SEO Enhancement**: Integrated with Google Search Console and Google Analytics

## v1.2.0 - (2025-02-17)

### Major Updates

- **Improved Map Functionality**: Cluster map popups now display campground details (name, description, image)
- **Enhanced Cloudinary File Management**: Automatically delete associated images when a campground is removed
- **Stronger Image Upload Validation**: Enforced file type, count, and size restrictions

## v1.1.0 - (2025-02-04)

### Major Updates

- **Code Refactoring**: Modularized `app.js` and improved `middlewares`, `routes`, and `controllers` structure
- **User Experience Enhancements**: Improved sign-up flow with auto-login and refined redirection
- **UI Improvements**: Updated homepage design, removed unnecessary buttons
- **New Features**:
  - Default images for campgrounds with missing pictures
  - Search functionality using MongoDB `$text` index
  - Display timestamps for created and updated campgrounds and reviews
  - Improved review system (total reviews, average ratings, and sorting enhancements)

## v1.0.0 - (2025-01-12)

### Initial Release

- Basic campground CRUD functionality
- User authentication and authorization system (Sign-up, Login, Logout)
- Review system with star rating
- Map integration using Mapbox
- Image upload support via Cloudinary
