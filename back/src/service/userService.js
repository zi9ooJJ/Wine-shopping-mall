const userDAO = require("../data-access/userDAO");
const bcrypt = require("bcrypt");
const commonErrors = require("../misc/commonErrors");
const authDAO = require("../data-access/authDAO");


const passwordCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
// controller에 쓰든 상관 없지만 보통 여기서 DAO를 사용해줌.
// Service에서는 비밀번호 맞나? 일치하나?를 확인함(비즈니스 로직).
const userService = {
  async updateUser(id, { updatedEmail, updatedName, updatedPassword, updatedAddress, updatedRole }) {
    try {
      const hashedPassword = await bcrypt.hash(updatedPassword, 10);

      if (passwordCheckRegex.test(updatedEmail)===false) { 
        throw new Error(`email 형식이 맞지 않습니다.`, commonErrors.inputError); 
      }
      const updatedUser = await userDAO.updateOne(id, {updatedEmail, updatedName, updatedPassword : hashedPassword, updatedAddress, updatedRole});

      if (updatedPassword.length < 8) {throw new Error("password 8자이상 입력해야 합니다.", commonErrors.inputError);}
          
      return updatedUser;
      
    } catch (err) {
      err.name = commonErrors.userServiceUpdateUserError;
      throw err;
    }
  },

  async deleteUser(id, email, password) {
    try {
      const user = await authDAO.findOne(email);
      if (await bcrypt.compare(password, user.password)) {
        const deleteUser = await userDAO.deleteOne(id);
        return deleteUser;
      } else {
        throw new Error("password가 일치하지 않습니다.");
      }
    } catch (err) {
      err.name = commonErrors.userServiceDeleteUserError;
      throw err;
    }
  },

  async deleteUsers(name, role) {
    try {
      const users = await authDAO.findMany({ role });
      const deletedUsers = await users.filter((elem) => {
        name === elem.name
      });
      if (deletedUsers.length ===0){
        throw new Error("name이 일치하지 않습니다.")
      }
      return deletedUsers;
    } catch (err) {
      err.name = commonErrors.userServiceDeleteUsersError;
      throw err;
    }
  },
};

module.exports = userService;
