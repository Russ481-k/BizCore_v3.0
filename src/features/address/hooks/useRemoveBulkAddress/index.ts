import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import { removeBulkAddressAPI, RemoveBulkAddressResponse } from "api/addresses";

interface RemoveBulkAddressParams {
  addressIds: Array<number>;
}
function useRemoveBulkAddress(
  options?: UseMutationOptions<
    RemoveBulkAddressResponse,
    AxiosError<ErrorResponse>,
    RemoveBulkAddressParams
  >
) {
  return useMutation(
    (params: RemoveBulkAddressParams) => removeBulkAddressAPI(params),
    options
  );
}

export default useRemoveBulkAddress;
