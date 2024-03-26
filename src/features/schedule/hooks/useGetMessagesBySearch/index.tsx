import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getMessagesAPI,
  GetMessagesBySearchParams,
  GetMessagesResponse,
} from "api/messages";

function useGetMessagesBySearch(
  params: GetMessagesBySearchParams,
  options?: UseQueryOptions<GetMessagesResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetMessagesResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      "messages-search",
      params.subject,
      params.createUser,
      params.createId,
      params.startCreateDate,
      params.endCreateDate,
      params.startReqDate,
      params.endReqDate,
      params.all,
      params.sendType,
      params.channelType,
      params.status,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getMessagesAPI(params),
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

export default useGetMessagesBySearch;
