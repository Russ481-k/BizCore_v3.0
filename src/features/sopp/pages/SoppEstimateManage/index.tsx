import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomCard,
  ExcelFileDownload,
  InfoBox,
  InfoElement,
  PaginationButtons,
  RangeDatePicker,
} from "components";
import TemplateGroup from "type/TemplateGroup";
import GroupTreePanel from "./GroupTreePanel";

function AlarmTalkTemplate() {
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = useDisclosure();

  const methods = useForm<{
    regDate: [Date, Date];
    search: string;
  }>({ mode: "onChange" });

  const [, setChangeTemplateModalData] = useState<number | null>(null);
  const [, setCurrentPage] = useState<number | null>(1);
  const [, setEndDate] = useState<string | null>(null);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [batchSize, setBatchSize] = useState<number>(10);
  const [regDateOption, setRegDateOption] = useState<"all" | "select">("all");
  const [refetchGroupTemplate, setRefetchGroupTemplate] =
    useState<boolean>(false);
  const [selectedTemplateGroup, setSelectedTemplateGroup] =
    useState<TemplateGroup | null>(null);
  const [, setStartDate] = useState<string | null>(null);
  const [, setTemplateName] = useState<string | null>(null);

  const handleBatchSizeChange = (BatchSize: number) => {
    setBatchSize(BatchSize);
    setEnableQuery(true);
  };

  const handleChangeTemplateModalData = (templateId: number) => {
    setChangeTemplateModalData(templateId);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
  };

  const handleFormSubmit = methods.handleSubmit(({ regDate, search }) => {
    if (regDateOption === "select" && !!regDate[0] && !!regDate[1]) {
      setStartDate(`${format(regDate[0], "yyyy-MM-dd")} 00:00:00.000`);
      setEndDate(`${format(regDate[1], "yyyy-MM-dd")} 23:59:59.999`);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
    setTemplateName(search);
    setEnableQuery(true);
  });
  const handleTemplateGroupChange = (groupTemplate: TemplateGroup | null) => {
    setSelectedTemplateGroup(groupTemplate);
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
    methods.reset();
    setBatchSize(10);
    setCurrentPage(1);
    setEndDate(null);
    setRefetchGroupTemplate(true);
    setStartDate(null);
    setTemplateName(null);
  }, [selectedTemplateGroup, methods]);

  useEffect(() => {
    if (isEnableQuery) {
      setEnableQuery(false);
    }
  }, [isEnableQuery]);

  return (
    <VStack align="stretch" spacing={2}>
      <CustomCard isHeader="견적 관리" />
      <HStack align="flex-start" spacing={2}>
        <GroupTreePanel
          isRefetch={refetchGroupTemplate}
          onChange={handleTemplateGroupChange}
          onRefetch={setRefetchGroupTemplate}
        />
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
                  <Text> 목록</Text>
                </Flex>
              }
            >
              <FormProvider {...methods}>
                <InfoBox>
                  <Flex>
                    <InfoElement flex={4} label="템플릿 그룹">
                      <Text fontSize="sm">
                        {selectedTemplateGroup?.groupTemplateName ?? "전체"}
                      </Text>
                    </InfoElement>
                    <InfoElement flex={8} label="등록일">
                      <RangeDatePicker
                        name="regDate"
                        option={regDateOption}
                        setOption={setRegDateOption}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                      />
                    </InfoElement>
                  </Flex>
                  <InfoElement flex={1} label="키워드">
                    <Input
                      flex={1}
                      placeholder="검색어 입력"
                      size="sm"
                      {...methods.register("search")}
                    />
                  </InfoElement>
                </InfoBox>
                <Flex justify="flex-end">
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
                <Flex flex={1} gap={2} justifyContent="flex-end">
                  <ExcelFileDownload url={`/api/v1//excel`} />
                </Flex>
              </HStack>
              <Box
                borderLeftWidth={1}
                borderRadius="12px"
                borderRightWidth={1}
                borderTopWidth={1}
                overflow="hidden"
                height="100%"
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
                  <Text flex={10} px={4} py={2} textAlign="center">
                    명
                  </Text>
                  <Text flex={4} px={4} py={2} textAlign="center">
                    등록일
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {true ? (
                    Array.from({ length: batchSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={[]?.[i] + "-" + i + "-skeleton"}
                      >
                        <Skeleton flex={10} height="20px" mx={4} my={2} />
                        <Skeleton flex={4} height="20px" mx={4} my={2} />
                      </Flex>
                    ))
                  ) : false ? (
                    []?.map((template: any, i: number) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={template.templateId + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Text
                          color="primary.500"
                          cursor="pointer"
                          flex={10}
                          px={4}
                          py={2}
                          textAlign="left"
                          _hover={{
                            textDecoration: "underline",
                          }}
                          onClick={() =>
                            handleChangeTemplateModalData(template.templateId)
                          }
                        >
                          {template.templateName}
                        </Text>
                        <Text flex={4} textAlign="center" px={4} py={2}>
                          {format(
                            new Date(template.createDate ?? ""),
                            "yyyy-MM-dd"
                          )}
                        </Text>
                      </Flex>
                    ))
                  ) : (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      flex={1}
                      fontSize="sm"
                      justifyContent="center"
                      p={4}
                    >
                      <Text>조회된 템플릿이 없습니다.</Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
              <PaginationButtons
                batchSize={batchSize}
                data={[]}
                isRefetch={refetchGroupTemplate}
                pageLength={0}
                pagination={undefined}
                onPageChange={handlePageChange}
                onBatchSizeChange={handleBatchSizeChange}
              />
            </Flex>
          </Flex>
        </Box>
      </HStack>
    </VStack>
  );
}

export default AlarmTalkTemplate;
