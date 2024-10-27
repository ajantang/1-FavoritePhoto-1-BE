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

- **FrontEnd**  
  ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge) ![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white) ![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- **BackEnd**  
  ![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- **Database**  
  ![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- **공통 Tool**  
  ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)![](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)![](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)![](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

# 팀원별 구현 기능 상세

### 박명준

### 박성현

### 송영섭

### 안재민

### 이진우

# 📂 파일구조

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

[Favorite Photo]()

# 😊 프로젝트 회고록

[프로젝트 회고록]()
