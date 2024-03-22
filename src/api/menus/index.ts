import { requestApi } from "api";
import { menusUrl } from "api/url";
import Menu from "type/Menu";

export interface GetMenusResponse {
  resultCode: "SUCCESS";
  data: Array<Menu>;
}

export function getMenusAPI(params: {
  publicYN?: string | null;
}): Promise<GetMenusResponse> {
  return requestApi<GetMenusResponse>({
    url: menusUrl(""),
    method: "GET",
    params: {
      publicYN: params.publicYN ? params.publicYN : null,
    },
  }).then((response) => response.data);
}
