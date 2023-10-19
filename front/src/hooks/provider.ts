import { useState, useEffect, createContext, useContext } from "react";
import { getLocalStorageToken, removeLocalStorageToken } from "../utils";
import { fetchAuthUser as fetchAuthUserRequest } from "../api/auth";
import { AuthErrorCode } from "../errors";
import { AuthUserModel } from "../models";

export interface UseAuthUserValues {
  authUser: AuthUserModel | null;
  authUserIsLoading: boolean;
  authUserError?: AuthErrorCode | null;
}

export interface UseAuthUserActions {
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserModel | null>>;
  setAuthUserError: React.Dispatch<React.SetStateAction<AuthErrorCode | null>>;
  setAuthUserIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthUserActionsContext = createContext<UseAuthUserActions | null>(null);
const AuthUserValuesContext = createContext<UseAuthUserValues | null>(null);

// useContext -> useMemo -> useCallback
// 리팩토링
// 장바구니

// react-error-boundary 내일
//
// 음악 bonus

interface AuthUserProvider {
  children: React.ReactNode;
}

/**
 * @description
 * AuthUser: 개인정보 중 간략한 정보만을 보여주는 data type
 * 좀 더 자세한 사용자의 정보가 필요하다면 더 많은 정보를 포함한 User 데이터를 요청할 것
 */
export const AuthUserProvider = ({ children }: AuthUserProvider) => {
  const [authUser, setAuthUser] = useState<AuthUserModel | null>(null);
  const [authUserError, setAuthUserError] = useState<AuthErrorCode | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState(true);

  async function fetchAuthUser() {
    const token = getLocalStorageToken();

    // localStorage에 token이 없으니 서버에 요청을 보내지 않고 로딩종료
    // (!token == 사용자정보X => useAuthUser를 사용할 이유가 없음)
    if (!token) {
      setAuthUserIsLoading(false);
      return;
    }

    // useEffect의 인자로 받는 콜백 함수는 async가 될 수 없기
    // 때문에 Promise.then()으로 처리
    // token이 있으면 서버에 user 정보 요청
    // NOTE: 어려운 부분이므로 나중에 Promise, then, catch, finally 복습하기
    try {
      const authUser = await fetchAuthUserRequest({ token });
      setAuthUser(authUser);
      console.log(authUser);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === AuthErrorCode.InvalidToken) {
          removeLocalStorageToken();
          setAuthUserError(AuthErrorCode.InvalidToken);
        }
      }
    } finally {
      setAuthUserIsLoading(false);
    }

    // TODO: Promise -> async-await 변경 과정 나중에 기록하기
    // fetchAuthUser({ token })
    //   .then((authUser) => {
    //     setAuthUser(authUser);
    //   })
    //   .catch((err: Error) => {
    //     if (err.message === AuthError.InvalidToken) {
    //       removeLocalStorageToken();
    //       setAuthUserError(AuthError.InvalidToken);
    //     }

    //     // 회원 탈퇴 등으로 DB에 유저가 존재하지 않는데,
    //     // 탈퇴된 계정의 토큰을 갖고 요청하는 경우
    //     // 유효하지 않은 토큰 오류 발생
    //     // setAuthUserError(err); 나중에 class로 오류 변환 뒤 처리
    //   })
    //   .finally(() => {
    //     setAuthUserIsLoading(false);
    //   });
  }
  // useEffect(() => {
  //   _fetchAuthUser();
  // }, []);

  const values = {
    authUser,
    authUserError,
    authUserIsLoading,
  };

  const actions = { fetchAuthUser };

  return (
    // <AuthUserActionsContext.Provider
    //   value={values}
    // ></AuthUserActionsContext.Provider>
  );
};
