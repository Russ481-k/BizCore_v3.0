import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  getValidTemplateNameAPI,
  GetValidTemplateNameResponse,
} from "api/templates/template";

function useGetValidTemplateName(
  params: {
    templateName: string;
  },
  options?: UseQueryOptions<
    GetValidTemplateNameResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetValidTemplateNameResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["valid-template-name", params.templateName],
    queryFn: () => getValidTemplateNameAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidTemplateName;
