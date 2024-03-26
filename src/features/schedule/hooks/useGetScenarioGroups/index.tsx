import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetScenarioGroupsResponse,
  getGetScenarioGroupsAPI,
  ScenarioGroupsParams,
} from "api/scenario-groups";

function useGetScenarioGroups(
  params: ScenarioGroupsParams,
  options?: UseQueryOptions<
    GetScenarioGroupsResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<GetScenarioGroupsResponse, AxiosError<ErrorResponse>>(
    {
      queryKey: [
        "scenario-groups",
        params.all,
        params.createId,
        params.createUser,
        params.subject,
        params.pageSize,
        params.currentPage,
      ],
      queryFn: () => getGetScenarioGroupsAPI(params),
      ...options,
    }
  );
  return {
    ...result,
    data: result.data?.data,
    pagination: result.data?.pageable,
    pageLength: result.data?.totalPages,
    totalCount: result.data?.totalRows,
  };
}

export default useGetScenarioGroups;
