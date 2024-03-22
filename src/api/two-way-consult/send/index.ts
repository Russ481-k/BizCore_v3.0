import { requestApi } from "api";
import { consultations } from "api/url";

export interface SendConsultParams {
  mastId: number;
  customerNumber: string;
  bizNumber: string;
  channel: string;
  message: string;
  expireTime: string;
}
export interface SendConsultResponse {
  status: string;
  data: string;
  message: string;
}
export function sendConsultAPI(
  params: SendConsultParams
): Promise<SendConsultResponse> {
  return requestApi<SendConsultResponse>({
    url: consultations("/send"),
    method: "POST",
    data: {
      mastId: params.mastId ?? null,
      customerNumber: params.customerNumber ?? null,
      bizNumber: params.bizNumber ?? null,
      channel: params.channel ?? null,
      message: params.message ?? null,
      expireTime: params.expireTime ?? null,
    },
  }).then((response) => response.data);
}

export interface SendMMSConsultParams {
  mastId: number;
  bizNumber: string;
  message: string;
  // sendType: "A" | "C"; // A:자동안내 / C:문자상담
  // changeStatus: "NORMAL" | "AUTO" | "MANUAL" | "QUIT"; // NORMAL:일반 /AUTO:자동전환 / MANUAL:수동전환 / QUIT:종료
  file: File;
  expireTime: string;
}
export interface SendMMSConsultResponse {
  status: string;
  data: string;
  message: string;
}
export function sendMMSConsultAPI(
  params: SendMMSConsultParams
): Promise<SendMMSConsultResponse> {
  return requestApi<SendMMSConsultResponse>({
    url: consultations("/mms/send"),
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data: {
      mastId: params.mastId ?? null,
      bizNumber: params.bizNumber ?? null,
      message: params.message ?? null,
      // sendType: params.sendType ?? null,
      // changeStatus: params.changeStatus ?? null,
      file: params.file ?? null,
      expireTime: params.expireTime ?? null,
    },
  }).then((response) => response.data);
}
