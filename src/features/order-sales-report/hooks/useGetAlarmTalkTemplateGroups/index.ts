import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getAlarmTalkTemplateGroupsAPI,
  GetAlarmTalkTemplateGroupsResponse,
} from "api/alarm-talk-template-groups";

function useGetAlarmTalkTemplateGroups(
  options?: UseQueryOptions<
    GetAlarmTalkTemplateGroupsResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetAlarmTalkTemplateGroupsResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["alarm-talk-template-groups"],
    queryFn: () => getAlarmTalkTemplateGroupsAPI(),
    ...options,
  });
  return {
    ...result,
    data: result?.data?.data?.groupList,
    totalTemplateCount: result?.data?.data?.totalTemplateCount,
    status: result?.status,
    message: result?.data?.message,
  };
}

export default useGetAlarmTalkTemplateGroups;
