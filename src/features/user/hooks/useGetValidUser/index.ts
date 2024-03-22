import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  getValidUserAPI,
  GetValidUserParams,
  GetValidUserResponse,
} from "api/users/user";

function useGetValidUser(
  params: GetValidUserParams,
  options?: UseQueryOptions<GetValidUserResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetValidUserResponse, AxiosError<ErrorResponse>>({
    queryKey: ["user-valid", params.userId],
    queryFn: () => getValidUserAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidUser;
