import { intoUserError, UserErrorCode } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AxiosErrorModel, ResponseModel } from "../../models";
import { UserModel } from "../../models/userModel";
import { authClient } from "../httpClient";

export async function fetchUser(): Promise<UserModel> {
  try {
    const { data } = await authClient.get<ResponseModel<UserModel>>(
      `/users/mypage`
    );
    return data?.data!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as UserErrorCode) {
      // Error1: 토큰이 존재 X
      case UserErrorCode.NotFoundToken:
      // Error2: 유효하지 않은 토큰
      case UserErrorCode.InvalidToken:
        throw intoUserError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
