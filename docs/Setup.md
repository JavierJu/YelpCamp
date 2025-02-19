# Setup Guide

## 1. 프로젝트 클론 및 설치

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
```

## 2. 환경 변수 설정 (`.env` 파일 생성)

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 추가하세요:

```env
DB_URL=mongodb://localhost:27017/yelp-camp
SECRET=yourSecretKey
CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourApiKey
CLOUDINARY_API_SECRET=yourApiSecret
CLOUDINARY_URL=yourURL
MAPBOX_TOKEN=yourMapboxToken
```

## 3. 데이터베이스 실행 (MongoDB)

```bash
mongod
```

## 4. 애플리케이션 실행

```bash
npm start
```

애플리케이션이 실행되면 브라우저에서 `http://localhost:3000`에 접속하세요.

## 5. AWS EC2 배포

### 5.1. 서버 환경 설정

AWS EC2 인스턴스에 Node.js 및 MongoDB를 설치하세요:

```bash
sudo apt update && sudo apt install -y nodejs npm mongodb
```

### 5.2. 프로젝트 배포

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
```

### 5.3. PM2로 애플리케이션 실행

```bash
npm install -g pm2
pm2 start app.js --name yelp-camp
pm2 save
pm2 startup
```

### 5.4. Nginx 설정 (Reverse Proxy)

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/yelp-camp
```

아래 설정 추가 후 저장:

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

적용 후 Nginx 재시작:

```bash
sudo ln -s /etc/nginx/sites-available/yelp-camp /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## 6. 자동 배포 설정 (GitHub Actions)

`.github/workflows/deploy.yml` 파일 생성 후 아래 내용 추가:

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

이제 GitHub에 `main` 브랜치에 push하면 자동으로 배포됩니다.
