const { User } = require("./models/userModel");
const util = require("../misc/util");
const commonErrors = require("../misc/commonErrors");
const authDAO = require("./authDAO");


// DAO : Data Access Object
// ! 인자에 넣은 순서와 해당 값대로 넣어야 기능이 제대로 작동함.....db에 직접 거는 함수와는 좀 다름. (find({ password }) 해도 다 불려와줌)
const userDAO = {
    async updateOne(id, toUpdate) {  // toUpdate는 전달받은 { email, password, ~~ }임
        try{
            const email= toUpdate.updatedEmail
            const name= toUpdate.updatedName
            const password= toUpdate.updatedPassword
            const address= toUpdate.updatedAddress
            const role= toUpdate.updatedRole
            const sanitizedToUpdate = { email, name, password, address, role }
            const plainUpdatedUser = await User.findByIdAndUpdate(
                id, // 찾아낼 거
                {...sanitizedToUpdate}, // 변경할 거 (updateOne 쓸 땐({$set : {name: toUpdate.name, password: toUpdate.password}} 이런 식으로 함.))
                {
                    runValidators: true, // update할 땐 {runValidators: true} 해야 스키마 내부 설정(type : String <-이런거) 체크 함. 참고로 create는 자동임.
                    new: true,
                }
            ).lean();
            return plainUpdatedUser;
        }catch(err){
            err.name = commonErrors.userDAOUpdateOneError;
            throw err
        }
    },

    async deleteOne(id) {
        try{
            const plainDeletedUser = await User.findByIdAndDelete({ _id : id }).lean(); // ById가 들어가는 함수에서 { _id : id }의 축약형이 id임.
            return plainDeletedUser;
        }catch(err){
            err.name = commonErrors.userDAODeleteOneError;
            throw err
        }
    },

    async deleteMany(condition) {
        try{
            const sanitizedCondition = util.sanitizeObject({
                email: condition.email,
                name: condition.name,
                password: condition.password,
                // address: condition.address,
                // createdAt: condition.createdAt,
                // updatedAt: condition.updatedAt,
                // role: condition.role,
            });
            const plainDeletedUsers = await User.deleteMany(sanitizedCondition).lean();
            return plainDeletedUsers;
        }catch(err){
            err.name = commonErrors.userDAODeleteManyError;
            throw err
        }
    },
};

module.exports = userDAO;
