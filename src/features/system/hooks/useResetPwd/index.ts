import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  resetPwdAPI,
  ResetPwdParams,
  ResetPwdResponse,
} from "api/users/password";

function useResetPwd(
  options?: UseMutationOptions<
    ResetPwdResponse,
    AxiosError<ErrorResponse>,
    ResetPwdParams
  >
) {
  return useMutation((params: ResetPwdParams) => resetPwdAPI(params), options);
}

export default useResetPwd;
