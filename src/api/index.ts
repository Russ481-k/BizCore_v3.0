import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import authService from "libs/authService";

import { store } from "storage/redux/store";

interface RequestParam extends AxiosRequestConfig {
  method: Method;
  url: string;
  withJWT?: boolean;
}

export interface ErrorResponse {
  resultCode: "FAILURE";
  message: string;
  data?: any;
}

let silentRefreshPromise: Promise<void> | null = null;
export async function requestApi<T = unknown>({
  headers,
  method,
  params,
  url,
  withJWT = true,
  ...config
}: RequestParam): Promise<AxiosResponse<T>> {
  const accessToken = store.getState().user.accessToken;
  let refreshedAccessToken: string = accessToken || "";
  let customHeaders: { [key: string]: any } = {
    ...headers,
  };

  // if (withJWT && !accessToken && !silentRefreshPromise) {
  //   silentRefreshPromise = authService
  //     .silentRefresh()
  //     .then(() => {
  //       refreshedAccessToken = store.getState().user.accessToken || "";
  //       if (!refreshedAccessToken) {
  //         throw new Error("액세스 토큰을 재발급 받지 못했습니다.");
  //       }
  //     })
  //     .finally(() => {
  //       silentRefreshPromise = null;
  //     });
  // }

  // if (silentRefreshPromise) {
  //   await silentRefreshPromise;
  // }
  // if (!refreshedAccessToken) {
  //   refreshedAccessToken = store.getState().user.accessToken || "";
  // }
  // if (withJWT && refreshedAccessToken) {
  //   customHeaders.Authorization = `Bearer ${refreshedAccessToken}`;
  // }
  return axios
    .request<T>({
      headers: customHeaders,
      method,
      params,
      url,
      withCredentials: true,
      ...config,
    })
    .then(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response) {
          Object.assign(error, {
            message: error.response.data?.message || "",
            response: error.response,
          });
        }
        return Promise.reject(error);
      }
    );
}

export function initializeApi() {
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    const { response } = error;
    if (response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  });
}
