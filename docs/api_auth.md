## POST /auth/sign-up

### req template

- description : 회원 가입
- path : /auth/sign-up
- method : POST
- body
  - email : 사용자 이메일
  - password : 사용자 비밀번호
  - nickname : 사용자 닉네임

### req example

- body : {
  "email" : "codeit06@codeit.com",
  "password" : "!codeit06",
  "nickname" : "코드잇06"
  }

### res template

- data
  - id : 사용자 아이디(FE에서 필요없다면 삭제 예정)
  - email : 사용자 이메일
  - nickname : 사용자 닉네임
  - point : 사용자 포인트
  - createdAt : 아이디 생성 시간

### res example

- status : 201
- data : {
  "id": "fe192f26-7afa-4b85-a6f8-5dc8469a8aee",
  "email": "codeit06@codeit.com",
  "nickname": "코드잇06",
  "point": 0,
  "createdAt": "2024-10-17T01:19:58.198Z"
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
  "email" : "codeit04@codeit.com",
  "password" : "!codeit04"
  }

### res template

- data
  - id : 사용자 아이디(FE에서 필요없다면 삭제 예정)
  - email : 사용자 이메일
  - nickname : 사용자 닉네임
  - name : 사용자 이름
  - image : 사용자 프로필 이미지
  - createdAt : 아이디 생성 시간

### res example

- status : 200
- data : {
  "id": "be907b8f-8a18-4989-8b21-741cbe3a88fe",
  "email": "codeit04@codeit.com",
  "nickname": "코드잇04",
  "point": 0,
  "createdAt": "2024-10-16T02:51:14.156Z"
  }

## POST /auth/sign-out

### req template

- description : 로그아웃 (로그인 과정이 확정되면 변경 예정. 세션? 쿠키? jwt?)
- path : /auth/sign-out
- method : POST

### req example

### res template

- status : 상태 코드

### res example

- status : 200
