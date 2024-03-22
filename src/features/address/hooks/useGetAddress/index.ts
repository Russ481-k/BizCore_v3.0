import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { getAddressAPI, GetAddressResponse } from "api/addresses/address";

function useGetAddress(
  params: { addressId: number | null },
  options?: UseQueryOptions<GetAddressResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetAddressResponse, AxiosError<ErrorResponse>>({
    queryKey: ["address", params.addressId],
    queryFn: () => getAddressAPI(params),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useGetAddress;
