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
import { add, format, set } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  CustomModal,
  DateInput,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import { useSendMessage, useSendTwoWayMessage } from "features/send";
import SendData from "type/SendData";

interface ChangeReservationTimeModalProps {
  changeTime: boolean;
  messageId?: number | null;
  sendData?: SendData | null;
  twoWay?: boolean;
  onClose: () => void;
  onReset?: () => void;
}
function ChangeReservationTimeModal({
  changeTime,
  messageId,
  sendData,
  twoWay,
  onClose,
  onReset,
}: ChangeReservationTimeModalProps) {
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm<{
    sendDate: Date;
  }>();
  const toast = useToast();

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState<string>();

  const { mutate: sendTwoWayMessage, isLoading: isTwoWayLoading } =
    useSendTwoWayMessage();
  const { mutate: sendMessage, isLoading } = useSendMessage();

  const handleModalClose = () => {
    onClose();
  };
  const handleSendDateChange = () => {
    const sendDateValue = getValues("sendDate");
    if (!sendDateValue) {
      return;
    }
    if (add(new Date(), { minutes: 30 }) > sendDateValue) {
      toast({
        render: () => (
          <ToastMessage title="예약 발송 오류" type="ERROR">
            예약 발송은 현재 시간보다 30분 이후로 지정해야 합니다. 현재 시간의
            30분 이후로 지정됩니다.
          </ToastMessage>
        ),
      });
      setValue(
        "sendDate",
        set(add(new Date(), { minutes: 30 }), {
          seconds: 0,
        })
      );
    }
  };

  const handleSendReservationButtonClick = handleSubmit(() => {
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
    if (twoWay) {
      sendTwoWayMessage(
        {
          id: changeTime ? messageId ?? 0 : 2,
          reqDate: format(
            getValues("sendDate") ?? new Date(),
            "yyyy-MM-dd HH:mm:ss.SSS"
          ),
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="예약 발송 오류" type="ERROR">
                  <Text>
                    문자 메시지 예약 발송 중 알 수 없는 오류가 발생하였습니다.
                  </Text>
                  <Text>
                    예약 발송을 클릭하여 문자 메시지 예약 발송을 다시 진행
                    하세요. 본 오류가 계속 발생하는 경우 시스템 관리자에게
                    문의하기 바랍니다.
                  </Text>
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage
                  title={`예약 발송 ${changeTime ? "수정" : "등록"} 완료`}
                  type="SUCCESS"
                >
                  문자 메시지의 예약 발송 등록을 완료하였습니다. 등록된 예약
                  발송은 메시지 관리의 예약 발송 관리 페이지에서 확인하세요.
                </ToastMessage>
              ),
              duration: 3000,
            });
            onClose();
            onReset?.();
            navigate("/two-way/reservation");
          },
        }
      );
    } else {
      sendMessage(
        {
          id: changeTime ? messageId ?? 0 : 2,
          changeTime,
          subject: sendData ? sendData.subject : "",
          callback: sendData ? sendData.callback : "",
          msg: sendData ? sendData.msg : "",
          type: sendData ? sendData.type : "",
          fileCnt: sendData ? sendData.fileCnt : 0,
          filePath1: sendData ? sendData.filePath1 : null,
          filePath2: sendData ? sendData.filePath2 : null,
          filePath3: sendData ? sendData.filePath3 : null,
          files: sendData ? sendData.files : [],
          reqDate: format(
            getValues("sendDate") ?? new Date(),
            "yyyy-MM-dd HH:mm:ss.SSS"
          ),
          sendType: "R",
          addressArray: sendData ? sendData.addressArray : [],
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="예약 발송 오류" type="ERROR">
                  <Text>
                    문자 메시지 예약 발송 중 알 수 없는 오류가 발생하였습니다.
                  </Text>
                  <Text>
                    예약 발송을 클릭하여 문자 메시지 예약 발송을 다시 진행
                    하세요. 본 오류가 계속 발생하는 경우 시스템 관리자에게
                    문의하기 바랍니다.
                  </Text>
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage
                  title={`예약 발송 ${changeTime ? "수정" : "등록"} 완료`}
                  type="SUCCESS"
                >
                  문자 메시지의 예약 발송 등록을 완료하였습니다. 등록된 예약
                  발송은 메시지 관리의 예약 발송 관리 페이지에서 확인하세요.
                </ToastMessage>
              ),
              duration: 3000,
            });
            onClose();
            onReset?.();
            navigate("/one-way/reservation");
          },
        }
      );
    }
  });
  setTimeout(() => {
    setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  }, 1000);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="768px">
        <ModalHeader>{`${
          changeTime ? "예약 발송 일시 수정" : "예약 발송"
        }`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={3}>
            <TipText
              hasBg
              text={`예약 발송 일시를 지정한 다음
              ${
                changeTime ? "예약 발송 일시 수정" : "예약 발송"
              } 버튼을 클릭하세요. 예약 시간은 현재시간보다 30분 후로 지정하세요.`}
            />
            <InfoBox>
              <InfoElement label="예약 발송 일시" labelWidth="130px" required>
                <Flex flexDirection="column">
                  <DateInput
                    control={control}
                    dateFormat="yyyy-MM-dd HH:mm"
                    flex={1}
                    iconColor="primary.700"
                    size="sm"
                    isInvalid={!!errors.sendDate}
                    showTimeSelect
                    {...register("sendDate", {
                      required: true,
                      onChange: handleSendDateChange,
                    })}
                  />
                </Flex>
                <Flex
                  borderColor="primary.700"
                  borderRadius="10px"
                  borderWidth={1}
                  flex={1}
                  justifyContent="space-between"
                  overflow="hidden"
                >
                  <Text
                    backgroundColor="primary.700"
                    color="white"
                    fontSize="14px"
                    px={2}
                  >
                    현재 일시
                  </Text>
                  <Text fontSize="14px" mx="auto">
                    {currentTime}
                  </Text>
                </Flex>
              </InfoElement>
            </InfoBox>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            disabled={isLoading || isTwoWayLoading}
            isLoading={isLoading || isTwoWayLoading}
            type="submit"
            variant="primaryBlue"
            onClick={handleSendReservationButtonClick}
          >
            {changeTime ? "예약 발송 일시 수정" : "예약 발송"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeReservationTimeModal;
