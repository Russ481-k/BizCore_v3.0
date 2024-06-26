import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getUsersAPI, GetUsersParams, GetUsersResponse } from "api/users";

function useGetUsers(
  params: GetUsersParams,
  options?: UseQueryOptions<GetUsersResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetUsersResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      "users",
      params.deptCode,
      params.status,
      params.permissionId,
      params.keyword,
      params.targetColumn,
      params.isBizCore,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getUsersAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    message: result?.data?.message,
    data: result?.data?.data,
  };
}

export default useGetUsers;
