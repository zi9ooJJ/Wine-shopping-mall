module.exports = {
  secretKey: process.env.SECRET_KEY, // 원하는 시크릿 키
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "2h", // 토큰 유효 기간
    issuer: "admin", // 발행자
  },
};
