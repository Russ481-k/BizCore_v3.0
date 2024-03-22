import { requestApi } from "api";
import { systemsUrl } from "api/url";

export interface UploadImageResponse {
  resultCode: "SUCCESS";
  data: string;
}

export function uploadImageAPI(params: {
  fileBase64: string;
  fileName: string;
}): Promise<UploadImageResponse> {
  return requestApi<UploadImageResponse>({
    url: systemsUrl("/images"),
    method: "POST",
    data: {
      fileBase64: params.fileBase64 ? params.fileBase64 : null,
      fileName: params.fileName ? params.fileName : null,
    },
  }).then((response) => response.data);
}
