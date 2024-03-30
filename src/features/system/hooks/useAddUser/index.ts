import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { addUserAPI, AddUserResponse } from "api/users/user";
import User from "type/User";

function useAddUser(
  options?: UseMutationOptions<AddUserResponse, AxiosError<ErrorResponse>, User>
) {
  return useMutation((params: User) => addUserAPI(params), options);
}

export default useAddUser;
