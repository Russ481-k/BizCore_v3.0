import { requestApi } from "api";
import { excel, template } from "api/url";
import { AddTemplateAnotherParams } from "features/template/hooks/useAddTemplateAnother";
import Template from "type/Template";

export interface AddTemplateResponse {
  status: string;
  message: string;
}

export function addTemplateAPI(params: {
  template: {
    templateName?: string | null;
    wiredPhoneNumber?: string | null;
    templateMsgTitle?: string | null;
    templateMsgContext?: string | null;
    templateChannel?: string | null;
    groupTemplateId?: number | null;
  };
  files: File[];
}): Promise<AddTemplateResponse> {
  const formData = new FormData();
  Array.from(params.files).forEach((e) => {
    formData.append("files", e);
  });
  formData.append(
    "template",
    new Blob(
      [
        JSON.stringify({
          templateName: params.template.templateName,
          wiredPhoneNumber: params.template.wiredPhoneNumber,
          templateMsgTitle: params.template.templateMsgTitle,
          templateMsgContext: params.template.templateMsgContext,
          templateChannel: params.template.templateChannel,
          groupTemplateId: params.template.groupTemplateId,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  return requestApi<AddTemplateResponse>({
    url: template(""),
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}
export interface AddTemplateAnotherResponse {
  status: string;
  message: string;
}

export function addTemplateAnotherAPI(
  params: AddTemplateAnotherParams
): Promise<AddTemplateAnotherResponse> {
  const formData = new FormData();
  const fileOrder: Array<number> = [];
  Array.from(params.files).forEach((e, i) => {
    if (e.size > 0) {
      formData.append("files", e);
      fileOrder.push(i);
    }
  });
  formData.append(
    "template",
    new Blob(
      [
        JSON.stringify({
          importTemplateId: params.template.templateId,
          templateName: params.template.templateName,
          wiredPhoneNumber: params.template.wiredPhoneNumber,
          templateMsgTitle: params.template.templateMsgTitle,
          templateMsgContext: params.template.templateMsgContext,
          templateChannel: params.template.templateChannel,
          groupTemplateId: params.template.groupTemplateId,
          uniqueFileName: params.template.uniqueFileName,
          changeFileOrder: params.template.changeFileOrder,
          fileOrder,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  return requestApi<AddTemplateAnotherResponse>({
    url: template("/another"),
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeTemplateResponse {
  status: string;
  message: string;
}

export function changeTemplateAPI(params: {
  template: {
    templateId?: number | null;
    templateName?: string | null;
    wiredPhoneNumber?: string | null;
    templateMsgTitle?: string | null;
    templateMsgContext?: string | null;
    templateChannel?: string | null;
    groupTemplateId?: number | null;
    changeFiles?: Array<{
      uniqueFileName: string;
      fileOrder: number;
    }>;
  };
  files: File[];
}): Promise<ChangeTemplateResponse> {
  const formData = new FormData();
  Array.from(params.files).forEach((e) => {
    if (e?.size > 0) {
      formData.append("files", e);
    }
  });
  formData.append(
    "template",
    new Blob(
      [
        JSON.stringify({
          templateName: params.template.templateName,
          wiredPhoneNumber: params.template.wiredPhoneNumber,
          templateMsgTitle: params.template.templateMsgTitle,
          templateMsgContext: params.template.templateMsgContext,
          templateChannel: params.template.templateChannel,
          groupTemplateId: params.template.groupTemplateId,
          changeFile: params.template.changeFiles,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  return requestApi<ChangeTemplateResponse>({
    url: template(`/${params.template.templateId}`),
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    method: "PUT",
  }).then((response) => response.data);
}

export interface GetTemplateResponse {
  status: string;
  data: Template;
  message: string;
}

export function getTemplateAPI(params: {
  templateId: number | null;
}): Promise<GetTemplateResponse> {
  return requestApi<GetTemplateResponse>({
    url: template(`/${params.templateId}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface DeleteTemplateResponse {
  status: string;
  message: string;
}

export function deleteTemplateAPI(params: {
  templateId: number;
}): Promise<DeleteTemplateResponse> {
  return requestApi<DeleteTemplateResponse>({
    url: template(`/${params.templateId}`),
    method: "DELETE",
  }).then((response) => response.data);
}

export interface GetValidTemplateNameResponse {
  status: string;
  data: string;
  message: string;
}
export function getValidTemplateNameAPI(params: {
  templateName: string;
}): Promise<GetValidTemplateNameResponse> {
  return requestApi<GetValidTemplateNameResponse>({
    url: template(`/find/${params.templateName}`),
    method: "GET",
  }).then((response) => response.data);
}
export interface GetExcelDownloadResponse {
  status: string;
  data: string;
  message: string;
}
export function getExcelDownloadAPI(params: {
  url: string;
}): Promise<GetExcelDownloadResponse> {
  return requestApi<GetExcelDownloadResponse>({
    url: excel(`${params.url}`),
    method: "GET",
  }).then((response) => response.data);
}
