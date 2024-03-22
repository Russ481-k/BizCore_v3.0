import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getUserAPI, GetUserParams, GetUserResponse } from "api/users/user";

function useGetUser(
  params: GetUserParams,
  options?: UseQueryOptions<GetUserResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetUserResponse, AxiosError<ErrorResponse>>({
    queryKey: ["user", params.userIdx],
    queryFn: () => getUserAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetUser;
