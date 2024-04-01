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
import { useGetTechdList } from "features/techd";
import Techd from "type/Techd";

function TechdList() {
  const methods = useForm<{
    sendDate: [Date, Date] | null;
    sendChannel: string | null;
    searchType: string | null;
    sortType: string | null;
    receiveStatusType: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });

  const { data: techdList, isLoading } = useGetTechdList();
  console.log(!!techdList ? JSON.parse(techdList) : []);
  const parsedTechdList: Techd[] = [];
  // const parsedTechdList: Techd[] = !!techdList ? JSON.parse(techdList) : [];

  const [, setCurrentPage] = useState<number>(1);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);

  const techdMethod = [
    {
      code: "DIRECT",
      name: "직접판매",
    },
    {
      code: "INDIRECT",
      name: "간접판매",
    },
    {
      code: "PROCUREMENT",
      name: "조달간판",
    },
  ];

  const contractTypes = [
    {
      code: "MAINTENANCE",
      name: "유지보수",
    },
    {
      code: "SALES",
      name: "판매계약",
    },
  ];

  const stages = [
    {
      code: "INFO_ACQUISITION",
      name: "영업정보 파악",
    },
    {
      code: "INITIAL_CONTACT",
      name: "초기접촉",
    },
    {
      code: "PROPOSAL_SUBMISSION_AND_PT",
      name: "제안서 제출 및 PT",
    },
    {
      code: "QUOTE_SUBMISSION",
      name: "견적서 제출",
    },
    {
      code: "CONTRACT_REQUEST",
      name: "계약요청",
    },
    {
      code: "ORDER",
      name: "수주",
    },
    {
      code: "SALES",
      name: "매출",
    },
    {
      code: "CONTRACT_FAILURE",
      name: "계약실패",
    },
    {
      code: "CONTRACT_SUSPENSION",
      name: "계약진행보류",
    },
    {
      code: "CONTRACT_IN_PROGRESS",
      name: "계약중",
    },
  ];
  const endUsers = [
    {
      code: "cust1",
      name: "고객1",
    },
    {
      code: "cust2",
      name: "고객2",
    },
    {
      code: "cust3",
      name: "고객3",
    },
    {
      code: "cust4",
      name: "고객4",
    },
  ];

  const responsiblePersons = [
    {
      code: "respo1",
      name: "담당자1",
    },
    {
      code: "respo2",
      name: "담당자2",
    },
    {
      code: "respo3",
      name: "담당자3",
    },
    {
      code: "respo4",
      name: "담당자4",
    },
  ];

  const vendors = [
    {
      code: "vendor1",
      name: "거래처1",
    },
    {
      code: "vendor2",
      name: "거래처2",
    },
    {
      code: "vendor3",
      name: "거래처3",
    },
    {
      code: "vendor4",
      name: "거래처4",
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
      <CustomCard isHeader="기술지원 조회" />
      <Box>
        <CollapseSection headerTitle="상세 검색" borderBottomRadius={0}>
          <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement flex={1} label="등록/수정일">
                  {/* <RangeDatePicker
                    name="sendDate"
                    option={sendDateOption}
                    setOption={setSendDateOption}
                    setStartDate={setStartSendDate}
                    setEndDate={setEndSendDate}
                  /> */}
                </InfoElement>
                <InfoElement flex={1} label="매출예정일">
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
                <InfoElement flex={1} label="판매방식">
                  <CustomSelect
                    codes={techdMethod}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="계약구분">
                  <CustomSelect
                    codes={contractTypes}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="진행단계">
                  <CustomSelect
                    codes={stages}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="엔드유저">
                  <CustomSelect
                    codes={endUsers}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label="영업기회명">
                  <Input
                    size="sm"
                    {...(methods.register("keyword"),
                    {
                      onChange: (e) => handleSearchChange(e),
                      onKeyPress: (e) => handleOnKeyPress(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="카테고리(제품회사명)">
                  <Input
                    size="sm"
                    {...(methods.register("keyword"),
                    {
                      onChange: (e) => handleSearchChange(e),
                      onKeyPress: (e) => handleOnKeyPress(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="담당자">
                  <CustomSelect
                    codes={responsiblePersons}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sortType", {
                      // onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="거래처">
                  <CustomSelect
                    codes={vendors}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("receiveStatusType", {
                      // onChange: (e) => handleSearchTypeChange(e),
                    })}
                  />
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
                  검색결과 : {parsedTechdList.length} 건
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
                  <Text flex={2} px={4} py={2} textAlign="center">
                    등록일
                  </Text>
                  <Text flex={5} px={4} py={2} textAlign="center">
                    영업활동명
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    영업시작일
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    영업종료일
                  </Text>
                  <Text flex={5} px={4} py={2} textAlign="center">
                    영업기회명
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    담당자
                  </Text>
                  <Text flex={3} px={4} py={2} textAlign="center">
                    매출처
                  </Text>
                  <Text flex={3} px={4} py={2} textAlign="center">
                    엔드유저
                  </Text>
                  <Text flex={3} px={4} py={2} textAlign="center">
                    일정 설명
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
                        key={
                          parsedTechdList?.[i] + "-" + i + "-messages-skeleton"
                        }
                      >
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
                          flex={2}
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
                          flex={3}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={3}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={3}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                      </Flex>
                    ))}
                  {!parsedTechdList.length ? (
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
                    parsedTechdList?.map((techd: any, i: number) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={techd.techdNo + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {format(new Date(techd.regDatetime), "yyyy-MM-dd")}
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
                          {techd.techdTitle}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="left">
                          {format(
                            new Date(techd.techdFrdatetime),
                            "yyyy-MM-dd"
                          )}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="left">
                          {format(
                            new Date(techd.techdTodatetime),
                            "yyyy-MM-dd"
                          )}
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
                          {techd.soppNo}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {techd.userNo}
                        </Text>
                        <Text flex={3} px={4} py={2} textAlign="center">
                          {techd.custNo}
                        </Text>
                        <Text flex={3} px={4} py={2} textAlign="center">
                          {techd.ptncNo}
                        </Text>
                        <Text flex={3} px={4} py={2} textAlign="left">
                          {techd.techdDesc}
                        </Text>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Box>
            </Flex>
            <PaginationButtons
              batchSize={pageSize}
              data={parsedTechdList}
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

export default TechdList;
