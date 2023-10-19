const authDAO = require("../data-access/authDAO");
const bcrypt = require('bcrypt');
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");


const passwordCheckRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const authService = {
  async createUser(email, name, password, address, role) {
    try{
        let user = await authDAO.findOne(email);
        if(user !== null) {
          throw new Error("이미 같은 email이 있어 가입하지 못합니다.");
        }
        if (passwordCheckRegex.test(email)===false){
          throw new Error("email 형식이 맞지 않습니다.");
        }
        if (password.length < 8){
          throw new Error("password 8자이상 입력해야 합니다");
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let createdUser = await authDAO.create(email, name, hashedPassword, address, role);
        
        return createdUser;

      }catch(err) {
        err.name = commonErrors.authServiceCreateUserError; //& 예상 밖의 에러시 확인용
        throw err;
      // postUser에서 catch해서 err.message로 new Error() 안의 text를 볼 수 있으며 AppError를 통해 error가 형식을 갖춰 next()로 인해 전역 에러처리 미들웨어로 보내지게 됨.
    }
  },
  
  // ~ 토큰 check용 
  async getAuthUser(email) {
    try{
      const user = await authDAO.findOne(email);
      return user;
  } catch(err){
      err.name = commonErrors.authServiceGetUserError; //& 예상 밖의 에러시 확인용
      throw err;
    }
  },

  async getUser(email, password) {
    try{
      const user = await authDAO.findOne(email);
      if( user === null){
        throw new Error("email이 일치하지 않습니다.");
      }
      if(await bcrypt.compare(password, user.password)===false){
        throw new Error("password가 일치하지 않습니다.");
      }
      return user;
  } catch(err){
      err.name = commonErrors.authServiceGetUserError;
      throw err;
    }
  },

  async getUsers( role ) { //! 관리자가 전체 유저 조회해야 함
    try{
      const users = await authDAO.findMany({role});
      if(users.length === 0){
        throw new Error(`${role} 계정이 없습니다.`)
      }
      return users
      } catch(err) {
        err.name = commonErrors.authServiceGetUsersError;
        throw err;
    }
  },
};

module.exports = authService;
