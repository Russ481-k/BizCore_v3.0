import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { getSoppList } from "api/sopp/list";

function useGetSoppList(
  // params: {
  //   templateName: string;
  // },
  options?: UseQueryOptions<any, AxiosError<ErrorResponse>>
) {
  const result = useQuery<any, AxiosError<ErrorResponse>>({
    queryKey: ["sopp-list"],
    queryFn: () => getSoppList(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetSoppList;
