import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  useDisclosure,
  useOutsideClick,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { template } from "api/url";
import {
  ChannelTag,
  CollapseSection,
  CustomCard,
  CustomSelect,
  ExcelFileDownload,
  InfoBox,
  InfoElement,
  PaginationButtons,
  RangeDatePicker,
  ToastMessage,
} from "components";
import { useDeleteTemplate, useGetTemplatesBySearch } from "features/sopp";
import TemplateGroup from "type/TemplateGroup";
import DeleteTemplateModal from "./DeleteTemplateModal";
import GroupTreePanel from "./GroupTreePanel";
import SaveTemplateModal from "./SaveTemplateModal";

function TechdMaintenanceWrite() {
  const toast = useToast();
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = useDisclosure();

  const methods = useForm<{
    regDate: [Date, Date];
    templateChannel: string;
    search: string;
  }>({ mode: "onChange" });

  const [addTemplateModalOpen, setAddTemplateModalOpen] =
    useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(10);
  const [changeTemplateModalData, setChangeTemplateModalData] = useState<
    number | null
  >(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false]);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [regDateOption, setRegDateOption] = useState<"all" | "select">("all");
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
  const [refetchGroupTemplate, setRefetchGroupTemplate] =
    useState<boolean>(false);
  const [selectedTemplateGroup, setSelectedTemplateGroup] =
    useState<TemplateGroup | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [templateChannel, setTemplateChannel] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string | null>(null);

  const { mutate: deleteTemplate, isLoading: isDeleteLoading } =
    useDeleteTemplate();
  const {
    contents: templates,
    paging: pagination,
    pageLength,
    totalCount,
    isLoading: isTemplatesLoading,
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

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleAddTemplateModalClose = () => {
    setAddTemplateModalOpen(false);
    handlePageRefetch();
  };
  const handleAddTemplateModalOpen = () => {
    setAddTemplateModalOpen(true);
  };
  const handleBatchSizeChange = (BatchSize: number) => {
    setBatchSize(BatchSize);
    setEnableQuery(true);
  };
  const handleChangeTemplateModalClose = () => {
    setChangeTemplateModalData(null);
    handlePageRefetch();
  };
  const handleChangeTemplateModalData = (templateId: number) => {
    setChangeTemplateModalData(templateId);
  };
  const handleCheckboxCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxArray = templates?.map(() => e.target.checked);
    setCheckedItems(checkboxArray ?? []);
  };
  const handleCheckboxCheck = (index: number) => {
    checkedItems[index] = !checkedItems[index];
    setCheckedItems([...checkedItems]);
  };
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
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
  const handleDeleteSelectedTemplateModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteSelectedTemplateModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteSelectTemplateModalConfirm = () => {
    templates?.forEach((template: any, i: number) => {
      if (checkedItems[i]) {
        deleteTemplate(
          { templateId: template.templateId },
          {
            onError: () => {
              toast({
                render: () => (
                  <ToastMessage title=" 삭제 오류" type="ERROR">
                    삭제 중 알 수 없는 오류가 발생하였습니다.
                    <br />
                    삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
                    관리자에게 문의하기 바랍니다.
                  </ToastMessage>
                ),
              });
            },
            onSuccess: () => {
              toast({
                render: () => (
                  <ToastMessage title=" 삭제 완료" type="SUCCESS">
                    을 정상적으로 삭제하였습니다.
                  </ToastMessage>
                ),
              });
              onClose();
              handlePageRefetch();
            },
          }
        );
        setDeleteModalOpen(false);
        setEnableQuery(true);
      }
    });
  };
  const handleFormSubmit = methods.handleSubmit(
    ({ regDate, search, templateChannel }) => {
      if (regDateOption === "select" && !!regDate[0] && !!regDate[1]) {
        setStartDate(`${format(regDate[0], "yyyy-MM-dd")} 00:00:00.000`);
        setEndDate(`${format(regDate[1], "yyyy-MM-dd")} 23:59:59.999`);
      } else {
        setStartDate(null);
        setEndDate(null);
      }
      setTemplateName(search);
      setTemplateChannel(templateChannel);
      setEnableQuery(true);
    }
  );
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
    if (!isDeleteLoading) {
      setEnableQuery(true);
    }
  }, [isDeleteLoading]);

  useEffect(() => {
    handlePageRefetch();
    methods.reset();
  }, [selectedTemplateGroup, methods, handlePageRefetch]);

  useEffect(() => {
    setCheckedItems(templates?.length ? templates?.map(() => false) : [false]);
  }, [templates]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader=" 관리" />
      <HStack align="flex-start" spacing={3}>
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
                  <Flex>
                    <InfoElement flex={4} label="채널">
                      <CustomSelect
                        codes={templateChannelOption}
                        placeholder="전체"
                        size="sm"
                        {...methods.register("templateChannel")}
                      />
                    </InfoElement>
                    <InfoElement flex={8} label="키워드">
                      <Input
                        placeholder="검색어 입력"
                        size="sm"
                        {...methods.register("search")}
                      />
                    </InfoElement>
                  </Flex>
                </InfoBox>
                <Flex justify="flex-end">
                  <Button
                    isLoading={isTemplatesLoading}
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
                  검색결과 : {totalCount ?? 0} 건
                </Text>
                <Flex flex={1} gap={2} justifyContent="flex-end">
                  <Button
                    size="sm"
                    type="button"
                    variant="secondaryBlue"
                    onClick={handleAddTemplateModalOpen}
                  >
                    등록
                  </Button>
                  <ExcelFileDownload
                    url={template(
                      "/excel?" +
                        (templateName ? "&templateName=" + templateName : "") +
                        (templateChannel
                          ? "&templateChannel=" + templateChannel
                          : "") +
                        (selectedTemplateGroup?.groupTemplateId
                          ? "&groupTemplateId=" +
                            selectedTemplateGroup?.groupTemplateId
                          : "") +
                        (startDate ? "&startDate=" + startDate : "") +
                        (endDate ? "&endDate=" + endDate : "")
                    )}
                  />
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
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    px={4}
                    py={2}
                    textAlign="left"
                    onChange={(e) => handleCheckboxCheckAll(e)}
                  />
                  <Text flex={1} px={4} py={2} textAlign="center">
                    채널
                  </Text>
                  <Text flex={4} px={4} py={2} textAlign="center">
                    명
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    등록일
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {isTemplatesLoading ? (
                    Array.from({ length: batchSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={
                          templates?.[i].templateId +
                          "-" +
                          i +
                          "-templates-skeleton"
                        }
                      >
                        <Skeleton mx={4} my={2} height="16px" width="16px" />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={4} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                      </Flex>
                    ))
                  ) : !!totalCount ? (
                    templates?.map((template: any, i: number) => (
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
                        <Checkbox
                          isChecked={checkedItems[i]}
                          px={4}
                          py={2}
                          textAlign="left"
                          onChange={() => handleCheckboxCheck(i)}
                        />
                        <Text flex={1} textAlign="center" px={4} py={2}>
                          <ChannelTag channelType={template.templateChannel} />
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
                            handleChangeTemplateModalData(template.templateId)
                          }
                        >
                          {template.templateName}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
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
                data={templates ?? []}
                isAllChecked={allChecked}
                isIndeterminate={isIndeterminate}
                isRefetch={refetchGroupTemplate}
                pageLength={pageLength}
                pagination={pagination}
                onPageChange={handlePageChange}
                onBatchSizeChange={handleBatchSizeChange}
                onSelectionDelete={handleDeleteSelectedTemplateModalOpen}
              />
            </Flex>
          </Flex>
        </Box>
        {addTemplateModalOpen && (
          <SaveTemplateModal
            selectedTemplateGroupId={selectedTemplateGroup?.groupTemplateId}
            isChangeTemplate={false}
            onClose={handleAddTemplateModalClose}
          />
        )}
        {changeTemplateModalData && (
          <SaveTemplateModal
            selectedTemplateGroupId={selectedTemplateGroup?.groupTemplateId}
            isChangeTemplate={true}
            templateId={changeTemplateModalData}
            onClose={handleChangeTemplateModalClose}
          />
        )}
      </HStack>
      {deleteModalOpen && (
        <DeleteTemplateModal
          onClose={handleDeleteSelectedTemplateModalClose}
          onConfirm={handleDeleteSelectTemplateModalConfirm}
        />
      )}
    </VStack>
  );
}

export default TechdMaintenanceWrite;
