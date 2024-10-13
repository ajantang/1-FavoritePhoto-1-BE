## GET /users/my-cards

### req template

- description : 구매한 포토 카드 조회 (정렬 / 필터 / 키워드 / 페이지네이션)
- path : /users/my-cards
- method : GET
- header
  - Authorization : Bearer {accessToken}
- query
  - sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
  - genre : 미정(필터)
  - soldout : true || false매진 여부(필터)
  - grade : COMMON || RARE || SUPER_RARE || LEGENDARY
  - ownerId : 판매자 ID(필터)
  - pageNum : 페이지 넘버(페이지네이션)
  - pageSize : 페이지 사이즈(페이지네이션)
  - keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색

### req example

- header :
  - Authorization : Bearer {accessToken}
- query :
  - sort=recent&genre=travel&soldout=false&grade=SUPER_RARE&ownerId=1&pageNum=1&pageSize=9&keyword=스페인

### res template

- data :
  - totalCount : 총 카드 수,
  - cards : 카드 배열
    - {카드 정보}
      - image : 이미지 url
      - grade : 이미지 등급
      - genre : 이미지 장르
      - count : 이미지 보유량
      - price : 이미지 가격(포인트)
      - sellerNickname : 판매자 닉네임

### res example

- data : {
  totalCount : 100,
  card : [
  {
  image : http://code-it.com/test-image1.png,
  grade : rare,
  genre : travel,
  count : 2,
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

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/my-cards

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/my-cards

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :

## GET /users/

### req template

- description :
- path :
- method :
- header
  - property1 :
  - property2 :
- body
  - property1 :
  - property2 :

### req example

- header :
- body :

### res template

- data :

### res example

- data :
