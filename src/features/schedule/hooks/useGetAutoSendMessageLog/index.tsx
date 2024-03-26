import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetAutoMessageLogResponse,
  getGetAutoSendMessageLogAPI,
} from "api/messages/message";

export interface GetAutoMessageDetailParams {
  startSendDate: string | null;
  endSendDate: string | null;
  channelType: string | null;
  autoType: string | null;
  result: string | null;
  name: string | null;
  phone: string | null;
  page: number;
  size: number;
}

function useGetAutoSendMessageLog(
  params: GetAutoMessageDetailParams,
  options?: UseQueryOptions<
    GetAutoMessageLogResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<GetAutoMessageLogResponse, AxiosError<ErrorResponse>>(
    {
      queryKey: ["auto-message-detail"],
      queryFn: () => getGetAutoSendMessageLogAPI(params),
      ...options,
    }
  );
  return {
    ...result,
    data: result.data?.data?.content,
    pagination: result.data?.data?.pageable,
    pageLength: result.data?.data?.totalPages,
    totalCount: result.data?.data?.totalElements,
  };
}

export default useGetAutoSendMessageLog;
