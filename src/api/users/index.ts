import { requestApi } from "api";
import { users } from "api/url";
import Pagination from "type/Pagination";
import User from "type/User";
import UserListItem from "type/UserListItem";

export interface GetUsersParams {
  deptCode: string | null;
  status: string[] | null;
  permissionId: number | null;
  keyword: string | null;
  targetColumn: string | null;
  isBizCore: boolean | null;
  currentPage?: number | null;
  pageSize?: number | null;
  compNo?: number | null;
}

export interface GetUsersResponse {
  status: string;
  data: User[];
  message: string;
}
export function getUsersAPI(params: GetUsersParams): Promise<GetUsersResponse> {
  return requestApi<GetUsersResponse>({
    url: users(""),
    method: "GET",
    params: {
      deptCode: params.deptCode ?? null,
      status: params.status ?? null,
      permissionId: params.permissionId ?? null,
      keyword: params.keyword ?? null,
      targetColumn: params.targetColumn ?? null,
      isBizCore: params.isBizCore ?? null,
      currentPage: params.currentPage ?? null,
      pageSize: params.pageSize ?? null,
      compNo: params.compNo ?? null,
    },
    withJWT: true,
  }).then((response) => response.data);
}
