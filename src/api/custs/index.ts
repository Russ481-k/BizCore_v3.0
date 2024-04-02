import { requestApi } from "api";
import { custs } from "api/url";
import Cust from "type/Cust";

export interface GetCustListResponse {
  status: string;
  data: Cust[];
  message: string;
}

export function getCustListAPI(params: {
  compNo: number;
}): Promise<GetCustListResponse> {
  return requestApi<GetCustListResponse>({
    url: custs("/list"),
    method: "GET",
    params: {
      compNo: params.compNo ?? null,
    },
    withJWT: true,
  }).then((response) => response.data);
}
