import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  AddAddressGroupAPI,
  AddAddressGroupResponse,
} from "api/address-groups/address-group";

interface AddAddressGroupParams {
  addressGroupName: string;
}
function useAddAddressGroup(
  options?: UseMutationOptions<
    AddAddressGroupResponse,
    AxiosError<ErrorResponse>,
    AddAddressGroupParams
  >
) {
  return useMutation(
    (params: AddAddressGroupParams) => AddAddressGroupAPI(params),
    options
  );
}

export default useAddAddressGroup;
