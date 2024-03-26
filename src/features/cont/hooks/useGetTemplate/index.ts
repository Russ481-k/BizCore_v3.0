import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getTemplateAPI, GetTemplateResponse } from "api/templates/template";

function useGetTemplate(
  params: { templateId: number | null },
  options?: UseQueryOptions<GetTemplateResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetTemplateResponse, AxiosError<ErrorResponse>>({
    queryKey: ["template", params.templateId],
    queryFn: () => getTemplateAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useGetTemplate;
