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

interface DeleteUserCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function DeleteUserCheckModal({
  isOpen,
  onSubmit,
  onClose,
}: DeleteUserCheckModalProps) {
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const handleSubmitButtonClick = () => {
    onSubmit();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent onKeyPress={handleOnKeyPress} minW="420px">
        <ModalHeader>운영자 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            운영자를 삭제하면 복구할 수 없습니다.
            <br />
            운영자를 삭제하시겠습니까?
          </Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleSubmitButtonClick}>
            운영자 삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteUserCheckModal;
