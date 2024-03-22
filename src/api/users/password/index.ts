import { requestApi } from "api";
import { users } from "api/url";

export interface CheckInitialPwdParams {
  password: string;
}
export interface CheckInitialPwdResponse {
  status: string;
  data: boolean;
  message: string;
}
export function checkInitialPwdAPI(
  params: CheckInitialPwdParams
): Promise<CheckInitialPwdResponse> {
  return requestApi<CheckInitialPwdResponse>({
    url: users("/password"),
    method: "POST",
    data: {
      password: params.password ?? null,
    },
  }).then((response) => response.data);
}

export interface ResetPwdParams {
  userIdx: number;
}
export interface ResetPwdResponse {
  status: string;
  data: string;
  message: string;
}
export function resetPwdAPI(params: ResetPwdParams): Promise<ResetPwdResponse> {
  return requestApi<ResetPwdResponse>({
    url: users(`/password/reset/${params.userIdx}`),
    method: "POST",
  }).then((response) => response.data);
}
