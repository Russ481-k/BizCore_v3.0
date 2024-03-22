import { requestApi } from "api";
import { twoway } from "api/url";
import Message from "type/Message";
import Pagination from "type/Pagination";

export interface GetTwoWayMessagesBySearchParams {
  changeTime: boolean;
  subject: string | null;
  createUser: string | null;
  createId: string | null;
  startCreateDate: string | null;
  endCreateDate: string | null;
  startReqDate: string | null;
  endReqDate: string | null;
  all: string | null;
  sendType: string | null;
  dispatchType: string | null;
  channelType: string | null;
  currentPage: number | null;
  pageSize: number | null;
}

export interface SendTwoWayMessageResponse {
  status: string;
  message: string;
}

export function sendTwoWayMessageAPI(params: {
  id: number;
  reqDate: string | null;
}): Promise<SendTwoWayMessageResponse> {
  return requestApi<SendTwoWayMessageResponse>({
    url: twoway(`/change/time/${params.id}`),
    params: {
      reqDate: params.reqDate || null,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetTwoWayMessagesResponse {
  status: string;
  data: {
    contents: Array<Message>;
    statusCode: string;
    statusCodeValue: number;
    totalCount: number;
    pageLength: number;
    paging: Pagination;
  };
  message: string;
}

export function getTwoWayMessagesAPI(
  params: GetTwoWayMessagesBySearchParams
): Promise<GetTwoWayMessagesResponse> {
  return requestApi<GetTwoWayMessagesResponse>({
    url: twoway(`/head`),
    params: {
      subject: params.subject || null,
      createUser: params.createUser || null,
      createId: params.createId || null,
      startCreateDate: params.startCreateDate || null,
      endCreateDate: params.endCreateDate || null,
      startReqDate: params.startReqDate || null,
      endReqDate: params.endReqDate || null,
      all: params.all || null,
      sendType: params.sendType || null,
      channel: params.channelType || null,
      dispatchType: params.dispatchType || null,
      currentPage: params.currentPage || null,
      pageSize: params.pageSize || null,
    },
    method: "GET",
  }).then((response) => response.data);
}

export function deleteMessagesAPI(params: {
  headId: number;
}): Promise<GetTwoWayMessagesResponse> {
  return requestApi<GetTwoWayMessagesResponse>({
    url: twoway(`/cancel/${params.headId}`),
    method: "PUT",
  }).then((response) => response.data);
}
export function changeMessagesAPI(params: {
  headId: number;
}): Promise<GetTwoWayMessagesResponse> {
  return requestApi<GetTwoWayMessagesResponse>({
    url: twoway(`/cancel/${params.headId}`),
    method: "PUT",
  }).then((response) => response.data);
}
