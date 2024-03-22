/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, HStack, StackProps, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ImageIcon, ToastMessage } from "components";
import {
  MessageImage,
  MessageTextarea,
  useSendConsult,
  useSendMMSConsult,
} from "features/send";
import ConsultData from "type/ConsultData";
import ConfirmSendModal from "./ConfirmSendModal";

interface SendMessageAreaProps {
  consultData: ConsultData;
  msgChannel: string;
  setMsgChannel: React.Dispatch<React.SetStateAction<string>>;
}
function SendMessageArea({
  consultData,
  msgChannel,
  setMsgChannel,
  ...props
}: SendMessageAreaProps & StackProps) {
  const toast = useToast();
  const methods = useForm({ mode: "onBlur" });

  const [msgByteCurrent, setMsgByteCurrent] = useState<number>(0);
  const [msgContext, setMsgContext] = useState<string>("");
  const [msgImgFiles, setMsgImgFiles] = useState<File[]>([]);
  const [msgImgURLs, setMsgImgURLs] = useState<string[]>([]);

  const [confirmSendModalOpen, setConfirmSendModalOpen] =
    useState<boolean>(false);

  const { mutate: sendConsult } = useSendConsult();
  const { mutate: sendMMSConsult } = useSendMMSConsult();

  const handleSendButtonClick = () => {
    setConfirmSendModalOpen(true);
  };
  const onCloseConfirmSendModal = () => {
    setConfirmSendModalOpen(false);
  };

  const onReset = () => {
    setMsgChannel("SMS");
    setMsgContext("");
    setMsgImgFiles([]);
    setMsgImgURLs([]);
  };

  const onSubmitConfirmSendModal = () => {
    if (msgChannel !== "MMS") {
      sendConsult(
        {
          mastId: consultData.headerData.mastId,
          customerNumber: consultData.headerData.receiverNo,
          bizNumber: consultData.headerData.callerNo,
          message: msgContext,
          channel: msgChannel.charAt(0),
          expireTime: consultData.headerData.expireTime,
        },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title="문자 메시지 전송 오류" type="ERROR">
                  문자 메시지 전송 중 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  문자 메시지 전송을 다시 진행 하세요. 본 오류가 계속 발생하는
                  경우 시스템 관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="문자 메시지 전송 완료" type="SUCCESS">
                  문자 메시지기 정상적으로 전송되었습니다.
                </ToastMessage>
              ),
            });
            onReset();
          },
        }
      );
      onCloseConfirmSendModal();
      return;
    }
    console.log(msgImgFiles);
    sendMMSConsult(
      {
        mastId: consultData.headerData.mastId,
        bizNumber: consultData.headerData.callerNo,
        message: msgContext,
        file: msgImgFiles[0],
        expireTime: consultData.headerData.expireTime,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="문자 메시지 전송 오류" type="ERROR">
                문자 메시지 전송 중 중 알 수 없는 오류가 발생하였습니다.
                <br />
                문자 메시지 전송을 다시 진행 하세요. 본 오류가 계속 발생하는
                경우 시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="문자 메시지 전송 완료" type="SUCCESS">
                문자 메시지기 정상적으로 전송되었습니다.
              </ToastMessage>
            ),
          });
          onReset();
        },
      }
    );
    onCloseConfirmSendModal();
  };

  useEffect(() => {
    let msgChannel = "SMS";
    if (msgImgFiles.length > 0) {
      msgChannel = "MMS";
      setMsgChannel(msgChannel);
    } else {
      if (msgByteCurrent > 90) {
        msgChannel = "LMS";
      } else {
        msgChannel = "SMS";
      }
    }
    setMsgChannel(msgChannel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgImgFiles, msgByteCurrent]);

  return (
    <VStack align="stretch" spacing={2} {...props}>
      <FormProvider {...methods}>
        <MessageTextarea
          name="sendMessageText"
          channel={msgChannel}
          // isDisabled={isDisabled}
          byteCurrent={msgByteCurrent}
          setContext={setMsgContext}
          setChannel={setMsgChannel}
          setByteCurrent={setMsgByteCurrent}
        />
        <HStack spacing={3}>
          <MessageImage
            name="sendMessageImage"
            isButtonType
            imgUrls={msgImgURLs}
            imgFiles={msgImgFiles}
            setImgURLs={setMsgImgURLs}
            setImgFiles={setMsgImgFiles}
            flex={1}
          />
          <Button
            isDisabled={msgContext === ""}
            variant="primaryBlue"
            flexShrink={0}
            onClick={handleSendButtonClick}
          >
            전송
          </Button>
        </HStack>
      </FormProvider>
      <ConfirmSendModal
        channel={msgChannel}
        isOpen={confirmSendModalOpen}
        onClose={onCloseConfirmSendModal}
        onSubmit={onSubmitConfirmSendModal}
      />
    </VStack>
  );
}

export default SendMessageArea;
