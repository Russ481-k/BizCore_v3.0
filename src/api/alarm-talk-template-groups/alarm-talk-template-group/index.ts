import { requestApi } from "api";
import { alarmTalkTemplateGroup } from "api/url";

export interface AddAlarmTalkTemplateGroupResponse {
  status: string;
  message: string;
}

export function AddAlarmTalkTemplateGroupAPI(params: {
  groupTemplateName: string;
}): Promise<AddAlarmTalkTemplateGroupResponse> {
  return requestApi<AddAlarmTalkTemplateGroupResponse>({
    url: alarmTalkTemplateGroup(""),
    data: {
      groupTemplateName: params.groupTemplateName ?? null,
    },
    method: "POST",
  }).then((response) => response.data);
}

export interface ChangeAlarmTalkTemplateGroupResponse {
  status: string;
  message: string;
}

export function changeAlarmTalkTemplateGroupAPI(params: {
  groupTemplateId: number;
  groupTemplateName: string;
}): Promise<ChangeAlarmTalkTemplateGroupResponse> {
  return requestApi<ChangeAlarmTalkTemplateGroupResponse>({
    url: alarmTalkTemplateGroup(`/${params.groupTemplateId}`),
    data: {
      groupTemplateName: params.groupTemplateName ?? null,
      groupTemplateId: params.groupTemplateId ?? null,
    },
    method: "PUT",
  }).then((response) => response.data);
}

export interface DeleteAlarmTalkTemplateGroupResponse {
  status: string;
  message: string;
}

export function deleteAlarmTalkTemplateGroupAPI(params: {
  groupTemplateId: number;
}): Promise<DeleteAlarmTalkTemplateGroupResponse> {
  return requestApi<DeleteAlarmTalkTemplateGroupResponse>({
    url: alarmTalkTemplateGroup(`/${params.groupTemplateId}`),
    method: "DELETE",
  }).then((response) => response.data);
}

export interface GetValidAlarmTalkTemplateGroupNameResponse {
  status: string;
  data: string;
  message: string;
}
export function getValidAlarmTalkTemplateGroupNameAPI(params: {
  templateGroupName: string;
}): Promise<GetValidAlarmTalkTemplateGroupNameResponse> {
  return requestApi<GetValidAlarmTalkTemplateGroupNameResponse>({
    url: alarmTalkTemplateGroup(`/find/${params.templateGroupName}`),
    method: "GET",
  }).then((response) => response.data);
}
