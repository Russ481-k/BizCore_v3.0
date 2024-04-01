import { requestApi } from "api";
import { sched } from "api/url";
import Pagination from "type/Pagination";
import Sched from "type/Sched";

export interface SchedListParams {
  currentPage: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
}

export interface SchedListResponse {
  status: string;
  message: string;
  data: Sched[];
  pagination: Pagination;
  totalCount: number;
}

export function getSchedList(
  params: SchedListParams
): Promise<SchedListResponse> {
  return requestApi<SchedListResponse>({
    url: sched("/list"),
    method: "GET",
    params: {
      currentPage: params.currentPage,
      pageSize: params.pageSize,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      
    },
    withJWT: true,
  }).then((response) => response.data);
}
