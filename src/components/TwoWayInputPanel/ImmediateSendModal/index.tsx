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
import { useSendMessage } from "features/send";
import SendData from "type/SendData";

interface ImmediateSendModalProps {
  sendData: SendData | null;
  onClose: () => void;
}
function ImmediateSendModal({ sendData, onClose }: ImmediateSendModalProps) {
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: sendMessage, isLoading } = useSendMessage();

  const handleModalClose = () => {
    onClose();
  };
  const handleSendReservationButtonClick = () => {
    if (sendData && sendData.addressArray?.length === 0) {
      onClose();
      return toast({
        render: () => (
          <ToastMessage title="수신 대상자 누락 오류" type="ERROR">
            <Text>
              수신 대상자가 존재하지 않습니다. 메시지 관리의 수신 대상자
              선택에서 수신 대상자를 추가하세요.
            </Text>
          </ToastMessage>
        ),
      });
    }
    sendMessage(
      {
        id: null,
        changeTime: false,
        subject: sendData ? sendData.subject : "",
        callback: sendData ? sendData.callback : "",
        msg: sendData ? sendData.msg : "",
        templateCode: sendData ? sendData.templateCode : "",
        type: sendData ? sendData.type : "",
        fileCnt: sendData ? sendData.fileCnt : 0,
        files: sendData ? sendData.files : [],
        reqDate: null,
        sendType: "D",
        addressArray: sendData ? sendData.addressArray : [],
        filePath1: sendData ? sendData.filePath1 : null,
        filePath2: sendData ? sendData.filePath2 : null,
        filePath3: sendData ? sendData.filePath3 : null,
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="즉시 발송 오류" type="ERROR">
                <Text>
                  문자 메시지 즉시 발송 중 알 수 없는 오류가 발생하였습니다
                </Text>
                <Text>
                  즉시 발송을 클릭하여 문자 메시지 즉시 발송을 다시 진행 하세요.
                  본 오류가 계속 발생하는 경우 시스템 관리자에게 문의하기
                  바랍니다.
                </Text>
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="문자 메시지 즉시 발송 완료" type="SUCCESS">
                문자 메시지의 즉시 발송을 완료하였습니다. 발송된 문자 메시지는
                메시지 관리의 메시지 발송 현황 페이지에서 확인하세요.
              </ToastMessage>
            ),
            duration: 3000,
          });
          onClose();
          navigate("/two-way/send-status");
        },
      }
    );
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>즉시 발송</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <QuestionMarkIcon color="primary.800" mr={2} />
            <Flex flexDirection="column">
              <Text fontSize="14px">
                문자 메시지를 즉시 발송하면 취소할 수 없습니다.
              </Text>
              <Text fontSize="14px">문자 메시지를 즉시 발송하시겠습니까?</Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="primaryBlue"
            onClick={handleSendReservationButtonClick}
          >
            즉시 발송
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ImmediateSendModal;
