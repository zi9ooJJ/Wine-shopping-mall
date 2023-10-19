import { UserErrorCode, intoUserError } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AxiosErrorModel, ResponseModel, UserModel } from "../../models";
import { authClient } from "../httpClient";

interface UpdateUserInfoArgs {
  email: string;
  name: string;
  password: string;
  address: string;
}

// GET - 조회
// PUT - 변경
export async function updateUserInfo({
  email,
  name,
  password,
  address,
}: UpdateUserInfoArgs): Promise<null> {
  try {
    // 1. 토큰을 헤더에 넣어서 보내야 한다(authClient)
    // 서버의 baseURL도 authClient에 저장되어 path만 지정하면 됨
    // TODO: /users/detail
    // PUT /auth/
    await authClient.put<ResponseModel<UserModel>>("/users/mypage", {
      updatedEmail: email,
      updatedName: name,
      updatedPassword: password,
      updatedAddress: address,
      updatedRole: "user",
    });

    // 2. 업데이트가 정상적으로 완료되었으면 return
    return null;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as UserErrorCode) {
      // Error1: 이메일 형식 불일치
      case UserErrorCode.InvalidEmail:
      // Error2: 비밀번호 확인 불일치
      case UserErrorCode.InvalidPassword:
      // Error3: 존재하지 않는 토큰
      case UserErrorCode.NotFoundToken:
      // Error4: 토큰 불일치
      case UserErrorCode.InvalidToken:
        throw intoUserError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
