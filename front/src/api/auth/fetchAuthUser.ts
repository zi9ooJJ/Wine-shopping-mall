import { AuthErrorCode, intoAuthError } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AuthUserModel, AxiosErrorModel, ResponseModel } from "../../models";
import { removeLocalStorageToken } from "../../utils";
import { authClient } from "../httpClient";

// 임시 응답 객체 타입(현재는 ResponseModel<AuthUserModel>로 변경됨)
// interface FetchAuthUserResponse {
//   data?: {
//     authUser: AuthUserModel;
//   };
//   error?: string;
//   statusCode: number;
// }

// AuthUser = 개인정보 중 간략한 정보만을 보여주는 data type
// fetch = 멀리 떨어진 서버에서 데이터를 가져옴
export async function fetchAuthUser(): Promise<AuthUserModel> {
  try {
    const { data } = await authClient.get<ResponseModel<AuthUserModel>>(
      "/users/mypage"
    );
    // 올바른 토큰인 경우, 사용자 정보 return (AuthUser Type)
    return data.data!;
  } catch (err) {
    // 사용자가 토큰 발급을 해서 갖고는 있는데,
    // 탈퇴해서 유효하지 않은 토큰인 경우
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;
    // TODO: 오류 코드 체크 필요
    switch (errorCode as AuthErrorCode) {
      // Error1: 존재하지 않는 이메일
      case AuthErrorCode.EmailNotFound:
      // Error2: 비밀번호 불일치
      case AuthErrorCode.InvalidPassword:
        throw intoAuthError(errorCode!);
      case AuthErrorCode.ExpiredToken:
        removeLocalStorageToken();
        throw intoAuthError(errorCode!);

      default:
        throw new UnknownError();
    }
  }
}
