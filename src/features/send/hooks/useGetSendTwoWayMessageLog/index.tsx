import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetTwoWayMessageLogResponse,
  getGetSendTwoWayMessageLogAPI,
} from "api/two-way-messages/two-way-message";

export interface GetTwoWayMessageDetailParams {
  headId: number | null;
  sendStatus: number | null;
  sendChannel: string | null;
  keyword: string | null;
  page: number;
  size: number;
  // sort: string[]|null;
}

function useGetSendTwoWayMessageLog(
  params: GetTwoWayMessageDetailParams,
  options?: UseQueryOptions<
    GetTwoWayMessageLogResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetTwoWayMessageLogResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["message-detail", params.headId],
    queryFn: () => getGetSendTwoWayMessageLogAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data?.receiverList,
    channel: result.data?.data?.headerMessageDTO.channel,
    createDate: result.data?.data?.headerMessageDTO.createDate,
    createUser: result.data?.data?.headerMessageDTO.createUser,
    failPercent: result.data?.data?.headerMessageDTO.failPercent,
    failSendCount: result.data?.data?.headerMessageDTO.failSendCount,
    readyPercent: result.data?.data?.headerMessageDTO.readyPercent,
    readySendCount: result.data?.data?.headerMessageDTO.readySendCount,
    successPercent: result.data?.data?.headerMessageDTO.successPercent,
    successSendCount: result.data?.data?.headerMessageDTO.successSendCount,
    sendDate: result.data?.data?.headerMessageDTO.sendDate,
    sendType: result.data?.data?.headerMessageDTO.sendType,
    pagination: result.data?.data?.headerMessageDTO.pageable,
    totalPages: result.data?.data?.headerMessageDTO.totalPages,
    totalSendLogCount: result.data?.data?.headerMessageDTO.totalSendCount,
  };
}

export default useGetSendTwoWayMessageLog;
