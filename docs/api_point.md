## POST /points/box

### req template

- description : 랜덤 포인트(1~3) 추가. API 호출 시 랜덤으로 1~3의 포인트를 추가(호출 시간 기록 - 1시간에 한번만 호출되도록 userId와 같이 기록)
- path : /points/box
- type : POST
- header
  - Authorization : Bearer {accessToken}

### req example

- header
  - Authorization : Bearer {accessToken}

### res template

- data : {
  earnedPoint : 획득한 포인트,
  point : 사용자 포인트
  }

### res example

- data : {
  earnedPoint : 2,
  point : 14
  }

## GET /points/last-box-time

### req template

- description : 마지막으로 호출한 POST /point/box 시간 차이 확인
- path : /points/last-box-time-gap
- type : GET
- header
  - Authorization : Bearer {accessToken}

### req example

- header
  - Authorization : Bearer {accessToken}

### res template

- data : {
  time-gap : 시간 단위로 버림된 값을 전달(int로 전달)
  }

### res example

- data : {
  time-gap : 2
  }
