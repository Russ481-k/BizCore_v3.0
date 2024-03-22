import { requestApi } from "api";
import { twoway } from "api/url";
import { GetAutoMessageDetailParams } from "features/send/hooks/useGetAutoSendMessageLog";
import { GetTwoWayMessageDetailParams } from "features/send/hooks/useGetSendTwoWayMessageLog";
import AutoMessage from "type/AutoMessage";
import Message from "type/Message";
import Pagination from "type/Pagination";

export interface CancelReservedTwoWayMessageResponse {
  status: string;
  message: string;
}

export function cancelReservedTwoWayMessageAPI(params: {
  id: number;
}): Promise<CancelReservedTwoWayMessageResponse> {
  return requestApi<CancelReservedTwoWayMessageResponse>({
    url: twoway(`/cancel/${params.id}`),
    method: "PUT",
  }).then((response) => response.data);
}

export interface DeleteTwoWaySubjectsResponse {
  status: string;
  message: string;
}

export interface DeleteTwoWaySubjectsParams {
  data: Array<number>;
}

export function deleteTwoWaySubjectsAPI(
  params: DeleteTwoWaySubjectsParams
): Promise<DeleteTwoWaySubjectsResponse> {
  return requestApi<DeleteTwoWaySubjectsResponse>({
    url: twoway(`/delete`),
    data: { data: params.data || null },
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetTwoWayMessageDetailResponse {
  status: string;
  data: {
    contents: Message[];
    statusCode: string;
    statusCodeValue: number;
    totalCount: number;
    pageLength: number;
    paging: Pagination;
  };
  message: string;
}

export function getMessageDetailAPI(params: {
  headId: number | null;
}): Promise<GetTwoWayMessageDetailResponse> {
  return requestApi<GetTwoWayMessageDetailResponse>({
    url: twoway(`/detail/${params.headId}`),
    method: "get",
  }).then((response) => response.data);
}

export interface GetReservedTwoWayMessageDetailResponse {
  status: string;
  data: {
    id: number;
    sendType: string;
    channel: string;
    reqDate: string;
    createDate: string;
    createUser: string;
    callerNo: number;
    message: string;
    file: null;
  };
  message: string;
}

export function getReservedTwoWayMessageDetailAPI(params: {
  headId: number | null;
}): Promise<GetReservedTwoWayMessageDetailResponse> {
  return requestApi<GetReservedTwoWayMessageDetailResponse>({
    url: twoway(`/reserve/${params.headId}`),
    method: "get",
  }).then((response) => response.data);
}

export interface GetReservedTwoWayMessageSubjectsResponse {
  status: string;
  data: {
    user: {
      contents: Array<{
        id: number;
        receiverName: string;
        receiverNo: string;
        callNumber: string;
        setValue1: string;
        setValue2: string;
        setValue3: string;
        setValue4: string;
      }>;
      pageLength: number;
      paging: Pagination;
    };
    totalReceiverCount: number;
  };
  message: string;
}

export function getReservedTwoWayMessageSubjectsAPI(params: {
  headId: number | null;
  currentPage: number | null;
}): Promise<GetReservedTwoWayMessageSubjectsResponse> {
  return requestApi<GetReservedTwoWayMessageSubjectsResponse>({
    url: twoway(`/reserve/${params.headId}/user`),
    params: {
      currentPage: params.currentPage || null,
    },
    method: "get",
  }).then((response) => response.data);
}

export interface GetTwoWayMessageLogResponse {
  status: string;
  data: {
    receiverList: Array<{
      id: number;
      channel: string;
      message: string;
      receiverName: string;
      receiverNo: string;
      status: string;
      result: string;
    }>;
    headerMessageDTO: {
      id: number;
      channel: string;
      createDate: string;
      createUser: string;
      failPercent: number;
      failSendCount: number;
      readyPercent: number;
      readySendCount: number;
      sendDate: string;
      sendType: string;
      successPercent: number;
      successSendCount: number;
      pageable: Pagination;
      totalPages: number;
      totalElements: number;
      totalSendCount: number;
    };
  };
  message: string;
}

export function getGetSendTwoWayMessageLogAPI(
  params: GetTwoWayMessageDetailParams
): Promise<GetTwoWayMessageLogResponse> {
  return requestApi<GetTwoWayMessageLogResponse>({
    url: twoway(`/master/${params.headId}`),
    params: {
      status: params.sendStatus ?? null,
      channel: params.sendChannel || null,
      all: params.keyword || null,
      page: params.page ?? 1,
      size: params.size ?? 10,
      // sort: params.sort ?? null,
    },
    method: "get",
  }).then((response) => response.data);
}

export interface GetAutoMessageLogResponse {
  status: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Array<AutoMessage>;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: Pagination;
    empty: boolean;
  };
  message: string;
}

export function getGetAutoSendMessageLogAPI(
  params: GetAutoMessageDetailParams
): Promise<GetAutoMessageLogResponse> {
  return requestApi<GetAutoMessageLogResponse>({
    url: twoway(`/log/auto`),
    params: {
      startSendDate: params.startSendDate || null,
      endSendDate: params.endSendDate || null,
      channelType: params.channelType || null,
      autoType: params.autoType || null,
      result: params.result || null,
      name: params.name || null,
      phone: params.phone || null,
      page: params.page || 1,
      size: params.size || 10,
      // sort: params.sort|| null,
    },
    method: "get",
  }).then((response) => response.data);
}
