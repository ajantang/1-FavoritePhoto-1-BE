## GET /users/my-cards

### req template

- description : 구매한 포토 카드 목록 조회 (정렬 / 필터 / 키워드 / 페이지네이션)
- path : /users/my-cards
- method : GET
- query
  - sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
  - genre : 장르 (필터 / int로 전달)
  - sellout : true || false매진 여부 (필터) - 삭제 예정
  - grade : 등급 (필터 / int로 전달)
  - ownerId : 판매자 ID(필터)
  - pageNum : 페이지 넘버(페이지네이션)
  - pageSize : 페이지 사이즈(페이지네이션)
  - keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색

### req example

- query :
  - sort=recent?genre=1&&grade=0&&pageSize=15&&pageNum=1

### res template

- data :
  - totalCount : 총 카드 수,
  - countsGroupByGrade : 등급 별 카드 수
  - cards : 카드 배열
    - {카드 정보}
      - id : 카드 아이디
      - image : 카드 이미지 url (max-length : 2048)
      - name : 카드 이름
      - grade : 카드 등급 (int로 전달)
      - genre : 카드 장르 (int로 전달)
      - price : 카드 가격(포인트)
      - nickname : 카드 생성자 닉네임
      - quantity : 카드 보유량

### res example

- data : {
  "totalCount": 8,
  "countsGroupByGrade": {
  "0": 8
  },
  "cards": [
  {
  "id": "df8d45ef-3178-46ce-959f-0f1613eb844a",
  "image": "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
  "name": "테스트 이미지3",
  "grade": 0,
  "genre": 1,
  "price": 3,
  "nickname": "코드잇05",
  "quantity": 8
  }
  ]
  }

## GET /users/my-cards/:cardId

### req template

- description : 보유한 포토 카드 조회 (정렬 / 필터 / 키워드 / 페이지네이션)
- path : /users/my-cards
- method : GET
- param
  - cardId : 카드 id

### req example

- param
  c618558f-f82a-456e-bb98-62084afc7954

### res template

- data
  - id : 카드 id
  - image : 카드 이미지 url (max-length : 2048)
  - name : 카드 이름 (max-length 50)
  - grade : 카드 등급 (int로 전달)
  - genre : 카드 장르 (int로 전달)
  - price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)
  - nickname : 카드 생성자 닉네임
  - description : 카드 설명 (max-length 1024)
  - quantity : 카드 생성 갯수

### res example

- data : {
  "id": "c618558f-f82a-456e-bb98-62084afc7954",
  "image": "https://cdn.pixabay.com/photo/2024/09/07/02/34/penguins-9028827_640.jpg",
  "name": "낮 펭귄",
  "grade": 3,
  "genre": 2,
  "price": 4,
  "nickname": "코드잇05",
  "description": "동물 펭귄01",
  "quantity": 7
  }

## POST /users/my-cards

### req template

- description : 내 소유 포토 카드 등록
- path : /users/my-cards
- method : POST
- body
  - name : 카드 이름 (max-length 50)
  - description : 카드 설명 (max-length 1024)
  - image : 카드 이미지 url (max-length : 2048)
  - grade : 카드 등급 (int로 전달)
  - genre : 카드 장르 (int로 전달)
  - quantity : 카드 생성 갯수
  - price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)

### req example

- body : {
  "name" : "테스트 이미지12",
  "description" : "카드 생성 테스트12",
  "image" : "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
  "grade" : 3,
  "genre" : 0,
  "price" : 2,
  "quantity" : 2
  }

### res template

- data
  - id : 카드 id
  - image : 카드 이미지 url (max-length : 2048)
  - name : 카드 이름 (max-length 50)
  - description : 카드 설명 (max-length 1024)
  - grade : 카드 등급 (int로 전달)
  - genre : 카드 장르 (int로 전달)
  - price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)
  - nickname : 카드 생성자 닉네임
  - quantity : 카드 생성 갯수

### res example

- data : {
  "id": "1c6ca252-c799-47d7-bf97-1253857384d2",
  "image": "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
  "name": "테스트 이미지12",
  "description": "카드 생성 테스트12",
  "grade": 3,
  "genre": 0,
  "price": 2,
  "nickname": "코드잇05",
  "quantity": 2
  }

## GET /users/shop

### req template

- description : 내가 상점에 등록한 포토 카드 목록 조회 (필터 : 등급, 장르, 매진 / 페이지네이션)
- path : /users/shop
- method : GET
- query
  - sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
  - genre : 장르 (필터 / int로 전달)
  - sellout : true || false매진 여부 (필터)
  - grade : 등급 (필터 / int로 전달)
  - pageNum : 페이지 넘버(페이지네이션)
  - pageSize : 페이지 사이즈(페이지네이션)
  - keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색
  - hasExchangeRequest : 해당 상점에 교환 신청 여부

### req example

- query :
  - sort=recent?genre=1&&grade=0&&pageSize=15&&pageNum=1&&sellout=false&&hasExchangeRequest=true

### res template

- data :
  - totalCount : 총 카드 수,
  - countsGroupByGrade : 등급 별 카드 수
  - shops : 카드 배열
    - {카드 정보}
      - id : 카드 아이디
      - image : 카드 이미지 url (max-length : 2048)
      - name : 카드 이름
      - grade : 카드 등급 (int로 전달)
      - genre : 카드 장르 (int로 전달)
      - price : 카드 가격(포인트)
      - nickname : 카드 생성자 닉네임
      - remainingQuantity : 판매 카드 잔여량,
      - totalQuantity : 판매 카드 총량,
      - sellout : 매진 여부
      - hasExchangeRequest : 교환 신청 여부

### res example

- data : {
  "totalCount": 2,
  "countsGroupByGrade": {
  "3": 2
  },
  "shops": [
  {
  "id": "b5ccc355-5abb-49a4-9eef-7a8a0de57310",
  "image": "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
  "name": "테스트 이미지12",
  "grade": 3,
  "genre": 0,
  "price": 2,
  "nickname": "코드잇05",
  "remainingQuantity": 1,
  "totalQuantity": 1,
  "sellout": false,
  "hasExchangeRequest": true
  },
  {
  "id": "b5ccc355-5abb-49a4-9eef-7a8a0de57310",
  "image": "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
  "name": "테스트 이미지12",
  "grade": 3,
  "genre": 0,
  "price": 2,
  "nickname": "코드잇05",
  "remainingQuantity": 1,
  "totalQuantity": 1,
  "sellout": false,
  "hasExchangeRequest": true
  }
  ]
  }

## GET /users/exchange

### req template

- description : 내가 교환 제시한 포토 카드 목록 조회
- path : /users/exchange
- method : GET
- query
  - sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
  - genre : 장르 (필터 / int로 전달)
  - sellout : true || false매진 여부 (필터)
  - grade : 등급 (필터 / int로 전달)
  - ownerId : 판매자 ID(필터)
  - pageNum : 페이지 넘버(페이지네이션)
  - pageSize : 페이지 사이즈(페이지네이션)
  - keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색

### req example

- query :
  - sort=recent&genre=travel&sellout=false&grade=SUPER_RARE&ownerId=1&pageNum=1&pageSize=9&keyword=스페인

### res template

- data :
  - totalCount : 총 카드 수,
  - cards : 카드 배열
    - {카드 정보}
      - image : 카드 이미지 url (max-length : 2048)
      - grade : 카드 등급 (int로 전달)
      - genre : 카드 장르 (int로 전달)
      - ownCount : 카드 보유량
      - price : 카드 가격(포인트)
      - authorNickname : 카드 생성자 닉네임

### res example

- data : {
  totalCount : 100,
  card : [
  {
  image : http://code-it.com/test-image1.png,
  grade : 1,
  genre : 2,
  ownCount : 2,
  price : 4,
  authorNickname : 프로여행러
  },
  {
  ...
  },
  ...
  ]
  }

## GET /users/my-info

### req template

- description : 사용자 정보 조회 : point 확인용
- path : /users/my-info
- method : GET

### req example

### res template

- data
  - id : 사용자 아이디(FE에서 필요없다면 삭제 예정)
  - email : 사용자 이메일
  - nickname : 사용자 닉네임
  - point : 사용자 포인트
  - createdAt : 아이디 생성 시간

### res example

- data : {
  "id": "fe192f26-7afa-4b85-a6f8-5dc8469a8aee",
  "email": "codeit06@codeit.com",
  "nickname": "코드잇06",
  "point": 0,
  "createdAt": "2024-10-17T01:19:58.198Z"
  }

## GET /users/check-email

### req template

- description : 이메일 중복 여부 확인(확인하는 별도 UI 기획이 없음)
- path : /users/check-email
- method : GET
- headers :
  - Authorization : Bearer {accessToken}

### req example

- headers :
  - Authorization : Bearer {accessToken}

### res template

- data : {
  isPossible : 사용 가능 여부(bool)
  }

### res example

- data : {
  isPossible : true
  }

## GET /users/check-nickname

### req template

- description : 닉네임 중복 여부 확인(확인하는 별도 UI 기획이 없음)
- path : /users/check-nickname
- method : GET
- headers :
  - Authorization : Bearer {accessToken}

### req example

- headers :
  - Authorization : Bearer {accessToken}

### res template

- data : {
  isPossible : 사용 가능 여부(bool)
  }

### res example

- data : {
  isPossible : true
  }

## GET /notifications

### req template

- description : 포토 카드 판매 내역/판매 매진/교환 요청/교환 성사 등의 알림 목록 조회
- path : /users/notifications
- method : GET
- query
  - pageNum : 페이지 넘버(페이지네이션)
  - pageSize : 페이지 사이즈(페이지네이션)

### req example

- query
  pageNum=1&&pageSize=2

### res template

- data
  - totalCount : 15,
  - notifications
    - {알림 배열}
      - id : 알림 id
      - shopId : 관련 상점 id(null 허용. 상점에 관련된 알림이 많아서, 혹시 FE에서 상점 id가 필요할 수 있어서 추가)
      - message : 알림 메세지
      - check : 알림 확인 여부
      - timeDifference : 알림 목록 조회 호출 시간 - 알림 생성 시간 (millisec)

### res example

- data : {
  "totalCount": 3,
  "notifications": [
  {
  "id": "e479a557-fc3a-46d9-b775-8c3d1711258e",
  "shopId": "8d444419-89d6-46b7-987c-89fc12f231aa",
  "message": "알림 테스트1",
  "check": false,
  "timeDifference": 2961749
  },
  {
  "id": "f411e32a-5a6b-4200-98f0-c548f6f7a376",
  "shopId": "8d444419-89d6-46b7-987c-89fc12f231aa",
  "message": "알림 테스트2",
  "check": false,
  "timeDifference": 2961749
  }
  ]
  }
