import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getValidTemplateGroupNameAPI,
  GetValidTemplateGroupNameResponse,
} from "api/template-groups/template-group";

function useGetValidTemplateGroupName(
  params: {
    templateGroupName: string;
  },
  options?: UseQueryOptions<
    GetValidTemplateGroupNameResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetValidTemplateGroupNameResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["valid-template-group-name", params.templateGroupName],
    queryFn: () => getValidTemplateGroupNameAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidTemplateGroupName;
