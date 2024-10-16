## POST /shop

### req template

- description : 내 포토 카드 판매 등록
- path : /shop
- method : POST
- header
  - Authorization : Bearer {accessToken}
- body
  - cardId: 카드ID
  - salesQuantity: 판매수량
  - price: 장당 가격
  - exchangeGrade: 교환 희망 등급 (INT)
  - exchangeGenre: 교환 희망 장르 (INT)
  - exchangeDescription: 교환 희망 설명

### req example

- header
  - Authorization : Bearer {accessToken}
- body : {
  cardId: "8f1e54c6-f439-4b3b-b710-296bd27cdd72",
  salesQuantity: 3,
  price: 4,
  exchangeGrade: 0,
  exchangeGenre: 2,
  exchangeDescription: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다"
  }

### res template

- data 
  - salesInfo : 판매정보
    - id: 상점ID
    - image: 사진
    - name: 카드 이름
    - grade: 등급
    - genre: 장르
    - creatorNickname: 원작자 이름
    - sellerNickname: 판매자 이름
    - description: 설명
    - price: 장당 가격
    - remainingQuantity: 잔여 수량
    - totalQuantity: 총 판매 수량
  - exchangePreference: 교환 희망 정보
    - description: 교환 희망 설명
    - grade: 교환 희망 등급
    - genre: 교환 희망 장르

### res example

- data : {
	salesInfo : {
		id: "adfc1706-a7f6-4c6e-a006-1733a854afbb",
		image: "url 주소",
		name: "우리집 앞마당",
		grade: 1,
		genre: 4,
		creatorNickname: "미스쏜",
		sellerNickname: "유디",
		description: "우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.",
		price: 4,
		remainingQuantity: 3,
		totalQuantity: 3
	},
	exchangePreference: {
		description: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다",
		grade: 0,
		genre: 4,
	}		
}

## GET /shop

### req template

- description : 상점 목록 조회
- path : /shop
- method : GET
- - query
    - sort: 최신순, 오래된 순, 가격 낮은 순, 가격 높은 순 정렬
        - recent || oldest || cheapest || highest
    - genre: 장르 (필터)
        - (INT)
    - sellout: 매진 여부 (필터)
        - true || false
    - grade: 등급 (필터)
        - (INT)
    - pageNum: 페이지 넘버(페이지네이션)
    - pageSize: 페이지 사이즈(페이지네이션)
    - keyword: 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색

### req example

- query : sort=recent&genre=4&sellout=false&grade=1&pageNum=1&pageSize=9&keyword=스페인

### res template

- - data
    - total: 총 갯수
    - cards: 카드 정보
        - id: 상점 아이디
        - cardId: 카드ID (필요없을 시 삭제 예정)
        - sellout: 매진 여부
        - image: 사진
        - name: 포토카드 이름
        - grade: 등급
        - genre: 장르
        - creatorNickname: 원작자 이름
        - price: 판매 가격
        - remainingQuantity: 잔여 수량
        - totalQuantity: 총 판매 수량

### res example

- data : {
	total: 10,
	cards: [
		{
			id: "adfc1706-a7f6-4c6e-a006-1733a854afbb",
			cardId:"8f1e54c6-f439-4b3b-b710-296bd27cdd72",
			sellout: false,
			image: "url 주소",
			name: "우리집 앞마당",
			grade: 1,
			genre: 4,
			creatorNickname: "미스쏜",
			price: 4,
			remainingQuantity: 3,
			totalQuantity: 5
		},
		{
			id: "adfc1706-a7f6-4c6e-a006-1733a854afbb",
			cardId:"8f1e54c6-f439-4b3b-b710-296bd27cdd72",
			sellout: false,
			image: "url 주소",
			name: "우리집 앞마당",
			...
    },
    ...
	]
}

## api template

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
