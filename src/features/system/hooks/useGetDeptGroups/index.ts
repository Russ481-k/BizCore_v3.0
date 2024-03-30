import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { getDeptGroupsAPI, GetDeptGroupsResponse } from "api/department-groups";

function useGetDeptGroups(
  options?: UseQueryOptions<GetDeptGroupsResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetDeptGroupsResponse, AxiosError<ErrorResponse>>({
    queryKey: ["department-groups"],
    queryFn: () => getDeptGroupsAPI(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetDeptGroups;
