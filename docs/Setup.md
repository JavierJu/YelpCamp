# Setup Guide

## 1. Clone the Project and Install Dependencies

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
```

## 2. Set Up Environment Variables (`.env` File)

Create a `.env` file in the project root and add the following content:

```env
DB_URL=mongodb://localhost:27017/yelp-camp # Use this for local development (or replace with your MongoDB Atlas URL)
SECRET=yourSecretKey
CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourApiKey
CLOUDINARY_API_SECRET=yourApiSecret
CLOUDINARY_URL=yourURL
MAPBOX_TOKEN=yourMapboxToken
```

## 3. Start the Database (MongoDB) (For local development, ensure MongoDB is running)

```bash
mongod
```

## 4. Run the Application

```bash
npm start
```

Once the application is running, open your browser and go to `http://localhost:3000`.

## 5. Deploying on AWS EC2

### 5.1. Set Up the Server Environment

Install Node.js and MongoDB on your AWS EC2 instance:

```bash
sudo apt update && sudo apt install -y nodejs npm mongodb
```

### 5.2. Deploy the Project

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
```

### 5.3. Run the Application with PM2

```bash
npm install -g pm2
pm2 start app.js --name yelp-camp
pm2 save
pm2 startup
```

### 5.4. Configure Nginx as a Reverse Proxy

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/yelp-camp
```

Add the following configuration and save the file:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Apply the configuration and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/yelp-camp /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## 6. Set Up Automatic Deployment (GitHub Actions)

Create the `.github/workflows/deploy.yml` file and add the following content:

```yaml
name: Deploy to AWS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: ${{ secrets.AWS_HOST }}
          username: ${{ secrets.AWS_USER }}
          key: ${{ secrets.AWS_PRIVATE_KEY }}
          script: |
            cd /home/ec2-user/yelp-camp
            git pull origin main
            npm install
            pm2 restart yelp-camp
            sudo systemctl restart nginx
```

Now, every time you push changes to the `main` branch, GitHub Actions will automatically deploy the project.
