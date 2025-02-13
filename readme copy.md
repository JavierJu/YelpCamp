## 추가 개선예정 사항

index 페이지
클러스트 지도 팝업에서 이미지 및 show 페이지 링크 연결 완료 -> 스타일 개선?

1.  클러스트 지도 팝업에서 이미지 추가
2.  클러스트 지도 팝업에서 show 페이지 링크 추가
3.  클러스트 지도 팝업 스타일 개선

삭제 페이지
삭제 시 cloudinary 파일도 함께 삭제?

보안/유효성 검사
이미지 유효성 검사 필요 image: Joi.string().uri().required(),

Render에서 AWS로 이전
DB - MongoDB Altas -> MongoDB Altas AWS or AWS DynamoDB
도메인 - Render -> AWS 53
배포 - Render -> AWS Elastic Beanstalk -> AWS Amplify 로 전부?
이미지저장 - Cloudary -> AWS S3 Lambda

Codacy 적용? 코드 품질 분석
Jest로 test? 유닛 테스트 통합 테스트
CircleCI? CI/CD
Sentry? 에러 모니터링
LambdaTest? 크로스 브라우징 & 디바이스 테스트

CI/CD 시시
PR 워크플로우를 추가하면 배포를 안전하게 관리할 수 있음
CI/CD 분리: PR → 품질 검사, main 머지 후 → 배포
정적 포트폴리오에는 npm test(jest) 필요 없음 (추가적인 로직이 생기면 고려 가능)

구글서치콘솔(sitemap), 구글 아날리시스 등록?

좀 더 실질적인 Dummy data 입력

Cloudflare as a Content Delivery Network in conjunction with custom Google Domain and Heroku

Optimizing performance, security, and accessibility using Google Lighthouse

---

register 페이지
아이디, 이메일 회원 가입시 중복 검사
이메일로 검증 후 최초 로그인인

User account 정보관리 페이지 신설
회원 정보 변경 - 이메일, 비밀번호 변경
본인 게시글, 리뷰 확인
다른 사용자가 작성자 클릭 시 게시글, 리뷰 확인, 인스턴트 메시지 보내기?

외부계정정보로 로그인: 구글, 페이스북, 깃 가입정보로 로그인

사진 관리 관련
파일 업로드 시 파일명, 사이즈 등 표시, 삭제 버튼 등
사진 관리 라이브러리? 사진 자유롭게 빼거나 추가, 편집 가능?
cloudinary 사진 업로드 시 자동 최적화/사이즈변경 추가? 보통 필요한지?
transformation: [
{ fetch_format: 'auto', quality: 'auto' }, // 최적화
{ width: 300, height: 200, crop: 'auto', gravity: 'auto' } // 자동 크롭
]

new 페이지
주소 입력 - 지도에서 선택 가능? 일본 주소체계?
일본 맵 매칭
캠프그라운드 정보 있는지? 가상 데이터 생성?
실제 일본 캠프장 정보
mapbox 일본 주소체계 대응된다고 적혀있는데 어떤 의미?

edit 페이지
사진 관리 라이브러리? 사진 자유롭게 빼거나 추가, 편집 가능?

review 페이지
리뷰도 업데이트 가능하게
