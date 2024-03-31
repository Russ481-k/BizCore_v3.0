import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { getTechdList } from "api/techd/list";

function useGetTechdList(
  // params: {
  //   templateName: string;
  // },
  options?: UseQueryOptions<any, AxiosError<ErrorResponse>>
) {
  const result = useQuery<any, AxiosError<ErrorResponse>>({
    queryKey: ["sales-list"],
    queryFn: () => getTechdList(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetTechdList;
