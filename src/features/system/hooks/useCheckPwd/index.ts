import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  checkInitialPwdAPI,
  CheckInitialPwdParams,
  CheckInitialPwdResponse,
} from "api/users/password";

function useCheckPwd(
  options?: UseMutationOptions<
    CheckInitialPwdResponse,
    AxiosError<ErrorResponse>,
    CheckInitialPwdParams
  >
) {
  return useMutation(
    (params: CheckInitialPwdParams) => checkInitialPwdAPI(params),
    options
  );
}

export default useCheckPwd;
