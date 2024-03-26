import { requestApi } from "api";
import { auth } from "api/url";

export interface AuthLoginResponse {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
    userNo: string;
    userRole: string;
  };
  message: string;
}

export function authLoginAPI(params: {
  compId: string;
  userId: string;
  password: string;
}): Promise<AuthLoginResponse> {
  return requestApi<AuthLoginResponse>({
    url: auth("/login"),
    method: "POST",
    data: {
      compId: params.compId ?? null,
      userId: params.userId ?? null,
      password: params.password ?? null,
    },
    withJWT: false,
  }).then((response) => response.data);
}
