import { requestApi } from "api";
import { consultations } from "api/url";
import ConsultData from "type/ConsultData";
import ConsultListItem from "type/ConsultListItem";
import Pagination from "type/Pagination";

export interface GetConsultsParams {
  csltStatus: string;
  callerNo: string | null;
  startSendDate: string | null;
  endSendDate: string | null;
  callType: "S" | "R" | null; // S:발신 / R:수신
  sendType: "A" | "C" | null; // A:안내 / C:문자상담
  isResult: boolean | null; // false:체크 / null:미체크
  targetColumn: "all" | "receiverNo" | "message";
  keyword: string;
  currentPage?: number;
  pageSize?: number;
}
export interface GetConsultsResponse {
  status: string;
  data: {
    contents: Array<ConsultListItem>;
    paging: Pagination;
    totalCount: number;
    pageLength: number;
  };
  message: string;
}
export function getConsultsAPI(params: GetConsultsParams): Promise<GetConsultsResponse> {
  return requestApi<GetConsultsResponse>({
    url: consultations(""),
    method: "GET",
    params: {
      csltStatus: params.csltStatus ?? null,
      callerNo: params.callerNo ?? null,
      startSendDate: params.startSendDate ?? null,
      endSendDate: params.endSendDate ?? null,
      callType: params.callType ?? null,
      sendType: params.sendType ?? null,
      isResult: params.isResult ?? null,
      targetColumn: params.targetColumn ?? null,
      keyword: params.keyword ?? null,
      currentPage: params.currentPage ?? null,
      pageSize: params.pageSize ?? 10,
    },
  }).then((response) => response.data);
}

export interface GetConsultParams {
  masterId: number;
}
export interface GetConsultResponse {
  status: string;
  data: ConsultData;
  message: string;
}
export function getConsultAPI(params: GetConsultParams): Promise<GetConsultResponse> {
  return requestApi<GetConsultResponse>({
    url: consultations(`/${params.masterId}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface ChangeConsultIsReadParams {
  masterId: number;
}
export interface ChangeConsultIsReadResponse {
  status: string;
  data: string;
  message: string;
}
export function changeConsultIsReadAPI(
  params: ChangeConsultIsReadParams
): Promise<ChangeConsultIsReadResponse> {
  return requestApi<ChangeConsultIsReadResponse>({
    url: consultations(`/${params.masterId}`),
    method: "POST",
  }).then((response) => response.data);
}
