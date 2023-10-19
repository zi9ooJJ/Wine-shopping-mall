import { AxiosErrorModel, ResponseModel } from "../../models";
import { AuthErrorCode, intoAuthError } from "../../errors";
import { authClient } from "../httpClient";
import { UnknownError } from "../../errors/unknownError";

export interface WithdrawArgs {
  password: string;
}
export async function withdraw({ password }: WithdrawArgs): Promise<null> {
  try {
    authClient.delete<ResponseModel<null>>(`auth/withdraw`, {
      data: {
        password,
      },
    });

    return null;

    // return navigate("/");
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode) {
      // Error1: 비밀번호 불일치
      case AuthErrorCode.InvalidPassword:
      // Error2: 존재하지 않는 토큰
      case AuthErrorCode.NotFoundToken:
      // Error3: 토큰 불일치
      case AuthErrorCode.InvalidToken:
        throw intoAuthError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
