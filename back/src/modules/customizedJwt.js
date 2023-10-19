const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey').secretKey;
const option = require('../config/secretKey').option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    customizedSign: async (user) => {
        const payload = { // 가벼운 정보만 넣기
            type : 'JWT',
            user : {
                    _id : user._id,
                    email: user.email,
                    name: user.name,
                    role : user.role
                }
        };
        const result = {
            // jsonsebtoken라이브러리의 sign 메소드를 통해 access token 발급!
            // jwt.sign( { 토큰이 가질 데이터(payload), 비밀 키, 옵션, 콜백함수(보통 에러 핸들링에 사용) } )
            accessToken: await jwt.sign(payload, secretKey, option),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    customizedVerify: async (token) => {
        let decodedPayload;
        try {
            // verify를 통해 값 decode!
            decodedPayload = await jwt.verify(token, secretKey);
        } catch (err) { // ! 이미 시스템 내부에서 err 메세지를 정의해 놓음.
            if (err.message === 'jwt expired') {
                return TOKEN_EXPIRED; // ! 해당 에러나면 verify() 값이 이게 되네.
            } else if (err.message === 'invalid token') {
                return TOKEN_INVALID;
            } else {
                return TOKEN_INVALID;
            }
        }
        return decodedPayload;
    }
}