import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { addAddressAPI, AddAddressResponse } from "api/addresses/address";

interface AddAddressParams {
  addressList: Array<{
    addressName: string;
    addressPhone: string;
    addressNumber: string | null;
    note: string | null;
  }>;
  addressGroupId: number | null;
}
function useAddAddress(
  options?: UseMutationOptions<
    AddAddressResponse,
    AxiosError<ErrorResponse>,
    AddAddressParams
  >
) {
  return useMutation((params: AddAddressParams) => {
    return addAddressAPI(params);
  }, options);
}

export default useAddAddress;
