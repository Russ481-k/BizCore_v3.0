import { requestApi } from "api";
import { sales } from "api/url";

export interface SalesListResponse {
  status: string;
  data: {};
  message: string;
}

export function getSalesList(): Promise<SalesListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<SalesListResponse>({
    url: sales("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
