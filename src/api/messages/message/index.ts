import { requestApi } from "api";
import { messages } from "api/url";
import AutoMessage from "type/AutoMessage";
import Message from "type/Message";
import Pagination from "type/Pagination";

export interface CancelReservedMessageResponse {
  status: string;
  message: string;
}

export function cancelReservedMessageAPI(params: {
  id: number;
}): Promise<CancelReservedMessageResponse> {
  return requestApi<CancelReservedMessageResponse>({
    url: messages(`/cancel/${params.id}`),
    method: "PUT",
  }).then((response) => response.data);
}

export interface DeleteSubjectsResponse {
  status: string;
  message: string;
}

export interface DeleteSubjectsParams {
  id: number;
  data: Array<{
    msgId: number;
    type: string;
  }>;
}

export function deleteSubjectsAPI(
  params: DeleteSubjectsParams
): Promise<DeleteSubjectsResponse> {
  return requestApi<DeleteSubjectsResponse>({
    url: messages(`/delete/${params.id}`),
    data: { data: params.data || null },
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetMessageDetailResponse {
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
}): Promise<GetMessageDetailResponse> {
  return requestApi<GetMessageDetailResponse>({
    url: messages(`/detail/${params.headId}`),
    method: "get",
  }).then((response) => response.data);
}

export function getReservedMessageDetailAPI(params: {
  headId: number | null;
}): Promise<GetReservedMessageDetailResponse> {
  return requestApi<GetReservedMessageDetailResponse>({
    url: messages(`/reserve/${params.headId}`),
    method: "get",
  }).then((response) => response.data);
}

export interface GetReservedMessageDetailResponse {
  status: string;
  data: {
    callback: string;
    channelType: string;
    createDate: string;
    createUser: string;
    failSendCount: number;
    filePath1: string;
    filePath2: string;
    filePath3: string;
    id: number;
    msg: string;
    reqDate: string;
    sendType: "R" | "D";
    status: "R" | "P" | "C";
    subject: string;
    successSendCount: number;
    totalSendCount: number;
    files: Array<{
      filePath: string;
    }>;
  };
  message: string;
}

export interface GetReservedMessageSubjectsResponse {
  status: string;
  data: {
    user: {
      contents: Array<{
        callNumber: string;
        channelType: string;
        msgId: number;
        name: string;
        phone: string;
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

export function getReservedMessageSubjectsAPI(params: {
  headId: number | null;
  currentPage: number | null;
}): Promise<GetReservedMessageSubjectsResponse> {
  return requestApi<GetReservedMessageSubjectsResponse>({
    url: messages(`/reserve/${params.headId}/user`),
    params: {
      currentPage: params.currentPage || null,
    },
    method: "get",
  }).then((response) => response.data);
}

export interface GetMessageLogResponse {
  status: string;
  data: {
    headMessageDTO: {
      channelType: string;
      createDate: string;
      failPercent: number;
      failResendCount: number;
      failSendCount: number;
      id: number;
      readyPercent: number;
      readySendCount: number;
      reqDate: string;
      successPercent: number;
      successResendCount: number;
      successSendCount: number;
      totalSendCount: number;
      totalResendCount: number;
    };
    receiverList: {
      content: Array<{
        callback: string;
        createDate: string;
        etc3: string;
        id: string;
        msg: string;
        msgId: number;
        phone: string;
        reqDate: string;
        resend: string;
        rslt: string;
        rsltResend: string;
        sentDate: string;
        status: string;
        type: string;
      }>;
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      pageable: Pagination;
      size: number;
      sort: { empty: boolean; unsorted: boolean; sorted: boolean };
      totalElements: number;
      totalPages: number;
    };
  };
  message: string;
}

export function getGetSendMessageLogAPI(
  params: any
): Promise<GetMessageLogResponse> {
  return requestApi<GetMessageLogResponse>({
    url: messages(`/log/${params.headId}`),
    params: {
      rslt: params.sendStatus ?? null,
      type: params.sendChannel ?? null,
      rsltResend: params.resend ?? null,
      all: params.keyword ?? null,
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
  params: any
): Promise<GetAutoMessageLogResponse> {
  return requestApi<GetAutoMessageLogResponse>({
    url: messages(`/log/auto`),
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
