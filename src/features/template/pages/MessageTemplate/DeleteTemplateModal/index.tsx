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

interface DeleteTemplateModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteTemplateModal({ onClose, onConfirm }: DeleteTemplateModalProps) {
  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>문자 템플릿 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <Text fontSize="14px">
              문자 템플릿 삭제시 복구가 불가능 합니다.
            </Text>
            <Text fontSize="14px">문자 템플릿을 삭제하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="secondaryGray" onClick={onConfirm}>
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteTemplateModal;
