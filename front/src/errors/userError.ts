export enum UserErrorMessage {
  InvalidToken = "유효하지 않은 토큰입니다",
  NotFoundToken = "토큰이 존재하지 않습니다",
  InvalidPassword = "비밀번호는 8자 이상입니다",
  InvalidEmail = "email 형식에 맞지 않습니다",
}

export enum UserErrorCode {
  InvalidToken = 28,
  NotFoundToken = 27,
  InvalidPassword = 30,
  InvalidEmail = 29,
}

export function intoUserError(errorCode: UserErrorCode) {
  switch (errorCode) {
    case UserErrorCode.NotFoundToken:
      return new Error(UserErrorMessage.NotFoundToken);
    case UserErrorCode.InvalidToken:
      return new Error(UserErrorMessage.InvalidToken);
    case UserErrorCode.InvalidPassword:
      return new Error(UserErrorMessage.InvalidPassword);
    case UserErrorCode.InvalidEmail:
      return new Error(UserErrorMessage.InvalidEmail);
  }
}
