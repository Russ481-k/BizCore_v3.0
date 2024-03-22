import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { changeAddressAPI, ChangeAddressResponse } from "api/addresses/address";

interface ChangeAddressParams {
  address: {
    addressName: string;
    addressPhone: string;
    addressNumber: string | null;
    note: string | null;
  };
  addressGroupId: number | null;
  addressId?: number;
}
function useChangeAddress(
  options?: UseMutationOptions<
    ChangeAddressResponse,
    AxiosError<ErrorResponse>,
    ChangeAddressParams
  >
) {
  return useMutation((params: ChangeAddressParams) => {
    return changeAddressAPI(params);
  }, options);
}

export default useChangeAddress;
