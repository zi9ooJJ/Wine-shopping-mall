function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function buildResponse(data, error, statusCode) {
  return {
    data, // data : 1번째 인자 data 내용이 들어감.
    errorName: error?.name ?? null, //! (??는 ?와 반대) undefined 혹은 null이면 다음 꺼 반환
    errorMessage: error?.message ?? null, //! ?.는 null 혹은 undefined이면 다음 메소드 혹은 필드 반환하지 않음.(null 값이 올때 읽을 수 있게 됨.)
    statusCode: statusCode ?? error?.statusCode,
    errorCode: error?.errorCode ?? null,
  };
}

module.exports = {
  sanitizeObject,
  buildResponse,
};
