import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getTemplateGroupsAPI,
  GetTemplateGroupsResponse,
} from "api/template-groups";

function useGetTemplateGroups(
  options?: UseQueryOptions<
    GetTemplateGroupsResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<GetTemplateGroupsResponse, AxiosError<ErrorResponse>>(
    {
      queryKey: ["template-groups"],
      queryFn: () => getTemplateGroupsAPI(),
      ...options,
    }
  );
  return {
    ...result,
    data: result?.data?.data?.groupList,
    totalTemplateCount: result?.data?.data?.totalTemplateCount,
    status: result?.status,
    message: result?.data?.message,
  };
}

export default useGetTemplateGroups;
