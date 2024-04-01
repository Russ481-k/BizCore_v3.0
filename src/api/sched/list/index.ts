import { requestApi } from "api";
import { sched } from "api/url";
import Sched from "type/Sched";

export interface SchedListResponse {
  status: string;
  data: Sched[];
  message: string;
}

export function getSchedList(): Promise<SchedListResponse> {
  //   params: {
  //   compId: string;
  //   userId: string;
  //   password: string;
  // }
  return requestApi<SchedListResponse>({
    url: sched("/list"),
    method: "GET",
    // data: {
    //   compId: params.compId ?? null,
    //   userId: params.userId ?? null,
    //   password: params.password ?? null,
    // },
    withJWT: true,
  }).then((response) => response.data);
}
