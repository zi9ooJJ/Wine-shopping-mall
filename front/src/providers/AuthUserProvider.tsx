import { createContext, useEffect, useState } from "react";
import {
  fetchAuthUser,
  login,
  LoginArgs,
  register,
  RegisterArgs,
  withdraw,
  WithdrawArgs,
} from "../api/auth";
import { AuthErrorMessage } from "../errors";
import { AuthUserModel } from "../models";
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from "../utils";
import { useHistory } from "react-router-dom";

interface AuthUserProviderArgs {
  children: React.ReactNode;
}

export interface AuthUserValues {
  authUser?: AuthUserModel;
  error?: AuthErrorMessage;
  isLoading: boolean;
}

export interface AuthUserActions {
  fetchAuthUserAction: () => Promise<void>;
  registerAction: (args: RegisterArgs) => Promise<void>;
  loginAction: (args: LoginArgs) => Promise<void>;
  withdrawAction: (args: WithdrawArgs) => Promise<void>;
}

const initAuthUserValues: AuthUserValues = {
  authUser: undefined,
  error: undefined,
  isLoading: true,
};

const initAuthUserActions: AuthUserActions = {
  fetchAuthUserAction: async () => {},
  registerAction: async (args) => {},
  loginAction: async (args) => {},
  withdrawAction: async (args) => {},
};

export const AuthUserValuesContext =
  createContext<AuthUserValues>(initAuthUserValues);
export const AuthUserActionsContext =
  createContext<AuthUserActions>(initAuthUserActions);

/**
 * @description
 * `useState()`로 useAuthUser Hook을 만들면 `useAuthUser()`이 호출될 때마다 독립적인 메모리 공간을 점유하여
 * 상태가 공유되지 않으며 쓸데없이 Http Request가 발생하게 됨
 * React에서 제공하는 `useContext()`를 이용하면 메모리 공간에 useState로 생성한 상태를 바인딩하여
 * 같은 메모리 공간을 공유하는 보다 효율적인 Hook을 만들 수 있음
 *
 * 단, States, Actions를 별개의 Context에 저장해야 re-rendering이 일어날 필요가 없는
 * States 없는 Actions Consumers에서 re-rendering이 일어나지 않음
 * 거기에 `useMemo()`를 사용한 최적화 필요
 * Component Tree에서 해당 Provider의 하위에 존재하는 모든 Components가 re-rendering 되는 구조이기 때문
 */
export function AuthUserProvider({ children }: AuthUserProviderArgs) {
  const [states, setStates] = useState<AuthUserValues>(initAuthUserValues);
  const history = useHistory();
  const setAuthUser = (authUser?: AuthUserModel) => {
    setStates((prev) => ({
      ...prev,
      authUser,
    }));
  };
  const setError = (error?: AuthErrorMessage) => {
    setStates((prev) => ({
      ...prev,
      error,
    }));
  };
  const setIsLoading = (isLoading: boolean) => {
    setStates((prev) => ({
      ...prev,
      isLoading,
    }));
  };

  async function fetchAuthUserAction() {
    const token = getLocalStorageToken();

    // localStorage에 token이 없으니 서버에 요청을 보내지 않고 로딩종료
    // (!token == 사용자정보X => useAuthUser를 사용할 이유가 없음)
    if (!token) {
      setIsLoading(false);
      return;
    }

    // useEffect의 인자로 받는 콜백 함수는 async가 될 수 없기
    // 때문에 Promise.then()으로 처리
    // token이 있으면 서버에 user 정보 요청
    // NOTE: 어려운 부분이므로 나중에 Promise, then, catch, finally 복습하기
    try {
      const authUser = await fetchAuthUser();
      setAuthUser(authUser);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === AuthErrorMessage.InvalidToken) {
          // Modal
          removeLocalStorageToken();
          setError(err.message);
        } else {
          // Global Error Boundary
          throw err;
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function registerAction({
    email,
    password,
    name,
    address,
  }: RegisterArgs) {
    try {
      const token = await register({ email, password, name, address });
      setLocalStorageToken({ token });
    } catch (err) {
      // TODO: 오류 상세 처리
      if (
        err instanceof Error &&
        err.message === AuthErrorMessage.DuplicateUser
      ) {
        setError(err.message);
      } else {
        throw err;
      }
    }
  }

  async function loginAction({ email, password }: LoginArgs) {
    try {
      const token = await login({ email, password });
      setLocalStorageToken({ token });
    } catch (err) {
      if (err instanceof Error) {
        if (
          err.message === AuthErrorMessage.EmailNotFound ||
          err.message === AuthErrorMessage.InvalidPassword
        ) {
          setError(err.message);
        } else {
          throw err;
        }
      }
    }
  }

  async function withdrawAction({ password }: WithdrawArgs) {
    try {
      await withdraw({ password });
      removeLocalStorageToken();
    } catch (err) {
      // TODO: 오류 상세 처리
    }
  }

  useEffect(() => {
    fetchAuthUserAction();
  }, []);

  return (
    <AuthUserValuesContext.Provider value={states}>
      <AuthUserActionsContext.Provider
        value={{
          fetchAuthUserAction,
          registerAction,
          loginAction,
          withdrawAction,
        }}
      >
        {children}
      </AuthUserActionsContext.Provider>
    </AuthUserValuesContext.Provider>
  );
}
