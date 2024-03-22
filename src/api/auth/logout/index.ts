import { requestApi } from "api";
import { auth } from "api/url";

export interface AuthLogoutResponse {
  status: string;
  data: {
    accessToken: string;
  };
  message: string;
}

export function authLogoutAPI(params: {
  refreshToken: string | null;
}): Promise<AuthLogoutResponse> {
  return requestApi<AuthLogoutResponse>({
    url: auth("/logout"),
    method: "POST",
    data: { refreshToken: params.refreshToken ?? null },
    withJWT: false,
  }).then((response) => response.data);
}

export interface AuthLogoutKillParams {
  refreshToken: string | null;
  requestFlag: string;
}
export function authLogoutKillAPI(
  params: AuthLogoutKillParams
): Promise<AuthLogoutResponse> {
  return requestApi<AuthLogoutResponse>({
    url: auth(`/logout/kill?requestFlag=${params.requestFlag}`),
    method: "POST",
    data: { refreshToken: params.refreshToken ?? null },
    withJWT: false,
  }).then((response) => response.data);
}
