# {1팀 (Favorite Photo)}

[📝**FrontEnd Repository**](https://github.com/ajantang/1-FavoritePhoto-1-FE)  
[📝**팀 협업 문서(Notion)**](https://www.notion.so/1193c19d1a2f80cc8fa8f23ecd549104?v=1193c19d1a2f81bea9c7000c6921c343)

# 🙋‍♂️ 팀원 구성

- 박명준(https://github.com/mjpark-k)
- 박성현(https://github.com/wxy0415)
- 송영섭(https://github.com/songyoungsub)
- 안재민(https://github.com/mini-1018)
- 이진우(https://github.com/ajantang)

# 프로젝트 소개

- "최애의 포토"는 디지털 시대의 새로운 수집 문화를 선도하는 플랫폼입니다. 자신이 좋아하는 아이돌이나 스포츠 스타, 그림 등 디지털 포토카드를 손쉽게 사고팔 수 있는 공간으로, 특별한 커뮤니티를 제공합니다.
- 프로젝트 기간: 2024. 10. 08(화) ~ 2024. 10. 31(목)

# 🛠 기술 스택

- **BackEnd**  
  ![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
  ![](https://img.shields.io/badge/Cookies-FFFACD?style=for-the-badge&logo=cookie&logoColor=black)
  ![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![](https://img.shields.io/badge/Superstruct-7B3F00?style=for-the-badge&logo=javascript&logoColor=white)
  ![](https://img.shields.io/badge/Multer-007ACC?style=for-the-badge&logo=express&logoColor=white)
  ![](https://img.shields.io/badge/Amazon_AWS_S3-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
  ![](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
  ![](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)
  ![](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
- **Database**  
  ![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- **공통 Tool**  
  ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)![](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)![](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)![](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

# R&R

### 공통
 - API 작성
 - API 명세서 작성
 - 노션 자료 작성
 - FE 미디어 쿼리 작성
 - BE 트러블 슈팅
 - FE 요청사항 처리
 - 코드 리뷰

### 송영섭
 - AWS 연동
 - 발표 자료 수집
 - 발표 자료 정리
 - README 작성
 - FA QA

### 이진우
- 구글 클라우드 연동
- 세션 인증
- 레디스 연동
- 회의록 작성

# 테이블 관계도
<details>
  
![image](https://github.com/user-attachments/assets/c0107cdc-c35a-4d43-8442-894a92061113)
![image](https://github.com/user-attachments/assets/674b91e6-49a3-4e9d-b5ff-a898542f2078)

</details>

# API 명세서

[API 명세서](https://www.notion.so/API-1193c19d1a2f81d6a16ee03054e608c6)

# 📂 BackEnd 파일구조

<details>
  
```bash
  📦1-FavoritePhoto-BE
 ┣ 📂docs
 ┃ ┣ 📜api.md
 ┃ ┣ 📜api_auth.md
 ┃ ┣ 📜api_card.md
 ┃ ┣ 📜api_exchange.md
 ┃ ┣ 📜api_image.md
 ┃ ┣ 📜api_norification.md
 ┃ ┣ 📜api_point.md
 ┃ ┣ 📜api_shop.md
 ┃ ┣ 📜api_user.md
 ┃ ┗ 📜tech-stack.md
 ┣ 📂prisma
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📂20241017132355_init
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┣ 📂20241017153750_add_user_id_card_id_unique_constraint
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┣ 📂20241025014714_add_shop_column_for_exchange_info
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┣ 📂20241025020246_keep_noti_row_after_shop_row_deleted
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┗ 📜migration_lock.toml
 ┃ ┗ 📜schema.prisma
 ┣ 📂src
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜box.js
 ┃ ┃ ┣ 📜card.js
 ┃ ┃ ┣ 📜error.js
 ┃ ┃ ┣ 📜exchange.js
 ┃ ┃ ┣ 📜grade.js
 ┃ ┃ ┣ 📜notification.js
 ┃ ┃ ┣ 📜password.js
 ┃ ┃ ┣ 📜session.js
 ┃ ┃ ┣ 📜shop.js
 ┃ ┃ ┗ 📜user.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜admin-controller.js
 ┃ ┃ ┣ 📜auth-controller.js
 ┃ ┃ ┣ 📜cards-controller.js
 ┃ ┃ ┣ 📜exchange-controller.js
 ┃ ┃ ┣ 📜image-controller.js
 ┃ ┃ ┣ 📜notification-controller.js
 ┃ ┃ ┣ 📜own-controller.js
 ┃ ┃ ┣ 📜point-controller.js
 ┃ ┃ ┣ 📜shop-controller.js
 ┃ ┃ ┗ 📜users-controller.js
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜custom-error.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜admin.js
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜error.js
 ┃ ┃ ┣ 📜image-uploader.js
 ┃ ┃ ┣ 📜validate-DB-data.js
 ┃ ┃ ┗ 📜validate-data.js
 ┃ ┣ 📂repositories
 ┃ ┃ ┣ 📜card-repository.js
 ┃ ┃ ┣ 📜exchange-repository.js
 ┃ ┃ ┣ 📜last-box-time-repository.js
 ┃ ┃ ┣ 📜notification-repository.js
 ┃ ┃ ┣ 📜own-repository.js
 ┃ ┃ ┣ 📜prisma.js
 ┃ ┃ ┣ 📜purchase-repository.js
 ┃ ┃ ┣ 📜session-repository.js
 ┃ ┃ ┣ 📜shop-repository.js
 ┃ ┃ ┗ 📜user-repository.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth-router.js
 ┃ ┃ ┣ 📜exchange-route.js
 ┃ ┃ ┣ 📜image-router.js
 ┃ ┃ ┣ 📜notification-router.js
 ┃ ┃ ┣ 📜point-router.js
 ┃ ┃ ┣ 📜shop-router.js
 ┃ ┃ ┗ 📜user-router.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📂mappers
 ┃ ┃ ┃ ┣ 📜box-mapper.js
 ┃ ┃ ┃ ┣ 📜card-mapper.js
 ┃ ┃ ┃ ┣ 📜exchange-mapper.js
 ┃ ┃ ┃ ┣ 📜notification-mapper.js
 ┃ ┃ ┃ ┗ 📜shop-mapper.js
 ┃ ┃ ┣ 📂selects
 ┃ ┃ ┃ ┣ 📜card-select.js
 ┃ ┃ ┃ ┣ 📜exchange-select.js
 ┃ ┃ ┃ ┣ 📜notification-select.js
 ┃ ┃ ┃ ┣ 📜own-select.js
 ┃ ┃ ┃ ┣ 📜session-select.js
 ┃ ┃ ┃ ┣ 📜shop-select.js
 ┃ ┃ ┃ ┗ 📜user-select.js
 ┃ ┃ ┣ 📜auth-service.js
 ┃ ┃ ┣ 📜exchange-service.js
 ┃ ┃ ┣ 📜image-service.js
 ┃ ┃ ┣ 📜notification-service.js
 ┃ ┃ ┣ 📜own-service.js
 ┃ ┃ ┣ 📜point-service.js
 ┃ ┃ ┣ 📜shop-service.js
 ┃ ┃ ┗ 📜user-service.js
 ┃ ┣ 📂structs
 ┃ ┃ ┣ 📂patterns
 ┃ ┃ ┃ ┗ 📜pattern.js
 ┃ ┃ ┣ 📜card-struct.js
 ┃ ┃ ┣ 📜exchange-struct.js
 ┃ ┃ ┣ 📜shop-struct.js
 ┃ ┃ ┣ 📜user-struct.js
 ┃ ┃ ┗ 📜uuid.js
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜notification-util.js
 ┃ ┃ ┣ 📜number-util.js
 ┃ ┃ ┣ 📜password-util.js
 ┃ ┃ ┣ 📜query-util.js
 ┃ ┃ ┣ 📜sellout-util.js
 ┃ ┃ ┗ 📜time-util.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜app.js
 ┣ 📜config.js
 ┣ 📜env.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```
</details>

# 🏁 구현 홈페이지

[Favorite Photo](https://dev-1-favorite-photo-1-fe.vercel.app/)

# 😊 프로젝트 회고록

[프로젝트 회고록](https://www.notion.so/1193c19d1a2f817b8e43ff4adb819c32)
