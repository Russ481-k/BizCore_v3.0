import { requestApi } from "api";
import { systemsUrl } from "api/url";

export interface ConvertCIResponse {
  resultCode: "SUCCESS";
  data: { [index: string]: string };
}

export function convertCIAPI(params: {
  ssns: Array<string>;
}): Promise<ConvertCIResponse> {
  return requestApi<ConvertCIResponse>({
    url: systemsUrl(`/ci/convert`),
    method: "POST",
    data: {
      ssns: params.ssns ? params.ssns : null,
    },
  }).then((response) => response.data);
}
