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

import { alarmTalkTemplate } from "api/url";
import {
  CollapseSection,
  CustomCard,
  ExcelFileDownload,
  InfoBox,
  InfoElement,
  PaginationButtons,
  RangeDatePicker,
  ToastMessage,
} from "components";
import { useDeleteAlarmTalkTemplate, useGetAlarmTalkTemplatesBySearch } from "features/template";
import TemplateGroup from "type/TemplateGroup";
import AlarmTalkGroupTreePanel from "./AlarmTalkGroupTreePanel";
import DeleteAlarmTalkTemplateModal from "./DeleteAlarmTalkTemplateModal";
import ImportAlarmTalkTemplateModal from "./ImportAlarmTalkTemplateModal";

function AlarmTalkTemplateManage() {
  const toast = useToast();
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = useDisclosure();

  const methods = useForm<{
    regDate: [Date, Date];
    search: string;
  }>({ mode: "onChange" });

  const [batchSize, setBatchSize] = useState<number>(10);
  const [, setChangeTemplateModalData] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false]);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [importTemplateModalOpen, setImportTemplateModalOpen] = useState<boolean>(false);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [refetchGroupTemplate, setRefetchGroupTemplate] = useState<boolean>(false);
  const [regDateOption, setRegDateOption] = useState<"all" | "select">("all");
  const [selectedTemplateGroup, setSelectedTemplateGroup] = useState<TemplateGroup | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string | null>(null);

  const { mutate: deleteTemplate, isLoading: isDeleteLoading } = useDeleteAlarmTalkTemplate();
  const {
    contents: templates,
    isLoading: isTemplatesLoading,
    pageLength,
    paging: pagination,
    totalCount,
    refetch,
  } = useGetAlarmTalkTemplatesBySearch(
    {
      groupTemplateId: selectedTemplateGroup?.groupTemplateId ?? null,
      startDate,
      endDate,
      templateName,
      currentPage,
      pageSize: batchSize,
    },
    {
      enabled: isEnableQuery,
    }
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheckboxCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxArray = templates?.map(() => e.target.checked);
    setCheckedItems(checkboxArray ?? []);
  };
  const handleCheckboxCheck = (index: number) => {
    checkedItems[index] = !checkedItems[index];
    setCheckedItems([...checkedItems]);
  };

  const handleImportTemplateModalClose = () => {
    setImportTemplateModalOpen(false);
    handlePageRefetch();
  };
  const handleImportTemplateModalOpen = () => {
    setImportTemplateModalOpen(true);
  };
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
  const handlePageRefetch = useCallback(() => {
    setCurrentPage(1);
    refetch();
    setRefetchGroupTemplate(true);
  }, [refetch, setCurrentPage, setRefetchGroupTemplate]);
  const handleDeleteSelectedTemplateModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteSelectedTemplateModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteSelectTemplateModalConfirm = () => {
    templates?.forEach((template, i) => {
      if (checkedItems[i]) {
        deleteTemplate(
          { templateId: template.templateId },
          {
            onError: (error) => {
              toast({
                render: () => (
                  <ToastMessage title="알림톡 템플릿 삭제 오류" type="ERROR">
                    {error.message}
                    <br />
                    알림톡 템플릿 삭제 중 알 수 없는 오류가 발생하였습니다.
                    <br />
                    알림톡 템플릿 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
                    관리자에게 문의하기 바랍니다.
                  </ToastMessage>
                ),
              });
              onClose();
            },
            onSuccess: () => {
              toast({
                render: () => (
                  <ToastMessage title="알림톡 템플릿 삭제 완료" type="SUCCESS">
                    알림톡 템플릿을 정상적으로 삭제하였습니다.
                  </ToastMessage>
                ),
              });
              onClose();
            },
          }
        );
        setDeleteModalOpen(false);
      }
    });
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
    if (!isDeleteLoading) {
      refetch();
    }
  }, [isDeleteLoading, refetch]);

  useEffect(() => {
    methods.reset();
    setBatchSize(10);
    setCurrentPage(1);
    setEndDate(null);
    setRefetchGroupTemplate(true);
    setStartDate(null);
    setTemplateName(null);
  }, [methods, selectedTemplateGroup]);

  useEffect(() => {
    setCheckedItems(templates?.length ? templates?.map(() => false) : [false]);
  }, [templates]);

  useEffect(() => {
    if (isEnableQuery) {
      setEnableQuery(false);
    }
  }, [isEnableQuery]);

  useEffect(() => {
    if (refetchGroupTemplate) {
      setRefetchGroupTemplate(false);
    }
  }, [refetchGroupTemplate, handlePageRefetch]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="알림톡 템플릿 관리" />
      <HStack align="flex-start" spacing={3}>
        <AlarmTalkGroupTreePanel
          isRefetch={refetchGroupTemplate}
          onChange={handleTemplateGroupChange}
          onRefetch={setRefetchGroupTemplate}
        />
        <Box as="form" flex={1} gap={3} width="100%" onSubmit={handleFormSubmit}>
          <Flex flexDirection="column" width="100%">
            <CollapseSection
              borderBottomRadius={0}
              borderBottomWidth={0}
              flex={1}
              flexDirection="column"
              gap={1}
              headerTitle={
                <Flex>
                  <Text>알림톡 템플릿 목록</Text>
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
                    <InfoElement flex={1} label="키워드">
                      <Input
                        flex={1}
                        minWidth="120px"
                        placeholder="검색어 입력"
                        size="sm"
                        width="100%"
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
                    onClick={handleImportTemplateModalOpen}
                  >
                    알림톡 템플릿 등록
                  </Button>
                  <ExcelFileDownload
                    url={alarmTalkTemplate(
                      "/excel?" +
                        (templateName ? "&templateName=" + templateName : "") +
                        (selectedTemplateGroup?.groupTemplateId
                          ? "&groupTemplateId=" + selectedTemplateGroup?.groupTemplateId
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
                  <Text flex={4} px={4} py={2} textAlign="center">
                    알림톡 템플릿명
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
                        key={templates?.[i].templateId + "-" + i + "-templates-skeleton"}
                      >
                        <Skeleton mx={4} my={2} height="16px" width="16px" />
                        <Skeleton flex={4} height="20px" mx={4} my={2} />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                      </Flex>
                    ))
                  ) : !!totalCount ? (
                    templates?.map((template, i) => (
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
                          onClick={() => handleChangeTemplateModalData(template.templateId)}
                        >
                          {template.templateName}
                        </Text>
                        <Text flex={1} textAlign="center" px={4} py={2}>
                          {format(new Date(template.createDate ?? ""), "yyyy-MM-dd")}
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
        {importTemplateModalOpen && (
          <ImportAlarmTalkTemplateModal
            selectedTemplateGroupId={selectedTemplateGroup?.groupTemplateId}
            isChangeTemplate={false}
            onClose={handleImportTemplateModalClose}
          />
        )}
      </HStack>
      {deleteModalOpen && (
        <DeleteAlarmTalkTemplateModal
          onClose={handleDeleteSelectedTemplateModalClose}
          onConfirm={handleDeleteSelectTemplateModalConfirm}
        />
      )}
    </VStack>
  );
}

export default AlarmTalkTemplateManage;
