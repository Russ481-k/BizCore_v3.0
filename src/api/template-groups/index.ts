import { requestApi } from "api";
import { templateGroup } from "api/url";
import TemplateGroup from "type/TemplateGroup";

export interface GetTemplateGroupsResponse {
  status: string;
  data: {
    groupList: Array<TemplateGroup>;
    totalTemplateCount: number;
  };
  message: string;
}

export function getTemplateGroupsAPI(): Promise<GetTemplateGroupsResponse> {
  return requestApi<GetTemplateGroupsResponse>({
    url: templateGroup(""),
    method: "GET",
  }).then((response) => response.data);
}
