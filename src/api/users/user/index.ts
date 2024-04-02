import { requestApi } from "api";
import { users } from "api/url";
import User from "type/User";

export interface GetUserParams {
  userNo: number | null;
}
export interface GetUserResponse {
  status: string;
  data: User;
  message: string;
}
export function getUserAPI(params: GetUserParams): Promise<GetUserResponse> {
  return requestApi<GetUserResponse>({
    url: users(`/user/${params.userNo}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface AddUserResponse {
  status: string;
  message: string;
}
export function addUserAPI(params: User): Promise<AddUserResponse> {
  return requestApi<AddUserResponse>({
    url: users("/user"),
    method: "POST",
    data: {
      userNo: params.userNo,
      compNo: params.compNo,
      userId: params.userId,
      userName: params.userName,
      userTel: params.userTel,
      userEmail: params.userEmail,
      userOtp: params.userOtp,
      userRole: params.userRole,
      userCode: params.userCode,
      docRole: params.docRole,
      userKey: params.userKey,
      org_id: params.org_id,
      listDateFrom: params.listDateFrom,
      regDatetime: params.regDatetime,
      modDatetime: params.modDatetime,
      attrib: params.attrib,
      userRank: params.userRank,
      userDept: params.userDept,
    },
  }).then((response) => response.data);
}

export interface ChangeUserResponse {
  status: string;
  message: string;
}
export function changeUserAPI(params: User): Promise<ChangeUserResponse> {
  return requestApi<ChangeUserResponse>({
    url: users(`/user/${params.userNo}`),
    method: "PUT",
    data: {
      userNo: params.userNo,
      compNo: params.compNo,
      userId: params.userId,
      userName: params.userName,
      userPasswd: params.userPasswd,
      userTel: params.userTel,
      userEmail: params.userEmail,
      userOtp: params.userOtp,
      userRole: params.userRole,
      userCode: params.userCode,
      docRole: params.docRole,
      userKey: params.userKey,
      org_id: params.org_id,
      listDateFrom: params.listDateFrom,
      attrib: params.attrib,
      userRank: params.userRank,
      userDept: params.userDept,
    },
  }).then((response) => response.data);
}

export interface DeleteUserParams {
  userNo: number;
}
export interface DeleteUserResponse {
  status: string;
  message: string;
}
export function deleteUserAPI(
  params: DeleteUserParams
): Promise<DeleteUserResponse> {
  return requestApi<DeleteUserResponse>({
    url: users(`/user/${params.userNo}`),
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
    url: users(`/user/find/${params.userId}`),
    method: "GET",
  }).then((response) => response.data);
}
