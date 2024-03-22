import { requestApi } from "api";
import { auth } from "api/url";

export interface AuthLoginResponse {
  status: string;
  data: {
    name: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export function authLoginAPI(params: {
  userId: string;
  password: string;
}): Promise<AuthLoginResponse> {
  return requestApi<AuthLoginResponse>({
    url: auth("/login"),
    method: "POST",
    data: {
      userId: params.userId ?? null,
      password: params.password ?? null,
    },
    withJWT: false,
  }).then((response) => response.data);
}
