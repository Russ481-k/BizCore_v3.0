import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getTemplatesAPI, GetTemplatesResponse } from "api/templates";

function useGetTemplates(
  params: { groupTemplateId: number | null },
  options?: UseQueryOptions<GetTemplatesResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetTemplatesResponse, AxiosError<ErrorResponse>>({
    queryKey: ["template", params.groupTemplateId],
    queryFn: () => getTemplatesAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data?.body,
  };
}

export default useGetTemplates;
