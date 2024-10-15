## GET /notifications

### req template

- description : 포토 카드 판매 내역/판매 매진/교환 요청/교환 성사 등의 알림 목록 조회
- path : /notifications
- method : GET
- header
  - Authorization : Bearer {accessToken}

### req example

- header
  - Authorization : Bearer {accessToken}

### res template

- data
  - totalCount : 15,
  - notifications
    - {알림 배열}
      - id : 알림 id
      - shopId : 관련 상점 id(null 허용. 상점에 관련된 알림이 많아서, 혹시 FE에서 상점 id가 필요할 수 있어서 추가)
      - message : 알림 메세지
      - check : 알림 확인 여부

### res example

- data : {
  totalCount : 15,
  notifications : [
  {
  id : 2535e680-ceed-4ee1-b62b-dcbae7d1a8af,
  shopId : d50b6f07-768c-4ea4-8248-f1e26d2fa5f1,
  message : 코드잇0이 [ COMMON | 강남 ]을 3장 구매하였습니다,
  check : false
  },
  {
  id : 0143aa93-87a3-4ca6-bde1-5c8b5932fc01,
  shopId : 30303392-0808-4b7a-a673-6447bc218fe3,
  message : 코드잇13이 [ COMMON | 강남 ]을 1장 구매하였습니다,
  check : true
  }
  ]
  }

## PATCH /notifications

### req template

- description : 알림 수정(알림 확인만 수정하는 UI 존재)
- path : /notifications/{notificationId}
- method : PATCH
- header
  - Authorization : Bearer {accessToken}
- body
  - message : 알림 메세지(max-length : 1024)
  - check : 알림 확인 여부(bool)

### req example

- header
  - Authorization : Bearer accessToken
- body : {
  check : true,
  }

### res template

- data : {
  id : 알림 id
  shopId : 관련 상점 id(null 허용. 상점에 관련된 알림이 많아서, 혹시 FE에서 상점 id가 필요할 수 있어서 추가)
  message : 알림 메세지
  check : 알림 확인 여부
  }

### res example

- data : {
  id : 2535e680-ceed-4ee1-b62b-dcbae7d1a8af,
  shopId : d50b6f07-768c-4ea4-8248-f1e26d2fa5f1,
  message : 코드잇0이 [ COMMON | 강남 ]을 3장 구매하였습니다,
  check : true
  }
