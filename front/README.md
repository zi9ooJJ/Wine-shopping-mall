## TODOS
-[ ] Validation 함수 `utils` 디렉토리에 작성(10분 이내)
-[ ] Validation 함수 Login, Register, Withdraw 등 Input 있는 Page에 적용(4시간)
- [ ] useContext, useMemo, useCallback 최적화(학습 및 소요 예상 시간 4시간)
- [ ] 나머지 페이지 모두 완성
- [ ] 
-[ ] error 디테일 처리 react-error-boundary 학습 및 사용
- [ ] css ... 맨 마지막
- [ ] 배포 - 금요일 밤




* getboundingclientrect 사용해서 상품 이미지 계속 보이게 만들기(상품 하단에 div태그 넣어서 사용)
* helmet을 layout에 넣어서 사용
## css install module

[나중에 해보면 좋을듯 한 것들]
-회원가입 할 때, 이메일을 입력하다가 1~2초간 멈췄을 때,
입력이 다 된 것으로 인식하고 서버에 요청을 보내 이메일 중복 확인 뒤 사용 가능 여부를 표시해주면 좋을듯

-사용자가 제출 버튼 등을 2번 눌렀을 때,
Request가 여러 번 가게 되면 비효율적이므로 이미 요청이 갔으면 그 뒤 무효화 하는 Throttling 혹은 Debouncing 등의 처리

-사용자가 회원 가입, 글 작성 도중 오류로 인해 브라우저가 껐다 켜지는 경우,
작성 중이던 데이터가 모두 날아가는 것을 방지하기 위해 입력 중이던 데이터를 localStorage 등에 저장하여 복구해주는 등의 처리

```shell
$ yarn add react-icons
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
$ yarn add @fortawesome/react-fontawesome
$ yarn add bootstrap
```