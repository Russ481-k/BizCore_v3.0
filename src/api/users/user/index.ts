import { requestApi } from "api";
import { users } from "api/url";
import SendAuth from "type/SendAuth";
import SendCount from "type/SendCount";
import User from "type/User";

export interface GetUserParams {
  userIdx: number | null;
}
export interface GetUserResponse {
  status: string;
  data: User;
  message: string;
}
export function getUserAPI(params: GetUserParams): Promise<GetUserResponse> {
  return requestApi<GetUserResponse>({
    url: users(`/${params.userIdx}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface AddUserResponse {
  status: string;
  message: string;
}
export function addUserAPI(params: User): Promise<AddUserResponse> {
  return requestApi<AddUserResponse>({
    url: users(""),
    method: "POST",
    data: {
      userId: params.userId ?? null,
      userName: params.userName ?? null,
      positionName: params.positionName ?? null,
      deptCode: params.deptCode ?? null,
      permissionsId: params.permissionsId ?? null,
      wirelessPhoneNumber: params.wirelessPhoneNumber ?? null,
      wiredPhoneNumber: params.wiredPhoneNumber ?? null,
      wiredPhoneNumberPlus: params.wiredPhoneNumberPlus ?? null,
      crsPhoneNumber: params.crsPhoneNumber ?? null,
      isBizCore: params.isBizCore ?? null,
      sendAuthorization: {
        isSmsUse: params.sendAuthorization.isSmsUse ?? null,
        isLmsUse: params.sendAuthorization.isLmsUse ?? null,
        isMmsUse: params.sendAuthorization.isMmsUse ?? null,
        isKktUse: params.sendAuthorization.isKktUse ?? null,
        isCrsUse: params.sendAuthorization.isCrsUse ?? null,
        isSmsUnlimited: params.sendAuthorization.isSmsUnlimited ?? null,
        isLmsUnlimited: params.sendAuthorization.isLmsUnlimited ?? null,
        isMmsUnlimited: params.sendAuthorization.isMmsUnlimited ?? null,
        isKktUnlimited: params.sendAuthorization.isKktUnlimited ?? null,
        isCrsUnlimited: params.sendAuthorization.isCrsUnlimited ?? null,
      },
      sendCountRequest: {
        smsLimitCount: params.sendCountRequest.smsLimitCount ?? null,
        lmsLimitCount: params.sendCountRequest.lmsLimitCount ?? null,
        mmsLimitCount: params.sendCountRequest.mmsLimitCount ?? null,
        kktLimitCount: params.sendCountRequest.kktLimitCount ?? null,
        crsLimitCount: params.sendCountRequest.crsLimitCount ?? null,
      },
    },
  }).then((response) => response.data);
}

export interface ChangeUserParams {
  userIdx: number;
  status: string;
  userName: string | null;
  positionName: string | null;
  deptCode: string | null;
  permissionsId: number | null;
  wirelessPhoneNumber?: string | null;
  wiredPhoneNumber?: string | null;
  wiredPhoneNumberPlus?: string | null;
  crsPhoneNumber?: string | null;
  isBizCore?: boolean | null;
  sendAuthorization: SendAuth;
  sendCountRequest: SendCount;
}
export interface ChangeUserResponse {
  status: string;
  message: string;
}
export function changeUserAPI(
  params: ChangeUserParams
): Promise<ChangeUserResponse> {
  return requestApi<ChangeUserResponse>({
    url: users(`/${params.userIdx}`),
    method: "PUT",
    data: {
      status: params.status ?? null,
      userName: params.userName ?? null,
      positionName: params.positionName ?? null,
      deptCode: params.deptCode ?? null,
      permissionsId: params.permissionsId ?? null,
      wirelessPhoneNumber: params.wirelessPhoneNumber ?? null,
      wiredPhoneNumber: params.wiredPhoneNumber ?? null,
      wiredPhoneNumberPlus: params.wiredPhoneNumberPlus ?? null,
      crsPhoneNumber: params.crsPhoneNumber ?? null,
      isBizCore: params.isBizCore ?? null,
      sendAuthorization: {
        isSmsUse: params.sendAuthorization.isSmsUse ?? null,
        isLmsUse: params.sendAuthorization.isLmsUse ?? null,
        isMmsUse: params.sendAuthorization.isMmsUse ?? null,
        isKktUse: params.sendAuthorization.isKktUse ?? null,
        isCrsUse: params.sendAuthorization.isCrsUse ?? null,
        isSmsUnlimited: params.sendAuthorization.isSmsUnlimited ?? null,
        isLmsUnlimited: params.sendAuthorization.isLmsUnlimited ?? null,
        isMmsUnlimited: params.sendAuthorization.isMmsUnlimited ?? null,
        isKktUnlimited: params.sendAuthorization.isKktUnlimited ?? null,
        isCrsUnlimited: params.sendAuthorization.isCrsUnlimited ?? null,
      },
      sendCountRequest: {
        smsLimitCount: params.sendCountRequest.smsLimitCount ?? null,
        lmsLimitCount: params.sendCountRequest.lmsLimitCount ?? null,
        mmsLimitCount: params.sendCountRequest.mmsLimitCount ?? null,
        kktLimitCount: params.sendCountRequest.kktLimitCount ?? null,
        crsLimitCount: params.sendCountRequest.crsLimitCount ?? null,
      },
    },
  }).then((response) => response.data);
}

export interface DeleteUserParams {
  userIdx: number;
}
export interface DeleteUserResponse {
  status: string;
  message: string;
}
export function deleteUserAPI(
  params: DeleteUserParams
): Promise<DeleteUserResponse> {
  return requestApi<DeleteUserResponse>({
    url: users(`/${params.userIdx}`),
    method: "DELETE",
  }).then((response) => response.data);
}

export interface GetValidUserParams {
  userId: string;
}
export interface GetValidUserResponse {
  status: string;
  data: string;
  message: string;
}
export function getValidUserAPI(
  params: GetValidUserParams
): Promise<GetValidUserResponse> {
  return requestApi<GetValidUserResponse>({
    url: users(`/find/${params.userId}`),
    method: "GET",
  }).then((response) => response.data);
}
