import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetReservedMessageDetailResponse,
  getReservedMessageDetailAPI,
} from "api/messages/message";

interface GetMessageDetailParams {
  headId: number | null;
}

function useGetReservedMessageDetail(
  params: GetMessageDetailParams,
  options?: UseQueryOptions<
    GetReservedMessageDetailResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetReservedMessageDetailResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["message-detail", params.headId],
    queryFn: () => getReservedMessageDetailAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
    totalSendCount: result.data?.data?.totalSendCount,
  };
}

export default useGetReservedMessageDetail;
