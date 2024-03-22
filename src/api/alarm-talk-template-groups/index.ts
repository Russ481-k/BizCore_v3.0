import { requestApi } from "api";
import { alarmTalkTemplateGroup } from "api/url";
import TemplateGroup from "type/TemplateGroup";

export interface GetAlarmTalkTemplateGroupsResponse {
  status: string;
  data: {
    groupList: Array<TemplateGroup>;
    totalTemplateCount: number;
  };
  message: string;
}

export function getAlarmTalkTemplateGroupsAPI(): Promise<GetAlarmTalkTemplateGroupsResponse> {
  return requestApi<GetAlarmTalkTemplateGroupsResponse>({
    url: alarmTalkTemplateGroup(""),
    method: "GET",
  }).then((response) => response.data);
}
