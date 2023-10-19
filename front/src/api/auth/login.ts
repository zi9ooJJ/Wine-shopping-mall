import { AuthTokenModel, ResponseModel, AxiosErrorModel } from "../../models";
import { AuthErrorCode, intoAuthError } from "../../errors";
import { authClient } from "../httpClient";
import { UnknownError } from "../../errors/unknownError";

export interface LoginArgs {
  email: string;
  password: string;
}
export async function login({ email, password }: LoginArgs): Promise<string> {
  try {
    // 서버로부터 가져오는 데이터 형식
    // {
    //   data: {
    //     token: string;
    //   },
    //   error?: string;
    //   statusCode: number;
    // }
    const { data } = await authClient.post<ResponseModel<AuthTokenModel>>(
      "/auth/login",
      {
        email,
        password,
      }
      // {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // }
    );

    // token을 성공적으로 받아옴
    return data?.data?.accessToken!;

    // 3. 로그인 성공 => 홈으로 이동
    // return navigate("/");
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    // TODO: 오류 코드 체크 필요
    switch (errorCode as AuthErrorCode) {
      // Error1: 존재하지 않는 이메일
      case AuthErrorCode.EmailNotFound:
      // Error2: 비밀번호 불일치
      case AuthErrorCode.InvalidPassword:
        throw intoAuthError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
