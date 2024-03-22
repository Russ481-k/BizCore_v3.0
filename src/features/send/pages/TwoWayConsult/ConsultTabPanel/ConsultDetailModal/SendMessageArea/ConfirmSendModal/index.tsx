import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";

import { CustomModal } from "components";

interface ConfirmSendModalProps {
  channel: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ConfirmSendModal({
  channel,
  isOpen,
  onClose,
  onSubmit,
}: ConfirmSendModalProps) {
  const handleChannelText = useCallback((channel: string) => {
    switch (channel) {
      case "SMS":
        return "단문(SMS)";
      case "LMS":
        return "장문(LMS)";
      case "MMS":
        return "멀티(MMS)";
      default:
        return "단문(SMS)";
    }
  }, []);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>메시지 전송</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <Text>
            등록한
            <Text as="span" fontWeight="600" color="black">
              &nbsp;{handleChannelText(channel)}&nbsp;
            </Text>
            메시지 내용으로 문자를 발송하시겠습니까?
          </Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={onSubmit}>
            문자 메시지 전송
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default React.memo(ConfirmSendModal);
