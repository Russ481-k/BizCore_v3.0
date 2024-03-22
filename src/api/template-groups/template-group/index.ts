import { requestApi } from "api";
import { templateGroup } from "api/url";

export interface AddTemplateGroupResponse {
  status: string;
  message: string;
}

export function addTemplateGroupAPI(params: {
  groupTemplateName: string;
}): Promise<AddTemplateGroupResponse> {
  return requestApi<AddTemplateGroupResponse>({
    url: templateGroup(""),
    data: {
      groupTemplateName: params.groupTemplateName,
    },
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeTemplateGroupResponse {
  status: string;
  message: string;
}

export function changeTemplateGroupAPI(params: {
  groupTemplateId: number;
  groupTemplateName: string;
}): Promise<ChangeTemplateGroupResponse> {
  return requestApi<ChangeTemplateGroupResponse>({
    url: templateGroup(`/${params.groupTemplateId}`),
    data: {
      groupTemplateName: params.groupTemplateName,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface DeleteTemplateGroupResponse {
  status: string;
  message: string;
}

export function deleteTemplateGroupAPI(params: {
  groupTemplateId: number;
}): Promise<DeleteTemplateGroupResponse> {
  return requestApi<DeleteTemplateGroupResponse>({
    url: templateGroup(`/${params.groupTemplateId}`),
    method: "DELETE",
  }).then((response) => response.data);
}
export interface GetValidTemplateGroupNameResponse {
  status: string;
  data: string;
  message: string;
}
export function getValidTemplateGroupNameAPI(params: {
  templateGroupName: string;
}): Promise<GetValidTemplateGroupNameResponse> {
  return requestApi<GetValidTemplateGroupNameResponse>({
    url: templateGroup(`/find/${params.templateGroupName}`),
    method: "GET",
  }).then((response) => response.data);
}
