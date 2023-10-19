import { useContext } from "react";
import { AuthUserActionsContext, AuthUserValuesContext } from "../providers";

/**
 * @description
 * AuthUser: 개인정보 중 간략한 정보만을 보여주는 data type
 * 좀 더 자세한 사용자의 정보가 필요하다면 더 많은 정보를 포함한 User 데이터를 요청할 것
 */
export function useAuthUser() {
  return useContext(AuthUserValuesContext)!;
}

export function useMutateAuthUser() {
  return useContext(AuthUserActionsContext)!;
}
