import { requestApi } from "api";
import { techd } from "api/url";
import Techd from "type/Techd";

export interface TechdListResponse {
  status: string;
  data: Techd[];
  message: string;
}

export function getTechdList(): Promise<TechdListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<TechdListResponse>({
    url: techd("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
