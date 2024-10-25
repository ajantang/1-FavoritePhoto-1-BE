## POST /points/box

### req template

- description : 랜덤 포인트(1~3) 추가. API 호출 시 랜덤으로 1~3의 포인트를 추가(호출 시간 기록 - 1시간에 한번만 호출되도록 userId와 같이 기록)
- path : /points/box
- type : POST

### req example

### res template

- data :
  - id : 사용자 id,
  - success : 포인트 획득 성공 여부,
  - earnedPoint : 얻은 포인트,
  - point : 현재 포인트

### res example

- data : {
  "id": "30789d03-5f9b-4ba9-8743-28820d0d89f5",
  "success": false,
  "earnedPoint": 0,
  "point": 9
  }

## GET /points/last-box-time

### req template

- description : 마지막으로 호출한 POST /point/box 시간 차이 확인
- path : /points/last-box-time
- type : GET

### req example

### res template

- data :
  - timeDifference : 마지막 박스 오픈 시간과 차이
  - success : 박스 오픈 가능 시간 경과 여부

### res example

- data : {
  "timeDifference": 26569,
  "success": false
  }
