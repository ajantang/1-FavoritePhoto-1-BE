## PATCH /notifications

### req template

- description : 알림 체크
- path : /notifications/{notificationId}
- method : PATCH
- params
  - notificationId

### req example

- params
  e479a557-fc3a-46d9-b775-8c3d1711258e

### res template

- data
  - id : 알림 id
  - shopId : 관련 상점 id(null 허용. 상점에 관련된 알림이 많아서, 혹시 FE에서 상점 id가 필요할 수 있어서 추가)
  - message : 알림 메세지
  - check : 알림 확인 여부
  - createdAt : 알림 생성 시간

### res example

- data : {
  "id": "e479a557-fc3a-46d9-b775-8c3d1711258e",
  "shopId": "8d444419-89d6-46b7-987c-89fc12f231aa",
  "message": "알림 테스트1",
  "check": true,
  "createdAt": "2024-10-22T05:40:27.661Z"
  }

## DELETE /notifications

### req template

- description : 알림 삭제
- path : /notifications/{notificationId}
- method : DELETE
- params
  - notificationId

### req example

- params
  e479a557-fc3a-46d9-b775-8c3d1711258e

### res template

- status

### res example

- status : 204
