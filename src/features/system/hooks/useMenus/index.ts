import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getMenusAPI, GetMenusResponse } from "api/menus";

function useMenus(
  params: {
    publicYN?: string | null;
  },
  options?: UseQueryOptions<
    GetMenusResponse | undefined,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetMenusResponse | undefined,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["menus", params.publicYN],
    queryFn: () => getMenusAPI(params),
    ...options,
  });

  return {
    ...result,
    data: result.data?.data,
    resultCode: result.data?.resultCode,
  };
}

export default useMenus;
