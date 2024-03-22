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

interface ResetPwdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ResetPwdModal({ isOpen, onSubmit, onClose }: ResetPwdModalProps) {
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
        <ModalHeader>비밀번호 초기화</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            비밀번호를 분실한 경우에만 초기화를 진행하세요. 초기화 후 운영자님께
            필히 변경을 요청해 주시기 바랍니다.
            <br />
            비밀번호를 초기화 하시겠습니까?
          </Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleSubmitButtonClick}>
            비밀번호 초기화
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ResetPwdModal;
