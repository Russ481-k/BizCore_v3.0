import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React from "react";

import { CustomModal } from "components";

interface EndConsultModalProps {
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function EndConsultModal({ isOpen, setModalOpen }: EndConsultModalProps) {
  const onSubmit = () => {
    // TODO: 상담 종료
    console.log("상담 종료!");
    onClose();
    // 상담 종료 완료
    // 양방향 상담을 정상적으로 종료하였습니다.
    // 상담 종료 오류
    // 양방향 상담 종료 중 중 알 수 없는 오류가 발생하였습니다.
    // 상담 종료를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
    // 시스템 관리자에게 문의하기 바랍니다.
  };

  const onClose = () => {
    setModalOpen(false);
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>상담 종료</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          상담을 종료하면 추가적인 문자 메시지를 발송하거나
          <br />
          수신자로부터 문자를 회신 받을 수 없습니다.
          <br />
          <br />
          상담을 종료하시겠습니까?
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={onSubmit}>
            상담 종료
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default React.memo(EndConsultModal);
