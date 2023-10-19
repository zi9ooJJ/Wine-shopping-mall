const express = require("express");
const app = express();
require("dotenv").config(); // 메인인 app.js에서 호출시 여기서 호출된 모듈(connect라든가)에 적용됨.
const connect = require("./src/config/dbConnect.js");
const {
  authRouter,
  categoryRouter,
  ordersRouter,
  productsRouter,
  usersRouter,
  adminRouter,
  imageUploadRouter,
} = require("./src/routes/index");
const cors = require("cors");
const util = require("./src/misc/util");
const commonErrors = require("./src/misc/commonErrors.js");
const AppError = require("./src/misc/AppError.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // express.json() 은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요
connect();
app.use(cors()); // cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요(html로 요청줄 때 다른 도메인 주소면 거부하는데 이걸 무효화함.)

app.listen(process.env.PORT, () => {
  console.log("listening on 8080");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/upload", imageUploadRouter);

app.use((_, __, next) => {
  next(
    new AppError(commonErrors.resourceNotFoundError, 404, 32, "Resource not found")
  );
}); // ! 페이지를 따로 설정하지 않은 것들은 전부 404 에러가 표시되도록 함.
app.use((err, req, res, next) => {
  const resp = util.buildResponse(null, err);
  res.status(resp.statusCode).json(resp);
}); // ! 전역 에러처리 미들웨어(상태코드는 비어 있으면 전달된 err의 코드가 자동으로 들어감)

// ? 계정생성 테스트용1
const { authService } = require("./src/service/index.js");
const { Category } = require("./src/data-access/models/categoryModel.js");
// ? 계정생성 테스트용2
// authService.createUser('c@c.com', 'c', 'cccccccc', 'c', 'user');
// authService.createUser('a@a.com', 'a', 'aaaaaaaa', 'a', 'admin');
