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

interface ResetCheckModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function ResetCheckModal({ onConfirm, onClose }: ResetCheckModalProps) {
  const handleConfirmButtonClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>새 시나리오 작성</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" pb={0}>
          <Flex flexDirection="column" fontSize="14px">
            <Text>
              새 시나리오 작성하면 기존의 시나리오를 복구할 수 없습니다.
            </Text>
            <Text>새 시나리오 작성하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Box />
          <Flex gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button variant="primaryBlue" onClick={handleConfirmButtonClick}>
              새 시나리오 작성
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ResetCheckModal;
