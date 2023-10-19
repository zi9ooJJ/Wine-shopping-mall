import { LOCAL_STORAGE_TOKEN_KEY } from "../../config/constants";

export function getLocalStorageToken() {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}
