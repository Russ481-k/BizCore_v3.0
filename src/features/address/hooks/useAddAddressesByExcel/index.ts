import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  addAddressesByExcelAPI,
  AddAddressesByExcelResponse,
} from "api/addresses";

interface AddAddressesByExcelParams {
  addressGroupId: number;
  file: File;
}
function useAddAddressesByExcel(
  options?: UseMutationOptions<
    AddAddressesByExcelResponse,
    AxiosError<ErrorResponse>,
    AddAddressesByExcelParams
  >
) {
  return useMutation((params: AddAddressesByExcelParams) => {
    return addAddressesByExcelAPI(params);
  }, options);
}

export default useAddAddressesByExcel;
