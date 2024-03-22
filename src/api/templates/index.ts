import { requestApi } from "api";
import { template } from "api/url";
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

export function getTemplatesAPI(params: {
  groupTemplateId: number | null;
}): Promise<GetTemplatesResponse> {
  return requestApi<GetTemplatesResponse>({
    url: template(`/group-template/${params.groupTemplateId}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetTemplatesBySearchResponse {
  status: string;
  data: {
    contents: Array<Template>;
    pageLength: number;
    paging: Pagination;
    totalCount: number;
  };
  message: string;
}

export function getTemplatesBySearchAPI(params: {
  startDate: string | null;
  endDate: string | null;
  groupTemplateId: number | null;
  templateChannel: string | null;
  templateName: string | null;
  currentPage: number | null;
  pageSize: number;
  // sort: string | null;
}): Promise<GetTemplatesBySearchResponse> {
  return requestApi<GetTemplatesBySearchResponse>({
    url: template("/search?"),
    params: {
      templateName: params.templateName ? params.templateName : null,
      templateChannel: params.templateChannel ? params.templateChannel : null,
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
