import { requestApi } from "api";
import { systemsUrl } from "api/url";

export interface CreateNiceAuthenticationResponse {
  resultCode: "SUCCESS";
  data: {
    merchantId: string;
    merchantKey: string;
    orderId: string;
    paymentDate: string;
    signature: string;
  };
}
export function createNiceAuthenticationAPI(params: {
  amount: number;
}): Promise<CreateNiceAuthenticationResponse> {
  return requestApi<CreateNiceAuthenticationResponse>({
    url: systemsUrl(`/nice-authentication`),
    method: "POST",
    data: {
      amount: params.amount ? params.amount : null,
    },
  }).then((response) => response.data);
}
