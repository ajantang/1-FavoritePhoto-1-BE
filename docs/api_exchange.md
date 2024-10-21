## POST /exchange/:exchangedId/accept

### req template
- description: 포토카드 교환 승인
- path: /exchange/:exchangedId/accept
- method: POST
- header
    - Authorization : Bearer {accessToken}
- params
    - exchangedId: 교환ID

### req example

- headers :
  - Authorization : Bearer {accessToken}
- params
  - adfc1706-a7f6-4c6e-a006-1733a854afbb

### res template

- data
    - successStatus: 성공 여부

### res example

- data : {
	successStatus: true
}
