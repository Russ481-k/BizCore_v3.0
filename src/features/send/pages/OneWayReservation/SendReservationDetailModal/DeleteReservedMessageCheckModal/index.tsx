import {
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

interface DeleteReservedMessageCheckModalProps {
  onClose: () => void;
  onDelete: () => void;
}

function DeleteReservedMessageCheckModal({
  onDelete,
  onClose,
}: DeleteReservedMessageCheckModalProps) {
  const handleDeleteReservationButtonClick = () => {
    onDelete();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>예약 발송 취소</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" fontSize="14px">
            <Text>예약 발송을 취소하면 복구할 수 없습니다.</Text>
            <Text>예약 발송을 취소하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primaryBlue"
            onClick={handleDeleteReservationButtonClick}
          >
            예약 발송 취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteReservedMessageCheckModal;
