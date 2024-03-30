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
          <ToastMessage title="예약  오류" type="ERROR">
            예약 은 현재 시간보다 30분 이후로 지정해야 합니다. 현재 시간의 30분
            이후로 지정됩니다.
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
          <ToastMessage title=" 대상자 누락 오류" type="ERROR">
            <Text>
              대상자가 존재하지 않습니다. 관리의 대상자 선택에서 대상자를
              추가하세요.
            </Text>
          </ToastMessage>
        ),
      });
    }
  });
  setTimeout(() => {
    setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  }, 1000);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="768px">
        <ModalHeader>{`${
          changeTime ? "예약  일시 수정" : "예약 "
        }`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={3}>
            <TipText
              hasBg
              text={`예약  일시를 지정한 다음
              ${
                changeTime ? "예약  일시 수정" : "예약 "
              } 버튼을 클릭하세요. 예약 시간은 현재시간보다 30분 후로 지정하세요.`}
            />
            <InfoBox>
              <InfoElement label="예약  일시" labelWidth="130px" required>
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
            disabled={true}
            isLoading={true}
            type="submit"
            variant="primaryBlue"
            onClick={handleSendReservationButtonClick}
          >
            {changeTime ? "예약  일시 수정" : "예약 "}
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeReservationTimeModal;
