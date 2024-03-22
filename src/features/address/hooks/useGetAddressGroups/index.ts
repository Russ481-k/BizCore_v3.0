import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getAddressGroupsAPI,
  GetAddressGroupsResponse,
} from "api/address-groups";

function useGetAddressGroups(
  options?: UseQueryOptions<GetAddressGroupsResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetAddressGroupsResponse, AxiosError<ErrorResponse>>({
    queryKey: ["address-groups"],
    queryFn: () => getAddressGroupsAPI(),
    ...options,
  });
  return {
    ...result,
    data: result?.data?.data?.groupList,
    addressTotalCount: result?.data?.data?.addressTotalCount,
    status: result?.status,
    message: result?.data?.message,
  };
}

export default useGetAddressGroups;
