import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  getMessageDetailAPI,
  GetMessageDetailResponse,
} from "api/messages/message";

interface GetMessageDetailParams {
  headId: number | null;
}

function useGetSendMessagesDetail(
  params: GetMessageDetailParams,
  options?: UseQueryOptions<GetMessageDetailResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetMessageDetailResponse, AxiosError<ErrorResponse>>({
    queryKey: ["messages-detail", params.headId],
    queryFn: () => getMessageDetailAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data?.contents,
    paging: result.data?.data?.paging,
    totalCount: result.data?.data?.totalCount,
    pageLength: result.data?.data?.pageLength,
  };
}

export default useGetSendMessagesDetail;
