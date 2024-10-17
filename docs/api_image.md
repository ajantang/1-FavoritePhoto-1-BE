## POST /images/upload

### req template

- description : 이미지 업로드
- path : /images/upload
- method : POST
- headers
  - Content-Type: multipart/form-data;
- body
  - image : binary 형식의 파일

### req example

- headers
  Content-Type: multipart/form-data; boundary=image-boundary
- body
  {생략}

### res template

- data
  - url : 업로드된 이미지

### res example

- data : {
  url : https://storage.googleapis.com/image-unload-codeit-test/1729128675467.png
  }

### 참고(.http)

###

POST https://one-favoritephoto-1-be.onrender.com/images/upload
Content-Type: multipart/form-data; boundary=image-boundary

--image-boundary
Content-Disposition: form-data; name="image"; filename="test_fetch.png"
Content-Type: image/jpeg

< C:\Users\SnowRang\Pictures\wolverine.jpg
--image-boundary--
