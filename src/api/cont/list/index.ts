import { requestApi } from "api";
import { cont } from "api/url";

export interface ContListResponse {
  status: string;
  data: {};
  message: string;
}

export function getContList(): Promise<ContListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<ContListResponse>({
    url: cont("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
