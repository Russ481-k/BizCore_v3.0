import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getSendCountTotalAPI,
  GetSendCountTotalParams,
  GetSendCountTotalResponse,
} from "api/users/send";

function useGetSendCountTotal(
  params: GetSendCountTotalParams,
  options?: UseQueryOptions<
    GetSendCountTotalResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<GetSendCountTotalResponse, AxiosError<ErrorResponse>>(
    {
      queryKey: ["send-count-total", params.userIdx],
      queryFn: () => getSendCountTotalAPI(params),
      ...options,
    }
  );
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetSendCountTotal;
