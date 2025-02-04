## Yelp Camp V1.1.0

### 1. 코드 리팩토링
#### 1) `app.js` 코드 분리
- `helmet` 및 `session` 관련 로직을 `middlewares/helmet.js`, `middlewares/session.js`로 분리
- 데이터베이스 연결(`db connection`)을 `config/db.js`로 분리
- 기존 `middlewares/middleware.js` 내용을 기능별로 분리하고, `middlewares/index.js`에서 통합
  - 인증 관련 (`isLoggedIn`, `storeReturnTo`) → `middlewares/auth.js`
  - 데이터 검증 관련 (`validateCampground`, `validateReview`) → `middlewares/validators.js`
  - 권한 확인 관련 (`isAuthor`, `isReviewAuthor`) → `middlewares/permissions.js`
- 홈 페이지 라우트(`/`)를 `routes/home.js` 및 `controllers/home.js`로 분리

### 2. 사용자 경험 개선
#### 1) 회원가입 후 자동 로그인 및 리디렉션 개선
- `/register`에서 회원가입 후 자동으로 `/login`을 호출
- 로그인 후 `campgrounds` 페이지로 이동하도록 수정
- 기존 사용자가 요청한 URL로 리디렉션하는 기능에서 `/register` 경로 제외

#### 2) 홈 페이지 개선
- 스타일 개편
- 불필요한 `home`, `campgrounds` 버튼 삭제

### 3. 기능 추가
#### 1) 파비콘(Favicon) 추가
- `/public/favicon` 폴더에 아이콘 추가
- `/views/partials/favicon.ejs` 생성 후 `home.ejs` 및 `boilerplate.ejs`에 포함

#### 2) 기본 이미지 설정
- 캠프장 목록(`campgrounds/index.ejs`) 및 상세 페이지(`campgrounds/show.ejs`)에서 이미지가 없을 경우 기본 이미지(`/public/images/default-image.jpg`) 표시

#### 3) 검색 기능 추가
- MongoDB의 `$text` 인덱스를 사용하여 캠프장 `title` 및 `description`을 기준으로 검색 가능하도록 구현

#### 4) 작성 및 수정 날짜 추가
- 캠프장 및 리뷰 작성/업데이트 일자를 표시

#### 5) 리뷰 시스템 개선
- 캠프장 상세 페이지에서 총 리뷰 수 및 평균 평점 표시
- 최신 리뷰가 가장 위에 나타나도록 정렬
- 리뷰 작성자의 이름 앞에 사용자 아이콘 추가
- 홈 캠프장 목록에서 캠프 아이콘 추가


## Yelp Camp v1.0.0

Yelp Camp는 사용자가 캠프장을 추가, 조회, 수정, 삭제할 수 있는 웹 애플리케이션입니다. 이 프로젝트는 MERN 스택(MongoDB, Express.js, React, Node.js)을 사용해 개발되었으며, Udemy 웹 개발 부트캠프의 학습 내용을 기반으로 만들어졌습니다.

### 주요 기능 (Features)

1. **캠프장 목록 보기**  
   - 사용자가 등록된 모든 캠프장을 조회할 수 있습니다.
   - 각 캠프장에 대한 간략한 정보(이름, 이미지, 설명)가 표시됩니다.

2. **캠프장 세부 정보 보기**  
   - 특정 캠프장에 대한 세부 정보를 볼 수 있는 개별 페이지가 있습니다.
   - 상세 정보에는 이름, 이미지, 설명, 가격 등이 포함됩니다.

3. **캠프장 추가**  
   - 인증된 사용자만 캠프장을 추가할 수 있습니다.
   - 새 캠프장을 추가할 때 제목, 가격, 설명을 입력하하고 이미지를 업로드드 합니다.

4. **캠프장 수정**  
   - 캠프장 작성자는 자신의 캠프장을 수정할 수 있습니다.

5. **캠프장 삭제**  
   - 캠프장 작성자는 자신의 캠프장을 삭제할 수 있습니다.

6. **사용자 인증 및 권한**  
   - 사용자 회원가입 및 로그인 기능이 구현되어 있습니다.
   - 인증된 사용자만 특정 작업(캠프장 추가, 수정, 삭제)을 수행할 수 있습니다.

7. **리뷰 시스템**  
   - 사용자는 각 캠프장에 리뷰를 작성하고 삭제할 수 있습니다.
   - 별점 평가 기능이 포함됩니다.

8. **반응형 디자인**  
   - 모든 화면은 데스크톱과 모바일 환경에 최적화되어 있습니다.

9. **캠프장 위치 표시**  
   - **Mapbox**를 사용하여 개별 캠프장의 위치를 표시합니다.
   - 클러스터 맵을 통해 모든 캠프장의 위치를 시각적으로 보여줍니다.

10. **이미지 업로드**  
    - **Cloudinary**를 사용하여 캠프장 사진을 저장 및 불러옵니다.

11. **보안 강화**  
    - **Helmet** 미들웨어를 사용하여 일반적인 보안 취약점을 방지합니다.
    - **Express-mongo-sanitize**를 사용하여 NoSQL 인젝션 공격을 차단합니다.
    - **Sanitize-html**을 활용하여 입력 데이터를 클린 처리합니다.

12. **유효성 검사**  
    - **Joi**를 사용하여 사용자 입력 데이터를 검증합니다.

13. **애플리케이션 배포**  
    - **Render**를 통해 애플리케이션이 배포되었습니다.

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

#### **기타 주요 라이브러리 및 툴**
- **dotenv**: 환경 변수 관리
- **method-override**: HTTP 메서드 오버라이드(DELETE, PUT 등)
- **connect-flash**: 플래시 메시지 처리(알림, 오류 메시지)
- **Express Validator**: 입력 데이터 유효성 검사
- **Mapbox SDK**: 지도와 클러스터 기능 구현
- **Cloudinary**: 이미지 저장 및 관리
- **Helmet**: 보안 헤더 설정
- **Joi**: 입력 데이터 유효성 검사
- **Render**: 애플리케이션 배포

---

### 설치 및 실행 방법 (Installation & Usage)

1. 이 저장소를 클론합니다.  
   ```bash
   git clone https://github.com/username/yelp-camp.git
   cd yelp-camp
   ```

2. 필요한 패키지를 설치합니다.  
   ```bash
   npm install
   ```

3. MongoDB 데이터베이스를 실행합니다.  
   ```bash
   mongod
   ```

4. `.env` 파일을 생성하고 환경 변수를 설정합니다.  
   예:
   ```
   DATABASE_URL=mongodb://localhost:27017/yelp-camp
   SECRET=yourSecretKey
   CLOUDINARY_CLOUD_NAME=yourCloudName
   CLOUDINARY_API_KEY=yourApiKey
   CLOUDINARY_API_SECRET=yourApiSecret
   MAPBOX_TOKEN=yourMapboxToken
   ```

5. 애플리케이션을 실행합니다.  
   ```bash
   npm start
   ```

6. 브라우저에서 `http://localhost:3000`에 접속합니다.

---

### 향후 개선 사항 (Future Enhancements)

1. **검색 기능**: 캠프장 이름 및 위치를 기준으로 검색
2. **이미지 갤러리**: 다중 이미지 업로드 및 갤러리 뷰 제공
3. **알림 시스템**: 사용자 활동에 따른 실시간 알림 추가
4. **React 전환**: 프론트엔드를 React로 마이그레이션
5. **코드 리팩터링**: app.js에 있는 코드 리팩터링(db, 미들웨어, session, helmet 등)
6. **Favicon 설정**
7. **Google 서치 및 애널리틱스 등록**
8. **유저 신규 가입 시 동일 페이지에서 아이디, 이메일 중복 확인**
9. **신규 가입 시 이메일 검증**: 이메일 보내서 재접속 확인
10. **유저정보 페이지 추가**: 이메일, 비밀번호 변경 가능
11. **유저정보 페이지에서 본인이 작성한 캠프장 및 리뷰 조회**
12. **OAuth 가입**: Google, Facebook 등을 통한 인증
13. **사진 업로드 관리 도구 추가**: 드래그 앤 드롭, 사진 추가/삭제, 미리보기 등
14. **캠프장 조회 시 사진 수, 리뷰 총 개수, 평균 평점 표시**
15. **캠프장 등록/수정 시 일시 저장 기능**
16. **리뷰 등록 시 등록 시점 저장**
17. **리뷰 내용 업데이트 기능**
18. **이미지 유효성 검사 추가**: 업로드된 이미지 파일의 크기 및 형식 검증
19. **캠프장 정보 삭제 시 Cloudinary 사진도 함께 삭제**
20. **주소 입력 시 실시간 지도 표시 및 선택 기능**
---

### Dependencies

```json
{
  "@mapbox/mapbox-sdk": "^0.16.1",
  "cloudinary": "^1.41.3",
  "connect-flash": "^0.1.1",
  "connect-mongo": "^5.1.0",
  "dotenv": "^16.4.7",
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^4.21.2",
  "express-async-errors": "^3.1.1",
  "express-mongo-sanitize": "^2.2.0",
  "express-session": "^1.18.1",
  "helmet": "^8.0.0",
  "joi": "^17.13.3",
  "method-override": "^3.0.0",
  "mongoose": "^8.9.2",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "multer-storage-cloudinary": "^4.0.0",
  "passport": "^0.7.0",
  "passport-local": "^1.0.0",
  "passport-local-mongoose": "^8.0.0",
  "sanitize-html": "^2.14.0"
}
```

