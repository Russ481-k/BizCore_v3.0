import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import CustomModal from "components/CustomModal";

interface LogoutModalProps {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onSubmit: () => void;
}

function LogoutModal({ isOpen, text, onClose, onSubmit }: LogoutModalProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>{text}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{text} 하시겠습니까?</Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={onSubmit}>
            {text}
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default LogoutModal;
