import { AuthTokenModel, AxiosErrorModel, ResponseModel } from "../../models";
import { AuthErrorCode, intoAuthError } from "../../errors";
import { authClient } from "../httpClient";
import { UnknownError } from "../../errors/unknownError";

export interface RegisterArgs {
  email: string;
  name: string;
  password: string;
  address: string;
}

export async function register({
  email,
  name,
  password,
  address,
}: RegisterArgs): Promise<string> {
  try {
    // 서버에 사용자가 입력한 정보와 함께 계정 생성 후 토큰 반환
    // const { data } = await axios.post<ResponseModel<AuthTokenModel>>(
    //   `${SERVER_BASE_URL}/auth/register`,
    //   {
    //     email,
    //     name,
    //     password,
    //     address,
    //   }
    // );
    const { data } = await authClient.post<ResponseModel<AuthTokenModel>>(
      "/auth/register",
      {
        email,
        name,
        password,
        address,
        role: "user",
      }
    );

    return data?.data?.accessToken!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as AuthErrorCode) {
      // Error1: 이미 가입된 이메일
      case AuthErrorCode.DuplicateUser:
        // 회원가입 하려는 email있어서 token발급이 안돼 error발생
        // case AuthErrorCode.InvalidToken
        throw intoAuthError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
