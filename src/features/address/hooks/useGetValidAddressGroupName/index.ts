import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  getValidAddressGroupNameAPI,
  GetValidAddressGroupNameResponse,
} from "api/address-groups/address-group";

function useGetValidAddressGroupName(
  params: {
    addressGroupName: string;
  },
  options?: UseQueryOptions<
    GetValidAddressGroupNameResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetValidAddressGroupNameResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["valid-address-group-name", params.addressGroupName],
    queryFn: () => getValidAddressGroupNameAPI(params),
    ...options,
  });
  return {
    ...result,
    status: result?.status,
    data: result?.data?.data,
    message: result?.data?.message,
  };
}

export default useGetValidAddressGroupName;
