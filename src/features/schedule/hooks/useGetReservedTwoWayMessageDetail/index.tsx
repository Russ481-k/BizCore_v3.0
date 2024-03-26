import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetReservedTwoWayMessageDetailResponse,
  getReservedTwoWayMessageDetailAPI,
} from "api/two-way-messages/two-way-message";

interface GetReservedMessageDetailParams {
  headId: number | null;
}

function useGetReservedMessageDetail(
  params: GetReservedMessageDetailParams,
  options?: UseQueryOptions<
    GetReservedTwoWayMessageDetailResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetReservedTwoWayMessageDetailResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["two-way-message-detail", params.headId],
    queryFn: () => getReservedTwoWayMessageDetailAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useGetReservedMessageDetail;
