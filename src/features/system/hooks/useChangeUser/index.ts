import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  changeUserAPI,
  ChangeUserParams,
  ChangeUserResponse,
} from "api/users/user";

function useChangeUser(
  options?: UseMutationOptions<
    ChangeUserResponse,
    AxiosError<ErrorResponse>,
    ChangeUserParams
  >
) {
  return useMutation(
    (params: ChangeUserParams) => changeUserAPI(params),
    options
  );
}

export default useChangeUser;
