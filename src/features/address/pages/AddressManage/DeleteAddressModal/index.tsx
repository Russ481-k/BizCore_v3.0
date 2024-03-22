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

interface DeleteAddressModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteAddressModal({ onClose, onConfirm }: DeleteAddressModalProps) {
  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>주소록 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <Text fontSize="14px">주소록 삭제시 복구가 불가능 합니다.</Text>
            <Text fontSize="14px">주소록을 삭제하시겠습니까?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={onConfirm}>
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteAddressModal;
