## POST /auth/sign-up

### req template

- description : 회원 가입
- path : /auth/sign-up
- method : POST
- body
  - email : 사용자 이메일
  - password : 사용자 비밀번호
  - nickname : 사용자 닉네임
  - name : 사용자 이름

### req example

- body : {
  email : codeit1@codeit.com,
  password : !codeit1,
  nickname : 코드잇1,
  name : 김코드
  }

### res template

- data
  - id : 사용자 아이디(FE에서 필요없다면 삭제 예정)
  - email : 사용자 이메일
  - nickname : 사용자 닉네임
  - name : 사용자 이름
  - image : 사용자 프로필 이미지

### res example

- status : 201
- data : {
  id : 4d7005be-e7a7-4cdf-8517-16bec2538a02,
  email : codeit1@codeit.com,
  nickname : 코드잇1,
  name : 김코드,
  image : ...,
  }

## POST /auth/sign-in

### req template

- description : 로그인
- path : /auth/sign-in
- method : POST
- body
  - email : 사용자 이메일
  - password : 사용자 비밀번호

### req example

- body : {
  email : codeit1@codeit.com,
  password : !codeit1,
  }

### res template

- data
  - accessToken : access token(임시. 쿠키로 변경 고려)
  - refreshToken : refresh token(임시. 쿠키로 변경 고려)
  - user
    - id : 사용자 아이디(FE에서 필요없다면 삭제 예정)
    - email : 사용자 이메일
    - nickname : 사용자 닉네임
    - name : 사용자 이름
    - image : 사용자 프로필 이미지

### res example

- status : 200
- data : {
  accessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzAwNWJlLWU3YTctNGNkZi04NTE3LTE2YmVjMjUzOGEwMiIsImlhdCI6MTcyODI4OTIwMywiZXhwIjoxNzI4NTQ4NDAzfQ.L_joNRkM2K-owV_tktltAVyDKcg5_5BtRbsDDjFPRig,
  refreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzAwNWJlLWU3YTctNGNkZi04NTE3LTE2YmVjMjUzOGEwMiIsImlhdCI6MTcyODI4OTE4OCwiZXhwIjoxNzI4ODkzOTg4fQ.FEFZMgPw6QM0ClNygWWxBd_ljfV28rssQoTcTobAAwI,
  user : {
  id : 4d7005be-e7a7-4cdf-8517-16bec2538a02,
  email : codeit1@codeit.com,
  nickname : 코드잇1,
  name : 김코드,
  image : ...,
  }
  }

## POST /auth/sign-out

### req template

- description : 로그아웃 (로그인 과정이 확정되면 변경 예정. 세션? 쿠키? jwt?)
- path : /auth/sign-out
- method : POST
- header
  - Authorization : Bearer {accessToken}

### req example

- header :
  Authorization : Bearer ...

### res example

- status : 200

## POST /auth/refresh

### req template

- description : 토큰 갱신
- path : /auth/refresh
- method : POST
- body
  - refreshToken : refresh token

### req example

- data : {
  refreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzAwNWJlLWU3YTctNGNkZi04NTE3LTE2YmVjMjUzOGEwMiIsImlhdCI6MTcyODI4OTE4OCwiZXhwIjoxNzI4ODkzOTg4fQ.FEFZMgPw6QM0ClNygWWxBd_ljfV28rssQoTcTobAAwI,
  }

### res template

- data
  - accessToken : access token(임시. 쿠키로 변경 고려)
  - refreshToken : refresh token(임시. 쿠키로 변경 고려)

### res example

- status : 200
- data : {
  accessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzAwNWJlLWU3YTctNGNkZi04NTE3LTE2YmVjMjUzOGEwMiIsImlhdCI6MTcyODI4OTIwMywiZXhwIjoxNzI4NTQ4NDAzfQ.L_joNRkM2K-owV_tktltAVyDKcg5_5BtRbsDDjFPRig,
  refreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzAwNWJlLWU3YTctNGNkZi04NTE3LTE2YmVjMjUzOGEwMiIsImlhdCI6MTcyODI4OTE4OCwiZXhwIjoxNzI4ODkzOTg4fQ.FEFZMgPw6QM0ClNygWWxBd_ljfV28rssQoTcTobAAwI
  }
