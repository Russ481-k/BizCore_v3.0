import { requestApi } from "api";
import { messages } from "api/url";
import Message from "type/Message";
import Pagination from "type/Pagination";
import SendData from "type/SendData";

export interface GetMessagesBySearchParams {
  changeTime: boolean;
  subject: string | null;
  createUser: string | null;
  createId: string | null;
  startCreateDate: string | null;
  endCreateDate: string | null;
  startReqDate: string | null;
  endReqDate: string | null;
  all: string | null;
  sendType: "R" | "D" | null;
  status: "R" | "P" | "C";
  channelType: string | null;
  currentPage: number | null;
  pageSize: number | null;
}

export interface SendMessageResponse {
  status: string;
  message: string;
}

export function sendMessageAPI(params: SendData): Promise<SendMessageResponse> {
  const formData = new FormData();
  params.files?.map((file) => {
    return file.size > 0 && formData.append("files", file);
  });
  if (params.changeTime) {
    formData.append(
      "msgList",
      new Blob(
        [
          JSON.stringify({
            message: {
              reqDate: params.reqDate ?? null,
            },
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
  } else {
    formData.append(
      "msgList",
      new Blob(
        [
          JSON.stringify({
            message: {
              subject: params.subject ?? null,
              callback: params.callback ?? null,
              msg: params.msg ?? null,
              type: params.type ?? null,
              fileCnt: params.fileCnt ?? null,
              reqDate: params.reqDate ?? null,
              tmplCd: params.templateCode ?? null,
              filePath1: params.filePath1 ?? null,
              filePath2: params.filePath2 ?? null,
              filePath3: params.filePath3 ?? null,
            },
            sendType: params.sendType ?? null,
            templateId: params.templateId ?? null,
            addressArray: params.addressArray ?? null,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
  }
  return requestApi<SendMessageResponse>({
    url: messages(
      `/${params.changeTime ? "change/" : ""}${
        params.changeTime ? params.id : ""
      }`
    ),
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}

export interface GetMessagesResponse {
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

export function getMessagesAPI(
  params: GetMessagesBySearchParams
): Promise<GetMessagesResponse> {
  return requestApi<GetMessagesResponse>({
    url: messages(`/head`),
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
      channelType: params.channelType || null,
      status: params.status || null,
      currentPage: params.currentPage || null,
      pageSize: params.pageSize || null,
    },
    method: "GET",
  }).then((response) => response.data);
}

export function deleteMessagesAPI(params: {
  headId: number;
}): Promise<GetMessagesResponse> {
  return requestApi<GetMessagesResponse>({
    url: messages(`/cancel/${params.headId}`),
    method: "PUT",
  }).then((response) => response.data);
}
export function changeMessagesAPI(params: {
  headId: number;
}): Promise<GetMessagesResponse> {
  return requestApi<GetMessagesResponse>({
    url: messages(`/cancel/${params.headId}`),
    method: "PUT",
  }).then((response) => response.data);
}
