import { requestApi } from "api";
import { alarmTalkTemplate } from "api/url";
import Template from "type/Template";

export interface AddAlarmTalkTemplateExcelResponse {
  status: string;
  message: string;
}

export function addAlarmTalkTemplateExcelAPI(params: {
  groupTemplateId: number;
  file: File;
}): Promise<AddAlarmTalkTemplateExcelResponse> {
  const formData = new FormData();
  formData.append("files", params.file);
  formData.append(
    "kakaoTemplate",
    new Blob(
      [
        JSON.stringify({
          groupTemplateId: params.groupTemplateId,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  return requestApi<AddAlarmTalkTemplateExcelResponse>({
    url: alarmTalkTemplate("/add/excel"),
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeAlarmTalkTemplateParams {
  templateId?: number;
  templateGroupId?: number;
}
export interface ChangeAlarmTalkTemplateResponse {
  status: string;
  message: string;
}

export function changeAlarmTalkTemplateAPI(
  params: ChangeAlarmTalkTemplateParams
): Promise<ChangeAlarmTalkTemplateResponse> {
  return requestApi<ChangeAlarmTalkTemplateResponse>({
    url: alarmTalkTemplate(`/${params.templateId}`),
    params: {
      groupTemplateId: params.templateGroupId ?? null,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetAlarmTalkTemplateResponse {
  status: string;
  data: Template;
  message: string;
}

export function getAlarmTalkTemplateAPI(params: {
  templateId: number | null;
}): Promise<GetAlarmTalkTemplateResponse> {
  if (params.templateId !== null) {
    return requestApi<GetAlarmTalkTemplateResponse>({
      url: alarmTalkTemplate(`/${params.templateId}`),
      method: "GET",
    }).then((response) => response.data);
  } else {
    return new Promise(() => {});
  }
}

export interface DeleteAlarmTalkTemplateResponse {
  status: string;
  message: string;
}

export function deleteAlarmTalkTemplateAPI(params: {
  templateId: number;
}): Promise<DeleteAlarmTalkTemplateResponse> {
  return requestApi<DeleteAlarmTalkTemplateResponse>({
    url: alarmTalkTemplate(`/${params.templateId}`),
    method: "DELETE",
  }).then((response) => response.data);
}
