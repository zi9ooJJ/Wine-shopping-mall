// ! isLoggedIn : createToken을 위해 필요
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const authService = require("../service/authService");

const isLoggedIn = async function (req, res, next) {
  // index.html(input으로 입력) -> req에 req.body.id가 생성. -> db에서 정보 조회해서 대조하기
  try {
    const user = await authService.getUser(req.body.email, req.body.password);
    if (user.email != null && user.password != null) {
      console.log("로그인 확인 절차 통과");
      next();
    } else {
      throw new Error("Log In Invalid Error");
    }
  } catch (err) {
    let errorCode
    err.message == "Log In Invalid Error" ? errorCode = 33: null
    err.message == "Log In Invalid Error" ? err.name = commonErrors.logInInValidError: null

    // if(err.message == "Log In Invalid Error"){
    //   err.name = commonErrors.logInInValidError;
    //   errorCode = 38 // ! 값이 할당이 되지 않아 난감합니다.
      
    // }
    
    next(new AppError(err.name, 401, errorCode, err.message));
  }
};

module.exports = isLoggedIn;
