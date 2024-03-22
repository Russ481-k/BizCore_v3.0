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
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomCard,
  CustomSelect,
  InfoBox,
  InfoElement,
  PaginationButtons,
} from "components";
import { useGetScenarioGroups } from "features/send";
import formatter from "libs/formatter";
import ScenarioGroup from "type/ScenarioGroup";
import ScenarioEditor from "./ScenarioEditor";
import ScenarioInfo from "./ScenarioInfo";

function TwoWayScenario() {
  const methods = useForm<{
    createDate: [Date, Date] | null;
    reqDate: [Date, Date] | null;
    messageContents: string | null;
    sendChannel: string | null;
    searchType: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });

  const [all, setAll] = useState<string | null>(null);
  const [createId, setCreateId] = useState<string | null>(null);
  const [createUser, setCreateUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioGroup | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  const {
    data: scenarios,
    isLoading: isScenarioLoading,
    totalCount: scenarioTotalCount,
    pagination,
    pageLength,
  } = useGetScenarioGroups(
    {
      all,
      createId,
      createUser,
      subject,
      pageSize,
      currentPage,
    },
    {
      enabled: isEnableQuery,
      onSuccess: () => {
        setEnableQuery(false);
      },
    }
  );
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
  const handleScenarioGroupChange = (scenario: ScenarioGroup | null) => {
    setSelectedScenario(scenario);
  };
  const handleFormSubmit = methods?.handleSubmit(({ searchType, keyword }) => {
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
  });
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("keyword", e.target.value);
  };
  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("searchType", e.target.value);
  };

  const handleSendChannelChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("sendChannel", e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
  };

  const handleReset = () => {
    setSelectedScenario(null);
  };

  useEffect(() => {
    if (isEnableQuery) {
      setEnableQuery(false);
    }
  }, [isEnableQuery]);
  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="자동안내 시나리오 관리" />
      <FormProvider {...methods}>
        {!selectedScenario?.groupId ? (
          <CollapseSection headerTitle="자동안내 시나리오 목록">
            <InfoBox>
              <Flex>
                <InfoElement flex={4} label="사용 여부">
                  <CustomSelect
                    codes={[
                      {
                        code: "Y",
                        name: "사용",
                      },
                      {
                        code: "N",
                        name: "미사용",
                      },
                    ]}
                    placeholder="전체"
                    size="sm"
                    {...methods?.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={8} label="키워드">
                  <Flex gap={3} width="100%">
                    <CustomSelect
                      codes={searchTypeOption}
                      maxW={150}
                      size="sm"
                      {...methods?.register("searchType", {
                        onChange: (e) => handleSearchTypeChange(e),
                      })}
                    />
                    <Input
                      size="sm"
                      {...(methods?.register("keyword"),
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
                isLoading={isScenarioLoading}
                variant="primaryBlue"
                onClick={handleFormSubmit}
              >
                조회
              </Button>
            </Flex>
            <Flex flexDirection="column" gap={2} width="100%">
              <Flex flexDirection="column" gap={2} width="100%">
                <HStack>
                  <Text fontSize="xs" fontWeight="bold">
                    검색결과 : {scenarioTotalCount} 건
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
                      양방향 발신번호
                    </Text>
                    <Text flex={4} px={4} py={2} textAlign="center">
                      자동안내 시나리오명
                    </Text>
                    <Text flex={1} px={4} py={2} textAlign="center">
                      사용여부
                    </Text>
                    <Text flex={1} px={4} py={2} textAlign="center">
                      수정일시
                    </Text>
                  </Flex>
                  <Flex flexDirection="column" fontSize="sm">
                    {isScenarioLoading &&
                      Array.from({ length: pageSize }).map((_, i) => (
                        <Flex
                          alignItems="center"
                          borderBottomWidth={1}
                          height="38px"
                          justifyContent="space-between"
                          key={
                            scenarios?.[i].bizNumber +
                            "-" +
                            i +
                            "-scenarios-skeleton"
                          }
                        >
                          <Skeleton flex={1} height="20px" mx={4} my={2} />
                          <Skeleton flex={4} height="20px" mx={4} my={2} />
                          <Skeleton flex={1} height="20px" mx={4} my={2} />
                          <Skeleton flex={1} height="20px" mx={4} my={2} />
                        </Flex>
                      ))}
                    {scenarioTotalCount === 0 ? (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="38px"
                        justifyContent="center"
                        p={3}
                        width="100%"
                      >
                        <Text>조회된 결과가 없습니다.</Text>
                      </Flex>
                    ) : (
                      scenarios?.map((scenario, i) => (
                        <Flex
                          alignItems="center"
                          borderBottomWidth={1}
                          flex={1}
                          fontSize="sm"
                          justifyContent="space-between"
                          key={scenario.bizNumber + "-" + i}
                          width="100%"
                          _hover={{
                            backgroundColor: "gray.50",
                          }}
                        >
                          <Text
                            color="primary.500"
                            cursor="pointer"
                            flex={1}
                            px={4}
                            py={2}
                            textAlign="center"
                            _hover={{
                              textDecoration: "underline",
                            }}
                            onClick={() => handleScenarioGroupChange(scenario)}
                          >
                            {formatter.contactFormatter(scenario?.bizNumber)}
                          </Text>
                          <Text flex={4} px={4} py={2} textAlign="left">
                            {scenario.serviceName}
                          </Text>
                          <Text flex={1} px={4} py={2} textAlign="center">
                            {scenario.isUse ? "사용" : "미사용"}
                          </Text>
                          <Text flex={1} px={4} py={2} textAlign="center">
                            {format(new Date(scenario.regDate), "yyyy-MM-dd")}
                          </Text>
                        </Flex>
                      ))
                    )}
                  </Flex>
                </Box>
              </Flex>
              <PaginationButtons
                batchSize={pageSize}
                data={scenarios ?? []}
                pageLength={pageLength}
                pagination={pagination}
                onBatchSizeChange={handleBatchSizeChange}
                onPageChange={handlePageChange}
              />
            </Flex>
          </CollapseSection>
        ) : (
          <>
            <ScenarioInfo scenario={selectedScenario} />
            <ScenarioEditor
              groupId={Number(selectedScenario?.groupId ?? 1)}
              onReset={handleReset}
            />
          </>
        )}
      </FormProvider>
    </VStack>
  );
}

export default TwoWayScenario;
