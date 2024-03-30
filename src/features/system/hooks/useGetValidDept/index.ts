import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  getValidDeptAPI,
  GetValidDeptParams,
  GetValidDeptResponse,
} from "api/department";

function useGetValidDept(
  params: GetValidDeptParams,
  options?: UseQueryOptions<GetValidDeptResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetValidDeptResponse, AxiosError<ErrorResponse>>({
    queryKey: ["department-valid", params.departmentName],
    queryFn: () => getValidDeptAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidDept;
