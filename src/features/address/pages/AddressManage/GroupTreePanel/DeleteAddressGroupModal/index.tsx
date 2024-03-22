import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";

import { CustomModal, ToastMessage } from "components";
import { useDeleteAddressGroup } from "features/address";

interface DeleteAddressGroupModalProps {
  addressGroupId: number | null;
  onClose: () => void;
}

function DeleteAddressGroupModal({
  addressGroupId,
  onClose,
}: DeleteAddressGroupModalProps) {
  const toast = useToast();

  const { mutate: deleteAddressGroup } = useDeleteAddressGroup();

  const handleDeleteAddressGroupButtonClick = () => {
    if (!!addressGroupId) {
      deleteAddressGroup(
        {
          addressGroupId,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 삭제 오류" type="ERROR">
                  {error.message}
                  <br />
                  주소록 그룹 삭제 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  주소록 그룹 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는
                  경우 시스템 관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 삭제 완료" type="SUCCESS">
                  주소록 그룹을 정상적으로 삭제하였습니다.
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    }
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>주소록 그룹 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <Text fontSize="14px">
              삭제된 주소록 그룹은 복구가 불가하고, 삭제된 주소록 그룹에 소속된
              템플릿은 [기본 주소록] 으로 이동 됩니다
            </Text>
            <Text fontSize="14px">선택한 주소록 그룹을 삭제하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primaryBlue"
            onClick={handleDeleteAddressGroupButtonClick}
          >
            주소록 그룹 삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteAddressGroupModal;
