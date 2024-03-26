import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetReservedMessageSubjectsResponse,
  getReservedMessageSubjectsAPI,
} from "api/messages/message";

function useGetReservedMessageSubjects(
  params: {
    headId: number | null;
    currentPage: number | null;
  },
  options?: UseQueryOptions<
    GetReservedMessageSubjectsResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetReservedMessageSubjectsResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["message-subjects", params.headId, params.currentPage],
    queryFn: () => getReservedMessageSubjectsAPI(params),
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

export default useGetReservedMessageSubjects;
