import { requestApi } from "api";
import { department } from "api/url";

export interface AddDeptParams {
  deptName: string;
  managementDept: string | null;
  isBizCore: boolean;
}
export interface AddDeptResponse {
  status: string;
  message: string;
}
export function addDeptAPI(params: AddDeptParams): Promise<AddDeptResponse> {
  return requestApi<AddDeptResponse>({
    url: department(""),
    method: "POST",
    data: {
      deptName: params.deptName ?? null,
      managementDept: params.managementDept ?? null,
      isBizCore: params.isBizCore ?? null,
    },
  }).then((response) => response.data);
}

export interface ChangeDeptParams {
  deptName: string;
  deptCode: string;
  managementDept: string | null;
  isBizCore: boolean;
}
export interface ChangeDeptResponse {
  status: string;
  message: string;
}
export function changeDeptAPI(
  params: ChangeDeptParams
): Promise<ChangeDeptResponse> {
  return requestApi<ChangeDeptResponse>({
    url: department(`/${params.deptCode}`),
    method: "PUT",
    data: {
      deptName: params.deptName ?? null,
      managementDept: params.managementDept ?? null,
      isBizCore: params.isBizCore ?? null,
    },
  }).then((response) => response.data);
}

export interface DeleteDeptParams {
  deptCode: string;
}
export interface DeleteDeptResponse {
  status: string;
  message: string;
}
export function deleteDeptAPI(
  params: DeleteDeptParams
): Promise<DeleteDeptResponse> {
  return requestApi<DeleteDeptResponse>({
    url: department(`/${params.deptCode}`),
    method: "DELETE",
  }).then((response) => response.data);
}

export interface GetDeptParams {
  deptCode: string | null;
}
export interface GetDeptResponse {
  status: string;
  data: {
    deptName: string;
    deptCode: string;
    createDate: string;
  };
  message: string;
}
export function getDeptAPI(params: GetDeptParams): Promise<GetDeptResponse> {
  return requestApi<GetDeptResponse>({
    url: department(`/${params.deptCode}`),
    method: "GET",
  }).then((response) => response.data);
}

export interface GetValidDeptParams {
  departmentName: string;
}
export interface GetValidDeptResponse {
  status: string;
  data: string;
  message: string;
}
export function getValidDeptAPI(
  params: GetValidDeptParams
): Promise<GetValidDeptResponse> {
  return requestApi<GetValidDeptResponse>({
    url: department(`/name/${params.departmentName}`),
    method: "GET",
  }).then((response) => response.data);
}
