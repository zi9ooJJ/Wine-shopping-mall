# (酒 4 - Wine Shop)

- 개발 기간 : 2023.01.30 ~ 2023.02.11
- 개발 주제 : 온라인 와인 쇼핑몰

<br/>

## **1. 서비스 구성도**

<br/>

### + API 문서

> `https://docs.google.com/spreadsheets/d/1P5XIjd9Z_1P8Q8OblX1ZM-aDHWKd0tR4XKxJ8MZ2q7o/edit`

### + 기술 스택

- BE : node.js / ExpressJS / Postman
- FE : TypeScript / React / tailwind-CSS
- DB : mongoDB / Mongoose
- Others : git / Notion

<br/>

## **2. 프로젝트 팀원 역할 분담**

<br/>

| 이름   | 팀원                 |
| ------ | -------------------- |
| 최승호 | 팀장/프론트엔드 개발 |
| 김도하 | 프론트엔드 개발      |
| 이충진 | 프론트엔드 개발      |
| 김지수 | 백엔드 개발          |
| 김진영 | 백엔드 개발          |
| 임지현 | 백엔드 개발          |

<br/>

## **3. 서비스 주요 기능 설명**

<br/>

### 1. **Auth & User**

- 회원가입

  - 유효성 검사
    - 이메일: ' @' 여부
    - 비밀번호 8글자 이상
    - Comfirm password가 password와 일치할 것

<br/>

- 회원정보

  - 유효성 검사
    - 탈퇴 시: password 확인
    - 정보 업데이트 시: email, name, password, address 확인

<br/>

- 로그인 & 아웃

  - 유효성 검사
    - 이메일, 비밀번호 일치 여부
    - JWT 토큰 발급 및 로그아웃 시 토큰 제거

<br/>

### 2. **Category & Products**

- 카테고리별 상품 조회

  - 유효성 검사 - 카테고리 Id 일치 여부

<br/>

- 상품 조회

  - 유효성 검사
    - 상품 Id 일치 여부

<br/>

### 3. **Orders**

- 주문 조회

  - 유효성 검사
    - 주문한 상품 개별 조회 가능
    - 유저 id로 주문한 모든 상품 조회 가능

<br/>

- 주문 수정 및 삭제

  - 유효성 검사
    - 배송 전 상태일 때만 주소 수정 및 삭제 가능

<br/>

### 4. **Admin**

- 회원 조회

  - 유효성 검사
    - role 부여하여 admin과 user 구분

<br/>

- 카테고리 관리

  - 유효성 검사
    - admin 여부 확인
    - name, description 필수 입력

<br/>

- 상품 관리

  - 유효성 검사
    - admin 여부 확인
    - 상품 Id 일치 확인
    - name, categoryId, imageUrl, price, description, producer 필수 입력
    - price 0원 이하 입력 불가

<br/>

- 주문 관리

  - 유효성 검사
    - 전체 주문 조회 및 사용자 별 주문 조회 가능
    - 주문 건 배송 상태 변경 가능

<br/>

## **4. 서비스 컨셉**

<br/>

_MZ세대를 겨냥한 온라인 와인 쇼핑몰_

- Primary Color : Gray
- Sub Color : Purple

<br/>

## **5. 실행 방법**

<br/>

1. 프로젝트 클론

```bash
git clone git@kdt-gitlab.elice.io:ai_track/class_06/web_project/team04/web-project.git
```

<br/>

2. 패키지 설치 후 실행

- npm 사용 시

```bash
cd back
npm install
npm start
cd front
npm install
npm dev
```

- yarn 사용 시

```bash
cd back
yarn install
yarn start
cd front
yarn install
yarn dev
```

<br/>

## **6. 버전**

- Wineshop v1.0.0

  ```bash
  1. mongodb 실행
  2. yarn start (혹은 npm start)
  ```
