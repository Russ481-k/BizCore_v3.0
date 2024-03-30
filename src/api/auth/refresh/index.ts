import { requestApi } from "api";
import { auth } from "api/url";

export interface AuthRefreshResponse {
  status: string;
  data: {
    accessToken: string;
  };
  message: string;
}

export function authRefreshAPI(params: {
  refreshToken: string | null;
}): Promise<AuthRefreshResponse> {
  return requestApi<AuthRefreshResponse>({
    url: auth("/refresh"),
    method: "POST",
    data: { refreshToken: params.refreshToken ?? null },
    withJWT: true,
  }).then((response) => response.data);
}
