import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { getSalesList } from "api/sales/list";

function useGetSalesList(
  // params: {
  //   templateName: string;
  // },
  options?: UseQueryOptions<any, AxiosError<ErrorResponse>>
) {
  const result = useQuery<any, AxiosError<ErrorResponse>>({
    queryKey: ["sales-list"],
    queryFn: () => getSalesList(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetSalesList;
