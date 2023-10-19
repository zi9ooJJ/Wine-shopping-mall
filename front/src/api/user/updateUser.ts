import { intoUserError, OrderErrorCode, UserErrorCode } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import {
  AxiosErrorModel,
  ResponseModel,
  UserModel,
  UserRole,
} from "../../models";
import { authClient } from "../httpClient";

interface updateUserArg {
  email: string;
  name: string;
  password: string;
  address: string;
  role: UserRole;
}

export async function updateUser({
  email,
  name,
  password,
  address,
  role,
}: updateUserArg): Promise<string> {
  try {
    const { data } = await authClient.put<ResponseModel<UserModel>>(
      "/users/mypage",
      { email, name, password, address }
    );
    return data?.data?._id!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as UserErrorCode) {
      // Error1: 비밀번호 8자리 미만으로 입력
      case UserErrorCode.InvalidPassword:
      // Error2: 이메일 형식 맞지 않음
      case UserErrorCode.InvalidEmail:
      // Error3: 토큰이 존재 X
      case UserErrorCode.NotFoundToken:
      // Error4: 유효하지 않은 토큰
      case UserErrorCode.InvalidToken:
        throw intoUserError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
