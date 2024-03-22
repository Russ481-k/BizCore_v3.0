import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getCommonCodesAPI,
  GetCommonCodesResponse,
} from "api/systems/common-codes";

function useCommonCodes(
  params: {
    group?: string | null;
    code?: string | null;
    name?: string | null;
    detail?: string | null;
    useYN?: string | null;
    publicYN?: string | null;
    cursor?: number | null;
    pageSize?: number | null;
  },
  options?: UseQueryOptions<GetCommonCodesResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetCommonCodesResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      "common-codes",
      params.code,
      params.cursor,
      params.detail,
      params.group,
      params.name,
      params.pageSize,
      params.publicYN,
      params.useYN,
    ],
    queryFn: () => getCommonCodesAPI(params),
    ...options,
  });

  return {
    ...result,
    data: result.data?.data,
    resultCode: result.data?.resultCode,
    totalCount: result.data?.totalCount,
  };
}

export default useCommonCodes;
