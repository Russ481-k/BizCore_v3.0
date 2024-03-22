import { requestApi } from "api";
import { systemsUrl } from "api/url";
import CommonCode from "type/CommonCode";

export interface GetCommonCodesResponse {
  resultCode: "SUCCESS";
  data: Array<CommonCode>;
  totalCount: number;
}

export function getCommonCodesAPI(params: {
  code?: string | null;
  cursor?: number | null;
  detail?: string | null;
  group?: string | null;
  name?: string | null;
  pageSize?: number | null;
  publicYN?: string | null;
  useYN?: string | null;
}): Promise<GetCommonCodesResponse> {
  return requestApi<GetCommonCodesResponse>({
    url: systemsUrl("/common-codes"),
    method: "GET",
    params: {
      code: params.code ? params.code : null,
      cursor: params.cursor ?? 1,
      detail: params.detail ? params.detail : null,
      group: params.group ? params.group : null,
      name: params.name ? params.name : null,
      pageSize: params.pageSize ?? 10,
      publicYN: params.publicYN ? params.publicYN : null,
      useYN: params.useYN ? params.useYN : null,
    },
  }).then((response) => response.data);
}
