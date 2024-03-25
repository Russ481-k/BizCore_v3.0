import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";

import {
  ChangeReservationTimeModal,
  CollapseSection,
  ImageUploader,
  InfoBox,
  InfoElement,
  QuestionMarkIcon,
  ReplacementCodeInfoModal,
  ReplacementCodeList,
  SpecialSymbolList,
  SubjectPanel,
  TipText,
  ToastMessage,
} from "components";
import SendData from "type/SendData";
import Subject from "type/Subject";
import Template from "type/Template";
import AutoTestModal from "./AutoTestModal";
import ImmediateSendModal from "./ImmediateSendModal";
import MessageTextarea from "./MessageTextarea";
import SendTelNumberModal from "./SendTelNumberModal";

interface TwoWayInputPanelProps {
  changeFile: { uniqueFileName: string; fileOrder: number }[];
  imageFiles?: File[];
  imageURLs?: string[];
  subjectPanel: boolean;
  template?: Template | null;
  onChannelChange?: (channel: string) => void;
  onContextChange: (context: string) => void;
  onDisabled?: (disabled: boolean) => void;
  onImagesChange?: (imageContents: File, url: string | null, index: number | null) => void;
  onTitleChange?: (title: string) => void;
  onWiredPhoneNumberChange?: (wiredPhoneNumber: string) => void;
  removeImageFile?: (index: number) => void;
  resetFiles?: () => void;
}
function TwoWayInputPanel({
  changeFile,
  imageFiles,
  imageURLs,
  subjectPanel,
  template,
  onChannelChange,
  onContextChange,
  onDisabled,
  onImagesChange,
  onTitleChange,
  onWiredPhoneNumberChange,
  removeImageFile,
  resetFiles,
}: TwoWayInputPanelProps) {
  const toast = useToast();
  const methods = useFormContext<{
    callingNumber: string;
    images?: File[];
    messageContents: string;
    title: string;
    alarmTalkChannel: string;
    templateCode: string;
  }>();

  const messageContents = methods?.getValues("messageContents");

  const [, setTelNumber] = useState<string>("");
  const [, setTitleByteCount] = useState<number>(0);
  const [, setTitleStringLimit] = useState<number>(0);
  const [channel, setChannel] = useState<string>("SMS");
  const [contentsByteCount, setContentsByteCount] = useState<number>(0);
  const [contentsStringLimit, setContentsStringLimit] = useState<number>(0);
  const [immediateSendModalData, setImmediateSendModalData] = useState<SendData | null>(null);
  const [isAutoTestModalOpen, setAutoTestModalOpen] = useState<boolean>(false);
  const [isOpenSendTelNumberModal, setOpenSendTelNumberModal] = useState<boolean>(false);
  const [replacementInfoModalOpen, setReplacementInfoModalOpen] = useState<boolean>(false);
  const [reservationTimeModalData, setReservationTimeModalData] = useState<SendData | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>();
  const [toggleAuto, setToggleAuto] = useState<boolean>(true);

  const handleChangeSubjects = useCallback(
    (e: Subject[]) => {
      setSubjects(e);
    },
    [setSubjects]
  );

  const getByteFromText = useCallback(
    (e: string, type: string) => {
      let count = 0;
      let channel = "SMS";
      if (e?.length === 0) {
        onChannelChange?.(channel);
        setChannel(channel);
        return setContentsByteCount(0);
      }
      return e
        ?.split("")
        .map((s) => s.charCodeAt(0))
        .reduce((prev, c) => {
          if (prev <= 2000) {
            count++;
            if (prev <= 30) {
              setTitleStringLimit(count - 1);
            }
            setContentsStringLimit(count - 1);
          }
          let result = prev + (c === 10 ? 2 : c >> 7 ? 2 : 1);
          if (type === "title") {
            setTitleByteCount(result);
          } else if (type === "contents") {
            setContentsByteCount(result);
            onContextChange(e);
          }
          return result;
        }, 0);
    },
    [
      onChannelChange,
      setChannel,
      setTitleStringLimit,
      setContentsStringLimit,
      setTitleByteCount,
      setContentsByteCount,
      onContextChange,
    ]
  );

  const handleAddSymbol = (e: string) => () => {
    if (contentsByteCount >= 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2,000bytes를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
    } else {
      getByteFromText(messageContents + e, "contents");
      methods?.setValue("messageContents", messageContents + e);
      onContextChange(messageContents);
    }
  };
  const handleContentsBlur = (e: string) => {
    if (contentsByteCount > 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2,000bytes를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
      getByteFromText(e.substring(0, contentsStringLimit), "contents");
      onContextChange(e.substring(0, contentsStringLimit));
      return e.substring(0, contentsStringLimit);
    } else {
      getByteFromText(e, "contents");
      onContextChange(e);
      return e;
    }
  };
  const handleContentsChange = (e: string) => {
    getByteFromText(e, "contents");
  };
  const sendDataSet = (isImmediateSend: boolean) => {
    let filePath = imageURLs?.map((imageURL) => {
      if (imageURL.slice(0, 4) === "blob") {
        return null;
      }
      return imageURL?.slice(imageURL?.indexOf("/resources/") + 11, imageURL?.length);
    });
    return {
      id: null,
      changeTime: false,
      subject: methods?.getValues("title"),
      callback: methods?.getValues("callingNumber"),
      msg: messageContents,
      templateCode: methods?.getValues("templateCode"),
      type: channel,
      fileCnt: imageFiles?.length,
      files: imageFiles,
      reqDate: null,
      sendType: isImmediateSend ? "D" : "R",
      filePath1: filePath?.[0] ?? null,
      filePath2: filePath?.[1] ?? null,
      filePath3: filePath?.[2] ?? null,
      addressArray:
        subjects?.map((subject) => {
          return {
            "#{이름}": subject.name,
            "#{휴대전화번호}": subject.mobile,
            "#{전화번호}": subject.phone,
            "#{변수1}": subject.expression_1,
            "#{변수2}": subject.expression_2,
            "#{변수3}": subject.expression_3,
            "#{변수4}": subject.expression_4,
          };
        }) ?? [],
    };
  };

  const handleAutoTestButtonClick = () => {
    setAutoTestModalOpen(true);
  };
  const handleAutoTestModalClose = () => {
    setAutoTestModalOpen(false);
  };
  const handleImmediateSend = methods.handleSubmit(() => {
    setImmediateSendModalData(sendDataSet(false));
  });
  const handleReplacementInfoModalIconClick = () => {
    setReplacementInfoModalOpen(true);
  };
  const handleSendReservation = methods.handleSubmit(() => {
    setReservationTimeModalData(sendDataSet(false));
  });

  const handleImmediateSendModalClose = () => {
    setImmediateSendModalData(null);
  };
  // const handleImmediateSendModalReset = () => {
  //   methods.resetField("title");
  //   methods.resetField("callingNumber");
  //   methods.resetField("messageContents");
  //   methods.resetField("images");
  //   resetFiles?.();
  //   setReset(true);
  //   onContextChange("");
  // };
  const handleToggleAuto = (e: boolean) => {
    setToggleAuto(e);
    if (e) {
      methods?.resetField("messageContents");
      getByteFromText("", "contents");
      onContextChange("");
      resetFiles?.();
    }
  };

  const handlePhoneNumberChange = (e: string) => {
    if (!!e) {
      onWiredPhoneNumberChange?.(e);
      onDisabled?.(false);
    } else {
      onDisabled?.(true);
    }
  };
  const handleReservationTimeModalClose = () => {
    setReservationTimeModalData(null);
  };

  // const handleReservationTimeModalReset = () => {
  //   methods.resetField("title");
  //   methods.resetField("callingNumber");
  //   methods.resetField("messageContents");
  //   methods.resetField("images");
  //   resetFiles?.();
  //   setReset(true);
  //   onContextChange("");
  // };

  const handleSendTelNumberModalClose = () => {
    setOpenSendTelNumberModal(false);
  };
  const handleSendTelNumberModalOpen = () => {
    setOpenSendTelNumberModal(true);
  };
  const handleTelNumberChange = (e: string) => {
    setTelNumber(e);
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    let channel = "SMS";
    if ((imageFiles?.length ?? 0) > 0) {
      channel = "MMS";
      onChannelChange?.(channel);
      setChannel(channel);
    } else {
      if (contentsByteCount > 90) {
        channel = "LMS";
      } else {
        channel = "SMS";
      }
    }
    onChannelChange?.(channel);
    setChannel(channel);
  }, [imageFiles, onChannelChange, contentsByteCount]);

  useEffect(() => {
    if (!!template) {
      onDisabled?.(false);
      getByteFromText(template?.templateMsgContext, "contents");
      if (contentsByteCount <= 2000) {
        onContextChange(template?.templateMsgContext);
      }
      getByteFromText(template?.templateMsgTitle, "title");
      methods?.setValue("title", template?.templateMsgTitle);
      methods?.setValue("alarmTalkChannel", template?.yellowIdKey ?? "");
      methods?.setValue("templateCode", template?.templateCode);
      methods?.setValue("messageContents", template?.templateMsgContext);
      methods?.setValue("callingNumber", template?.wiredPhoneNumber ?? "");
      onWiredPhoneNumberChange?.(template?.wiredPhoneNumber ?? "");
      onTitleChange?.(template?.templateMsgTitle);
      resetFiles?.();
      template.files?.forEach((file, i) => {
        onImagesChange?.(
          new File([], file.uniqueFileName),
          process.env.REACT_APP_API_URL + "/resources/" + file.uniqueFileName,
          i
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  return (
    <FormProvider {...methods}>
      <Flex flex={1} flexDirection="column" gap={3} width="100%">
        <CollapseSection flexDirection="column" gap={1} headerTitle=" 메시지 입력">
          <InfoBox>
            <InfoElement label=" 발신번호" required>
              <Flex gap={2} justifyContent="space-between" width="100%">
                <FormControl isInvalid={!!methods?.formState.errors.callingNumber}>
                  <Input
                    defaultValue={template?.wiredPhoneNumber}
                    isDisabled
                    isInvalid={!!methods?.formState.errors.callingNumber}
                    maxWidth="250px"
                    size="sm"
                    {...methods?.register("callingNumber", {
                      required: {
                        value: true,
                        message: " 발신번호를 선택하세요.",
                      },
                      onChange: (e) => handlePhoneNumberChange(e.target.value),
                    })}
                  />
                  {methods?.formState.errors.callingNumber && (
                    <FormErrorMessage>
                      {methods?.formState.errors.callingNumber.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                {subjectPanel && (
                  <Button
                    minWidth="150px"
                    size="sm"
                    variant="secondaryBlue"
                    onClick={handleSendTelNumberModalOpen}
                  >
                    발신번호 변경
                  </Button>
                )}
              </Flex>
            </InfoElement>
            <InfoElement label=" 구분">
              <Flex alignItems="center" gap={2} width="100%">
                <Tooltip
                  arrowSize={10}
                  backgroundColor="primary.700"
                  borderRadius="12px"
                  closeOnScroll={true}
                  color="white"
                  fontSize="xs"
                  fontWeight="normal"
                  hasArrow
                  isDisabled={toggleAuto}
                  label={<Text>수정한 내용은 모두 초기화됩니다.</Text>}
                  p={2}
                  placement="bottom-start"
                >
                  <Button
                    size="sm"
                    variant={toggleAuto ? "primaryBlue" : "secondaryBlue"}
                    onClick={() => handleToggleAuto(true)}
                  >
                    안내
                  </Button>
                </Tooltip>
                <Button
                  size="sm"
                  variant={toggleAuto ? "secondaryBlue" : "primaryBlue"}
                  onClick={() => handleToggleAuto(false)}
                >
                  문자상담
                </Button>
                <TipText
                  size="sm"
                  text=" 안내 시나리오 관리에서 [미사용]으로 지정된 경우
                  문자상담만 가능합니다"
                />
              </Flex>
            </InfoElement>
            <InfoElement label="메시지 내용" required>
              <Flex flexDirection="column" gap={2} width="100%">
                <MessageTextarea
                  channel={channel}
                  contentsByteCount={contentsByteCount}
                  defaultValue={template?.templateMsgContext}
                  isDisabled={toggleAuto}
                  handleContentsBlur={handleContentsBlur}
                  handleContentsChange={handleContentsChange}
                />
                <Flex justifyContent="space-between">
                  <Box></Box>
                  <Flex alignItems="center" gap={2}>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          isDisabled={toggleAuto}
                          size="sm"
                          variant="secondaryBlue"
                          width="150px"
                        >
                          특수문자
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent boxShadow="0px 4px 12px -3px" width="402px">
                        <PopoverArrow />
                        <PopoverHeader>특수문자 입력</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody p={0}>
                          <SpecialSymbolList addSymbol={handleAddSymbol} />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          isDisabled={toggleAuto}
                          size="sm"
                          variant="secondaryBlue"
                          width="150px"
                        >
                          치환코드
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent boxShadow="0px 4px 12px -3px" width="162px">
                        <PopoverArrow />
                        <PopoverHeader>치환코드 입력</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody p={0}>
                          <ReplacementCodeList addSymbol={handleAddSymbol} />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <QuestionMarkIcon
                      color={toggleAuto ? "primary.400" : "primary.700"}
                      cursor="pointer"
                      onClick={toggleAuto ? () => {} : handleReplacementInfoModalIconClick}
                    />
                  </Flex>
                </Flex>
                <TipText
                  size="sm"
                  text="내용이 90bytes가 넘으면 장문메시지로 자동변경됩니다. (단문
                  90bytes, 장문 / 포토 2,000bytes) 문서 프로그램에서 작성한
                  특수문자 등을 복사/붙여넣기 할 경우 수신자폰에서 깨짐 현상이
                  발생 할 수 있습니다. 상단 [특수문자]버튼을 클릭하여 특수문자를
                  직접 입력해주세요."
                />
              </Flex>
            </InfoElement>
            <InfoElement label="이미지 첨부">
              <ImageUploader
                imageURLs={imageURLs}
                isDisabled={toggleAuto}
                onChange={onImagesChange}
                removeImageFile={removeImageFile}
              />
            </InfoElement>
            <Input
              display="none"
              id="auto-test"
              type="submit"
              onClick={handleAutoTestButtonClick}
            />
            <Input display="none" id="immediate-send" type="submit" onClick={handleImmediateSend} />
            <Input
              display="none"
              id="reserved-send"
              type="submit"
              onClick={handleSendReservation}
            />
          </InfoBox>
        </CollapseSection>
        {subjectPanel && <SubjectPanel isReset={reset} onChange={handleChangeSubjects} />}
        {replacementInfoModalOpen && (
          <ReplacementCodeInfoModal setOpen={setReplacementInfoModalOpen} />
        )}
        {reservationTimeModalData && (
          <ChangeReservationTimeModal
            changeTime={false}
            sendData={reservationTimeModalData}
            onClose={handleReservationTimeModalClose}
          />
        )}
        {immediateSendModalData && (
          <ImmediateSendModal
            sendData={immediateSendModalData}
            onClose={handleImmediateSendModalClose}
          />
        )}
        {isOpenSendTelNumberModal && (
          <SendTelNumberModal
            onChange={handleTelNumberChange}
            onClose={handleSendTelNumberModalClose}
          />
        )}
        {isAutoTestModalOpen && <AutoTestModal onClose={handleAutoTestModalClose} />}
      </Flex>
    </FormProvider>
  );
}
export default TwoWayInputPanel;
