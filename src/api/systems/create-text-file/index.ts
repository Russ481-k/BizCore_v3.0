import { requestApi } from "api";
import { systemsUrl } from "api/url";

export interface CreateTextFileResponse {
  resultCode: "SUCCESS";
  data: string;
}

export function createTextFileAPI(params: {
  content: string;
  filename?: string | null;
  encoding?: string | null;
}): Promise<CreateTextFileResponse> {
  return requestApi<CreateTextFileResponse>({
    url: systemsUrl("/create-text-file"),
    method: "POST",
    data: {
      content: params.content,
      filename: params.filename ? params.filename : null,
      encoding: params.encoding ? params.encoding : null,
    },
  }).then((response) => response.data);
}
