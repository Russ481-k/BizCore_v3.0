import {
  Box,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

import { CustomModal } from "components";

interface DeleteSubjectsCheckModalProps {
  selectedAll: boolean;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteSubjectsCheckModal({
  selectedAll,
  onDelete,
  onClose,
}: DeleteSubjectsCheckModalProps) {
  const handleDeleteSubjectsButtonClick = () => {
    onDelete();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>
          수신 대상자 {selectedAll ? "전체" : "선택"} 삭제
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedAll ? (
            <Flex flexDirection="column" fontSize="14px">
              <Text>전체 수신 대상자를 삭제하면 예약 발송이 취소됩니다.</Text>
              <Text>예약 발송을 취소하시겠습니까?</Text>
            </Flex>
          ) : (
            <Flex flexDirection="column" fontSize="14px">
              <Text>수신 대상자를 삭제하면 복구할 수 없습니다. </Text>
              <Text>선택한 수신 대상자를 삭제하시겠습니까?</Text>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Box />
          <Flex gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button
              variant="primaryBlue"
              onClick={handleDeleteSubjectsButtonClick}
            >
              수신 대상자 {selectedAll ? "전체" : "선택"} 삭제
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteSubjectsCheckModal;
