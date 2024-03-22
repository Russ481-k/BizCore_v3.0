import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  ChannelTag,
  CollapseSection,
  CustomModal,
  CustomSelect,
  ErrorIcon,
  InfoBox,
  InfoElement,
  PaginationButtons,
  Section,
  SendIcon,
  SuccessIcon,
  TimeIcon,
} from "components";
import { useGetSendMessageLog } from "features/send";
import formatter from "libs/formatter";
import Message from "type/Message";

interface SendStatusModalProps {
  sendMessageData: Message;
  onClose: () => void;
}

function SendStatusModal({ sendMessageData, onClose }: SendStatusModalProps) {
  const { register, handleSubmit } = useForm<{
    sendStatus: string;
    sendChannel: string;
    resend: string;
    keyword: string;
  }>({ mode: "onBlur" });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [resend, setResend] = useState<string | null>(null);
  const [sendChannel, setSendChannel] = useState<string | null>(null);
  const [sendStatus, setSendStatus] = useState<number | null>(null);

  const {
    data: sendMessagesLogData,
    receiverList,
    totalSendLogCount,
    pagination,
    totalPages: pageLength,
  } = useGetSendMessageLog(
    {
      headId: sendMessageData?.id ?? null,
      sendStatus,
      sendChannel,
      resend,
      keyword,
      page: currentPage,
      size: pageSize,
    },
    { enabled: !!sendMessageData?.id && isEnableQuery }
  );

  const handleFormSubmit = handleSubmit(
    (data: {
      sendStatus: string;
      sendChannel: string;
      resend: string;
      keyword: string;
    }) => {
      setSendStatus(data.sendStatus === "ALL" ? null : Number(data.sendStatus));
      setSendChannel(data.sendChannel === "ALL" ? null : data.sendChannel);
      setResend(data.resend === "ALL" ? null : data.resend);
      setKeyword(data.keyword);
      setEnableQuery(true);
    }
  );
  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setEnableQuery(true);
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
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="1200px">
        <ModalHeader>발송 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" py={5} id="send-modal">
          <Flex flexDirection="column">
            <CollapseSection
              headerTitle="발송 정보"
              borderBottomWidth={0}
              borderBottomRadius={0}
            >
              <InfoBox>
                <Flex>
                  <InfoElement flex={1} label="발송채널" labelWidth="130px">
                    <ChannelTag
                      channelType={sendMessageData?.channelType ?? "SMS"}
                    />
                  </InfoElement>
                  <InfoElement flex={1} label="발송 일시" labelWidth="130px">
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Text>
                        {sendMessageData &&
                          format(
                            new Date(sendMessageData?.reqDate),
                            "yyyy-MM-dd HH:mm"
                          )}
                      </Text>
                    </Flex>
                  </InfoElement>
                </Flex>
                <Flex>
                  <InfoElement flex={1} label="담당자" labelWidth="130px">
                    <Text>
                      {sendMessageData && sendMessageData?.createUser}
                    </Text>
                  </InfoElement>
                  <InfoElement flex={1} label="등록 일시" labelWidth="130px">
                    {sendMessageData &&
                      format(
                        new Date(sendMessageData?.createDate),
                        "yyyy-MM-dd HH:mm"
                      )}
                  </InfoElement>
                </Flex>
              </InfoBox>
            </CollapseSection>
            <CollapseSection
              headerTitle="수신 대상자 정보"
              borderBottomWidth={0}
              borderRadius={0}
            >
              <Section flexWrap="wrap" gap={8} justifyContent="left" px={6}>
                <Flex alignItems="center" gap={2}>
                  <SendIcon boxSize={4} fill="primary.800" />
                  <Text as="span" fontSize="sm">
                    발송수: {totalSendLogCount ?? 0}명
                  </Text>
                </Flex>
                <Divider
                  borderColor="gray.400"
                  borderWidth={1}
                  height="18px"
                  orientation="vertical"
                />
                <Flex flexWrap="wrap" gap={8}>
                  <Flex alignItems="center" gap={2}>
                    <SuccessIcon boxSize={4} fill="primary.800" />
                    <Text as="span" fontSize="sm">
                      성공 : {sendMessagesLogData?.successSendCount ?? 0}명 (
                      {sendMessagesLogData?.successPercent}%)
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap={2}>
                    <TimeIcon boxSize={4} fill="primary.800" />
                    <Text as="span" fontSize="sm">
                      대기 : {sendMessagesLogData?.readySendCount ?? 0}명 (
                      {sendMessagesLogData?.readyPercent}%)
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap={2}>
                    <ErrorIcon boxSize={4} fill="primary.800" />
                    <Text as="span" fontSize="sm">
                      실패 : {sendMessagesLogData?.failSendCount ?? 0}명 (
                      {sendMessagesLogData?.failPercent}%)
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap={2}>
                    <ErrorIcon boxSize={4} fill="primary.800" />
                    <Text as="span" fontSize="sm">
                      대체 발송 : {sendMessagesLogData?.totalResendCount ?? 0}명
                      ( 성공 : {sendMessagesLogData?.successResendCount ?? 0}건
                      / 실패 :{sendMessagesLogData?.failResendCount ?? 0}건 )
                    </Text>
                  </Flex>
                </Flex>
              </Section>
              <InfoBox as="form" onSubmit={handleFormSubmit}>
                <Flex>
                  <InfoElement flex={1} label="수신 상태" labelWidth="130px">
                    <CustomSelect
                      codes={[
                        { code: "ALL", name: "전체" },
                        { code: "0", name: "성공" },
                        { code: "2", name: "대기" },
                        { code: "1", name: "실패" },
                      ]}
                      size="sm"
                      {...register("sendStatus")}
                    />
                  </InfoElement>
                  <InfoElement flex={1} label="발송 채널" labelWidth="130px">
                    <CustomSelect
                      codes={[
                        { code: "ALL", name: "전체" },
                        { code: "SMS", name: "SMS" },
                        { code: "LMS", name: "LMS" },
                        { code: "MMS", name: "MMS" },
                      ]}
                      size="sm"
                      {...register("sendChannel")}
                    />
                  </InfoElement>
                  <InfoElement flex={1} label="대체 발송" labelWidth="130px">
                    <CustomSelect
                      codes={[
                        { code: "ALL", name: "전체" },
                        { code: "0", name: "성공" },
                        { code: "1", name: "실패" },
                      ]}
                      disabled={sendMessageData?.channelType !== "KKT"}
                      size="sm"
                      {...register("resend")}
                    />
                  </InfoElement>
                </Flex>
                <InfoElement label="키워드" labelWidth="130px">
                  <Flex gap={3} w="100%">
                    <Input
                      placeholder="검색어를 입력해주세요."
                      size="sm"
                      {...register("keyword")}
                    />
                    <Button size="sm" type="submit" variant="secondaryBlue">
                      검색
                    </Button>
                  </Flex>
                </InfoElement>
              </InfoBox>
            </CollapseSection>
            <Flex
              backgroundColor="white"
              borderBottomRadius="12px"
              borderColor="gray.300"
              borderWidth="1px"
              flexDirection="column"
              p={3}
            >
              <Flex flex={1} gap={3} width="100%">
                <Flex flexDirection="column" gap={2} width="100%">
                  <Flex flexDirection="column" gap={2} width="100%">
                    <HStack>
                      <Text fontSize="xs" fontWeight="bold">
                        검색결과 : {totalSendLogCount ?? 0} 건
                      </Text>
                      <Flex flex={1} gap={2} justifyContent="flex-end">
                        <Button
                          size="sm"
                          type="button"
                          variant="secondaryBlue"
                          width="100px"
                        >
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
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        justifyContent="space-between"
                      >
                        <Text flex={1} px={2} py={3} textAlign="center">
                          발송채널
                        </Text>
                        <Text flex={1} px={2} py={3} textAlign="center">
                          이름
                        </Text>
                        <Text flex={2} px={2} py={3} textAlign="center">
                          수신(휴대)번호
                        </Text>
                        <Text flex={7} px={2} py={3} textAlign="center">
                          메시지 내용
                        </Text>
                        <Text flex={1} px={2} py={3} textAlign="center">
                          수신상태
                        </Text>
                        <Text flex={1} px={2} py={3} textAlign="center">
                          대체발송
                        </Text>
                      </Flex>
                      {!totalSendLogCount ? (
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
                        receiverList?.map((logData, i) => (
                          <Flex
                            alignItems="center"
                            borderBottomWidth={1}
                            flex={1}
                            fontSize="sm"
                            justifyContent="space-between"
                            key={logData.id + "-" + i}
                            width="100%"
                            _hover={{
                              backgroundColor: "gray.50",
                            }}
                          >
                            <Text flex={1} px={2} py={3} textAlign="center">
                              <ChannelTag channelType={logData.type} />
                            </Text>
                            <Text flex={1} px={2} py={3} textAlign="center">
                              {logData.etc3 ?? "-"}
                            </Text>
                            <Text flex={2} px={2} py={3} textAlign="center">
                              {formatter.contactFormatter(
                                logData.phone
                                  .replace(/[^0-9]/g, "")
                                  .substring(0, 11)
                              ) ?? "-"}
                            </Text>
                            <Text
                              flex={7}
                              overflow="hidden"
                              px={2}
                              py={3}
                              textAlign="left"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {logData.msg ?? "-"}
                            </Text>
                            <Text flex={1} px={2} py={3} textAlign="center">
                              {logData.rslt === "0" && "성공"}
                              {logData.rslt === null && "대기"}
                              {logData.rslt !== "0" &&
                                logData.rslt !== null &&
                                "실패"}
                            </Text>
                            <Text flex={1} px={2} py={3} textAlign="center">
                              {logData.rsltResend ? (
                                <ChannelTag channelType={logData.rsltResend} />
                              ) : (
                                "-"
                              )}
                            </Text>
                          </Flex>
                        ))
                      )}
                    </Box>
                  </Flex>
                  <PaginationButtons
                    batchSize={pageSize}
                    data={receiverList ?? []}
                    pageLength={pageLength}
                    pagination={pagination}
                    onBatchSizeChange={handleBatchSizeChange}
                    onPageChange={handlePageChange}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between" gap={2}>
          <Flex />
          <Button variant="textGray" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default SendStatusModal;
