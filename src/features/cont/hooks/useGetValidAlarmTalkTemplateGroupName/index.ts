import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getValidAlarmTalkTemplateGroupNameAPI,
  GetValidAlarmTalkTemplateGroupNameResponse,
} from "api/alarm-talk-template-groups/alarm-talk-template-group";

function useGetValidAlarmTalkTemplateGroupName(
  params: {
    templateGroupName: string;
  },
  options?: UseQueryOptions<
    GetValidAlarmTalkTemplateGroupNameResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetValidAlarmTalkTemplateGroupNameResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      "valid-alarm-talk-template-group-name",
      params.templateGroupName,
    ],
    queryFn: () => getValidAlarmTalkTemplateGroupNameAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidAlarmTalkTemplateGroupName;
