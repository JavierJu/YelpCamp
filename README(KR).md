# Yelp Camp

Yelp Camp는 사용자가 캠프장을 추가, 조회, 수정, 삭제할 수 있는 웹 애플리케이션입니다.  
MongoDB, Express.js, Node.js를 사용해 개발되었으며, 서버 측에서 EJS와 Bootstrap을 활용하여 UI를 제공합니다.

## 🚀 주요 기능 (Features)

- **캠프장 관리**: 캠프장 추가, 조회, 수정, 삭제 가능
- **사용자 인증**: Passport.js를 활용한 회원가입 및 로그인
- **리뷰 시스템**: 리뷰 작성 및 별점 평가 기능 제공
- **지도 기능**: Mapbox 연동, 클러스터 맵 지원
- **이미지 업로드**: Cloudinary를 이용한 사진 저장
- **보안 강화**: Helmet, Express Validator, sanitize-html 적용
- **자동 배포**: GitHub Actions + AWS EC2 + CloudFront + Nginx 사용

---

## 🛠 기술 스택 및 도구 (Technologies & Tools)

### **프론트엔드**

- **HTML5 / CSS3 / JavaScript**
- **Bootstrap** (반응형 UI)
- **EJS** (서버 사이드 템플릿 엔진)

### **백엔드**

- **Node.js** / **Express.js**
- **MongoDB** / **Mongoose**
- **Passport.js** (사용자 인증)

### **배포 및 인프라**

- **AWS EC2** (서버 배포)
- **AWS Route 53** (도메인 관리)
- **AWS CloudFront** (CDN 최적화)
- **Nginx** (리버스 프록시)
- **GitHub Actions** (CI/CD 자동화)

---

## ⚙ 설치 및 실행 방법 (Installation & Usage)

```bash
git clone https://github.com/username/yelp-camp.git
cd yelp-camp
npm install
npm start
```

브라우저에서 `http://localhost:3000`에 접속하세요.

> **자세한 설치 가이드 및 환경 변수 설정:** [설치 가이드](<docs/Setup(KR).md>)

---

## 🔄 최근 변경 사항 (Changelog)

- **v1.3.0**: AWS 기반 배포, 자동 배포(PM2, CloudFront 캐시 무효화) 추가
- **v1.2.0**: 지도 클러스터 개선, Cloudinary 파일 삭제 기능 추가
- **v1.1.0**: 코드 리팩토링, 사용자 경험 개선
  > **전체 변경 사항 보기:** [CHANGELOG.md](<CHANGELOG(KR).md>)

---

## 🚀 향후 개선 사항 (Future Enhancements)

- **OAuth 로그인 지원 (Google, Facebook)**
- **이미지 업로드 개선 (드래그 앤 드롭, 미리보기 기능 추가)**
- **Redis 캐싱을 통한 성능 최적화**
- **AWS Lambda 기반 이미지 최적화 기능 추가**

---

## 📄 라이선스 (License)

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](docs/License.md) 파일을 참고하세요.
