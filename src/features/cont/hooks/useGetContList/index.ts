import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { getContList } from "api/cont/list";

function useGetContList(
  // params: {
  //   templateName: string;
  // },
  options?: UseQueryOptions<any, AxiosError<ErrorResponse>>
) {
  const result = useQuery<any, AxiosError<ErrorResponse>>({
    queryKey: ["cont-list"],
    queryFn: () => getContList(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetContList;
