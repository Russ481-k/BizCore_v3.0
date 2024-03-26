import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetReservedTwoWayMessageSubjectsResponse,
  getReservedTwoWayMessageSubjectsAPI,
} from "api/two-way-messages/two-way-message";

function useGetReservedTwoWayMessageSubjects(
  params: {
    headId: number | null;
    currentPage: number | null;
  },
  options?: UseQueryOptions<
    GetReservedTwoWayMessageSubjectsResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetReservedTwoWayMessageSubjectsResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["two-way-message-subjects", params.headId, params.currentPage],
    queryFn: () => getReservedTwoWayMessageSubjectsAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data?.user.contents,
    pagination: result.data?.data?.user.paging,
    pageLength: result.data?.data?.user.pageLength,
    totalCount: result.data?.data?.totalReceiverCount,
  };
}

export default useGetReservedTwoWayMessageSubjects;
