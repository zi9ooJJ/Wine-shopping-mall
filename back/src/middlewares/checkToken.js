const customizedJwt = require('../modules/customizedJwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const commonErrors = require('../misc/commonErrors');
const AppError = require('../misc/AppError');


const checkToken = async (req, res, next) => {
    // 서버측에서 클라이언트로부터 받은 토큰을 가져와 처리해줌
    try{
        let token = req.headers['authorization'].slice(7);
        if (req.headers['authorization'] === null || req.headers['authorization'] === undefined) {
        // (크롬->F12->Network->request의 key가 authorization부분) Bearer Authentication의 접두사인 Bearer 문자열 제거
            throw new Error('토큰이 존재하지 않습니다.');
        }

        // 디코드(decode : jsonwebtoken의 메소드인 verify로 토큰 해석)
        // ! decodedPayload는 token의 payload임
        const decodedPayload = await customizedJwt.customizedVerify(token);

        // (디코드 후) 검증 절차
        if (decodedPayload === TOKEN_EXPIRED) // 유효기간 만료이면 실행
            throw new Error('토큰이 만료되었습니다.')
        
        if (decodedPayload === TOKEN_INVALID) // 유효하지 않는 토큰이면 실행
            throw new Error('유효하지 않는 토큰입니다.', commonErrors.tokenInvalidError)

        if (decodedPayload?.user?.email === undefined || decodedPayload?.user?._id === undefined) // 이상한 토큰이면 실행
            throw new Error('수상한 토큰입니다.', commonErrors.tokenNotVerifiedError)

        req.user = decodedPayload.user; // ! (중요) req로 verify한 user정보를 req에 넘겨줌.
        next();
    } catch (err){
        err.name = commonErrors.tokenNotFoundError;
        let errorCode
        err.message == "토큰이 존재하지 않습니다." ? errorCode = 27: null
        err.message == "토큰이 만료되었습니다." ? errorCode = 36: null
        err.message == "유효하지 않는 토큰입니다." ? errorCode = 28: null
        err.message == "수상한 토큰입니다." ? errorCode = 37: null

        // if(err.message == "토큰이 존재하지 않습니다."){
        //     err.name = commonErrors.tokenNotFoundError;
        //     errorCode = 27
        // }
        // if(err.message == "토큰이 만료되었습니다."){
        //     err.name = commonErrors.tokenExpiredError;
        //     errorCode = 36 
        // }
        // if(err.message == "유효하지 않는 토큰입니다."){
        //     err.name = commonErrors.tokenInvalidError;
        //     errorCode = 28
        // }
        // if(err.message == "수상한 토큰입니다."){
        //     err.name = commonErrors.tokenNotVerifiedError;
        //     errorCode = 37
        // }
        next(new AppError(err.name, 401, errorCode, err.message));
        }
        
    }



module.exports = checkToken;
