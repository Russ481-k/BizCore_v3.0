import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { getUserCrsAPI, GetUserCrsResponse } from "api/users/send";

function useGetCrs(
  options?: UseQueryOptions<GetUserCrsResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetUserCrsResponse, AxiosError<ErrorResponse>>({
    queryKey: ["users-crs"],
    queryFn: () => getUserCrsAPI(),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetCrs;
