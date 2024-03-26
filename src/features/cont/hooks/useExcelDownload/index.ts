import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getExcelDownloadAPI,
  GetExcelDownloadResponse,
} from "api/templates/template";

function useExcelDownload(
  params: { url: string },
  options?: UseQueryOptions<GetExcelDownloadResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetExcelDownloadResponse, AxiosError<ErrorResponse>>({
    queryKey: ["excel-download", params.url],
    queryFn: () => getExcelDownloadAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useExcelDownload;
