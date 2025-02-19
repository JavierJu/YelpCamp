# Yelp Camp

Yelp Camp is a full-stack web application that allows users to add, view, edit, and delete campgrounds.  
It is built using MongoDB, Express.js, and Node.js, with EJS and Bootstrap for the server-side UI.

## 🚀 Features

- **Campground Management**: Add, view, edit, and delete campgrounds
- **User Authentication**: Register and log in using Passport.js
- **Review System**: Users can leave reviews and rate campgrounds
- **Map Integration**: Mapbox support with interactive cluster maps
- **Image Upload**: Store and manage images using Cloudinary
- **Enhanced Security**: Uses Helmet, Express Validator, and sanitize-html
- **Automated Deployment**: CI/CD with GitHub Actions + AWS EC2 + CloudFront + Nginx

---

## 🛠 Technologies & Tools

### **Frontend**

- **HTML5 / CSS3 / JavaScript**
- **Bootstrap** (Responsive UI)
- **EJS** (Server-side templating engine)

### **Backend**

- **Node.js** / **Express.js**
- **MongoDB** / **Mongoose**
- **Passport.js** (User authentication)

### **Deployment & Infrastructure**

- **AWS EC2** (Server deployment)
- **AWS Route 53** (Domain management)
- **AWS CloudFront** (CDN optimization)
- **Nginx** (Reverse proxy)
- **GitHub Actions** (CI/CD automation)

---

## ⚙ Installation & Usage

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
npm start
```

Open your browser and navigate to `http://localhost:3000`.

> **For detailed installation guide and environment variable setup:** [Setup Guide](docs/Setup.md)

---

## 🔄 Changelog

- **v1.3.0**: AWS-based deployment, automated deployment with PM2 and CloudFront cache invalidation
- **v1.2.0**: Improved map clustering, automatic Cloudinary file deletion
- **v1.1.0**: Code refactoring and user experience enhancements
  > **View complete changes:** [CHANGELOG.md](CHANGELOG.md)

---

## 🚀 Future Enhancements

- **OAuth login support (Google, Facebook)**
- **Improved image upload (drag & drop, preview functionality)**
- **Performance optimization with Redis caching**
- **AWS Lambda-based image optimization**

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](docs/License.md) for details.
