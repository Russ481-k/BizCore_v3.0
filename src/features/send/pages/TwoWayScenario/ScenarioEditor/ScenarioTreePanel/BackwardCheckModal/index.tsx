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

interface BackwardCheckModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function BackwardCheckModal({ onConfirm, onClose }: BackwardCheckModalProps) {
  const handleConfirmButtonClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>안내 시나리오 목록</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" pb={0}>
          <Flex flexDirection="column" fontSize="14px">
            <Text>안내 시나리오 목록으로 이동하면 기존의 시나리오로 초기화됩니다.</Text>
            <Text>수정중인 시나리오는 복구할 수 없습니다.</Text>
            <Text>목록으로 이동하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Box />
          <Flex gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button variant="primaryBlue" onClick={handleConfirmButtonClick}>
              확인
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default BackwardCheckModal;
