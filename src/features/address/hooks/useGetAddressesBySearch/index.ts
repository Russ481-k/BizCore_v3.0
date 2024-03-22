import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getAddressesBySearchAPI,
  GetAddressesBySearchResponse,
} from "api/addresses";

function useGetAddressesBySearch(
  params: {
    addressGroupId: number | null;
    keyword: string | null;
    targetColumn: string | null;
    currentPage: number | null;
    pageSize: number;
  },
  options?: UseQueryOptions<
    GetAddressesBySearchResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetAddressesBySearchResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      "address",
      params.addressGroupId,
      params.keyword,
      params.targetColumn,
      params.currentPage,
      params.pageSize,
    ],
    queryFn: () => getAddressesBySearchAPI(params),
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

export default useGetAddressesBySearch;
