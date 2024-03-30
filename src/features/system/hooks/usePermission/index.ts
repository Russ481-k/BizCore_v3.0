import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { getPermissionAPI, GetPermissionResponse } from "api/permission";

function useGetPermission(
  options?: UseQueryOptions<GetPermissionResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetPermissionResponse, AxiosError<ErrorResponse>>({
    queryKey: ["permission"],
    queryFn: () => getPermissionAPI(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetPermission;
