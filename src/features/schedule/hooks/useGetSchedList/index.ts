import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  getSchedList,
  SchedListParams,
  SchedListResponse,
} from "api/sched/list";

function useGetSchedList(
  params: SchedListParams,
  options?: UseQueryOptions<SchedListResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<SchedListResponse, AxiosError<ErrorResponse>>({
    queryKey: ["sched-list"],
    queryFn: () => getSchedList(params),
    ...options,
  });
  return {
    ...result,
    status: result?.data?.status,
    message: result?.data?.message,
    data: result?.data?.data,
    pagination: result?.data?.pagination,
    totalCount: result?.data?.totalCount,
  };
}

export default useGetSchedList;
