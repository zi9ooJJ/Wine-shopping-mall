import { LOCAL_STORAGE_TOKEN_KEY } from "../../config/constants";

interface SetLocalStorageTokenArgs {
  token: string;
}

export function setLocalStorageToken({ token }: SetLocalStorageTokenArgs) {
  // localStorage에 token 저장
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}
