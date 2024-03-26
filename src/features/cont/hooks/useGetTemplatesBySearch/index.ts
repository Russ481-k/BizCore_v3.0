import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getTemplatesBySearchAPI,
  GetTemplatesBySearchResponse,
} from "api/templates";

function useGetTemplatesBySearch(
  params: {
    startDate: string | null;
    endDate: string | null;
    groupTemplateId: number | null;
    templateChannel: string | null;
    templateName: string | null;
    currentPage: number | null;
    pageSize: number;
  },
  options?: UseQueryOptions<
    GetTemplatesBySearchResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetTemplatesBySearchResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      "template",
      params.startDate,
      params.endDate,
      params.groupTemplateId,
      params.templateChannel,
      params.templateName,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getTemplatesBySearchAPI(params),
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

export default useGetTemplatesBySearch;
