import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getTwoWayMessagesAPI,
  GetTwoWayMessagesBySearchParams,
  GetTwoWayMessagesResponse,
} from "api/two-way-messages";

function useGetTwoWayMessagesBySearch(
  params: GetTwoWayMessagesBySearchParams,
  options?: UseQueryOptions<
    GetTwoWayMessagesResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<GetTwoWayMessagesResponse, AxiosError<ErrorResponse>>(
    {
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
        params.dispatchType,
        params.channelType,
        params.currentPage,
        params.pageSize,
      ],
      queryFn: () => getTwoWayMessagesAPI(params),
      ...options,
    }
  );
  return {
    ...result,
    data: result.data?.data?.contents,
    paging: result.data?.data?.paging,
    totalCount: result.data?.data?.totalCount,
    pageLength: result.data?.data?.pageLength,
  };
}

export default useGetTwoWayMessagesBySearch;
