// const authRouter = require('express').Router(); - 아래 두줄 코드 합친 코드;
const { Router } = require("express");
const authRouter = Router();
const createToken = require("../misc/createToken");
const checkToken = require("../middlewares/checkToken");
const isLoggedIn = require("../middlewares/isLoggedIn"); // ! createToken을 위해 필요
const util = require("../misc/util");
const { authController, userController } = require("../controllers");

authRouter.get("/login", async function (req, res) {
  res
    .status(200)
    .json(util.buildResponse({ text: "로그인 페이지" }, null, 200));
});
authRouter.get("/register", async function (req, res) {
  res
    .status(200)
    .json(util.buildResponse({ text: "회원가입 페이지" }, null, 200));
});
authRouter.get("/withdraw", checkToken, async function (req, res) {
  await authController.getAuthUser(req, res); // ~ 토큰 가진 사람의 정보
});

authRouter.post("/login", isLoggedIn, async (req, res, next) => {
  const token = await createToken(req, res, next);
  res.status(200).json(util.buildResponse(token, null, 200)); //& 프론트에서 axios.get().then(data => data)로 받음.
});
authRouter.post("/register", async (req, res, next) => {
  const registeredUser = await authController.postUser(req, res, next); // & const { email, name, password, address, role } = req.body;
  //! TODO: 컨트롤러에도 res가 있고 여기도 있음. 에러처리 됨.
  // res.status(200).json(util.buildResponse(registeredUser, null, 200));
});
authRouter.delete("/withdraw", checkToken, async (req, res, next) => {
  await userController.deleteUser(req, res, next);
});

module.exports = authRouter;
