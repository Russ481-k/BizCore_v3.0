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
import React from "react";

import { CustomModal, ToastMessage } from "components";
import { useDeleteDept } from "features/system";
import Department from "type/Department";

interface DeleteDeptModalProps {
  isOpen: boolean;
  selectedDept: Department;
  onRefetch: () => void;
  setModalOpen: (open: boolean) => void;
}

function DeleteDeptModal({
  isOpen,
  selectedDept,
  onRefetch,
  setModalOpen,
}: DeleteDeptModalProps) {
  const toast = useToast();

  const { mutate: deleteDept } = useDeleteDept();

  const handleSubmitButtonClick = () => {
    deleteDept(
      {
        deptCode: selectedDept.deptCode,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="부서 삭제 오류" type="ERROR">
                부서 삭제 중 오류가 발생하였습니다.
                <br />
                부서 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="부서 삭제 완료" type="SUCCESS">
                부서를 정상적으로 삭제하였습니다.
              </ToastMessage>
            ),
          });
          onClose();
          onRefetch();
        },
      }
    );
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitButtonClick();
    }
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="420px" onKeyPress={handleOnKeyPress}>
        <ModalHeader>부서 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <Text fontSize="14px">
              삭제된 부서는 복구가 불가하고, 삭제된 부서에 소속된 운영자는
              <br />
              [부서 미지정] 부서로 이동 됩니다.
              <br />
              <br />
              선택한 부서를 삭제하시겠습니까?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleSubmitButtonClick}>
            부서 삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default React.memo(DeleteDeptModal);
