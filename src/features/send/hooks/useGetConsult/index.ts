import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getConsultAPI,
  GetConsultParams,
  GetConsultResponse,
} from "api/two-way-consult";

function useGetConsult(
  params: GetConsultParams,
  options?: UseQueryOptions<GetConsultResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetConsultResponse, AxiosError<ErrorResponse>>({
    queryKey: ["consult", params.masterId],
    queryFn: () => getConsultAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetConsult;
