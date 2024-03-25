import {
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Table,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import newIcon from "assets/img/new.png";
import {
  ClipIcon,
  CollapseSection,
  CustomCard,
  CustomSelect,
  CustomTableContainer,
  InfoBox,
  InfoElement,
  MailIcon,
  NoDataTr,
  PaginationButtons,
  RangeDatePicker,
  Section,
  TipText,
} from "components";
import {
  CONSULTS_OPTION,
  KEYWORD,
  useChangeConsultIsRead,
  useGetConsult,
  useGetConsults,
} from "features/send";
import { useGetCrs } from "features/user";
import formatter from "libs/formatter";
import ConsultListItem from "type/ConsultListItem";
import Option from "type/Option";
import ConsultDetailModal from "./ConsultDetailModal";
import TransformGuideModal from "./TransformGuideModal";

interface ConsultTabPanelProps {
  csltStatus: string;
}

interface SearchForm {
  callerNo: string | null;
  regDate: [Date, Date] | null;
  callType: "S" | "R" | null; // S:발신 / R:수신
  sendType: "A" | "C" | null; // A:안내 / C:문자상담
  isResult: boolean; // 미확인 수신 메시지 false:체크 / null:미체크
  targetColumn: "all" | "receiverNo" | "message";
  keyword: string;
}
const searchFormDefaultValues: SearchForm = {
  callerNo: null,
  regDate: null,
  callType: null,
  sendType: null,
  isResult: false,
  targetColumn: "all",
  keyword: "",
};

function ConsultTabPanel({ csltStatus }: ConsultTabPanelProps) {
  const methods = useForm<SearchForm>({
    defaultValues: searchFormDefaultValues,
    mode: "onChange",
  });

  const [searchCallerNo, setSearchCallerNo] = useState<string | null>(null);
  const [searchCallerNoOptions, setSearchCallerNoOptions] = useState<Option[]>([]);
  const [searchCallType, setSearchCallType] = useState<"S" | "R" | null>(null);
  const [searchSendDateOption, setSearchSendDateOption] = useState<"all" | "select">("all");
  const [searchEndSendDate, setSearchEndSendDate] = useState<string | null>(null);
  const [searchIsResult, setSearchIsResult] = useState<boolean | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchSendType, setSearchSendType] = useState<"A" | "C" | null>(null);
  const [searchStartSendDate, setSearchStartSendDate] = useState<string | null>(null);
  const [searchTargetColumn, setSearchTargetColumn] = useState<"all" | "receiverNo" | "message">(
    "all"
  );

  const [batchSize, setBatchSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [getConsultsEnabled, setGetConsultsEnabled] = useState<boolean>(true);
  const [selectedMasterId, setSelectedMasterId] = useState<number>(0);

  const [consultDetailModalOpen, setConsultDetailModalOpen] = useState<boolean>(false);
  const [transformGuideModalOpen, setTransformGuideModalOpen] = useState<boolean>(false);

  const isFirstRender = useRef(true);

  const { data: crsData } = useGetCrs();
  const {
    contents: consultsData,
    paging: pagination,
    pageLength,
    totalCount,
  } = useGetConsults(
    {
      csltStatus,
      callerNo: searchCallerNo,
      startSendDate: searchStartSendDate,
      endSendDate: searchEndSendDate,
      callType: searchCallType,
      sendType: searchSendType,
      isResult: searchIsResult,
      targetColumn: searchTargetColumn,
      keyword: searchKeyword,
      currentPage: currentPage,
      pageSize: batchSize,
    },
    {
      enabled: getConsultsEnabled,
      onSettled: () => {
        setGetConsultsEnabled(false);
      },
    }
  );
  const { data: consultData, refetch: refetchConsult } = useGetConsult(
    {
      masterId: selectedMasterId ?? null,
    },
    {
      enabled: false,
      retry: 0,
    }
  );
  const { mutate: changeConsultIsRead } = useChangeConsultIsRead();

  const handleSearchFormSubmit = methods.handleSubmit((data) => {
    if (searchSendDateOption === "select") {
      setSearchStartSendDate(
        data.regDate?.[0] ? format(new Date(data.regDate[0]), "yyyy-MM-dd") : null
      );
      setSearchEndSendDate(
        data.regDate?.[1] ? format(new Date(data.regDate[1]), "yyyy-MM-dd") : null
      );
    } else {
      setSearchStartSendDate(null);
      setSearchEndSendDate(null);
    }
    setSearchCallerNo(data.callerNo || null);
    setSearchCallType(data.callType || null);
    setSearchSendType(data.sendType || null);
    setSearchIsResult(data.isResult ? false : null);
    setSearchTargetColumn(data.targetColumn);
    setSearchKeyword(data.keyword);
    onRefetchConsults();
  });

  const handleDetailButtonClick = (consult: ConsultListItem) => {
    const masterId = consult.mastId;
    setSelectedMasterId(masterId);
    if (!consult.isRead) {
      changeConsultIsRead(
        {
          masterId,
        },
        {
          onError: (error) => {
            throw new Error("Update isRead error");
          },
          onSuccess: () => {
            onRefetchConsults();
            setConsultDetailModalOpen(true);
          },
        }
      );
      return;
    }
    setConsultDetailModalOpen(true);
  };
  const handleTransformGuidButtonClick = () => {
    setTransformGuideModalOpen(true);
  };

  const handleBatchSizeChange = (batchSize: number) => {
    setBatchSize(batchSize);
    onRefetchConsults();
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onRefetchConsults();
  };

  const onRefetchConsults = useCallback(() => {
    setGetConsultsEnabled(true);
    const targetElement = document.getElementById("main");
    targetElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setGetConsultsEnabled]);

  useEffect(() => {
    let options: Option[] = [];
    if (crsData && crsData.crsGroupList) {
      options = crsData.crsGroupList.map((item) => {
        return {
          code: String(item.bizNumber),
          name: String(item.bizNumber),
        };
      });
    }
    options.unshift({
      code: "",
      name: "전체",
    });
    setSearchCallerNoOptions(options);
  }, [crsData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refetchConsult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMasterId]);

  return (
    <TabPanel>
      <CollapseSection
        headerTitle={csltStatus === "p" ? " 상담 목록" : "종료된  상담 목록"}
        borderBottomRadius={0}
      >
        {/* TODO: 다음 개발단계에서 적용 */}
        <CustomCard justify="space-between" bg="gray.100" display="none">
          <TipText text="진행중인  상담은 문자상담과 안내로 전환 가능하며, 오른쪽의 [전환안내 설정] 기능용 이용하여 전환시 자동으로 발신할 메시지를 등록할 수 있습니다." />
          <Button variant="textGray" size="sm" onClick={handleTransformGuidButtonClick}>
            전환안내 설정
          </Button>
        </CustomCard>
        <VStack align="stretch" as="form" spacing={3}>
          <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement flex={6} label=" 발신번호" labelWidth="190px">
                  <CustomSelect
                    codes={searchCallerNoOptions}
                    size="sm"
                    {...methods.register("callerNo")}
                  />
                </InfoElement>
                <InfoElement flex={6} label="발신/수신일" labelWidth="190px">
                  <RangeDatePicker
                    name="regData"
                    option={searchSendDateOption}
                    setOption={setSearchSendDateOption}
                    setStartDate={setSearchStartSendDate}
                    setEndDate={setSearchEndSendDate}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={6} label="발신/수신" labelWidth="190px">
                  <CustomSelect
                    codes={CONSULTS_OPTION.CALL_TYPE}
                    maxW={200}
                    size="sm"
                    {...methods.register("callType")}
                  />
                  {csltStatus === "p" && (
                    <Controller
                      control={methods.control}
                      name="isResult"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          ms={3}
                          isChecked={value}
                          onChange={(e) => onChange(e.target.checked)}
                        >
                          미확인 수신 메시지
                        </Checkbox>
                      )}
                    />
                  )}
                </InfoElement>
                <InfoElement flex={6} label=" 구분" labelWidth="190px">
                  <CustomSelect
                    codes={CONSULTS_OPTION.SEND_TYPE}
                    size="sm"
                    {...methods.register("sendType")}
                  />
                </InfoElement>
              </Flex>
              <InfoElement label="키워드" labelWidth="190px">
                <Flex w="100%">
                  <CustomSelect
                    codes={CONSULTS_OPTION.TARGET_COLUMN}
                    maxW={200}
                    size="sm"
                    {...methods.register("targetColumn")}
                  />
                  <Input
                    ms={2}
                    size="sm"
                    flex={1}
                    placeholder="키워드를 입력하세요."
                    {...methods.register("keyword")}
                  />
                </Flex>
              </InfoElement>
            </InfoBox>
            <Flex justify="flex-end">
              <Button type="submit" variant="primaryBlue" onClick={handleSearchFormSubmit}>
                조회
              </Button>
            </Flex>
          </FormProvider>
        </VStack>
      </CollapseSection>
      <Section borderTopRadius={0} borderTopWidth={0}>
        <VStack align="stretch" spacing={3}>
          <Flex align="flex-end" justify="space-between">
            <Text fontSize="xs" fontWeight="bold">
              조회수 : {totalCount}명
            </Text>
            <Flex gap={2} justify="flex-end">
              <Button size="sm" type="button" variant="secondaryBlue">
                엑셀 다운로드
              </Button>
            </Flex>
          </Flex>
          <CustomTableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th width="60px">No</Th>
                  <Th width="180px">발신번호</Th>
                  <Th width="180px">수신번호</Th>
                  <Th width="150px">구분</Th>
                  <Th width="150px">발신/수신</Th>
                  <Th>마지막 발신/수신 메시지</Th>
                  <Th width="200px">발신/수신 일시</Th>
                </Tr>
              </Thead>
              <Tbody>
                {consultsData && consultsData.length > 0 ? (
                  consultsData.map((consult, i) => (
                    <Tr key={consult.customKey}>
                      <Td>{totalCount && totalCount - batchSize * (currentPage - 1) - i}</Td>
                      <Td>{formatter.contactFormatter(consult.callerNo)}</Td>
                      <Td>
                        <Button
                          fontWeight="400"
                          variant="link"
                          onClick={() => handleDetailButtonClick(consult)}
                        >
                          {formatter.contactFormatter(consult.receiverNo)}
                        </Button>
                      </Td>
                      <Td>
                        {consult.sendType === "A" ? KEYWORD.SENDTYPE_AUTO : KEYWORD.SENDTYPE_CHAT}
                      </Td>
                      <Td>
                        {consult.callType === "R" ? (
                          <Text>발신</Text>
                        ) : (
                          <Flex align="center" display="inline-flex">
                            <Text>수신</Text>
                            <MailIcon ml={1} />
                          </Flex>
                        )}
                      </Td>
                      <Td>
                        <Button
                          display="flex"
                          gap={1}
                          justifyContent="flex-start"
                          variant="text"
                          maxW="100%"
                          onClick={() => handleDetailButtonClick(consult)}
                        >
                          {consult.message && (
                            <Text
                              color="gray.900"
                              overflow="hidden"
                              textDecoration="underline"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              maxW="100%"
                            >
                              {consult.message}
                            </Text>
                          )}
                          {consult.channel === "M" && <ClipIcon />}
                          {!consult.isRead && <Image src={newIcon} alt="NEW" />}
                        </Button>
                      </Td>
                      <Td>{format(new Date(consult.sendDate), "yyyy-MM-dd HH:mm")}</Td>
                    </Tr>
                  ))
                ) : (
                  <NoDataTr colspan={7} text="조회된 진행중인  상담 내역이 없습니다." />
                )}
              </Tbody>
            </Table>
          </CustomTableContainer>
          <PaginationButtons
            batchSize={batchSize}
            data={consultsData ?? []}
            pageLength={pageLength}
            pagination={pagination}
            onBatchSizeChange={handleBatchSizeChange}
            onPageChange={handlePageChange}
          />
        </VStack>
      </Section>
      <TransformGuideModal
        isOpen={transformGuideModalOpen}
        setModalOpen={setTransformGuideModalOpen}
      />
      {consultData && (
        <ConsultDetailModal
          consultData={consultData}
          isOpen={consultDetailModalOpen}
          setModalOpen={setConsultDetailModalOpen}
        />
      )}
    </TabPanel>
  );
}

export default ConsultTabPanel;
