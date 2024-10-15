## GET /users/my-cards

### req template

- description : 구매한 포토 카드 조회 (정렬 / 필터 / 키워드 / 페이지네이션)
- path : /users/my-cards
- method : GET
- header
  - Authorization : Bearer {accessToken}
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

- header :
  - Authorization : Bearer {accessToken}
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
      - sellerNickname : 판매자 닉네임

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
  sellerNickname : 프로여행러
  },
  {
  ...
  },
  ...
  ]
  }

## POST /users/my-cards

### req template

- description : 내 소유 포토 카드 등록
- path : /users/my-card
- method : POST
- header
  - Authorization : Bearer {accessToken}
- body
  - name : 카드 이름 (max-length 50)
  - description : 카드 설명 (max-length 1024)
  - image : 카드 이미지 url (max-length : 2048)
  - grade : 카드 등급 (int로 전달)
  - genre : 카드 장르 (int로 전달)
  - totalQuantity : 카드 생성 갯수
  - price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)

### req example

- header
  - Authorization : Bearer {accessToken}
- body : {
  name : 서울 밤하늘,
  description : 남산에서 본 서늘한 가을 밤 풍경
  image : http://code-it.com/test-image1.png,
  grade : 1,
  genre : 2,
  count : 2,
  price : 4,
}

### res template

- data
  - id : 카드 id
  - name : 카드 이름 (max-length 50)
  - description : 카드 설명 (max-length 1024)
  - image : 카드 이미지 url (max-length : 2048)
  - grade : 카드 등급 (int로 전달)
  - genre : 카드 장르 (int로 전달)
  - totalQuantity : 카드 생성 갯수
  - price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)


### res example

- data : {
  id : c9c35842-2fda-44cc-8873-d933220e7b37
  image : http://code-it.com/test-image1.png,
  grade : 1,
  genre : 2,
  count : 2,
  price : 4,
}

## GET /users/my-cards/shop

### req template

- description : 내가 상점에 등록한 포토 카드 목록 조회 (필터 : 등급, 장르, 매진 / 페이지네이션)
- path : /users/my-cards/shop
- method : GET
- header
  - Authorization : Bearer {accessToken}
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

- header :
  - Authorization : Bearer {accessToken}
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
      - sellerNickname : 판매자 닉네임

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
  sellerNickname : 프로여행러
  },
  {
  ...
  },
  ...
  ]
  }

## GET /users/my-cards/exchange

### req template

- description : 내가 교환 제시한 포토 카드 목록 조회
- path : /users/my-cards/exchange
- method : GET
- header
  - Authorization : Bearer {accessToken}
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

- header :
  - Authorization : Bearer {accessToken}
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
      - sellerNickname : 판매자 닉네임

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
  sellerNickname : 프로여행러
  },
  {
  ...
  },
  ...
  ]
  }

## GET /users/profile

### req template

- description : 사용자 프로필(닉네임) 조회
- path : /users/profile
- method : GET
- header :
  - Authorization : Bearer {accessToken}

### req example

- header :
  - Authorization : Bearer {accessToken}


### res template

- data : {
  nickname : 닉네임
}

### res example

- data : {
  nickname : 코드잇16
}

## GET /users/check-email

### req template

- description : 이메일 중복 여부 확인(확인하는 별도 UI 기획이 없음)
- path : /users/check-email
- method : GET
- header :
  - Authorization : Bearer {accessToken}

### req example

- header :
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
- header :
  - Authorization : Bearer {accessToken}

### req example

- header :
  - Authorization : Bearer {accessToken}

### res template

- data : {
  isPossible : 사용 가능 여부(bool)
}


### res example

- data : {
  isPossible : true
}

