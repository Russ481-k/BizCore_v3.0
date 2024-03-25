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
  Tag,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
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
} from "components";
import { useGetSendTwoWayMessageLog } from "features/send";
import formatter from "libs/formatter";

interface SendStatusModalProps {
  sendMessageId: number;
  onClose: () => void;
}

function SendStatusModal({ sendMessageId, onClose }: SendStatusModalProps) {
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
  const [sendChannel, setSendChannel] = useState<string | null>(null);
  const [sendStatus, setSendStatus] = useState<number | null>(null);

  const {
    data: sendMessagesLogData,
    channel,
    createDate,
    createUser,
    failPercent,
    failSendCount,
    successPercent,
    successSendCount,
    sendDate,
    pagination,
    totalPages,
    totalSendLogCount,
  } = useGetSendTwoWayMessageLog(
    {
      headId: sendMessageId ?? null,
      sendStatus,
      sendChannel,
      keyword,
      page: currentPage,
      size: pageSize,
    },
    { enabled: !!sendMessageId && isEnableQuery }
  );

  const handleFormSubmit = handleSubmit(
    (data: { sendStatus: string; sendChannel: string; resend: string; keyword: string }) => {
      setSendStatus(data.sendStatus === "ALL" ? null : Number(data.sendStatus));
      setSendChannel(data.sendChannel === "ALL" ? null : data.sendChannel);
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
        <ModalHeader> 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody id="send-modal">
          <Flex flexDirection="column">
            <CollapseSection headerTitle=" 정보" borderBottomWidth={0} borderBottomRadius={0}>
              <InfoBox>
                <Flex>
                  <InfoElement flex={1} label="채널" labelWidth="130px">
                    {channel === "SHORT" && (
                      <Tag backgroundColor="channel.sms.bg" color="channel.sms.text" size="sm">
                        단문 (SMS)
                      </Tag>
                    )}
                    {channel === "LONG" && (
                      <Tag backgroundColor="channel.lms.bg" color="channel.lms.text" size="sm">
                        장문 (LMS)
                      </Tag>
                    )}
                    {channel === "MULTI" && (
                      <Tag backgroundColor="channel.mms.bg" color="channel.mms.text" size="sm">
                        멀티 (MMS)
                      </Tag>
                    )}
                  </InfoElement>
                  <InfoElement flex={1} label=" 일시" labelWidth="130px">
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>{sendDate ? format(new Date(sendDate), "yyyy-MM-dd HH:mm") : "-"}</Text>
                    </Flex>
                  </InfoElement>
                </Flex>
                <Flex>
                  <InfoElement flex={1} label="담당자" labelWidth="130px">
                    <Text>{createUser ?? "-"}</Text>
                  </InfoElement>
                  <InfoElement flex={1} label="등록 일시" labelWidth="130px">
                    {createDate ? format(new Date(createDate), "yyyy-MM-dd HH:mm") : "-"}
                  </InfoElement>
                </Flex>
              </InfoBox>
            </CollapseSection>
            <CollapseSection headerTitle="수신 대상자 정보" borderBottomWidth={0} borderRadius={0}>
              <Section flexWrap="wrap" gap={8} justifyContent="left" px={6}>
                <Flex alignItems="center" gap={2}>
                  <SendIcon boxSize={4} fill="primary.800" />
                  <Text as="span" fontSize="sm">
                    수: {totalSendLogCount ?? 0}명
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
                      성공 : {successSendCount ?? 0}명 ({successPercent ?? 0}%)
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap={2}>
                    <ErrorIcon boxSize={4} fill="primary.800" />
                    <Text as="span" fontSize="sm">
                      실패 : {failSendCount ?? 0}명 ({failPercent ?? 0}%)
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
                        { code: "1", name: "성공" },
                        { code: "0", name: "실패" },
                      ]}
                      size="sm"
                      {...register("sendStatus")}
                    />
                  </InfoElement>
                  <InfoElement flex={1} label=" 채널" labelWidth="130px">
                    <CustomSelect
                      codes={[
                        { code: "S", name: "SMS" },
                        { code: "L", name: "LMS" },
                        { code: "M", name: "MMS" },
                      ]}
                      placeholder="전체"
                      size="sm"
                      {...register("sendChannel")}
                    />
                  </InfoElement>
                </Flex>
                <InfoElement label="키워드" labelWidth="130px">
                  <Input placeholder="검색어를 입력해주세요." size="sm" {...register("keyword")} />
                  <Button size="sm" type="submit" variant="secondaryBlue">
                    검색
                  </Button>
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
                        <Button size="sm" type="button" variant="secondaryBlue" width="100px">
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
                          채널
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
                        sendMessagesLogData?.map((logData, i) => (
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
                              {logData.channel === "SHORT" && (
                                <Tag
                                  backgroundColor="channel.sms.bg"
                                  color="channel.sms.text"
                                  size="sm"
                                >
                                  단문 (SMS)
                                </Tag>
                              )}
                              {logData.channel === "LONG" && (
                                <Tag
                                  backgroundColor="channel.lms.bg"
                                  color="channel.lms.text"
                                  size="sm"
                                >
                                  장문 (LMS)
                                </Tag>
                              )}
                              {logData.channel === "MULTI" && (
                                <Tag
                                  backgroundColor="channel.mms.bg"
                                  color="channel.mms.text"
                                  size="sm"
                                >
                                  멀티 (MMS)
                                </Tag>
                              )}
                            </Text>
                            <Text flex={1} px={2} py={3} textAlign="center">
                              {logData.receiverName ?? "-"}
                            </Text>
                            <Text flex={2} px={2} py={3} textAlign="center">
                              {formatter.contactFormatter(
                                logData.receiverNo.replace(/[^0-9]/g, "").substring(0, 11)
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
                              {logData.message ?? "-"}
                            </Text>
                            <Text flex={1} px={2} py={3} textAlign="center">
                              {logData.result === "1" && "성공"}
                              {logData.result === "0" && "실패"}
                            </Text>
                          </Flex>
                        ))
                      )}
                    </Box>
                  </Flex>
                  <PaginationButtons
                    batchSize={pageSize}
                    data={sendMessagesLogData ?? []}
                    pageLength={totalPages}
                    pagination={pagination}
                    onBatchSizeChange={handleBatchSizeChange}
                    onPageChange={handlePageChange}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
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
