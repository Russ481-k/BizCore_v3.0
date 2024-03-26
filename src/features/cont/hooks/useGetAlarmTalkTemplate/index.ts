import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { GetTemplateResponse } from "api/templates/template";
import { getAlarmTalkTemplateAPI } from "api/alarm-talk-templates/alarm-talk-template";

function useGetAlarmTalkTemplate(
  params: { templateId: number | null },
  options?: UseQueryOptions<GetTemplateResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetTemplateResponse, AxiosError<ErrorResponse>>({
    queryKey: ["template", params.templateId],
    queryFn: () => getAlarmTalkTemplateAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useGetAlarmTalkTemplate;
