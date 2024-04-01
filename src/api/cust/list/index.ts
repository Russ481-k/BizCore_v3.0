import { requestApi } from "api";
import { cust } from "api/url";

export interface CustListResponse {
  status: string;
  data: {};
  message: string;
}

export function getCustList(): Promise<CustListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<CustListResponse>({
    url: cust("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
