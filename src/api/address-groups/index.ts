import { requestApi } from "api";
import { addressGroup } from "api/url";
import AddressGroup from "type/AddressGroup";

export interface GetAddressGroupsResponse {
  status: string;
  data: {
    groupList: Array<AddressGroup>;
    addressTotalCount: number;
  };
  message: string;
}

export function getAddressGroupsAPI(): Promise<GetAddressGroupsResponse> {
  return requestApi<GetAddressGroupsResponse>({
    url: addressGroup(""),
    method: "GET",
  }).then((response) => response.data);
}
