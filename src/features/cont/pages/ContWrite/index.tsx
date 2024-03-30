import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import { Editor } from "@toast-ui/react-editor";
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomCard,
  CustomSelect,
  InfoBox,
  InfoElement,
  ScheduleIcon,
} from "components";
import { useGetTemplatesBySearch } from "features/sopp";
import TemplateGroup from "type/TemplateGroup";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

interface inputPropsType {
  [key: string]: React.CSSProperties;
}

const CustomInput = forwardRef(({ ...inputProps }: inputPropsType, ref) => {
  return (
    <Input
      {...inputProps}
      bg="transparent !important"
      borderRadius="0.25rem"
      borderWidth="0 !important"
      boxShadow="none !important"
      h="32px"
      px={2}
      size="sm"
      // width="120px"
    />
  );
});

function ContWrite() {
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = useDisclosure();

  const methods = useForm<{
    sendDate: [Date, Date] | null;
    sendChannel: string | null;
    searchType: string | null;
    sortType: string | null;
    receiveStatusType: string | null;
    keyword: string | null;
  }>({ mode: "onChange" });

  const [, setAutoType] = useState<string | null>(null);
  const [batchSize, setBatchSize] = useState<number>(10);
  const [, setChannelType] = useState<string | null>(null);
  const [, setCheckedItems] = useState<boolean[]>([false]);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
  const [, setName] = useState<string | null>(null);
  const [, setPhone] = useState<string | null>(null);
  const [, setRefetchGroupTemplate] = useState<boolean>(false);
  const [, setResult] = useState<string | null>(null);
  const [selectedTemplateGroup] = useState<TemplateGroup | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [expectedSalesDate, setExpectedSalesDate] = useState<Date | null>(null);
  const [templateChannel, setTemplateChannel] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string | null>(null);

  const {
    contents: templates,
    // paging: pagination,
    // pageLength,
    // totalCount,
    // isLoading: isTemplatesLoading,
  } = useGetTemplatesBySearch(
    {
      groupTemplateId: selectedTemplateGroup?.groupTemplateId ?? null,
      startDate,
      endDate,
      templateChannel,
      templateName,
      currentPage,
      pageSize: batchSize,
    },
    {
      enabled: isEnableQuery,
      onSettled: () => {
        setEnableQuery(false);
      },
    }
  );

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

  const handleExpectedSalesDateChange = (startDate: Date | null) => {
    setExpectedSalesDate(startDate);
  };

  const handlePageRefetch = useCallback(() => {
    setEndDate(null);
    setStartDate(null);
    setTemplateChannel(null);
    setTemplateName(null);
    setBatchSize(10);
    methods.reset();
    setCurrentPage(1);
    setEnableQuery(true);
    setRefetchGroupTemplate(true);
  }, [methods, setEnableQuery, setCurrentPage, setRefetchGroupTemplate]);
  const handleFormSubmit = methods.handleSubmit(
    ({
      // sendDate,
      sendChannel,
      searchType,
      sortType,
      receiveStatusType,
      keyword,
    }) => {
      if (searchType === "name") {
        setName(keyword);
      } else if (searchType === "phone") {
        setPhone(keyword);
      } else {
        setName(keyword);
        setPhone(keyword);
      }
      setCurrentPage(1);
      setChannelType(sendChannel);
      setResult(receiveStatusType);
      setAutoType(sortType);
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

  useOutsideClick({
    ref: currentRef,
    handler: () => {
      if (isOpen) {
        onClose();
      }
    },
  });

  useEffect(() => {
    handlePageRefetch();
    methods.reset();
  }, [selectedTemplateGroup, methods, handlePageRefetch]);

  useEffect(() => {
    setCheckedItems(templates?.length ? templates?.map(() => false) : [false]);
  }, [templates]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <VStack align="stretch" spacing={2}>
      <CustomCard isHeader="계약 등록" />
      <HStack align="flex-start" spacing={2}>
        <Box
          as="form"
          flex={1}
          gap={3}
          width="100%"
          onSubmit={handleFormSubmit}
        >
          <Flex flexDirection="column" width="100%">
            <CollapseSection
              borderBottomRadius={0}
              borderBottomWidth={0}
              flex={1}
              flexDirection="column"
              gap={1}
              headerTitle={
                <Flex>
                  <Text>등록 내용</Text>
                </Flex>
              }
            >
              <FormProvider {...methods}>
                <InfoBox>
                  <Flex>
                    <InfoElement labelWidth="120px" flex={1} label="담당자">
                      <CustomSelect
                        codes={responsiblePersons}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sortType", {
                          // onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="(부)담당자">
                      <CustomSelect
                        codes={responsiblePersons}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sortType", {
                          // onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="매출처">
                      <CustomSelect
                        codes={responsiblePersons}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sortType", {
                          // onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement
                      labelWidth="120px"
                      flex={1}
                      label="매출처 담당자"
                    >
                      <CustomSelect
                        codes={responsiblePersons}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sortType", {
                          // onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                  </Flex>
                  <Flex>
                    <InfoElement labelWidth="120px" flex={1} label="엔드유저">
                      <CustomSelect
                        codes={endUsers}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sendChannel", {
                          onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="진행단계">
                      <CustomSelect
                        codes={stages}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sendChannel", {
                          onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="가능성">
                      <InputGroup height="34px">
                        <Input
                          {...(methods.register("keyword"),
                          {
                            onChange: (e) => handleSearchChange(e),
                            onKeyPress: (e) => handleOnKeyPress(e),
                          })}
                        />
                        <InputRightAddon height="34px" borderColor="gray.400">
                          %
                        </InputRightAddon>
                      </InputGroup>
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="계약구분">
                      <CustomSelect
                        codes={contractTypes}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sendChannel", {
                          onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                  </Flex>
                  <Flex>
                    <InfoElement labelWidth="120px" flex={1} label="매출예정일">
                      <Flex
                        align="center"
                        // bg={isDisabled ? "gray.100" : "white"}
                        borderColor="gray.400"
                        borderRadius="xl"
                        borderWidth={1}
                        gap={1}
                        height="34px"
                        overflow="hidden"
                        // pointerEvents={isDisabled ? "none" : "inherit"}
                        px={3}
                        // width="150px"
                      >
                        <ScheduleIcon
                          color="gray.700"
                          // {isDisabled ? "gray.500" : "gray.700"}
                          // flexShrink={0}
                        />
                        <ReactDatePicker
                          customInput={<CustomInput />}
                          dateFormat={"yyyy-MM-dd"}
                          dropdownMode="select"
                          locale={ko}
                          placeholderText="YYYY-MM-DD"
                          selected={expectedSalesDate}
                          showMonthDropdown
                          showPopperArrow={true}
                          showYearDropdown
                          onChange={handleExpectedSalesDateChange}
                        />
                      </Flex>
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="판매방식">
                      <CustomSelect
                        codes={salesMethod}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sendChannel", {
                          onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement
                      labelWidth="120px"
                      flex={1}
                      label="유지보수대상"
                    >
                      <CustomSelect
                        codes={contractTypes}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("sendChannel", {
                          onChange: (e) => handleSendChannelChange(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement labelWidth="120px" flex={1} label="예상 매출">
                      <InputGroup height="34px">
                        <Input
                          size="sm"
                          {...(methods.register("keyword"),
                          {
                            onChange: (e) => handleSearchChange(e),
                            onKeyPress: (e) => handleOnKeyPress(e),
                          })}
                        />
                        <InputRightAddon height="34px" borderColor="gray.400">
                          원
                        </InputRightAddon>
                      </InputGroup>
                    </InfoElement>
                  </Flex>
                  <Flex>
                    <InfoElement
                      flex={1}
                      label={
                        <Text alignItems="center">
                          <Text height="100%">영업기회명</Text>
                        </Text>
                      }
                      labelWidth="120px"
                    >
                      <Input
                        size="sm"
                        {...(methods.register("keyword"),
                        {
                          onChange: (e) => handleSearchChange(e),
                          onKeyPress: (e) => handleOnKeyPress(e),
                        })}
                      />
                    </InfoElement>
                    <InfoElement
                      labelWidth="120px"
                      flex={1}
                      label={
                        <Box>
                          <Text>카테고리</Text>
                          <Text>(제품회사명)</Text>
                        </Box>
                      }
                    >
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
              </FormProvider>
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
              <Flex justifyContent="flex-end" gap={2}>
                <Button variant="secondaryGray" onClick={handleFormSubmit}>
                  목록
                </Button>
                <Button
                  isLoading={true}
                  variant="primaryBlue"
                  onClick={handleFormSubmit}
                >
                  등록
                </Button>
              </Flex>
              <Editor
                previewStyle="vertical"
                height="756px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
              />
            </Flex>
          </Flex>
        </Box>
      </HStack>
    </VStack>
  );
}

export default ContWrite;
