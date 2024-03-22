import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { getDeptAPI, GetDeptParams, GetDeptResponse } from "api/department";

function useGetDept(
  params: GetDeptParams,
  options?: UseQueryOptions<GetDeptResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetDeptResponse, AxiosError<ErrorResponse>>({
    queryKey: ["department-detail", params.deptCode],
    queryFn: () => getDeptAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetDept;
