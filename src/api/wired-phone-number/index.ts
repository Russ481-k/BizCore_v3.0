import { requestApi } from "api";
import { users } from "api/url";

export interface GetWiredPhoneNumbersResponse {
  resultCode: "SUCCESS";
  data: {
    wiredPhoneNumber: string;
    wiredPhoneNumberPlus: string;
  };
}

export function getWiredPhoneNumbersAPI(): Promise<GetWiredPhoneNumbersResponse> {
  return requestApi<GetWiredPhoneNumbersResponse>({
    url: users("/current/wired"),
    method: "GET",
  }).then((response) => response.data);
}
