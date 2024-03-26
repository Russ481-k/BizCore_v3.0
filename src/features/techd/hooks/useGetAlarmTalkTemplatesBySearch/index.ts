import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getAlarmTalkTemplatesBySearchAPI,
  GetAlarmTalkTemplatesBySearchResponse,
} from "api/alarm-talk-templates";

function useGetAlarmTalkTemplatesBySearch(
  params: {
    startDate: string | null;
    endDate: string | null;
    groupTemplateId: number | null;
    templateName: string | null;
    currentPage: number | null;
    pageSize: number;
  },
  options?: UseQueryOptions<
    GetAlarmTalkTemplatesBySearchResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetAlarmTalkTemplatesBySearchResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      "template",
      params.startDate,
      params.endDate,
      params.groupTemplateId,
      params.templateName,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getAlarmTalkTemplatesBySearchAPI(params),
    ...options,
  });
  return {
    ...result,
    contents: result.data?.data?.contents,
    paging: result.data?.data?.paging,
    totalCount: result.data?.data?.totalCount,
    pageLength: result.data?.data?.pageLength,
  };
}

export default useGetAlarmTalkTemplatesBySearch;
