import { requestApi } from "api";
import { users } from "api/url";
import MyProfile from "type/MyProfile";
import UserSendData from "type/UserSendData";

export interface GetMyProfileResponse {
  status: string;
  data: MyProfile;
  message: string;
}
export function getMyProfileAPI(): Promise<GetMyProfileResponse> {
  return requestApi<GetMyProfileResponse>({
    url: users(`/current`),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetMySendDataResponse {
  status: string;
  data: UserSendData;
  message: string;
}
export function getMySendDataAPI(): Promise<GetMySendDataResponse> {
  return requestApi<GetMySendDataResponse>({
    url: users(`/send-count`),
    method: "GET",
  }).then((response) => response.data);
}

export interface ChangeMyProfileParams {
  userName: string;
  wirelessPhoneNumber?: string;
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
      wirelessPhoneNumber: params.wirelessPhoneNumber ?? null,
    },
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
  }).then((response) => response.data);
}
