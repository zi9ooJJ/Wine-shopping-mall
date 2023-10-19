const util = require("../misc/util");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { User } = require("./models/userModel");

// DAO : Data Access Object
// ! 인자에 넣은 순서와 해당 값대로 넣어야 기능이 제대로 작동함.....db에 직접 거는 함수와는 좀 다름. (find({ password }) 해도 다 불려와줌)
const authDAO = {
  async create(email, name, password, address, role) {
    try {
      const user = await new User({ email, name, password, address, role }); // email : email 이면 email로 가능.
      await user.save();
      return await user.toObject();
    } catch (err) {
      err.name = commonErrors.authDAOCreateError;
      throw err;
    }
  },

  async findOneById(id) {
    try {
      const plainUser = await User.findOne({ _id: id }).lean(); // lean()은 순수 스키마 값만 줌(객체에서 메소드 말고 필드만)
      return plainUser; // plain이란 말도 순수 값이란 의미. 메소드 없음.
    } catch (err) {
      err.name = commonErrors.authDAOFindOneError;
      throw err;
    }
  },
  async findOne(email) {
    try {
      const plainUser = await User.findOne({ email }).lean(); // lean()은 순수 스키마 값만 줌(객체에서 메소드 말고 필드만)
      return plainUser; // plain이란 말도 순수 값이란 의미. 메소드 없음.
    } catch (err) {
      err.name = commonErrors.authDAOFindOneError;
      throw err;
    }
  },

  async findMany(filter) {
    // filter는 전달받은 { role }임
    try {
      const sanitizedFilter = util.sanitizeObject({
        // {key1 : value1, key2 : value2, ...} 이런 형태로 반환. 단 undefined가 있으면 그 data는 걸러냄.
        // email: filter.email,
        // name: filter.name,
        // password: filter.password,
        // address: filter.address,
        // createdAt: filter.createdAt,
        // updatedAt: filter.updatedAt,
        role: filter.role,
      });
      const plainUsers = await User.find(sanitizedFilter).lean();
      return plainUsers;
    } catch (err) {
      err.name = commonErrors.authDAOFindManyError;
      throw err;
    }
  },
};

module.exports = authDAO;
