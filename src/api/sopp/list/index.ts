import { requestApi } from "api";
import { sopp } from "api/url";

export interface SoppListResponse {
  status: string;
  data: {};
  message: string;
}

export function getSoppList(): Promise<SoppListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<SoppListResponse>({
    url: sopp("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
