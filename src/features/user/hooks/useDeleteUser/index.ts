import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  deleteUserAPI,
  DeleteUserParams,
  DeleteUserResponse,
} from "api/users/user";

function useDeleteUser(
  options?: UseMutationOptions<
    DeleteUserResponse,
    AxiosError<ErrorResponse>,
    DeleteUserParams
  >
) {
  return useMutation(
    (params: DeleteUserParams) => deleteUserAPI(params),
    options
  );
}

export default useDeleteUser;
