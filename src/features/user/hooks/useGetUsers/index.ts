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
      params.isMobytalk,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getUsersAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    contents: result?.data?.data?.contents,
    paging: result?.data?.data?.paging,
    totalCount: result?.data?.data?.totalCount,
    pageLength: result?.data?.data?.pageLength,
    message: result?.data?.message,
  };
}

export default useGetUsers;
