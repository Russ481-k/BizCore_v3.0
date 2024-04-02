import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { getCustListAPI } from "api/custs";

function useGetCustList(
  params: {
    compNo: number;
  },
  options?: UseQueryOptions<any, AxiosError<ErrorResponse>>
) {
  const result = useQuery<any, AxiosError<ErrorResponse>>({
    queryKey: ["cust-list", params.compNo],
    queryFn: () => getCustListAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetCustList;
