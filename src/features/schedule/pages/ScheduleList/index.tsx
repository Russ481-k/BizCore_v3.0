import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Portal,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import {
  useGetSchedList,
  useGetUsers,
  useGetCustList,
} from "features/schedule";
import Sched from "type/Sched";
import Pagination from "type/Pagination";
import CustomAutoComplete from "components/CustomAutoComplete";
import Cust from "type/Cust";
import User from "type/User";

function SchedList() {
  const methods = useForm<{
    startDate: [Date, Date] | null;
    regDate: [Date, Date] | null;
    user: string | null;
    sopp: string | null;
    cust: string | null;
    schedType: string | null;
    schedCatagory: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [regDateOption, setRegDateOption] = useState<"all" | "select">("all");
  const [startDateOption, setStartDateOption] = useState<"all" | "select">(
    "all"
  );
  const [scheduleStartDateStart, setScheduleStartDateStart] = useState<
    string | null
  >(null);
  const [scheduleStartDateEnd, setScheduleStartDateEnd] = useState<
    string | null
  >(null);
  const [scheduleRegDateStart, setScheduleRegDateStart] = useState<
    string | null
  >(null);
  const [scheduleRegDateEnd, setScheduleRegDateEnd] = useState<string | null>(
    null
  );
  const [autoCompleteUsersNameKeyword, setAutoCompleteUsersNameKeyword] =
    useState<string | null>(null);

  const {
    data: schedList,
    pagination,
    totalCount,
    isLoading,
  } = useGetSchedList(
    {
      currentPage: currentPage,
      pageSize: pageSize,
      sortBy: "regDatetime",
      sortOrder: "desc",
    },
    { enabled: isEnableQuery }
  );

  const parsedSchedList: Sched[] = !!schedList
    ? JSON.parse(schedList.toString())
    : [];

  const parsedPagination: Pagination = !!pagination
    ? JSON.parse(pagination.toString())
    : null;

  const { data: compAllUsers } = useGetUsers(
    {
      deptCode: null,
      status: null,
      permissionId: null,
      keyword: null,
      targetColumn: null,
      isBizCore: null,
      currentPage: null,
      pageSize: null,
      compNo: 100002,
    },
    { enabled: isEnableQuery }
  );
  const parsedresponsiblePersons: User[] = !!compAllUsers
    ? JSON.parse(compAllUsers.toString())
    : null;

  const responsiblePersonsCode = parsedresponsiblePersons?.map((user) => ({
    code: user.userNo.toString(),
    name: user.userName,
  }));

  const { data: custList } = useGetCustList(
    {
      compNo: 100002,
    },
    { enabled: isEnableQuery }
  );
  const parsedcustList: Cust[] = !!custList
    ? JSON.parse(custList.toString())
    : null;

  const custListCode = parsedcustList?.map((cust) => ({
    code: cust.custNo.toString(),
    name: cust.custName,
  }));

  const salesMethod = [
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

  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setEnableQuery(true);
  };
  const handleFormSubmit = methods.handleSubmit(
    ({ startDate, regDate, user, cust, schedType, schedCatagory, keyword }) => {
      setCurrentPage(1);

      setEnableQuery(true);
    }
  );
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };
  const handleCustChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("cust", e.target.value);
  };
  const handleSchedCatagoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("schedCatagory", e.target.value);
  };
  const handleSchedTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("schedType", e.target.value);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("keyword", e.target.value);
  };
  const handleSoppChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("sopp", e.target.value);
  };
  const handleAutoCompleteUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods.setValue("user", e.target.value);
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
      <CustomCard isHeader="일정 조회" />
      <Box>
        <CollapseSection headerTitle="상세 검색" borderBottomRadius={0}>
          <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement flex={1} labelWidth={"100px"} label="일정 시작일">
                  <RangeDatePicker
                    name="startDate"
                    option={startDateOption}
                    setOption={setStartDateOption}
                    setStartDate={setScheduleStartDateStart}
                    setEndDate={setScheduleStartDateEnd}
                  />
                </InfoElement>
                <InfoElement flex={1} labelWidth={"100px"} label="일정 등록일">
                  <RangeDatePicker
                    name="regDate"
                    option={regDateOption}
                    setOption={setRegDateOption}
                    setStartDate={setScheduleRegDateStart}
                    setEndDate={setScheduleRegDateEnd}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} labelWidth={"100px"} label="담당사원">
                  <CustomAutoComplete
                    codes={responsiblePersonsCode ?? []}
                    placeholder="선택"
                    size="sm"
                    {...methods.register("user", {
                      onChange: (e) => handleAutoCompleteUserChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} labelWidth={"100px"} label="활동형태">
                  <CustomSelect
                    codes={[]}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("schedCatagory", {
                      onChange: (e) => handleSchedCatagoryChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} labelWidth={"100px"} label="매출처">
                  <CustomAutoComplete
                    codes={custListCode ?? []}
                    placeholder="선택"
                    size="sm"
                    {...methods.register("cust", {
                      onChange: (e) => handleAutoCompleteUserChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} labelWidth={"100px"} label="일정구분">
                  <CustomSelect
                    codes={endUsers}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("schedType", {
                      onChange: (e) => handleSchedTypeChange(e),
                    })}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} labelWidth={"100px"} label="영업기회">
                  <CustomSelect
                    codes={contractTypes}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sopp", {
                      onChange: (e) => handleSoppChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} labelWidth={"100px"} label="키워드">
                  <Input
                    size="sm"
                    {...(methods.register("keyword"),
                    {
                      onChange: (e) => handleSearchChange(e),
                      onKeyPress: (e) => handleOnKeyPress(e),
                    })}
                  />
                </InfoElement>
              </Flex>
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
                  <Text flex={2} px={4} py={2} textAlign="center">
                    등록일
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    일정 구분
                  </Text>
                  <Text flex={5} px={4} py={2} textAlign="center">
                    일정 제목
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    일정 시작일
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    고객사
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    담당자
                  </Text>
                  <Text flex={4} px={4} py={2} textAlign="center">
                    장소
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    활동 형태
                  </Text>
                  <Text flex={8} px={4} py={2} textAlign="center">
                    일정 설명
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {isLoading ? (
                    Array.from({ length: pageSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={
                          parsedSchedList?.[i] + "-" + i + "-messages-skeleton"
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
                          flex={2}
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
                        <Skeleton
                          flex={2}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={8}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                      </Flex>
                    ))
                  ) : !parsedSchedList.length ? (
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
                    parsedSchedList?.map((sched: Sched, i: number) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={sched.schedNo + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {format(new Date(sched.regDatetime), "yyyy-MM-dd")}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {sched.schedType}
                        </Text>
                        <Text flex={5} px={4} py={2} textAlign="left">
                          {sched.schedTitle}
                        </Text>
                        <Text
                          flex={2}
                          overflow="hidden"
                          px={4}
                          py={2}
                          textAlign="left"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {format(new Date(sched.schedTo), "yyyy-MM-dd")}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="left">
                          {sched.custNo}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {sched.userNo}
                        </Text>
                        <Text flex={4} px={4} py={2} textAlign="left">
                          {sched.schedPlace}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {sched.schedActive}
                        </Text>
                        <Text flex={8} px={4} py={2} textAlign="left">
                          {sched.schedDesc}
                        </Text>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Box>
            </Flex>
            <PaginationButtons
              batchSize={pageSize}
              data={parsedSchedList}
              pagination={parsedPagination}
              onPageChange={handlePageChange}
              onBatchSizeChange={handleBatchSizeChange}
            />
          </Flex>
        </Section>
      </Box>
    </VStack>
  );
}

export default SchedList;
