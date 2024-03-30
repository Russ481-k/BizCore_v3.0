import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  authLogoutKillAPI,
  AuthLogoutResponse,
  AuthLogoutKillParams,
} from "api/auth/logout";

function useAuthLogoutKill(
  options?: UseMutationOptions<
    AuthLogoutResponse,
    AxiosError<ErrorResponse>,
    AuthLogoutKillParams
  >
) {
  return useMutation(
    (params: AuthLogoutKillParams) => authLogoutKillAPI(params),
    options
  );
}

export default useAuthLogoutKill;
