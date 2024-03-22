import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomCard,
  CustomSelect,
  InfoBox,
  InfoElement,
  PaginationButtons,
  RangeDatePicker,
  Section,
} from "components";
import { format } from "date-fns";
import useGetTwoWayMessagesBySearch from "features/send/hooks/useGetTwoWayMessagesBySearch";
import Subject from "type/Subject";
import SendReservationDetailModal from "./SendReservationDetailModal";

function TwoWayReservation() {
  const methods = useForm<{
    createDate: [Date, Date] | null;
    reqDate: [Date, Date] | null;
    sendChannel: string | null;
    sendType: string | null;
    searchType: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });
  const [all, setAll] = useState<string | null>(null);
  const [changeMessageModalData, setChangeMessageModalData] = useState<
    number | null
  >(null);
  const [channelType, setChannelType] = useState<string | null>(null);
  const [createDateOption, setCreateDateOption] = useState<"all" | "select">(
    "all"
  );
  const [createId, setCreateId] = useState<string | null>(null);
  const [createUser, setCreateUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [endCreateDate, setEndCreateDate] = useState<string | null>(null);
  const [endReqDate, setEndReqDate] = useState<string | null>(null);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [reqDateOption, setReqDateOption] = useState<"all" | "select">("all");
  const [sendType, setSendType] = useState<string | null>(null);
  const [startCreateDate, setStartCreateDate] = useState<string | null>(null);
  const [startReqDate, setStartReqDate] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [, setSubjects] = useState<Subject[]>();

  const {
    data: messages,
    totalCount,
    pageLength,
    paging: pagination,
    refetch,
    isLoading,
  } = useGetTwoWayMessagesBySearch(
    {
      changeTime: false,
      subject,
      createUser,
      createId,
      all,
      startCreateDate,
      endCreateDate,
      startReqDate,
      endReqDate,
      sendType,
      channelType,
      dispatchType: "R",
      currentPage,
      pageSize,
    },
    { enabled: isEnableQuery }
  );

  const sendChannelOption = [
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
    {
      code: "KKT",
      name: "알림톡",
    },
  ];
  const searchTypeOption = [
    {
      code: "all",
      name: "전체",
    },
    {
      code: "subject",
      name: "메시지 제목",
    },
    {
      code: "createUser",
      name: "담당자 이름",
    },
    {
      code: "createId",
      name: "담당자 ID",
    },
  ];

  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const handleChangeTemplateModalClose = () => {
    setChangeMessageModalData(null);
    refetch();
  };
  const handleChangeMessageModalData = (messageId: number) => {
    setChangeMessageModalData(messageId);
  };
  const handleFormSubmit = methods.handleSubmit(
    ({ createDate, reqDate, sendChannel, sendType, searchType, keyword }) => {
      if (reqDateOption === "select") {
        setStartReqDate(
          reqDate?.[0]
            ? `${format(reqDate[0], "yyyy-MM-dd")} 00:00:00.000`
            : null
        );
        setEndReqDate(
          reqDate?.[1]
            ? `${format(reqDate[1], "yyyy-MM-dd")} 23:59:59.999`
            : null
        );
      } else {
        setStartReqDate(null);
        setEndReqDate(null);
      }
      if (createDateOption === "select") {
        setStartCreateDate(
          createDate?.[0] ? format(new Date(createDate[0]), "yyyy-MM-dd") : null
        );
        setEndCreateDate(
          createDate?.[1] ? format(new Date(createDate[1]), "yyyy-MM-dd") : null
        );
      } else {
        setStartCreateDate(null);
        setEndCreateDate(null);
      }
      setSendType(sendType);
      setChannelType(sendChannel);
      setSubject(null);
      setCreateUser(null);
      setCreateId(null);
      setAll(null);
      if (searchType === "subject") {
        setSubject(keyword);
      } else if (searchType === "createUser") {
        setCreateUser(keyword);
      } else if (searchType === "createId") {
        setCreateId(keyword);
      } else if (searchType === "all") {
        setAll(keyword);
      }
      setEnableQuery(true);
    }
  );
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("keyword", e.target.value);
  };
  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("searchType", e.target.value);
  };

  const handleSendChannelChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("sendChannel", e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
  };

  useEffect(() => {
    if (isEnableQuery) {
      setEnableQuery(false);
    }
  }, [isEnableQuery]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="양방향 예약 발송 관리" />
      <Box>
        <CollapseSection
          headerTitle="양방향 예약 발송 목록"
          borderBottomRadius={0}
        >
          <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement flex={1} label="예약 발송일">
                  <RangeDatePicker
                    name="reqDate"
                    option={reqDateOption}
                    setOption={setReqDateOption}
                    setStartDate={setStartReqDate}
                    setEndDate={setEndReqDate}
                  />
                </InfoElement>
                <InfoElement flex={1} label="등록일">
                  <RangeDatePicker
                    name="createDate"
                    option={createDateOption}
                    setOption={setCreateDateOption}
                    setStartDate={setStartCreateDate}
                    setEndDate={setEndCreateDate}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label="발송 채널">
                  <CustomSelect
                    codes={sendChannelOption}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="발송 구분">
                  <CustomSelect
                    codes={[
                      {
                        code: "A",
                        name: "자동안내",
                      },
                      {
                        code: "C",
                        name: "문자상담",
                      },
                    ]}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
              </Flex>
              <InfoElement flex={1} label="키워드">
                <Flex gap={3} width="100%">
                  <CustomSelect
                    codes={searchTypeOption}
                    maxW={120}
                    size="sm"
                    {...methods.register("searchType", {
                      onChange: (e) => handleSearchTypeChange(e),
                    })}
                  />
                  <Input
                    size="sm"
                    {...(methods.register("keyword"),
                    {
                      onChange: (e) => handleSearchChange(e),
                      onKeyPress: (e) => handleOnKeyPress(e),
                    })}
                  />
                </Flex>
              </InfoElement>
            </InfoBox>
            <Flex justifyContent="flex-end">
              <Button
                isLoading={isLoading}
                variant="primaryBlue"
                onClick={handleFormSubmit}
              >
                조회
              </Button>
            </Flex>
          </FormProvider>
        </CollapseSection>
        <Section borderTopRadius={0} borderTopWidth={0}>
          <Flex flexDirection="column" gap={2} width="100%">
            <Flex flexDirection="column" gap={2} width="100%">
              <HStack>
                <Text fontSize="xs" fontWeight="bold">
                  검색결과 : {totalCount} 건
                </Text>
                <Flex flex={1} gap={2} justifyContent="flex-end">
                  <Button size="sm" type="button" variant="secondaryBlue">
                    엑셀 다운로드
                  </Button>
                </Flex>
              </HStack>
              <Box
                borderLeftWidth={1}
                borderRadius="12px"
                borderRightWidth={1}
                borderTopWidth={1}
                overflow="hidden"
              >
                <Flex
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderBottomWidth={1}
                  flex={1}
                  fontSize="sm"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Text flex={1} px={4} py={2} textAlign="center">
                    발송채널
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    발송구분
                  </Text>
                  <Text flex={4} px={4} py={2} textAlign="center">
                    메시지 제목 (내용)
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    예약 발송 일시
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    예약 발송수
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    담당자
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    등록일
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {isLoading &&
                    Array.from({ length: pageSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={messages?.[i].id + "-" + i + "-messages-skeleton"}
                      >
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={4} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                      </Flex>
                    ))}
                  {totalCount === 0 ? (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      flex={1}
                      fontSize="sm"
                      justifyContent="center"
                      p={3}
                      width="100%"
                    >
                      <Text>조회된 결과가 없습니다.</Text>
                    </Flex>
                  ) : (
                    messages?.map((message, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={message.id + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message?.channel === "SHORT" && (
                            <Tag
                              backgroundColor="channel.sms.bg"
                              color="channel.sms.text"
                              size="sm"
                            >
                              단문 (SMS)
                            </Tag>
                          )}
                          {message?.channel === "LONG" && (
                            <Tag
                              backgroundColor="channel.lms.bg"
                              color="channel.lms.text"
                              size="sm"
                            >
                              장문 (LMS)
                            </Tag>
                          )}
                          {message?.channel === "MULTI" && (
                            <Tag
                              backgroundColor="channel.mms.bg"
                              color="channel.mms.text"
                              size="sm"
                            >
                              멀티 (MMS)
                            </Tag>
                          )}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.sendType === "CHATTING" && "자동안내"}
                          {message.sendType === "AUTO" && "문자상담"}
                        </Text>
                        <Text
                          color="primary.500"
                          cursor="pointer"
                          flex={4}
                          px={4}
                          py={2}
                          textAlign="left"
                          _hover={{
                            textDecoration: "underline",
                          }}
                          onClick={() =>
                            handleChangeMessageModalData(message.id)
                          }
                        >
                          {message.subject}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {format(new Date(message.reqDate), "yyyy-MM-dd")}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.totalSendCount ?? 0} 건
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.createUser}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.createDate
                            ? format(new Date(message.createDate), "yyyy-MM-dd")
                            : "-"}
                        </Text>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Box>
            </Flex>
            <PaginationButtons
              batchSize={pageSize}
              data={messages ?? []}
              pagination={pagination}
              pageLength={pageLength}
              onPageChange={handlePageChange}
              onBatchSizeChange={handleBatchSizeChange}
            />
          </Flex>
          {changeMessageModalData && (
            <SendReservationDetailModal
              changeMessage={true}
              messageId={changeMessageModalData}
              onChange={setSubjects}
              onClose={handleChangeTemplateModalClose}
            />
          )}
        </Section>
      </Box>
    </VStack>
  );
}

export default TwoWayReservation;
