import { requestApi } from "api";
import { custs } from "api/url";

export interface CustListResponse {
  status: string;
  data: {};
  message: string;
}

export function getCust(params: {
  compNo: string;
  custNo: string;
}): Promise<CustListResponse> {
  return requestApi<CustListResponse>({
    url: custs(`/cust/${params}`),
    method: "GET",
    params: {
      compNo: params.compNo ?? null,
      custNo: params.custNo ?? null,
    },
    withJWT: true,
  }).then((response) => response.data);
}
