import { requestApi } from "api";
import { addressGroup } from "api/url";

export interface AddAddressGroupResponse {
  status: string;
  message: string;
}

export function AddAddressGroupAPI(params: {
  addressGroupName: string;
}): Promise<AddAddressGroupResponse> {
  return requestApi<AddAddressGroupResponse>({
    url: addressGroup(""),
    data: {
      addressGroupName: params.addressGroupName
        ? params.addressGroupName
        : null,
    },
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeAddressGroupResponse {
  status: string;
  message: string;
}

export function changeAddressGroupAPI(params: {
  addressGroupId: number;
  addressGroupName: string;
}): Promise<ChangeAddressGroupResponse> {
  return requestApi<ChangeAddressGroupResponse>({
    url: addressGroup(`/${params.addressGroupId}`),
    data: {
      addressGroupName: params.addressGroupName,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface DeleteAddressGroupResponse {
  status: string;
  message: string;
}

export function deleteAddressGroupAPI(params: {
  addressGroupId: number;
}): Promise<DeleteAddressGroupResponse> {
  return requestApi<DeleteAddressGroupResponse>({
    url: addressGroup(`/${params.addressGroupId}`),
    method: "DELETE",
  }).then((response) => response.data);
}

export interface GetValidAddressGroupNameResponse {
  status: string;
  data: string;
  message: string;
}

export function getValidAddressGroupNameAPI(params: {
  addressGroupName: string;
}): Promise<GetValidAddressGroupNameResponse> {
  return requestApi<GetValidAddressGroupNameResponse>({
    url: addressGroup(`/find/${params.addressGroupName}`),
    method: "GET",
  }).then((response) => response.data);
}
