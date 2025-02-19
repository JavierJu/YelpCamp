## Yelp Camp v1.3.0

### 1. AWS 기반 배포 및 네트워크 최적화

- AWS EC2 + nginx로 애플리케이션 재배포
- AWS Route 53에서 www.yelp-camp.com 도메인 구입 및 설정
- AWS ACL, ELB, CloudFront 적용으로 보안 및 성능 강화

### 2. 자동화된 Sitemap 생성 및 검색 엔진 최적화

- npm sitemap을 활용한 sitemap 자동 생성
- Google Search Console 및 Google Analytics 등록으로 검색 및 방문자 트래킹 최적화

### 3. GitHub Actions 기반 CI/CD 파이프라인 구축

- 신규 커밋 발생 시 GitHub → EC2 자동 배포
- pm2 restart를 통한 서버 자동 재시작
- CloudFront 캐시 무효화로 최신 컨텐츠 반영

---

## Yelp Camp v1.2.0

### 1. 클러스터 지도 팝업 개선

- 클러스터 지도 팝업에 캠프장 이름, 설명, 이미지 추가
- 캠프장 이름을 상세 페이지(show 페이지)로 링크 연결
- 팝업 디자인 및 스타일 개선

### 2. 캠프그라운드 삭제 기능 강화

- 캠프장 삭제 시 Cloudinary에서 연관된 이미지 파일도 자동 삭제
- 삭제 미들웨어 추가로 안정성 향상

### 3. 이미지 업로드 유효성 검사 추가

- 서버 및 클라이언트 측에서 파일 타입, 개수, 용량 제한 적용
- 부적절한 이미지 업로드 차단을 위한 검증 로직 강화

---

## Yelp Camp v1.1.0

### 1. 코드 리팩토링 및 구조 개선

#### 1) `app.js` 모듈화

- `helmet` 및 `session` 관련 로직을 각각 `middlewares/helmet.js`, `middlewares/session.js`로 분리
- 데이터베이스 연결(`db connection`)을 `config/db.js`에서 관리하도록 변경
- 기존 `middlewares/middleware.js`를 기능별로 분리 후 `middlewares/index.js`에서 통합 관리
  - **인증 관련** (`isLoggedIn`, `storeReturnTo`) → `middlewares/auth.js`
  - **데이터 검증 관련** (`validateCampground`, `validateReview`) → `middlewares/validators.js`
  - **권한 확인 관련** (`isAuthor`, `isReviewAuthor`) → `middlewares/permissions.js`
- 홈 페이지 라우트(`/`)를 `routes/home.js` 및 `controllers/home.js`로 분리하여 유지보수성 강화

### 2. 사용자 경험 개선

#### 1) 회원가입 후 자동 로그인 및 리디렉션 최적화

- `/register`에서 회원가입 후 자동으로 `/login`을 호출하여 사용자 경험 개선
- 로그인 후 기본적으로 `campgrounds` 페이지로 이동하도록 수정
- 기존 사용자가 요청한 URL로 리디렉션하는 기능에서 `/register` 경로 제외 처리

#### 2) 홈 페이지 UI 개선

- 스타일 개편으로 전체적인 디자인 개선
- 불필요한 `home`, `campgrounds` 버튼 삭제하여 UI 단순화

### 3. 기능 추가

#### 1) 파비콘(Favicon) 지원 추가

- `/public/favicon` 폴더에 아이콘 추가 및 적용
- `/views/partials/favicon.ejs` 생성 후 `home.ejs` 및 `boilerplate.ejs`에 포함하여 전역 적용

#### 2) 기본 이미지 설정

- 캠프장 목록(`campgrounds/index.ejs`) 및 상세 페이지(`campgrounds/show.ejs`)에서 이미지가 없을 경우 기본 이미지(`/public/images/default-image.jpg`) 표시

#### 3) 검색 기능 도입

- MongoDB의 `$text` 인덱스를 활용하여 캠프장 `title` 및 `description`을 기준으로 검색 가능하도록 구현

#### 4) 작성 및 수정 날짜 표시 기능 추가

- 캠프장 및 리뷰 작성/업데이트 일자를 UI에서 확인할 수 있도록 표시

#### 5) 리뷰 시스템 개선

- 캠프장 상세 페이지에서 총 리뷰 수 및 평균 평점 표시
- 최신 리뷰가 가장 위에 나타나도록 정렬하여 가독성 향상
- 리뷰 작성자의 이름 앞에 사용자 아이콘 추가하여 사용자 경험 향상
- 홈 캠프장 목록에서 캠프 아이콘 추가하여 시각적 요소 강화

---

## Yelp Camp v1.0.0

Yelp Camp는 사용자가 캠프장을 추가, 조회, 수정, 삭제할 수 있는 웹 애플리케이션입니다. 이 프로젝트는 MongoDB, Express.js, Node.js를 사용하여 개발되었으며, 서버 측에서 EJS와 Bootstrap을 활용하여 UI를 제공합니다. Udemy 웹 개발 부트캠프의 학습 내용을 기반으로 제작되었습니다.

### 주요 기능 (Features)

1. **캠프장 목록 보기**

   - 사용자가 등록된 모든 캠프장을 조회할 수 있음
   - 캠프장 이름, 이미지, 설명 포함

2. **캠프장 세부 정보 보기**

   - 개별 캠프장의 상세 정보 페이지 제공
   - 이름, 이미지, 설명, 가격 정보 포함

3. **캠프장 추가**

   - 인증된 사용자만 캠프장 추가 가능
   - 제목, 가격, 설명 입력 및 이미지 업로드 지원

4. **캠프장 수정**

   - 캠프장 작성자가 자신의 캠프장 정보를 수정 가능

5. **캠프장 삭제**

   - 캠프장 작성자가 자신의 캠프장을 삭제 가능

6. **사용자 인증 및 권한 관리**

   - 회원가입 및 로그인 기능 구현
   - 인증된 사용자만 특정 작업(캠프장 추가, 수정, 삭제) 가능

7. **리뷰 시스템**

   - 사용자 리뷰 작성 및 삭제 기능 제공
   - 별점 평가 기능 포함

8. **반응형 디자인**

   - EJS 및 Bootstrap을 활용하여 데스크톱 및 모바일 최적화

9. **캠프장 위치 표시**

   - **Mapbox**를 사용하여 개별 캠프장의 위치를 표시
   - 클러스터 맵을 통해 전체 캠프장 위치 제공

10. **이미지 업로드**

    - **Cloudinary**를 활용하여 캠프장 이미지 저장 및 불러오기 지원

11. **보안 강화**

    - **Helmet** 미들웨어 적용으로 보안 취약점 방지
    - **Express-mongo-sanitize**를 사용하여 NoSQL 인젝션 공격 차단
    - **Sanitize-html**을 통해 입력 데이터 필터링

12. **유효성 검사**

    - **Joi**를 사용하여 사용자 입력 데이터 검증

13. **애플리케이션 배포**
    - 초기 배포는 **Render**를 통해 진행
    - v1.3.0부터 **AWS EC2**를 활용한 배포로 전환

---

### 기술 스택 및 도구 (Technologies & Tools)

#### **프론트엔드**

- **HTML5** / **CSS3** / **JavaScript**: 기본 구조와 스타일링
- **Bootstrap**: UI 컴포넌트와 반응형 디자인
- **EJS (Embedded JavaScript Templates)**: 서버 사이드 렌더링을 위한 템플릿 엔진

#### **백엔드**

- **Node.js**: 서버 사이드 애플리케이션 실행
- **Express.js**: 백엔드 프레임워크로 API 및 라우팅 처리

#### **데이터베이스**

- **MongoDB**: 데이터 저장소
- **Mongoose**: MongoDB와 상호작용하기 위한 ODM(Object Data Modeling) 라이브러리

#### **사용자 인증**

- **Passport.js**: 사용자 인증 및 세션 관리
- **bcrypt**: 비밀번호 해싱 및 보안 처리

#### **배포 및 인프라**

- **Render**: 초기 배포 플랫폼
- **AWS EC2**: v1.3.0 이후 애플리케이션 배포 환경
- **AWS Route 53**: 도메인 관리 및 라우팅 설정
- **AWS CloudFront**: 콘텐츠 전송 네트워크(CDN)로 최적화
- **Nginx**: 리버스 프록시 및 서버 성능 최적화
- **GitHub Actions**: CI/CD 자동화

#### **기타 주요 라이브러리 및 툴**

- **dotenv**: 환경 변수 관리
- **method-override**: HTTP 메서드 오버라이드(DELETE, PUT 등)
- **connect-flash**: 플래시 메시지 처리(알림, 오류 메시지)
- **Express Validator**: 입력 데이터 유효성 검사
- **Mapbox SDK**: 지도와 클러스터 기능 구현
- **Cloudinary**: 이미지 저장 및 관리
- **Helmet**: 보안 헤더 설정
- **Joi**: 입력 데이터 유효성 검사
- **sitemap**: 자동 사이트맵 생성

---

### 향후 개선 사항 (Future Enhancements)

1. **이미지 갤러리**: 다중 이미지 업로드 및 갤러리 뷰 제공
2. **알림 시스템**: 사용자 활동에 따른 실시간 알림 추가
3. **OAuth 가입**: Google, Facebook 등을 통한 인증
4. **유저정보 페이지 추가**: 이메일, 비밀번호 변경 가능, 본인이 작성한 캠프장 및 리뷰 조회
5. **사진 업로드 관리 도구 추가**: 드래그 앤 드롭, 사진 추가/삭제, 미리보기 등
6. **리뷰 내용 업데이트 기능**
7. **주소 입력 시 실시간 지도 표시 및 선택 기능**
8. **AWS Lambda를 활용한 이미지 최적화**
9. **웹 성능 최적화를 위한 Redis 캐싱 적용**
