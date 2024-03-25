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

interface ChangeReservationMessageModalProps {
  onClose: () => void;
  onChange: () => void;
}

function ChangeReservationMessageModal({ onChange, onClose }: ChangeReservationMessageModalProps) {
  const handleDeleteSubjectsButtonClick = () => {
    onChange();
    onClose();
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>예약 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" fontSize="14px">
            <Text>
              예약 수정을 진행하면 현재 예약 건은 취소되고, 메시지 정보와 수신 대상자를 복사하여
              전송 페이지로 이동됩니다.
            </Text>
            <br />
            <Text>예약 수정을 진행하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleDeleteSubjectsButtonClick}>
            예약 수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeReservationMessageModal;
