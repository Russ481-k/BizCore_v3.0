import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteAddressGroupAPI,
  DeleteAddressGroupResponse,
} from "api/address-groups/address-group";

interface DeleteAddressGroupParams {
  addressGroupId: number;
}
function useDeleteAddressGroup(
  options?: UseMutationOptions<
    DeleteAddressGroupResponse,
    AxiosError<ErrorResponse>,
    DeleteAddressGroupParams
  >
) {
  return useMutation(
    (params: DeleteAddressGroupParams) => deleteAddressGroupAPI(params),
    options
  );
}

export default useDeleteAddressGroup;
