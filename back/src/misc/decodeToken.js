const { Buffer } = require('buffer');

// 생성된 토큰이 변수에 저장될 때(const tokenResult = await creaetToken(req, res))
async function decodeToken(tokenResult){
    const base64Payload = tokenResult.data.token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    const payload = await Buffer.from(base64Payload, 'base64'); 
    const result = JSON.parse(payload.toString())
    return result
}

module.exports = decodeToken;
