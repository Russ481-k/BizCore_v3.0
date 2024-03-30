import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  PaginationButtons,
} from "components";

import formatter from "libs/formatter";

interface SendTelNumberModalProps {
  onChange: (bizNumber: string) => void;
  onClose: () => void;
}
function SendTelNumberModal({ onChange, onClose }: SendTelNumberModalProps) {
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
  const [subject, setSubject] = useState<string | null>(null);

  const searchTypeOption = [
    {
      code: "all",
      name: "전체",
    },
    {
      code: "subject",
      name: " 제목",
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

  const handleModalClose = () => {
    onClose();
  };

  const handleChangeTelNumberButtonClick = (bizNumber: string) => {
    onChange(bizNumber);
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
  const handleSendChannelChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("sendChannel", e.target.value);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("keyword", e.target.value);
  };
  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    methods?.setValue("searchType", e.target.value);
  };
  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="768px">
        <ModalHeader> 발신번호 변경</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CollapseSection
            borderBottomRadius={0}
            borderBottomWidth={0}
            headerTitle=" 발신번호 목록"
          >
            <InfoBox>
              <InfoElement flex={4} label="사용 여부" labelWidth="130px">
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
              <InfoElement flex={8} label="키워드" labelWidth="130px">
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
                    width="100%"
                    {...(methods?.register("keyword"),
                    {
                      onChange: (e) => handleSearchChange(e),
                      onKeyPress: (e) => handleOnKeyPress(e),
                    })}
                  />
                </Flex>
              </InfoElement>
            </InfoBox>
          </CollapseSection>
          <Flex
            backgroundColor="white"
            borderBottomRadius="12px"
            borderColor="gray.300"
            borderWidth={1}
            flexDirection="column"
            gap={3}
            height="100%"
            p={3}
          >
            <HStack>
              <Text fontSize="xs" fontWeight="bold">
                검색결과 : {0} 건
              </Text>
              <Flex />
            </HStack>
            <Box
              borderLeftWidth={1}
              borderRadius="12px"
              borderRightWidth={1}
              borderTopWidth={1}
              height="100%"
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
                <Text flex={4} px={4} py={2} textAlign="center">
                  발신번호
                </Text>
                <Text flex={2} px={4} py={2} textAlign="center">
                  사용여부
                </Text>
                <Text flex={6} px={4} py={2} textAlign="center">
                  안내 시나리오명
                </Text>
                <Text flex={1} px={4} py={2} textAlign="center">
                  선택
                </Text>
              </Flex>
              <Flex flexDirection="column" fontSize="sm">
                {true &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      height="38px"
                      justifyContent="space-between"
                      key={[]?.[i] + "-" + i + "-telNumbers-skeleton"}
                    >
                      <Skeleton flex={4} height="20px" mx={4} my={2} />
                      <Skeleton flex={2} height="20px" mx={4} my={2} />
                      <Skeleton flex={6} height="20px" mx={4} my={2} />
                      <Skeleton
                        flex={1}
                        height="20px"
                        mx={4}
                        my={2}
                        width="80px"
                      />
                    </Flex>
                  ))}
                {0 ? (
                  <Flex
                    alignItems="center"
                    borderBottomWidth={1}
                    flex={1}
                    fontSize="sm"
                    justifyContent="center"
                    p={4}
                  >
                    <Text>조회된 연락처가 없습니다.</Text>
                  </Flex>
                ) : (
                  []?.map((scenario: any, i: number) => (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      flex={1}
                      fontSize="sm"
                      height="37px"
                      justifyContent="space-between"
                      key={scenario.bizNumber + "-" + i}
                      width="100%"
                      _hover={{
                        backgroundColor: "gray.50",
                      }}
                    >
                      <Text flex={4} px={4} py={2} textAlign="center">
                        {formatter.contactFormatter(scenario?.bizNumber)}
                      </Text>
                      <Text flex={2} px={4} py={2} textAlign="center">
                        {scenario.isUse ? "사용" : "미사용"}
                      </Text>
                      <Text flex={6} px={4} py={2} textAlign="center">
                        {scenario.serviceName}
                      </Text>
                      <Flex
                        flex={1}
                        px={4}
                        py={2}
                        textAlign="center"
                        width="75px"
                      >
                        <Button
                          flex={1}
                          size="sm"
                          variant="primaryBlue"
                          onClick={() =>
                            handleChangeTelNumberButtonClick(scenario.bizNumber)
                          }
                        >
                          선택
                        </Button>
                      </Flex>
                    </Flex>
                  ))
                )}
              </Flex>
            </Box>
            <PaginationButtons
              batchSize={pageSize}
              data={[]}
              pageLength={10}
              pagination={{
                offset: 10,
                currentPage: 1,
                pageSize: 10,
                paged: true,
                sort: {
                  empty: false,
                  sorted: true,
                  unsorted: false,
                },
                unpaged: false,
              }}
              onBatchSizeChange={handleBatchSizeChange}
              onPageChange={handlePageChange}
            />
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default SendTelNumberModal;
