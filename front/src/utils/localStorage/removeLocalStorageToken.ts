import { LOCAL_STORAGE_TOKEN_KEY } from "../../config/constants";

export function removeLocalStorageToken() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}
