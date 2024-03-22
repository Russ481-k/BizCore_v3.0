import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  changeMyPwdAPI,
  ChangeMyPwdParams,
  ChangeMyPwdResponse,
} from "api/users/current";

function useChangeMyPwd(
  options?: UseMutationOptions<
    ChangeMyPwdResponse,
    AxiosError<ErrorResponse>,
    ChangeMyPwdParams
  >
) {
  return useMutation(
    (params: ChangeMyPwdParams) => changeMyPwdAPI(params),
    options
  );
}

export default useChangeMyPwd;
