export enum AuthErrorMessage {
  DuplicateUser = "이미 가입된 이메일입니다",
  InvalidPassword = "비밀번호가 일치하지 않습니다",
  InvalidToken = "유효하지 않은 토큰입니다",
  NotFoundToken = "토큰을 찾을 수 없습니다",
  EmailNotFound = "가입되지 않은 이메일입니다.", // (로그인시): 원래 값=이메일이 일치하지 않습니다
  ExpiredToken = "토큰이 만료되었습니다..",
  UserNotLoggedIn = "로그인이 필요합니다.",
}

export enum AuthErrorCode {
  DuplicateUser = 26,
  InvalidPassword = 25,
  InvalidToken = 28,
  NotFoundToken = 27,
  EmailNotFound = 24,
  ExpiredToken = 36,
  UserNotLoggedIn = 1e9,
}

export function intoAuthError(errorCode: AuthErrorCode) {
  switch (errorCode) {
    case AuthErrorCode.DuplicateUser:
      return new Error(AuthErrorMessage.DuplicateUser);
    case AuthErrorCode.InvalidPassword:
      return new Error(AuthErrorMessage.InvalidPassword);
    case AuthErrorCode.InvalidToken:
      return new Error(AuthErrorMessage.InvalidToken);
    case AuthErrorCode.NotFoundToken:
      return new Error(AuthErrorMessage.NotFoundToken);
    case AuthErrorCode.EmailNotFound:
      return new Error(AuthErrorMessage.EmailNotFound);
    case AuthErrorCode.ExpiredToken:
      return new Error(AuthErrorMessage.ExpiredToken);
    case AuthErrorCode.UserNotLoggedIn:
      return new Error(AuthErrorMessage.UserNotLoggedIn);
  }
}
