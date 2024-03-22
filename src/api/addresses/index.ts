import { requestApi } from "api";
import { address } from "api/url";
import Pagination from "type/Pagination";
import Address from "type/Address";

export interface GetAddressesResponse {
  status: string;
  data: {
    body: Array<Address>;
    headers: {};
    statusCode: string;
    statusCodeValue: number;
  };
  message: string;
}

export function getAddressesAPI(params: {
  groupAddressId: number | null;
}): Promise<GetAddressesResponse> {
  return requestApi<GetAddressesResponse>({
    url: address(`/group-address/${params.groupAddressId}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetAddressesBySearchResponse {
  status: string;
  data: {
    contents: Array<Address>;
    pageLength: number;
    paging: Pagination;
    totalCount: number;
  };
  message: string;
}

export function getAddressesBySearchAPI(params: {
  addressGroupId: number | null;
  keyword: string | null;
  targetColumn: string | null;
  currentPage: number | null;
  pageSize: number;
  // sort: string | null;
}): Promise<GetAddressesBySearchResponse> {
  return requestApi<GetAddressesBySearchResponse>({
    url: address(`/search?`),
    params: {
      addressGroupId: params.addressGroupId ? params.addressGroupId : null,
      keyword: params.keyword ? params.keyword : null,
      targetColumn: params.targetColumn ? params.targetColumn : null,
      currentPage: params.currentPage ? params.currentPage : null,
      pageSize: params.pageSize ? params.pageSize : 10,
      // sort:params.sort??null,
    },
    method: "GET",
  }).then((response) => response.data);
}

export interface AddAddressesByExcelResponse {
  status: string;
  data: {};
  message: string;
}

export function addAddressesByExcelAPI(params: {
  addressGroupId: number;
  file: File;
}): Promise<AddAddressesByExcelResponse> {
  const formData = new FormData();
  formData.append("files", params.file);
  formData.append(
    "address",
    new Blob(
      [
        JSON.stringify({
          files: params.file,
          addressGroupId: params.addressGroupId,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  return requestApi<AddAddressesByExcelResponse>({
    url: address("/excel"),
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}

export interface RemoveBulkAddressResponse {
  status: string;
  message: string;
}

export function removeBulkAddressAPI(params: {
  addressIds: Array<number>;
}): Promise<RemoveBulkAddressResponse> {
  return requestApi<RemoveBulkAddressResponse>({
    url: address("/remove/bulk"),
    data: {
      addressIds: params.addressIds ? params.addressIds : null,
    },
    method: "POST",
  }).then((response) => response.data);
}
