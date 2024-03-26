import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetMessageLogResponse,
  getGetSendMessageLogAPI,
} from "api/messages/message";

export interface GetMessageDetailParams {
  headId: number | null;
  sendStatus: number | null;
  sendChannel: string | null;
  resend: string | null;
  keyword: string | null;
  page: number;
  size: number;
  // sort: string[]|null;
}

function useGetSendMessageLog(
  params: GetMessageDetailParams,
  options?: UseQueryOptions<GetMessageLogResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetMessageLogResponse, AxiosError<ErrorResponse>>({
    queryKey: ["message-detail", params.headId],
    queryFn: () => getGetSendMessageLogAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data?.headMessageDTO,
    receiverList: result.data?.data?.receiverList.content,
    pagination: result.data?.data?.receiverList.pageable,
    totalPages: result.data?.data?.receiverList.totalPages,
    totalSendLogCount: result.data?.data?.receiverList.totalElements,
  };
}

export default useGetSendMessageLog;
