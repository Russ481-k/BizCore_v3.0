import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { changeUserAPI, ChangeUserResponse } from "api/users/user";
import User from "type/User";

function useChangeUser(
  options?: UseMutationOptions<
    ChangeUserResponse,
    AxiosError<ErrorResponse>,
    User
  >
) {
  return useMutation((params: User) => changeUserAPI(params), options);
}

export default useChangeUser;
