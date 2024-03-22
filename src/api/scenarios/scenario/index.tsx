import { requestApi } from "api";
import { scenario } from "api/url";
import InfoNode from "type/InfoNode";
import Scenario from "type/Scenario";

export interface GetScenarioResponse {
  data: {
    autoreply: {
      msg: string;
    };
    close: {
      msg: string;
    };
    exception: {
      msg: string;
    };
    expired: {
      msg: string;
      validTime: number;
    };
    depth: Array<Scenario>;
    groupId: string;
    isUse: boolean;
    mmsReply: {
      msg: string;
    };
    serviceName: string;
    filePath: string | null;
  };
  status: string;
  message: string;
}

export function getTwoWayScenarioAPI(params: {
  groupId: number;
}): Promise<GetScenarioResponse> {
  return requestApi<GetScenarioResponse>({
    url: scenario(`/autoreply/${params.groupId}`),
    method: "get",
  }).then((response) => response.data);
}

export interface AddScenarioNodeParams {
  autoMainRequest: InfoNode;
  depthAddRequest: Array<Scenario>;
}

export interface AddScenarioNodeResponse {
  status: string;
  data: string;
  message: string;
}

export function addTwoWayScenarioNodeAPI(
  params: AddScenarioNodeParams
): Promise<AddScenarioNodeResponse> {
  const formData = new FormData();
  formData.append(
    "autoMainRequest.file",
    params.autoMainRequest.file ?? new File([], "")
  );
  formData.append(
    "autoMainRequest.groupId",
    String(params.autoMainRequest.groupId) ?? null
  );
  formData.append(
    "autoMainRequest.serviceName",
    params.autoMainRequest.serviceName ?? null
  );
  formData.append(
    "autoMainRequest.isUse",
    params.autoMainRequest.isUse ? "true" : "false"
  );
  formData.append("autoMainRequest.mmsReply.msg", "");
  formData.append(
    "autoMainRequest.autoreply.msg",
    params.autoMainRequest.autoreply.msg ?? ""
  );
  formData.append(
    "autoMainRequest.expired.validTime",
    String(params.autoMainRequest.expired.validTime) ?? ""
  );
  formData.append(
    "autoMainRequest.expired.msg",
    params.autoMainRequest.expired.msg ?? ""
  );
  formData.append(
    "autoMainRequest.exception.msg",
    params.autoMainRequest.exception.msg ?? ""
  );
  formData.append(
    "autoMainRequest.close.msg",
    params.autoMainRequest.close.msg ?? ""
  );
  params.depthAddRequest.forEach((request, i) => {
    Object.entries(request).forEach(([key, value]) => {
      if (key === "file") {
        formData.append(
          `depthAddRequest[${i}].${key}`,
          value ?? new File([], "")
        );
      } else {
        formData.append(`depthAddRequest[${i}].${key}`, value);
      }
    });
  });
  return requestApi<AddScenarioNodeResponse>({
    url: scenario(`/autoreply`),
    data: formData,
    method: "POST",
  }).then((response) => response.data);
}
export interface ChangeScenarioInfoNodeResponse {
  status: string;
  data: string;
  message: string;
}

export function changeTwoWayScenarioInfoNodeAPI(
  params: InfoNode
): Promise<ChangeScenarioInfoNodeResponse> {
  const formData = new FormData();
  formData.append("file", params.file ?? new File([], ""));
  formData.append("groupId", String(params.groupId) ?? null);
  formData.append("serviceName", params.serviceName ?? null);
  formData.append("isUse", params.isUse ? "true" : "false");
  formData.append("mmsReply.msg", "");
  formData.append("autoreply.msg", params.autoreply.msg ?? "");
  formData.append("expired.validTime", String(params.expired.validTime) ?? "");
  formData.append("expired.msg", params.expired.msg ?? "");
  formData.append("exception.msg", params.exception.msg ?? "");
  formData.append("close.msg", params.close.msg ?? "");
  return requestApi<ChangeScenarioInfoNodeResponse>({
    url: scenario(`/autoreply/${params.groupId}`),
    data: formData,
    method: "PUT",
  }).then((response) => response.data);
}

export interface ChangeScenarioNodeParams {
  nodeModifyBody: Array<Scenario>;
  groupId: number;
}

export interface ChangeScenarioNodeResponse {
  status: string;
  data: string;
  message: string;
}

export function changeTwoWayScenarioNodeAPI(
  params: ChangeScenarioNodeParams
): Promise<ChangeScenarioNodeResponse> {
  const formData = new FormData();
  params.nodeModifyBody.forEach((request, i) => {
    Object.entries(request).forEach(([key, value]) => {
      if (key === "file") {
        formData.append(
          `nodeModifyBody[${i}].${key}`,
          value ?? new File([], "")
        );
      } else {
        formData.append(`nodeModifyBody[${i}].${key}`, value);
      }
    });
  });
  return requestApi<ChangeScenarioNodeResponse>({
    url: scenario(`/autoreply/${params.groupId}/node`),
    data: formData,
    method: "PUT",
  }).then((response) => response.data);
}
