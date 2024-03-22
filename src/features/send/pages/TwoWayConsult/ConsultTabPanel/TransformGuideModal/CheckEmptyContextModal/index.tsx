import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

import { CustomModal } from "components";

interface CheckEmptyContextModalProps {
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function CheckEmptyContextModal({
  isOpen,
  setModalOpen,
}: CheckEmptyContextModalProps) {
  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalContent minW="320px">
          <ModalHeader>메시지 내용을 입력하세요.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              안내 메시지 자동 발송을 설정한 경우 메시지 내용을 등록하여셔
              합니다.
              <br />
              <br />
              메시지 내용을 등록 후 전환안내 설정을 저장하세요.
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="textGray" onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
    </>
  );
}

export default CheckEmptyContextModal;
