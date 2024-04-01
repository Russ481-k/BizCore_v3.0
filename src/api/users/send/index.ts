import { requestApi } from "api";
import { users } from "api/url";
import CrsGroupListItem from "type/CrsGroupListItem";
import CrsUserNumListItem from "type/CrsUserNumListItem";
import UserSendCountTotal from "type/UserSendCountTotal";

export interface GetUserCrsResponse {
  status: string;
  data: {
    crsGroupList: Array<CrsGroupListItem>;
    userNumber: Array<CrsUserNumListItem>;
  };
  message: string;
}

export function getUserCrsAPI(): Promise<GetUserCrsResponse> {
  return requestApi<GetUserCrsResponse>({
    url: users("/crs"),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetSendCountTotalParams {
  userNo: number | null;
}
export interface GetSendCountTotalResponse {
  status: string;
  data: UserSendCountTotal;
  message: string;
}
export function getSendCountTotalAPI(
  params: GetSendCountTotalParams
): Promise<GetSendCountTotalResponse> {
  return requestApi<GetSendCountTotalResponse>({
    url: users(`/send-count/total/${params.userNo}`),
    method: "GET",
  }).then((response) => response.data);
}
