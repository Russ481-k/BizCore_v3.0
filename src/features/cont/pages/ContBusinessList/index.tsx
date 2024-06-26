import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
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
import formatter from "libs/formatter";

function ContBusinessList() {
  const methods = useForm<{
    sendDate: [Date, Date] | null;
    sendChannel: string | null;
    searchType: string | null;
    sortType: string | null;
    receiveStatusType: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });

  const [, setCurrentPage] = useState<number>(1);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);

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
  const sortTypeOption = [
    {
      code: "minwon",
      name: "민원행정 ",
    },
    {
      code: "minhome",
      name: "전자민원",
    },
    {
      code: "wiseng",
      name: "환경위생",
    },
    {
      code: "InGam",
      name: "인감발급",
    },
    {
      code: "jumin",
      name: "주민등록증",
    },
    {
      code: "jeonip",
      name: "전입환영",
    },
    {
      code: "bokjy",
      name: "복지행정",
    },
  ];
  const searchTypeOption = [
    {
      code: "name",
      name: "이름(자)",
    },
    {
      code: "phone",
      name: "번호",
    },
  ];
  const receiveStatusTypeOption = [
    {
      code: "0",
      name: "성공",
    },
    {
      code: "1",
      name: "실패",
    },
  ];

  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setEnableQuery(true);
  };
  const handleFormSubmit = methods.handleSubmit(
    ({
      sendDate,
      sendChannel,
      searchType,
      sortType,
      receiveStatusType,
      keyword,
    }) => {
      setCurrentPage(1);
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
    <VStack align="stretch" spacing={2}>
      <CustomCard isHeader="업체정보 조회" />
      <Box>
        <CollapseSection headerTitle="상세 검색" borderBottomRadius={0}>
          <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement label="날짜">
                  {/* <RangeDatePicker
                    name="sendDate"
                    option={sendDateOption}
                    setOption={setSendDateOption}
                    setStartDate={setStartSendDate}
                    setEndDate={setEndSendDate}
                  /> */}
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label="구분">
                  <CustomSelect
                    codes={sortTypeOption}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sortType", {
                      // onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="상태">
                  <Flex gap={3} width="100%">
                    <CustomSelect
                      codes={receiveStatusTypeOption}
                      placeholder="전체"
                      size="sm"
                      {...methods.register("receiveStatusType", {
                        // onChange: (e) => handleSearchTypeChange(e),
                      })}
                    />
                  </Flex>
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label=" 판매방식">
                  <CustomSelect
                    codes={sendChannelOption}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="키워드">
                  <Flex gap={3} width="100%">
                    <CustomSelect
                      codes={searchTypeOption}
                      placeholder="전체"
                      maxW={150}
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
              </Flex>
            </InfoBox>
            <Flex justifyContent="flex-end">
              <Button
                isLoading={true}
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
                  검색결과 : {0} 건
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
                    판매방식
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    구분
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    이름
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    번호
                  </Text>
                  <Text flex={5} px={4} py={2} textAlign="center">
                    내용
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    상태
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    일
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {true &&
                    Array.from({ length: pageSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={[]?.[i] + "-" + i + "-messages-skeleton"}
                      >
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={2}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={5}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                      </Flex>
                    ))}
                  {false ? (
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
                    []?.map((message: any, i: number) => (
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
                          {message.etc1}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.etc3}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {formatter.contactFormatter(message.callback)}
                        </Text>
                        <Text
                          flex={5}
                          overflow="hidden"
                          px={4}
                          py={2}
                          textAlign="left"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {message.msg}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.rslt === "0" && "성공"}
                          {message.rslt === "1" && "실패"}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {format(new Date(message.sentDate), "yyyy-MM-dd")}
                        </Text>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Box>
            </Flex>
            <PaginationButtons
              batchSize={pageSize}
              data={[]}
              pagination={{
                currentPage: 1,
                pageSize: 10,
                sort: {
                  empty: false,
                  sorted: true,
                  unsorted: false,
                },
                totalPage: 10,
              }}
              totalPage={10}
              onPageChange={handlePageChange}
              onBatchSizeChange={handleBatchSizeChange}
            />
          </Flex>
        </Section>
      </Box>
    </VStack>
  );
}

export default ContBusinessList;
