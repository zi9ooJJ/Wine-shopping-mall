import { useEffect, useState } from "react";
import { fetchUser } from "../api/user/fetchUser";
import { UnknownError } from "../errors";
import { UserModel } from "../models";

/**
 * @description
 * AuthUser: 개인정보 중 간략한 정보만을 보여주는 data type
 * 좀 더 자세한 사용자의 정보가 필요하다면 더 많은 정보를 포함한 User 데이터를 요청할 것
 */
export function useUser() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  async function _fetchUser() {
    try {
      const user = await fetchUser();
      setUser(user);
    } catch (error) {
      if (error instanceof UnknownError) {
        throw error;
      }
      // TODO:
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    _fetchUser();
  }, []);

  return {
    user,
    isLoading,
    error,
  };
}
