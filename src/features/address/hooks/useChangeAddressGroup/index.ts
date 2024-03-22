import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  ChangeAddressGroupResponse,
  changeAddressGroupAPI,
} from "api/address-groups/address-group";

interface ChangeAddressGroupParams {
  addressGroupId: number;
  addressGroupName: string;
}
function useChangeAddressGroup(
  options?: UseMutationOptions<
    ChangeAddressGroupResponse,
    AxiosError<ErrorResponse>,
    ChangeAddressGroupParams
  >
) {
  return useMutation(
    (params: ChangeAddressGroupParams) => changeAddressGroupAPI(params),
    options
  );
}

export default useChangeAddressGroup;
