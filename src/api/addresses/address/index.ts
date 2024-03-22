import { requestApi } from "api";
import { address } from "api/url";
import Address from "type/Address";

export interface AddAddressResponse {
  status: string;
  message: string;
}

export function addAddressAPI(params: {
  addressList: Array<{
    addressName: string;
    addressPhone: string;
    addressNumber: string | null;
    note: string | null;
  }>;
  addressGroupId: number | null;
}): Promise<AddAddressResponse> {
  return requestApi<AddAddressResponse>({
    url: address(""),
    data: {
      addressList: params.addressList ? params.addressList : null,
      addressGroupId: params.addressGroupId ? params.addressGroupId : null,
    },
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeAddressResponse {
  status: string;
  message: string;
}

export function changeAddressAPI(params: {
  address: {
    addressName: string;
    addressPhone: string;
    addressNumber: string | null;
    note: string | null;
  };
  addressGroupId: number | null;
  addressId?: number;
}): Promise<ChangeAddressResponse> {
  return requestApi<ChangeAddressResponse>({
    url: address(`/${params.addressId}`),
    data: {
      addressName: params.address.addressName
        ? params.address.addressName
        : null,
      addressPhone: params.address.addressPhone
        ? params.address.addressPhone
        : null,
      addressNumber: params.address.addressNumber
        ? params.address.addressNumber
        : null,
      note: params.address.note ? params.address.note : null,
      addressGroupId: params.addressGroupId ? params.addressGroupId : null,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetAddressResponse {
  status: string;
  data: Address;
  message: string;
}

export function getAddressAPI(params: {
  addressId: number | null;
}): Promise<GetAddressResponse> {
  if (params.addressId !== null) {
    return requestApi<GetAddressResponse>({
      url: address(`/${params.addressId}`),
      method: "GET",
    }).then((response) => response.data);
  } else {
    return new Promise(() => {});
  }
}
