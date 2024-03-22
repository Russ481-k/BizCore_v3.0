import { requestApi } from "api";
import { alarmTalkTemplate } from "api/url";
import Pagination from "type/Pagination";
import Template from "type/Template";

export interface GetTemplatesResponse {
  status: string;
  data: {
    body: Array<Template>;
    headers: {};
    statusCode: string;
    statusCodeValue: number;
  };
  message: string;
}

export function getAlarmTalkTemplatesAPI(params: {
  groupTemplateId: number | null;
}): Promise<GetTemplatesResponse> {
  return requestApi<GetTemplatesResponse>({
    url: alarmTalkTemplate(`${params.groupTemplateId}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetAlarmTalkTemplatesBySearchResponse {
  status: string;
  data: {
    contents: Array<Template>;
    pageLength: number;
    paging: Pagination;
    totalCount: number;
  };
  message: string;
}

export function getAlarmTalkTemplatesBySearchAPI(params: {
  startDate: string | null;
  endDate: string | null;
  groupTemplateId: number | null;
  templateName: string | null;
  currentPage: number | null;
  pageSize: number;
  // sort: string | null;
}): Promise<GetAlarmTalkTemplatesBySearchResponse> {
  return requestApi<GetAlarmTalkTemplatesBySearchResponse>({
    url: alarmTalkTemplate("/search?"),
    params: {
      templateName: params.templateName ? params.templateName : null,
      groupTemplateId: params.groupTemplateId ? params.groupTemplateId : null,
      startDate: params.startDate ? params.startDate : null,
      endDate: params.endDate ? params.endDate : null,
      currentPage: params.currentPage ? params.currentPage : null,
      pageSize: params.pageSize ? params.pageSize : 10,
      // sort:params.sort??null,
    },
    method: "GET",
  }).then((response) => response.data);
}
