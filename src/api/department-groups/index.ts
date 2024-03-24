import { requestApi } from "api";
import { department } from "api/url";
import Department from "type/Department";

export interface GetDeptGroupsResponse {
  status: string;
  data: {
    eminwonBody: Array<Department> | null;
    BizCoreBody: Array<Department> | null;
    eminwonTotal: number;
    BizCoreTotal: number;
    deptTotalCount: number;
  };
  message: string;
}

export function getDeptGroupsAPI(): Promise<GetDeptGroupsResponse> {
  return requestApi<GetDeptGroupsResponse>({
    url: department(""),
    method: "GET",
  }).then((response) => response.data);
}
