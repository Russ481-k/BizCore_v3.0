import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

import {
  ChannelTag,
  CollapseSection,
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  PaginationButtons,
} from "components";
import {
  useGetAlarmTalkTemplate,
  useGetAlarmTalkTemplateGroups,
  useGetTemplate,
  useGetTemplateGroups,
  useGetTemplatesBySearch,
  useGetAlarmTalkTemplatesBySearch,
} from "features/template";
import Template from "type/Template";
import Buttons from "type/Buttons";

interface ImportTemplateModalProps {
  isAlarmTalk?: boolean;
  setOpen: (isOpen: boolean) => void;
  setTemplate: (template: Template) => void;
}

function ImportTemplateModal({
  isAlarmTalk,
  setOpen,
  setTemplate,
}: ImportTemplateModalProps) {
  const { onClose } = useDisclosure();

  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [importTemplateId, setImportTemplateId] = useState<number | null>(null);
  const [selectedTemplateGroupId, setSelectedTemplateGroupId] = useState<
    number | null
  >(null);
  const [templateChannel, setTemplateChannel] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [pageSize] = useState<number>(10);

  const { data: templateGroups, totalTemplateCount: totalTemplateGroup } =
    useGetTemplateGroups({
      enabled: !isAlarmTalk,
    });
  const { data: selectedTemplate } = useGetTemplate(
    {
      templateId: importTemplateId,
    },
    { enabled: !isAlarmTalk && !!importTemplateId }
  );
  const {
    contents: templates,
    paging: pagination,
    pageLength,
    totalCount,
    isLoading,
  } = useGetTemplatesBySearch(
    {
      startDate: null,
      endDate: null,
      groupTemplateId: selectedTemplateGroupId,
      templateChannel,
      templateName,
      currentPage,
      pageSize,
      // sort,
    },
    { enabled: !isAlarmTalk }
  );
  const {
    data: alarmTalkTemplateGroups,
    totalTemplateCount: totalAlarmTalkTemplateCount,
  } = useGetAlarmTalkTemplateGroups({
    enabled: isAlarmTalk,
  });
  const { data: selectedAlarmTalkTemplate } = useGetAlarmTalkTemplate(
    {
      templateId: importTemplateId,
    },
    { enabled: isAlarmTalk }
  );
  const {
    contents: alarmTalkTemplates,
    paging: alarmTalkPagination,
    pageLength: alarmTalkPageLength,
    totalCount: alarmTalkTotalCount,
    isLoading: isAlarmTalkLoading,
  } = useGetAlarmTalkTemplatesBySearch(
    {
      startDate: null,
      endDate: null,
      groupTemplateId: selectedTemplateGroupId,
      templateName,
      currentPage,
      pageSize,
      // sort,
    },
    { enabled: isAlarmTalk }
  );

  const templateChannelOption = [
    {
      code: "SMS",
      name: "단문 (SMS)",
    },
    {
      code: "LMS",
      name: "장문 (LMS)",
    },
    {
      code: "MMS",
      name: "멀티 (MMS)",
    },
  ];

  const handleModalClose = () => {
    setOpen(false);
    onClose();
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleReset = () => {
    setCurrentPage(1);
    setImportTemplateId(null);
  };
  const handleTemplateGroupClick = (id: number | null) => {
    handleReset();
    setSelectedTemplateGroupId(id);
  };
  const handleImportTemplate = () => {
    if (!!selectedTemplate) {
      setTemplate(selectedTemplate);
    }
    handleModalClose();
  };
  const handleChangeImportTemplateModalData = (templateId: number) => {
    setImportTemplateId(templateId);
  };
  const handleSearchChange = (e: string | null) => {
    setTemplateName(e);
    handleReset();
  };
  const handleTemplateChannelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTemplateChannel(String(e.target.value));
    handleReset();
  };

  useEffect(() => {
    if (!!selectedAlarmTalkTemplate) {
      setButtons([
        {
          url: selectedAlarmTalkTemplate.buttonMobileUrl1,
          name: selectedAlarmTalkTemplate.buttonName1,
          pcUrl: selectedAlarmTalkTemplate.buttonPcUrl1,
          type: selectedAlarmTalkTemplate.buttonType1,
        },
        {
          url: selectedAlarmTalkTemplate.buttonMobileUrl2,
          name: selectedAlarmTalkTemplate.buttonName2,
          pcUrl: selectedAlarmTalkTemplate.buttonPcUrl2,
          type: selectedAlarmTalkTemplate.buttonType2,
        },
        {
          url: selectedAlarmTalkTemplate.buttonMobileUrl3,
          name: selectedAlarmTalkTemplate.buttonName3,
          pcUrl: selectedAlarmTalkTemplate.buttonPcUrl3,
          type: selectedAlarmTalkTemplate.buttonType3,
        },
        {
          url: selectedAlarmTalkTemplate.buttonMobileUrl4,
          name: selectedAlarmTalkTemplate.buttonName4,
          pcUrl: selectedAlarmTalkTemplate.buttonPcUrl4,
          type: selectedAlarmTalkTemplate.buttonType4,
        },
        {
          url: selectedAlarmTalkTemplate.buttonMobileUrl5,
          name: selectedAlarmTalkTemplate.buttonName5,
          pcUrl: selectedAlarmTalkTemplate.buttonPcUrl5,
          type: selectedAlarmTalkTemplate.buttonType5,
        },
      ]);
    }
  }, [selectedAlarmTalkTemplate]);

  return (
    <CustomModal isOpen onClose={handleModalClose}>
      <ModalContent minW="1200px">
        <ModalHeader>
          {isAlarmTalk ? "알림톡" : "문자"} 템플릿 불러오기
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={5}>
          <Flex gap={3} height="590px">
            <CollapseSection
              flex={2.2}
              flexDirection="column"
              headerTitle={
                isAlarmTalk ? "알림톡 템플릿 그룹" : "문자 템플릿 그룹"
              }
            >
              <Flex
                flexDirection="column"
                height="580px"
                overflowY="scroll"
                sx={{
                  "::-webkit-scrollbar-track": { background: "white" },
                  "::-webkit-scrollbar-thumb": {
                    borderColor: "white",
                  },
                }}
              >
                <Button
                  alignItems="left"
                  bgColor={selectedTemplateGroupId !== null ? "white" : ""}
                  borderRadius={0}
                  flexDirection="column"
                  pl={3}
                  onClick={() => handleTemplateGroupClick(null)}
                >{`전체 (${
                  isAlarmTalk
                    ? totalAlarmTalkTemplateCount ?? 0
                    : totalTemplateGroup ?? 0
                })`}</Button>
                {isAlarmTalk
                  ? alarmTalkTemplateGroups?.map((templateGroup, i) => (
                      <Flex
                        key={templateGroup.groupTemplateId + "-" + i}
                        ml={5}
                      >
                        <Text py={1}>ㄴ</Text>
                        <Button
                          alignItems="center"
                          bgColor={
                            selectedTemplateGroupId !==
                            templateGroup.groupTemplateId
                              ? "white"
                              : ""
                          }
                          borderRadius={0}
                          flex={1}
                          key={templateGroup.groupTemplateId}
                          pl={2}
                          onClick={() =>
                            handleTemplateGroupClick(
                              templateGroup.groupTemplateId
                            )
                          }
                        >
                          <Text
                            overflow="hidden"
                            textAlign="left"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            width="80px"
                          >
                            {templateGroup.groupTemplateName}
                          </Text>
                          <Text>{` (${
                            templateGroup.templateCount ?? 0
                          })`}</Text>
                        </Button>
                      </Flex>
                    ))
                  : templateGroups?.map((templateGroup, i) => (
                      <Flex
                        key={templateGroup.groupTemplateId + "-" + i}
                        ml={5}
                      >
                        <Text py={1}>ㄴ</Text>
                        <Button
                          alignItems="center"
                          bgColor={
                            selectedTemplateGroupId !==
                            templateGroup.groupTemplateId
                              ? "white"
                              : ""
                          }
                          borderRadius={0}
                          flex={1}
                          pl={2}
                          onClick={() =>
                            handleTemplateGroupClick(
                              templateGroup.groupTemplateId
                            )
                          }
                        >
                          <Text
                            overflow="hidden"
                            textAlign="left"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            width="80px"
                          >
                            {templateGroup.groupTemplateName}
                          </Text>
                          <Text>{` (${
                            templateGroup.templateCount ?? 0
                          })`}</Text>
                        </Button>
                      </Flex>
                    ))}
              </Flex>
            </CollapseSection>
            <CollapseSection
              flex={6}
              flexDirection="column"
              headerTitle={
                isAlarmTalk ? "알림톡 템플릿 목록" : "문자 템플릿 목록"
              }
            >
              <Flex flexDirection="column" gap={3}>
                <InfoBox>
                  {!isAlarmTalk && (
                    <InfoElement label="발송채널" labelWidth="130px">
                      <CustomSelect
                        codes={templateChannelOption}
                        placeholder="전체"
                        maxW={120}
                        size="sm"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          handleTemplateChannelChange(e);
                        }}
                      />
                    </InfoElement>
                  )}
                  <InfoElement label="키워드" labelWidth="130px">
                    <Input
                      flex={1}
                      minWidth="120px"
                      size="sm"
                      width="100%"
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </InfoElement>
                </InfoBox>
                <Box
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderBottomWidth={1}
                  flex={1}
                  fontSize="sm"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Flex
                    alignItems="center"
                    borderBottomWidth={1}
                    flex={1}
                    fontSize="sm"
                    justifyContent="space-between"
                    px={4}
                  >
                    {!isAlarmTalk && (
                      <Text flex={1} px={4} py={2} textAlign="center">
                        발송채널
                      </Text>
                    )}
                    <Text
                      flex={isAlarmTalk ? 1 : 4}
                      pr={4}
                      py={2}
                      textAlign="center"
                    >
                      {isAlarmTalk ? "알림톡" : "문자"} 템플릿명
                    </Text>
                  </Flex>
                  <Box>
                    <Box>
                      {isAlarmTalk &&
                        (isAlarmTalkLoading ? (
                          <Flex flexDirection="column" fontSize="sm">
                            {isAlarmTalkLoading &&
                              Array.from({ length: pageSize }).map((_, i) => (
                                <Flex
                                  p={0}
                                  alignItems="center"
                                  borderBottomWidth={
                                    alarmTalkTemplates?.length ?? 0 - 1 === i
                                      ? 0
                                      : 1
                                  }
                                  height="32px"
                                  justifyContent="space-between"
                                  key={
                                    alarmTalkTemplates?.[i].templateId +
                                    "-" +
                                    i +
                                    "-alarm-talk-templates-skeleton"
                                  }
                                >
                                  <Skeleton
                                    flex={1}
                                    height="20px"
                                    mx={4}
                                    my={2}
                                  />
                                </Flex>
                              ))}
                          </Flex>
                        ) : !!alarmTalkTotalCount ? (
                          alarmTalkTemplates?.map((template, i) => (
                            <Button
                              alignItems="center"
                              bgColor={
                                selectedTemplate?.templateId !==
                                template.templateId
                                  ? "white"
                                  : "gray.200"
                              }
                              borderBottomWidth={
                                alarmTalkTemplates?.length - 1 === i ? 0 : 1
                              }
                              borderRadius={0}
                              flex={1}
                              fontSize="sm"
                              justifyContent="space-between"
                              key={alarmTalkTemplates?.[i].templateId + "-" + i}
                              height="32px"
                              width="100%"
                              _hover={{
                                bgColor: "gray.100",
                              }}
                              onClick={() =>
                                handleChangeImportTemplateModalData(
                                  template.templateId
                                )
                              }
                            >
                              <Text flex={4} px={4} py={2} textAlign="left">
                                {template.templateName}
                              </Text>
                            </Button>
                          ))
                        ) : (
                          <Flex
                            alignItems="center"
                            flex={1}
                            fontSize="sm"
                            justifyContent="center"
                            p={4}
                          >
                            <Text>조회된 템플릿이 없습니다.</Text>
                          </Flex>
                        ))}
                      {!isAlarmTalk &&
                        (isLoading ? (
                          <Flex flexDirection="column" fontSize="sm">
                            {Array.from({ length: pageSize }).map((_, i) => (
                              <Flex
                                alignItems="center"
                                borderBottomWidth={
                                  templates?.length ?? 0 - 1 === i ? 0 : 1
                                }
                                height="30px"
                                justifyContent="space-between"
                                key={
                                  templates?.[i].templateId +
                                  "-" +
                                  i +
                                  "-templates-skeleton"
                                }
                              >
                                <Skeleton
                                  flex={1}
                                  height="20px"
                                  mx={4}
                                  my={2}
                                  textAlign="center"
                                />
                                <Skeleton
                                  flex={4}
                                  height="20px"
                                  mx={4}
                                  my={2}
                                  textAlign="center"
                                />
                              </Flex>
                            ))}
                          </Flex>
                        ) : !!totalCount ? (
                          templates?.map((template, i) => (
                            <Button
                              alignItems="center"
                              bgColor={
                                selectedTemplate?.templateId !==
                                template.templateId
                                  ? "white"
                                  : "gray.200"
                              }
                              borderBottomWidth={
                                templates?.length - 1 === i ? 0 : 1
                              }
                              borderRadius={0}
                              flex={1}
                              fontSize="sm"
                              height="32px"
                              py={0}
                              justifyContent="space-between"
                              key={templates?.[i].templateId}
                              width="100%"
                              _hover={{
                                bgColor: "gray.100",
                              }}
                              onClick={() =>
                                handleChangeImportTemplateModalData(
                                  template.templateId
                                )
                              }
                            >
                              <Text flex={1} textAlign="center" px={4} py={1}>
                                <ChannelTag
                                  channelType={template.templateChannel}
                                />
                              </Text>
                              <Text flex={4} px={4} py={1} textAlign="left">
                                {template.templateName}
                              </Text>
                            </Button>
                          ))
                        ) : (
                          <Flex
                            alignItems="center"
                            borderBottomWidth={1}
                            flex={1}
                            fontSize="sm"
                            height="380px"
                            justifyContent="center"
                            p={4}
                          >
                            <Text>조회된 템플릿이 없습니다.</Text>
                          </Flex>
                        ))}
                    </Box>
                  </Box>
                </Box>
                <PaginationButtons
                  data={
                    isAlarmTalk ? alarmTalkTemplates ?? [] : templates ?? []
                  }
                  pagination={isAlarmTalk ? alarmTalkPagination : pagination}
                  pageLength={isAlarmTalk ? alarmTalkPageLength : pageLength}
                  onPageChange={handlePageChange}
                />
              </Flex>
            </CollapseSection>
            <CollapseSection
              flex={4.2}
              flexDirection="column"
              headerTitle={
                isAlarmTalk ? "알림톡 템플릿 미리보기" : "문자 템플릿 미리보기"
              }
            >
              <Flex alignItems="center" flexDirection="column" gap={3}>
                <InfoBox>
                  {!isAlarmTalk && (
                    <InfoElement label="발송채널" labelWidth="130px">
                      <ChannelTag
                        channelType={selectedTemplate?.templateChannel ?? ""}
                      />
                    </InfoElement>
                  )}
                  <InfoElement
                    label={isAlarmTalk ? "알림톡 템플릿명" : "문자 템플릿명"}
                    labelWidth="130px"
                  >
                    <Text fontSize="14px">
                      {isAlarmTalk
                        ? selectedAlarmTalkTemplate?.templateName
                        : selectedTemplate?.templateName}
                    </Text>
                  </InfoElement>
                </InfoBox>
                <Box
                  backgroundImage={""}
                  backgroundRepeat="no-repeat"
                  backgroundSize="328px"
                  height={isAlarmTalk ? "500px" : "410px"}
                  overflowY="hidden"
                >
                  <Box
                    height={isAlarmTalk ? "500px" : "360px"}
                    mx={6}
                    my={12}
                    overflowX="hidden"
                    overflowY="auto"
                    width="280px"
                    sx={{
                      "::-webkit-scrollbar-track": { background: "white" },
                      "::-webkit-scrollbar-thumb": {
                        borderColor: "white",
                      },
                    }}
                  >
                    {!isAlarmTalk &&
                      selectedTemplate?.files?.map((file, i) => (
                        <Box
                          key={
                            "selectedTemplateId-" +
                            selectedTemplate.groupTemplateId
                          }
                          mx={8}
                          overflow="hidden"
                          p={3}
                          width="230px"
                        >
                          <Image
                            alt="preview"
                            height="auto"
                            src={
                              process.env.REACT_APP_API_URL +
                              "/resources/" +
                              file.uniqueFileName
                            }
                          />
                        </Box>
                      ))}
                    {isAlarmTalk ? (
                      selectedAlarmTalkTemplate?.templateMsgContext ? (
                        <>
                          <Flex alignItems="center" gap={2}>
                            <Image
                              alt="mobytalk-profile"
                              borderColor="gray.500"
                              borderRadius="12px"
                              borderWidth={1}
                              height="50px"
                              src={""}
                              width="50px"
                            />
                            <Text fontWeight={700}>모비톡</Text>
                          </Flex>
                          <Box
                            backgroundColor="channel.kkt.bg"
                            borderRadius="12px"
                            color="channel.kkt.text"
                            mx={10}
                            p={3}
                            width="220px"
                          >
                            {selectedAlarmTalkTemplate?.templateMsgContext
                              .split("\n")
                              .map((line, i) => (
                                <Text
                                  display="block"
                                  fontSize="14px"
                                  key={
                                    "selectedAlarmTalkTemplate" +
                                    selectedAlarmTalkTemplate.templateId +
                                    i
                                  }
                                >
                                  {line}
                                </Text>
                              ))}
                            {!!buttons?.[0]?.name?.length && (
                              <>
                                <Divider
                                  my={5}
                                  borderColor="channel.kkt.text"
                                />
                                {buttons
                                  ?.filter((button) => !!button.name?.length)
                                  .map((button, i) => (
                                    <Box
                                      key={button.name + "-" + i}
                                      mb={2}
                                      overflow="hidden"
                                      px={3}
                                      width="100%"
                                    >
                                      <Button
                                        bgColor="white"
                                        color="black"
                                        width="100%"
                                      >
                                        {button.name}
                                      </Button>
                                    </Box>
                                  ))}
                              </>
                            )}
                          </Box>
                        </>
                      ) : (
                        <></>
                      )
                    ) : selectedTemplate?.templateMsgContext ? (
                      <Box
                        backgroundColor={
                          (selectedTemplate?.templateChannel === "SMS" &&
                            "channel.sms.bg") ||
                          (selectedTemplate?.templateChannel === "LMS" &&
                            "channel.lms.bg") ||
                          (selectedTemplate?.templateChannel === "MMS" &&
                            "channel.mms.bg") ||
                          ""
                        }
                        borderRadius="12px"
                        color={
                          (selectedTemplate?.templateChannel === "SMS" &&
                            "channel.sms.text") ||
                          (selectedTemplate?.templateChannel === "LMS" &&
                            "channel.lms.text") ||
                          (selectedTemplate?.templateChannel === "MMS" &&
                            "channel.mms.text") ||
                          ""
                        }
                        mx={10}
                        overflow="hidden"
                        p={3}
                        width="220px"
                      >
                        {selectedTemplate?.templateMsgContext
                          .split("\n")
                          .map((line, i) => (
                            <Text
                              key={
                                "selectedTemplate" +
                                selectedTemplate.templateId +
                                i
                              }
                            >
                              {line}
                              <br />
                            </Text>
                          ))}
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Flex>
            </CollapseSection>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleImportTemplate}>
            {isAlarmTalk ? "알림톡" : "문자"} 템플릿 불러오기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}
export default ImportTemplateModal;
