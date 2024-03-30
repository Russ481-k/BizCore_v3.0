import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { CustomModal, QuestionMarkIcon, ToastMessage } from "components";
import SendData from "type/SendData";

interface ImmediateSendModalProps {
  sendData: SendData | null;
  onClose: () => void;
  onReset: () => void;
}
function ImmediateSendModal({
  sendData,
  onClose,
  onReset,
}: ImmediateSendModalProps) {
  const toast = useToast();
  const navigate = useNavigate();

  const handleModalClose = () => {
    onClose();
  };
  const handleSendReservationButtonClick = () => {
    if (sendData && sendData.addressArray?.length === 0) {
      onClose();
      return toast({
        render: () => (
          <ToastMessage title=" 대상자 누락 오류" type="ERROR">
            <Text>
              대상자가 존재하지 않습니다. 관리의 대상자 선택에서 대상자를
              추가하세요.
            </Text>
          </ToastMessage>
        ),
      });
    }
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>즉시 </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <QuestionMarkIcon color="primary.800" mr={2} />
            <Flex flexDirection="column">
              <Text fontSize="14px">문자 를 즉시 하면 취소할 수 없습니다.</Text>
              <Text fontSize="14px">문자 를 즉시 하시겠습니까?</Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            disabled={true}
            isLoading={true}
            variant="primaryBlue"
            onClick={handleSendReservationButtonClick}
          >
            즉시
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ImmediateSendModal;
