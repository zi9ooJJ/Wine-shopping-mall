const customizedJwt = require('../modules/customizedJwt');
const commonErrors = require('../misc/commonErrors');
const AppError = require('../misc/AppError');


const isAdmin = async function (req, res, next){ // index.html(input으로 입력) -> req에 req.body.id가 생성. -> db에서 정보 조회해서 대조하기
    const token = req.headers['authorization'].slice(7);
    const decodedPayload = await customizedJwt.customizedVerify(token);
    if (decodedPayload.user.role == "admin") {
        console.log('관리자 확인 절차 통과')
        next()
    } else {
        
        let errorCode
        err.message == "Log In Invalid Error" ? errorCode = 38: null
        err.message == "Log In Invalid Error" ? err.name = commonErrors.logInInValidError: null

        // if(err.message == "Log In Invalid Error"){
        //     err.name = commonErrors.logInInValidError;
        //     errorCode = 38
        // }
        next(new AppError(err.name, 401, errorCode, err.message));
    }
}

module.exports = isAdmin;
