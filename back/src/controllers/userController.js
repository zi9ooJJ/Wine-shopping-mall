const { userService } = require("../service");
const util = require("../misc/util");
const commonErrors = require("../misc/commonErrors");
const AppError = require("../misc/AppError");

// Contorller(프론트와 req, res를 이용해 Service의 함수로 값을 구해 처리) <- Service(DAO에서 커스터마이징한 함수로 결과값 도출하는 로직을 겸비한 함수 구현) <- DAO(db 관한 함수를 커스터마이징함(filter))
// Controller 예시 : 비밀번호 맞는 형식인가? - 입구컷
const userController = {
  async putUser(req, res, next) {
    try {
      let id = req.user._id; // ! 토큰이 발급돼 있는 상태여야 하고 checkToken가 있어야 decode로 인해 요청.user는 존재하게 됨.
      if (req.user._id === null) {
        throw new Error(
          "토큰이 존재하지 않습니다.",
          commonErrors.userControllerPostUserError
        );
      }
      let {
        updatedEmail,
        updatedName,
        updatedPassword,
        updatedAddress,
        updatedRole,
      } = req.body; //& 프론트엔드에서 INPUT태그 작성해야 함.
      if (
        updatedEmail === null ||
        updatedName === null ||
        updatedPassword === null ||
        updatedAddress === null
      ) {
        throw new Error(
          "빈 값을 채워주시길 바랍니다.",
          commonErrors.userControllerPostUserError
        );
      }
      let user;
      if (req.user.role === "user") {
        user = await userService.updateUser(id, {
          updatedEmail,
          updatedName,
          updatedPassword,
          updatedAddress,
          updatedRole: "user",
        });
      }
      if (req.user.role === "admin") {
        user = await userService.updateUser(id, {
          updatedEmail,
          updatedName,
          updatedPassword,
          updatedAddress,
          updatedRole,
        });
      }
      res.status(200).json(util.buildResponse(user, null, 200));
    } catch (err) {
      err.name = commonErrors.userControllerPutUserError;
      let errorCode;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "빈 값을 채워주시길 바랍니다."
        ? (err.name = commonErrors.userControllerPutUserError)
        : null;
      err.message == "email 형식이 맞지 않습니다." ? (errorCode = 29) : null;
      err.message == "password 8자이상 입력해야 합니다."
        ? (errorCode = 30)
        : null;
      err.message == "토큰이 존재하지 않습니다." ? (errorCode = 27) : null;
      err.message == "토큰이 존재하지 않습니다."
        ? (err.name = commonErrors.userControllerPutUserError)
        : null;

      // if(err.message == "토큰이 존재하지 않습니다."){
      //     err.name = commonErrors.userControllerPutUserError;
      //     errorCode = 27
      // }
      // if(err.message == "빈 값을 채워주시길 바랍니다."){
      //     err.name = commonErrors.userControllerPutUserError;
      //     errorCode = 33
      // }
      // if(err.message == "email 형식이 맞지 않습니다."){
      //     err.name = commonErrors.userServiceUpdateUserError;
      //     errorCode = 29
      // }
      // if(err.message == "password 8자이상 입력해야 합니다."){
      //     err.name = commonErrors.authServiceCreateUserError;
      //     errorCode = 30
      // }
      next(new AppError(err.name, 401, errorCode, err.message));
    }
  },

  async deleteUser(req, res, next) {
    try {
      let id = req.user._id;
      let email = req.user.email;
      let password = req.body.password; //! 여기 프론트에서 처리해줘야.

      if (id === null) {
        //& 여기서 에러 뜨는지 주시하기
        throw new Error("토큰이 존재하지 않습니다."); // ! 토큰이 발급돼 있는 상태여야 하고 checkToken가 있어야 decode로 인해 요청.user는 존재하게 됨.
      }

      await userService.deleteUser(id, email, password);
      res.status(204).json(util.buildResponse(null, null, 204)); //~ 204로 하면 응답값 출력 안됨. 로직은 처리가 됨.
    } catch (err) {
      let errorCode;
      err.message == "토큰이 존재하지 않습니다." ? (errorCode = 27) : null;
      err.message == "토큰이 존재하지 않습니다."
        ? (err.name = commonErrors.userControllerDeleteUserError)
        : null;
      err.message == "password가 일치하지 않습니다." ? (errorCode = 25) : null;
      // if(err.message == "토큰이 존재하지 않습니다."){
      //     err.name = commonErrors.userControllerDeleteUserError;
      //     errorCode = 27
      // }
      // if(err.message == "password가 일치하지 않습니다."){
      //     err.name = commonErrors.userServiceDeleteUserError;
      //     errorCode = 25
      // }
      next(new AppError(err.name, 401, errorCode, err.message));
    }
  },

  async deleteUsers(req, res, next) {
    try {
      let { name, role } = req.body;
      if (name === null || role === null) {
        throw new Error("빈 값을 채워주시길 바랍니다.");
      }
      await userService.deleteUsers(name, role);
      res.status(204).json(util.buildResponse(null, null, 204));
    } catch (err) {
      let errorCode;
      err.message == "빈 값을 채워주시길 바랍니다." ? (errorCode = 33) : null;
      err.message == "빈 값을 채워주시길 바랍니다."
        ? commonErrors.userControllerDeleteUsersError
        : null;
      err.message == "name이 일치하지 않습니다." ? (errorCode = 35) : null;

      // if(err.message == "빈 값을 채워주시길 바랍니다."){
      //     err.name = commonErrors.userControllerDeleteUsersError;
      //     errorCode = 33
      // }
      // if(err.message == "name이 일치하지 않습니다."){
      //     err.name = commonErrors.userServiceDeleteUsersError;
      //     errorCode = 35
      // }
      next(new AppError(err.name, 403, errorCode, err.message));
    }
  },
};

module.exports = userController;
