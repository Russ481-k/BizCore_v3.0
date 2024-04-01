import { requestApi } from "api";
import { users } from "api/url";
import User from "type/User";

export interface GetMyProfileResponse {
  status: string;
  data: User;
  message: string;
}
export function getMyProfileAPI(): Promise<GetMyProfileResponse> {
  return requestApi<GetMyProfileResponse>({
    url: users(`/current`),
    method: "GET",
    withJWT: true,
  }).then((response) => response.data);
}

export interface ChangeMyProfileParams {
  userName: string;
  userTel?: string;
}
export interface ChangeMyProfileResponse {
  status: string;
  data: string;
  message: string;
}
export function changeMyProfileAPI(
  params: ChangeMyProfileParams
): Promise<ChangeMyProfileResponse> {
  return requestApi<ChangeMyProfileResponse>({
    url: users(`/current`),
    method: "PUT",
    data: {
      userName: params.userName ?? null,
      userTel: params.userTel ?? null,
    },
    withJWT: true,
  }).then((response) => response.data);
}

export interface ChangeMyPwdParams {
  password: string;
}
export interface ChangeMyPwdResponse {
  status: string;
  data: string;
  message: string;
}
export function changeMyPwdAPI(
  params: ChangeMyPwdParams
): Promise<ChangeMyPwdResponse> {
  return requestApi<ChangeMyPwdResponse>({
    url: users(`/current/password`),
    method: "POST",
    data: {
      password: params.password,
    },
    withJWT: true,
  }).then((response) => response.data);
}
