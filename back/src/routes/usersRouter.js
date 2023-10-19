const { Router } = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const usersRouter = Router();
const checkToken = require("../middlewares/checkToken");

usersRouter.get("/mypage", checkToken, async (req, res, next) => {
  if (req.user.role == "user") {
    //'user로 접속한 mypage 페이지입니다.'
    await authController.getAuthUser(req, res, next);
  }
  if (req.user.role == "admin") {
    //'admin으로 접속한 mypage 페이지입니다.'
    await authController.getAuthUser(req, res, next);
  }
});

usersRouter.put("/mypage", checkToken, async (req, res, next) => {
  // 미들웨어(checkToken)를 넣어서 부분적으로 작동하도록 함.
  await userController.putUser(req, res, next);
});

module.exports = usersRouter;
