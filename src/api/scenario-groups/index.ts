import { requestApi } from "api";
import { scenario } from "api/url";
import Pagination from "type/Pagination";
import ScenarioGroup from "type/ScenarioGroup";

export interface GetScenarioGroupsResponse {
  status: string;
  data: Array<ScenarioGroup>;
  pageable: Pagination;
  totalPages: number;
  totalRows: number;
  message: string;
}

export interface ScenarioGroupsParams {
  all: string | null;
  createId: string | null;
  createUser: string | null;
  subject: string | null;
  pageSize: number;
  currentPage: number;
}

export function getGetScenarioGroupsAPI(
  params: ScenarioGroupsParams
): Promise<GetScenarioGroupsResponse> {
  return requestApi<GetScenarioGroupsResponse>({
    url: scenario(`/group/list`),
    data: {
      all: params.all ? params.all : null,
      createId: params.createId ? params.createId : null,
      createUser: params.createUser ? params.createUser : null,
      subject: params.subject ? params.subject : null,
      pageSize: params.pageSize ? params.pageSize : 10,
      currentPage: params.currentPage ? params.currentPage : 1,
    },
    method: "get",
  }).then((response) => response.data);
}
