import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getConsultsAPI,
  GetConsultsParams,
  GetConsultsResponse,
} from "api/two-way-consult";

function useGetConsults(
  params: GetConsultsParams,
  options?: UseQueryOptions<GetConsultsResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetConsultsResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      "consults",
      params.csltStatus,
      params.callerNo,
      params.startSendDate,
      params.endSendDate,
      params.callType,
      params.sendType,
      params.isResult,
      params.targetColumn,
      params.keyword,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getConsultsAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    contents: result?.data?.data?.contents,
    paging: result?.data?.data?.paging,
    totalCount: result?.data?.data?.totalCount,
    pageLength: result?.data?.data?.pageLength,
    message: result?.data?.message,
  };
}

export default useGetConsults;
