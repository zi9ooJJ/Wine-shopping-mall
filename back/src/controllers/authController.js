const { authService } = require("../service");
const util = require("../misc/util");
const commonErrors = require("../misc/commonErrors");
const AppError = require("../misc/AppError");
const createToken = require("../misc/createToken");

// Contorller(프론트와 req, res를 이용해 Service의 함수로 값을 구해 처리) <- Service(DAO에서 커스터마이징한 함수로 결과값 도출하는 로직을 겸비한 함수 구현) <- DAO(db 관한 함수를 커스터마이징함(filter))
// Controller 예시 : 비밀번호 맞는 형식인가? - 입구컷
const authController = {
  async postUser(req, res, next) {
    try {
      const { email, name, password, address, role } = req.body;
      if (
        email === null ||
        email === undefined ||
        name === null ||
        name === undefined ||
        password === null ||
        password === undefined ||
        address === null ||
        address == undefined ||
        role === null ||
        role === undefined
      ) {
        throw new Error("빈 값을 채워주시길 바랍니다.");
      }
      const user = await authService.createUser(
        email,
        name,
        password,
        address,
        role
      );
      // TODO: 회원가입 직후 자동 로그인 기능 추가시 필요
      const token = await createToken(req, res, next);
      res.status(200).json(util.buildResponse(token, null, 200)); // {}형태로 보내기 위해 util.buildResponse씀
    } catch (err) {
      // 항상 뭐든 에러가 날 수 있으니 에러 처리는 필수 - 형식적으로 해주는 작업
      let errorCode;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "빈 값을 채워주시길 바랍니다."
        ? (err.name = commonErrors.authControllerPostUserError)
        : null;
      err.message == "이미 같은 email이 있어 가입하지 못합니다."
        ? (errorCode = 26)
        : null;
      err.message == "email 형식이 맞지 않습니다." ? (errorCode = 29) : null;
      err.message == "password 8자이상 입력해야 합니다."
        ? (errorCode = 30)
        : null;
      // if(err.message == "빈 값을 채워주시길 바랍니다."){
      //     err.name = commonErrors.authControllerPostUserError;
      //     errorCode = 33
      // }
      // if(err.message == "이미 같은 email이 있어 가입하지 못합니다."){
      //     err.name = commonErrors.authServiceCreateUserError;
      //     errorCode = 26
      // }
      // if(err.message == "email 형식이 맞지 않습니다."){
      //     err.name = commonErrors.authServiceCreateUserError;
      //     errorCode = 29
      // }
      // if(err.message == "password 8자이상 입력해야 합니다."){
      //     err.name = commonErrors.authServiceCreateUserError;
      //     errorCode = 30
      // }
      const error = new AppError(err.name, 401, errorCode, err.message);
      next(error);
    }
  },

  // ! 토큰이 발급돼 있는 상태여야 하고 checkToken가 있어야 decode로 인해 요청.user는 존재하게 됨.
  async getAuthUser(req, res, next) {
    try {
      let { email } = req.user;

      if (email === null || email === undefined) {
        throw new Error("토큰이 존재하지 않습니다.");
      }
      const user = await authService.getAuthUser(email);
      return res.status(200).json(util.buildResponse(user, null, 200));
    } catch (err) {
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "이미 같은 email이 있어 가입하지 못합니다."
        ? (errorCode = 26)
        : null;
      err.message == "email 형식이 맞지 않습니다." ? (errorCode = 29) : null;
      err.message == "password 8자이상 입력해야 합니다."
        ? (errorCode = 30)
        : null;
      err.message == "토큰이 존재하지 않습니다." ? (errorCode = 27) : null;
      err.message == "토큰이 존재하지 않습니다."
        ? (err.name = commonErrors.authControllerGetAuthUserError)
        : null;
      // if(err.message == "토큰이 존재하지 않습니다."){
      //     err.name = commonErrors.authControllerGetAuthUserError;
      //     errorCode = 27
      // }

      next(new AppError(err.name, 401, errorCode, err.message));
    }
  },

  // ! 토큰이 발급돼 있는 상태여야 하고 checkToken가 있어야 decode로 인해 요청.user는 존재하게 됨.
  async getUser(req, res, next) {
    try {
      let { email, password } = req.user;
      let userInfoObject = { email, password };
      if (email === null || email === undefined) {
        throw new Error("토큰이 존재하지 않습니다.");
      }

      let copiedUserInfoObject = { ...userInfoObject };
      if (req.body.email != null && req.body.password != null) {
        // & 프론트에서 이메일, 비번 입력 후 토큰 관련없이 isLoggedIn만 있을 때 필요
        copiedUserInfoObject = req.body;
      } else {
        throw new Error("빈 값을 채워주시길 바랍니다.");
      }

      const user = await authService.getUser(email, password);
      return res.status(200).json(util.buildResponse(user, null, 200));
    } catch (err) {
      let errorCode = null;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "email 형식이 맞지 않습니다." ? (errorCode = 29) : null;
      err.message == "토큰이 존재하지 않습니다." ? (errorCode = 27) : null;
      err.message == "토큰이 존재하지 않습니다."
        ? (err.name = commonErrors.authControllerGetUserError)
        : null;
      err.message == "password가 일치하지 않습니다."
        ? (err.name = commonErrors.authControllerGetUserError)
        : null;
      // if(err.message == "토큰이 존재하지 않습니다."){
      //     err.name = commonErrors.authControllerGetUserError;
      //     errorCode = 27
      // }
      // if(err.message == "빈 값을 채워주시길 바랍니다."){
      //     err.name = commonErrors.authControllerGetUserError;
      //     errorCode = 33
      // }
      // if(err.message == "email이 일치하지 않습니다."){
      //     err.name = commonErrors.authServiceGetUserError;
      //     errorCode = 24
      // }
      // if(err.message === "password가 일치하지 않습니다."){
      //     err.name = commonErrors.authServiceGetUserError;
      //     errorCode = 25
      // }

      next(new AppError(err.name, 401, errorCode, err.message));
    }
  },

  async getUsers(req, res, next) {
    //! 관리자가 전체 유저 조회해야 함
    let { role } = req.body;
    try {
      if (role === null || role === undefined) {
        throw new Error("빈 값을 채워주시길 바랍니다.");
      }
      const users = await authService.getUsers(role);
      res.status(200).json(util.buildResponse(users, null, 200));
    } catch (err) {
      let errorCode;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "빈 값을 채워주시길 바랍니다."
        ? (err.name = commonErrors.authControllerGetUsersError)
        : null;
      err.message == `${role} 계정이 없습니다.` ? (errorCode = 34) : null;
      // if(err.message == "빈 값을 채워주시길 바랍니다."){
      //     err.name = commonErrors.authControllerGetUsersError;
      //     errorCode = 33
      // }
      // if(err.message == `${role} 계정이 없습니다.`){
      //     err.name = commonErrors.authServiceGetUsersError;
      //     errorCode = 34
      // }
      next(new AppError(err.name, 403, errorCode, err.message));
    }
  },
};

module.exports = authController;
