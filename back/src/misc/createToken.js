const customizedJwt = require("../modules/customizedJwt");
const authService = require("../service/authService");
const AppError = require("./AppError");
const commonErrors = require("./commonErrors");


const createToken = async (req, res, next) =>{
    try{
        let user = await authService.getUser(req.body.email, req.body.password);
        if (req.body.email === null || req.body.password === null || req.body.email === undefined || req.body.password === undefined){
            throw new Error('빈 값을 채워주시길 바랍니다.');
        }

        const token = await customizedJwt.customizedSign(user);

        console.log('토큰이 발급되었습니다.')
        return token
        
    } catch (err) {
        let errorCode
        err.message == "빈 값을 채워주시길 바랍니다." ? errorCode = 33: null
        err.message == "빈 값을 채워주시길 바랍니다." ? err.name = commonErrors.createTokenError: null
        // if(err.message == "빈 값을 채워주시길 바랍니다."){
        //     err.name = commonErrors.authControllerGetUserError;
        //     errorCode = 33
        // }
        next(new AppError(err.name, 401, errorCode, err.message));
    }
};

module.exports = createToken;
