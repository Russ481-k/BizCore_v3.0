import { requestApi } from "api";
import { systemsUrl } from "api/url";

export interface IssueDistributionCertificateResponse {
  resultCode: "SUCCESS";
  data: string;
}

export function issueDistributionCertificateAPI(params: {
  documentUuid: string;
}): Promise<IssueDistributionCertificateResponse> {
  return requestApi<IssueDistributionCertificateResponse>({
    url: systemsUrl("/distribution-certificates"),
    method: "POST",
    data: {
      documentUuid: params.documentUuid,
    },
  }).then((response) => response.data);
}
