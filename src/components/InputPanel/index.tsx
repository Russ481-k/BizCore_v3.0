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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";

import {
  ChangeReservationTimeModal,
  CollapseSection,
  CustomSelect,
  CustomTableContainer,
  ImageUploader,
  ImportTemplateModal,
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
import formatter from "libs/formatter";
import Buttons from "type/Buttons";
import SendData from "type/SendData";
import Subject from "type/Subject";
import Template from "type/Template";
import ImmediateSendModal from "./ImmediateSendModal";
import MessageTextarea from "./MessageTextarea";

interface InputPanelProps {
  changeFile: { uniqueFileName: string; fileOrder: number }[];
  imageFiles: File[];
  imageURLs?: string[];
  isAlarmTalk?: boolean;
  subjectPanel: boolean;
  template?: Template | null;
  wiredPhoneNumbers?: Array<{
    code: string;
    name: string;
  }>;
  onButtonsChange?: (buttons: Array<Buttons>) => void;
  onChannelChange?: (channel: string) => void;
  onContextChange: (context: string) => void;
  onDisabled?: (disabled: boolean) => void;
  onImagesChange?: (
    imageContents: File,
    url: string | null,
    index: number | null
  ) => void;
  onSubjectCountChange?: (subjectCount: number) => void;
  onTitleChange?: (title: string) => void;
  onWiredPhoneNumberChange?: (wiredPhoneNumber: string) => void;
  removeImageFile?: (index: number) => void;
  resetFiles?: () => void;
}

function InputPanel({
  changeFile,
  imageFiles,
  imageURLs,
  isAlarmTalk,
  subjectPanel,
  template,
  wiredPhoneNumbers,
  onButtonsChange,
  onChannelChange,
  onContextChange,
  onDisabled,
  onImagesChange,
  onSubjectCountChange,
  onTitleChange,
  onWiredPhoneNumberChange,
  removeImageFile,
  resetFiles,
}: InputPanelProps) {
  const toast = useToast();
  const methods = useFormContext<{
    callingNumber: string;
    images?: File[];
    messageContents: string;
    title: string;
    alarmTalkChannel: string;
    templateCode: string;
  }>();
  const watchCallingNumber = methods.watch("callingNumber");
  const location = useLocation();

  const messageContents = methods?.getValues("messageContents");

  const [buttons, setButtons] = useState<Buttons[] | null>(null);
  const [channel, setChannel] = useState<string>("SMS");
  const [contentsByteCount, setContentsByteCount] = useState<number>(0);
  const [contentsStringLimit, setContentsStringLimit] = useState<number>(0);
  const [immediateSendModalData, setImmediateSendModalData] =
    useState<SendData | null>(null);
  const [importTemplateModalOpen, setImportTemplateModalOpen] =
    useState<boolean>(false);
  const [, setOpenConfirmModalData] = useState<Template | null>(null);
  const [replacementInfoModalOpen, setReplacementInfoModalOpen] =
    useState<boolean>(false);
  const [reservationTimeModalData, setReservationTimeModalData] =
    useState<SendData | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>();
  const [templateId, setTemplateId] = useState<number>(0);
  const [titleByteCount, setTitleByteCount] = useState<number>(0);
  const [titleStringLimit, setTitleStringLimit] = useState<number>(0);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  const insertAtCursor = (insertText: string) => {
    let startIndex = selectionStart;
    let endIndex = selectionEnd;
    const beforeText = messageContents.substring(0, startIndex);
    const afterText = messageContents.substring(endIndex);
    setSelectionStart(selectionStart + insertText.length);
    setSelectionEnd(selectionStart + insertText.length);
    return beforeText + insertText + afterText;
  };
  const handleButtonsChange = (buttons: Buttons[]) => {
    setButtons(buttons);
    onButtonsChange?.(buttons);
  };
  const handleChangeSubjects = useCallback(
    (e: Subject[]) => {
      onSubjectCountChange?.(e?.length);
      setSubjects(e);
    },
    [onSubjectCountChange, setSubjects]
  );

  const getByteFromText = useCallback(
    (e: string, type: string) => {
      let count = 0;
      let channel = "SMS";
      if (e?.length === 0) {
        if (!!imageURLs?.length) {
          channel = "MMS";
        }
        onChannelChange?.(channel);
        setChannel(channel);
        onContextChange("");
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
      imageURLs?.length,
      onChannelChange,
      onContextChange,
      setChannel,
      setContentsByteCount,
      setContentsStringLimit,
      setTitleByteCount,
      setTitleStringLimit,
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
      const insertedText = insertAtCursor(e);
      getByteFromText(insertedText, "contents");
      methods?.setValue("messageContents", insertedText);
      methods?.clearErrors("messageContents");
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
      return e.substring(0, contentsStringLimit);
    } else {
      getByteFromText(e, "contents");
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
      return imageURL?.slice(
        imageURL?.indexOf("/resources/") + 11,
        imageURL?.length
      );
    });
    return {
      id: null,
      changeTime: false,
      subject: methods?.getValues("title"),
      callback: methods?.getValues("callingNumber"),
      msg: messageContents,
      templateCode: methods?.getValues("templateCode"),
      type: isAlarmTalk ? "KKT" : channel,
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

  const handleImmediateSendModalReset = () => {
    methods.resetField("title");
    methods.resetField("callingNumber");
    methods.resetField("messageContents");
    methods.resetField("images");
    resetFiles?.();
    setReset(true);
    onContextChange("");
  };

  const handleImportTemplateButtonClick = () => {
    setImportTemplateModalOpen(true);
  };

  const importTemplate = useCallback(
    (template: Template) => {
      onDisabled?.(false);
      onTitleChange?.(template.templateMsgTitle);
      onWiredPhoneNumberChange?.(
        formatter.contactFormatter(template.wiredPhoneNumber ?? "")
      );
      getByteFromText(template.templateMsgContext, "contents");
      setTemplateId(template.templateId);
      if (contentsByteCount <= 2000) {
        onContextChange(template.templateMsgContext);
      }
      getByteFromText(template.templateMsgTitle, "title");
      methods?.setValue("title", template.templateMsgTitle);
      methods?.setValue("templateCode", template.templateCode);
      methods?.setValue("messageContents", template.templateMsgContext);
      methods?.clearErrors("messageContents");
      isAlarmTalk &&
        methods?.setValue("alarmTalkChannel", template.yellowIdKey ?? "");
      resetFiles?.();
      template.files?.forEach((file, i) => {
        onImagesChange?.(
          new File([], file?.uniqueFileName),
          process.env.REACT_APP_API_URL + "/resources/" + file?.uniqueFileName,
          i
        );
      });
    },
    [
      contentsByteCount,
      isAlarmTalk,
      methods,
      getByteFromText,
      onContextChange,
      onDisabled,
      onImagesChange,
      onTitleChange,
      onWiredPhoneNumberChange,
      resetFiles,
      setTemplateId,
    ]
  );
  const handleImportTemplate = (template: Template) => {
    if (!!template) {
      importTemplate(template);
      if (!!template?.buttonName1?.length) {
        handleButtonsChange([
          {
            url: template.buttonMobileUrl1,
            name: template.buttonName1,
            pcUrl: template.buttonPcUrl1,
            type: template.buttonType1,
          },
          {
            url: template.buttonMobileUrl2,
            name: template.buttonName2,
            pcUrl: template.buttonPcUrl2,
            type: template.buttonType2,
          },
          {
            url: template.buttonMobileUrl3,
            name: template.buttonName3,
            pcUrl: template.buttonPcUrl3,
            type: template.buttonType3,
          },
          {
            url: template.buttonMobileUrl4,
            name: template.buttonName4,
            pcUrl: template.buttonPcUrl4,
            type: template.buttonType4,
          },
          {
            url: template.buttonMobileUrl5,
            name: template.buttonName5,
            pcUrl: template.buttonPcUrl5,
            type: template.buttonType5,
          },
        ]);
      }
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
  const handleReservationTimeModalReset = () => {
    methods.resetField("title");
    methods.resetField("callingNumber");
    methods.resetField("messageContents");
    methods.resetField("images");
    resetFiles?.();
    setReset(true);
    onContextChange("");
  };
  const handleTemplateSave = methods.handleSubmit(() => {
    let changeFileOrder: string[] = [];
    let uniqueFileName: string[] = [];
    changeFile.forEach((file) => {
      changeFileOrder.push(file.fileOrder.toString());
      uniqueFileName.push(file.uniqueFileName);
    });
    setOpenConfirmModalData({
      templateId: templateId,
      templateChannel: channel,
      templateMsgContext: messageContents,
      templateMsgTitle: methods?.getValues("title"),
      wiredPhoneNumber: methods?.getValues("callingNumber"),
      changeFileOrder: changeFileOrder ?? [],
      templateCode: methods?.getValues("templateCode"),
      files:
        imageFiles.map((file, i) => {
          return {
            uniqueFileName: file.name,
            file: file,
          };
        }) ?? [],
    });
  });

  const handleTitleBlur = (e: string) => {
    if (titleByteCount > 30) {
      toast({
        render: () => (
          <ToastMessage title="문자 제목 길이 초과" type="ERROR">
            문자 제목은 30byte를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
      getByteFromText(e.substring(0, titleStringLimit), "title");
      return e.substring(0, titleStringLimit);
    } else {
      getByteFromText(e, "title");
      return e;
    }
  };
  const handleTitleChange = (e: string) => {
    getByteFromText(e, "title");
    if (titleByteCount <= 30) {
      onTitleChange?.(e);
    }
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
      onTitleChange?.(template?.templateMsgTitle);
      importTemplate(template);
    } else if (location.state && location.state.messageData) {
      const { messageData: importMessageData } = location.state;
      const filesArray = () => {
        let result = [];
        importMessageData?.filePath1 &&
          result.push({
            uniqueFileName: importMessageData?.filePath1,
            file: new File([], importMessageData?.filePath1),
          });
        importMessageData?.filePath2 &&
          result.push({
            uniqueFileName: importMessageData?.filePath2,
            file: new File([], importMessageData?.filePath2),
          });
        importMessageData?.filePath3 &&
          result.push({
            uniqueFileName: importMessageData?.filePath3,
            file: new File([], importMessageData?.filePath3),
          });
        return result;
      };
      const locationStateToTemplate: Template = {
        templateChannel: importMessageData?.channelType,
        templateId: importMessageData?.id,
        templateMsgTitle: importMessageData?.subject,
        templateMsgContext: importMessageData?.msg,
        yellowIdKey: importMessageData?.yellowIdKey,
        templateCode: importMessageData?.templateCode,
        wiredPhoneNumber: importMessageData?.callback,
        files: filesArray(),
      };
      importTemplate(locationStateToTemplate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, location.state]);

  return (
    <FormProvider {...methods}>
      <Flex flex={1} flexDirection="column" gap={3} width="100%">
        <CollapseSection flexDirection="column" gap={1} headerTitle="  입력">
          <InfoBox>
            <InfoElement label="발신번호" required>
              <Flex gap={2} justifyContent="space-between" width="100%">
                {!isAlarmTalk && (
                  <FormControl
                    isInvalid={!!methods?.formState.errors.callingNumber}
                  >
                    <CustomSelect
                      codes={wiredPhoneNumbers}
                      defaultValue={template?.wiredPhoneNumber}
                      isInvalid={!!methods?.formState.errors.callingNumber}
                      maxW={200}
                      placeholder="발신번호를 선택하세요."
                      size="sm"
                      {...methods?.register("callingNumber", {
                        required: {
                          value: true,
                          message: "발신번호를 선택하세요.",
                        },
                        onChange: (e) =>
                          handlePhoneNumberChange(e.target.value),
                      })}
                    />
                    {methods?.formState.errors.callingNumber && (
                      <FormErrorMessage>
                        {methods?.formState.errors.callingNumber.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
                {subjectPanel && (
                  <Button
                    isDisabled={!watchCallingNumber && !isAlarmTalk}
                    maxWidth="250px"
                    minWidth="150px"
                    size="sm"
                    variant="secondaryBlue"
                    onClick={handleImportTemplateButtonClick}
                  >
                    {isAlarmTalk ? "알림톡" : "문자"}
                    템플릿 불러오기
                  </Button>
                )}
              </Flex>
            </InfoElement>
            {isAlarmTalk && (
              <InfoElement label="판매방식" required>
                <Flex alignItems="center" gap={1} width="100%">
                  <Flex
                    alignItems="end"
                    justifyContent="space-between"
                    lineHeight={1}
                  >
                    <Flex />
                  </Flex>
                  <Input
                    defaultValue={template?.templateMsgTitle}
                    isDisabled
                    size="sm"
                    width="50%"
                    {...methods?.register("alarmTalkChannel")}
                  />
                  <Input
                    display="none"
                    {...methods?.register("templateCode")}
                  />
                  <TipText size="sm" text="ID를 선택하세요." />
                </Flex>
              </InfoElement>
            )}
            {!isAlarmTalk && (
              <InfoElement label=" 제목" width="100%">
                <Flex
                  alignItems="end"
                  flexDirection="column"
                  gap={1}
                  width="100%"
                >
                  <Flex
                    alignItems="end"
                    justifyContent="space-between"
                    lineHeight={1}
                  >
                    <Flex />
                    <Flex>
                      <Text
                        color={titleByteCount <= 30 ? "black" : "red"}
                        fontSize="xs"
                      >
                        {titleByteCount}
                      </Text>
                      <Text color="black" fontSize="xs">
                        /30 bytes
                      </Text>
                    </Flex>
                  </Flex>
                  <Input
                    defaultValue={template?.templateMsgTitle}
                    disabled={!watchCallingNumber && !isAlarmTalk}
                    placeholder=" 제목을 입력하세요."
                    size="sm"
                    width="100%"
                    {...methods?.register("title", {
                      onBlur: (e) =>
                        methods?.setValue(
                          "title",
                          (e.target.value = handleTitleBlur(e.target.value))
                        ),
                      onChange: (e) => handleTitleChange(e.target.value),
                    })}
                  />
                  <TipText
                    size="sm"
                    text="단문(SMS)은  제목이 전송되지 않으며,  관리용으로만
                    사용됩니다. 단문, 장문, 멀티 의 제목 입력 없이 된
                    경우  내용 앞 일부가 표시됩니다."
                  />
                </Flex>
              </InfoElement>
            )}
            <InfoElement label=" 내용" required>
              <Flex flexDirection="column" gap={2} width="100%">
                <MessageTextarea
                  channel={channel}
                  contentsByteCount={contentsByteCount}
                  defaultValue={template?.templateMsgContext}
                  isAlarmTalk={isAlarmTalk}
                  isDisabled={!watchCallingNumber && !isAlarmTalk}
                  onContentsBlur={handleContentsBlur}
                  onContentsChange={handleContentsChange}
                  onSelectionStartChange={setSelectionStart}
                  onSelectionEndChange={setSelectionEnd}
                />
                {!isAlarmTalk && (
                  <>
                    <Flex justifyContent="space-between">
                      <Box></Box>
                      <Flex alignItems="center" gap={2}>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              isDisabled={!watchCallingNumber && !isAlarmTalk}
                              size="sm"
                              variant="secondaryBlue"
                              width="150px"
                            >
                              특수문자
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            boxShadow="0px 4px 12px -3px"
                            width="402px"
                          >
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
                              isDisabled={!watchCallingNumber && !isAlarmTalk}
                              size="sm"
                              variant="secondaryBlue"
                              width="150px"
                            >
                              치환코드
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            boxShadow="0px 4px 12px -3px"
                            width="162px"
                          >
                            <PopoverArrow />
                            <PopoverHeader>치환코드 입력</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody p={0}>
                              <ReplacementCodeList
                                addSymbol={handleAddSymbol}
                              />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <QuestionMarkIcon
                          color="primary.700"
                          cursor="pointer"
                          onClick={handleReplacementInfoModalIconClick}
                        />
                      </Flex>
                    </Flex>
                    <TipText
                      size="sm"
                      text="내용이 90bytes가 넘으면 장문로 자동변경됩니다. (단문
                      90bytes, 장문 / 포토 2,000bytes) 문서 프로그램에서 작성한
                      특수문자 등을 복사/붙여넣기 할 경우 자폰에서 깨짐
                      현상이 발생 할 수 있습니다. 상단 [특수문자]버튼을 클릭하여
                      특수문자를 직접 입력해주세요."
                    />
                  </>
                )}
              </Flex>
            </InfoElement>
            {isAlarmTalk && (
              <InfoElement label="버튼">
                <Box width="100%">
                  {!!buttons?.[0]?.name?.length && (
                    <CustomTableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>버튼타입</Th>
                            <Th>버튼명</Th>
                            <Th>버튼링크</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {buttons
                            .filter((button) => !!button.name?.length)
                            .map((button, i) => (
                              <Tr key={button.url + "-" + i}>
                                <Td width="25%">
                                  <CustomSelect
                                    size="sm"
                                    codes={[
                                      {
                                        code: "WL",
                                        name: "웹링크",
                                      },
                                    ]}
                                  />
                                </Td>
                                <Td width="25%">
                                  <Input
                                    size="sm"
                                    defaultValue={button.name ?? ""}
                                  />
                                </Td>
                                <Td width="50%">
                                  <Flex flexDirection="column" gap={2}>
                                    <Flex alignItems="center">
                                      <Text flex={1}>Mobile</Text>
                                      <Input
                                        defaultValue={button.url ?? ""}
                                        flex={2}
                                        size="sm"
                                      />
                                    </Flex>
                                    <Flex alignItems="center">
                                      <Text flex={1}>PC(선택)</Text>
                                      <Input
                                        defaultValue={button.pcUrl ?? ""}
                                        flex={2}
                                        size="sm"
                                      />
                                    </Flex>
                                  </Flex>
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                    </CustomTableContainer>
                  )}
                  <TipText
                    size="sm"
                    text="버튼은 최대 5개까지 추가 가능합니다."
                  />
                </Box>
              </InfoElement>
            )}
            {!isAlarmTalk && (
              <InfoElement label="이미지 첨부">
                <ImageUploader
                  imageURLs={imageURLs}
                  isDisabled={!watchCallingNumber && !isAlarmTalk}
                  onChange={onImagesChange}
                  removeImageFile={removeImageFile}
                />
              </InfoElement>
            )}
            <Input
              display="none"
              isDisabled={!watchCallingNumber && isAlarmTalk && !templateId}
              id="template-save"
              type="submit"
              onClick={handleTemplateSave}
            />
            <Input
              display="none"
              isDisabled={!watchCallingNumber && isAlarmTalk && !templateId}
              id="immediate-send"
              type="submit"
              onClick={handleImmediateSend}
            />
            <Input
              display="none"
              isDisabled={!watchCallingNumber && isAlarmTalk && !templateId}
              id="reserved-send"
              type="submit"
              onClick={handleSendReservation}
            />
          </InfoBox>
        </CollapseSection>
        {subjectPanel && (
          <SubjectPanel
            isDisabled={!watchCallingNumber && isAlarmTalk && !templateId}
            isReset={reset}
            onChange={handleChangeSubjects}
          />
        )}
        {importTemplateModalOpen && (
          <ImportTemplateModal
            isAlarmTalk={isAlarmTalk}
            setOpen={setImportTemplateModalOpen}
            setTemplate={handleImportTemplate}
          />
        )}
        {replacementInfoModalOpen && (
          <ReplacementCodeInfoModal setOpen={setReplacementInfoModalOpen} />
        )}
        {reservationTimeModalData && (
          <ChangeReservationTimeModal
            changeTime={false}
            sendData={reservationTimeModalData}
            onClose={handleReservationTimeModalClose}
            onReset={handleReservationTimeModalReset}
          />
        )}
        {immediateSendModalData && (
          <ImmediateSendModal
            sendData={immediateSendModalData}
            onClose={handleImmediateSendModalClose}
            onReset={handleImmediateSendModalReset}
          />
        )}
      </Flex>
    </FormProvider>
  );
}
export default React.memo(InputPanel);
