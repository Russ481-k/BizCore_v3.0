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

interface ChangeReservationMessageModalProps {
  onChange: () => void;
  onClose: () => void;
}

function ChangeReservationMessageModal({
  onChange,
  onClose,
}: ChangeReservationMessageModalProps) {
  const handleDeleteSubjectsButtonClick = () => {
    onChange();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>양방향 예약 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" fontSize="14px">
            <Text>
              예약 수정을 진행하면 현재 양방향 예약 발송건은 취소되고, 양방향
              발송 메시지 정보와 수신 대상자를 복사하여 양방향 메시지 발송
              페이지로 이동됩니다.
            </Text>
            <br />
            <Text>양방향 예약 수정을 진행하시겠습니까?</Text>
          </Flex>
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
              양방향 예약 수정
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeReservationMessageModal;
