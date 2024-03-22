import { requestApi } from "api";
import { permission } from "api/url";
import Permission from "type/Permission";

export interface GetPermissionResponse {
  status: string;
  data: Array<Permission>;
  message: string;
}

export function getPermissionAPI(): Promise<GetPermissionResponse> {
  return requestApi<GetPermissionResponse>({
    url: permission(""),
    method: "GET",
  }).then((response) => response.data);
}
