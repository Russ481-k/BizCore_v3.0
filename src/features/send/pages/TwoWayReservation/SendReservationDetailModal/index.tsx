import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChangeReservationTimeModal,
  CollapseSection,
  CustomModal,
  CustomTableContainer,
  InfoBox,
  InfoElement,
  PaginationButtons,
  TipText,
  ToastMessage,
} from "components";
import {
  useCancelReservedTwoWayMessage,
  useDeleteTwoWaySubjects,
  useGetReservedTwoWayMessageDetail,
  useGetReservedTwoWayMessageSubjects,
} from "features/send";
import formatter from "libs/formatter";
import Subject from "type/Subject";
import ChangeReservedMessageModal from "./ChangeReservedMessageModal";
import DeleteReservedMessageCheckModal from "./DeleteReservedMessageCheckModal";
import DeleteSubjectsCheckModal from "./DeleteSubjectsCheckModal";
import PreviewPanel from "./PreviewPanel";

interface SendReservationDetailModalProps {
  changeMessage: boolean;
  messageId?: number | null;
  onChange: (subjects: Array<Subject>) => void;
  onClose: () => void;
}

function SendReservationDetailModal({
  changeMessage,
  messageId,
  onChange,
  onClose,
}: SendReservationDetailModalProps) {
  const toast = useToast();
  const navigate = useNavigate();

  const [changeReservationTimeModalOpen, setChangeReservationTimeModalOpen] =
    useState<boolean>(false);
  const [deleteReservedMessageCheckModalOpen, setDeleteReservedMessageCheckModalOpen] =
    useState<boolean>(false);
  const [changeReservedMessageModalOpen, setChangeReservedMessageModalOpen] =
    useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [checkedSubject, setCheckedSubject] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [deleteSubjectsCheckModalOpen, setDeleteSubjectsCheckModalOpen] = useState<boolean>(false);
  const [imageURLs] = useState<string[]>([]);
  const [messageContents, setMessageContents] = useState<string | null>();

  const { data: messageData, refetch: refetchReservedMessageDetail } =
    useGetReservedTwoWayMessageDetail(
      {
        headId: messageId ?? null,
      },
      { enabled: !!messageId }
    );
  const {
    data: subjects,
    refetch: refetchSubjects,
    pagination,
    pageLength,
    totalCount,
  } = useGetReservedTwoWayMessageSubjects(
    {
      headId: messageId ?? null,
      currentPage,
    },
    {
      enabled: !!messageId,
    }
  );
  const { mutate: deleteSubjects, isLoading: isDeleteSubjectsLoading } = useDeleteTwoWaySubjects();
  const { mutate: cancelReservedMessage, isLoading: isCancelReservedMessageLoading } =
    useCancelReservedTwoWayMessage();

  const isAllChecked = !!checkedItems.length && checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !isAllChecked;

  const expiredSendReserved = () => {
    toast({
      render: () => (
        <ToastMessage title="예약  일시가 도래하여 이 완료되었습니다." type="ERROR">
          <Text>예약 일시가 도래하여 이 완료되었습니다. </Text>
          <br />
          <Text> 정보는 전송 현황 페이지에서 확인하세요</Text>
        </ToastMessage>
      ),
      duration: 5000,
    });
  };

  const handleCheckboxCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxArray = subjects?.map(() => e.target.checked) ?? [];
    setCheckedItems([...checkboxArray]);
    if (e.target.checked) {
      setCheckedSubject(subjects?.map((data) => String(data.id)) ?? []);
    } else {
      setCheckedSubject([]);
    }
  };

  const handleDeleteSubjectsCheckModalClose = () => {
    setDeleteSubjectsCheckModalOpen(false);
  };
  const handleDeleteSubjectsCheckModalOpen = () => {
    setDeleteSubjectsCheckModalOpen(true);
  };
  const handleChangeReservationTimeModalClose = () => {
    setChangeReservationTimeModalOpen(false);
    refetchReservedMessageDetail();
  };
  const handleChangeReservationTimeModalOpen = () => {
    setChangeReservationTimeModalOpen(true);
  };
  const handleChangeReservedMessageModalClose = () => {
    setChangeReservedMessageModalOpen(false);
  };
  const handleChangeReservedMessageModalOpen = () => {
    setChangeReservedMessageModalOpen(true);
  };
  const handleChangeReservedButtonClick = () => {
    handleChangeReservedMessageModalOpen();
  };
  const handleDeleteReservedMessageCheckModalClose = () => {
    setDeleteReservedMessageCheckModalOpen(false);
  };
  const handleDeleteReservedMessageCheckModalOpen = () => {
    setDeleteReservedMessageCheckModalOpen(true);
  };
  const handleChangeReserved = () => {
    if (
      false
      // 10분 전의 예약건 수정 조건
    ) {
      return expiredSendReserved();
    }
    cancelReservedMessage(
      { id: messageId ?? 0 },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="수신 대상자 전체 삭제 오류" type="ERROR">
                <Text>수신 대상자 전체 삭제 중 알 수 없는 오류가 발생하였습니다.</Text>
                <Text>
                  수신 대상자 전체 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
                  관리자에게 문의하기 바랍니다.
                </Text>
              </ToastMessage>
            ),
            duration: 5000,
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="수신 대상자 전체 삭제 완료" type="SUCCESS">
                <Text>수신 대상자 전체 삭제가 정상적으로 완료되고</Text>
                <Text>예약 이 취소되었습니다.</Text>
              </ToastMessage>
            ),
          });
          navigate("/two-way/send-message");
        },
      }
    );
  };
  const handleDeleteReservedMessage = () => {
    if (
      false
      // 10분 전의 예약건 수정 조건
    ) {
      return expiredSendReserved();
    }
    cancelReservedMessage(
      { id: messageId ?? 0 },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="수신 대상자 전체 삭제 오류" type="ERROR">
                <Text>수신 대상자 전체 삭제 중 알 수 없는 오류가 발생하였습니다.</Text>
                <Text>
                  수신 대상자 전체 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
                  관리자에게 문의하기 바랍니다.
                </Text>
              </ToastMessage>
            ),
            duration: 5000,
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="수신 대상자 전체 삭제 완료" type="SUCCESS">
                <Text>수신 대상자 전체 삭제가 정상적으로 완료되고</Text>
                <Text>예약 이 취소되었습니다.</Text>
              </ToastMessage>
            ),
          });
          onClose();
        },
      }
    );
  };
  const handleReceiverDeleteClick = () => {
    if (isAllChecked) {
      cancelReservedMessage(
        { id: messageId ?? 0 },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="수신 대상자 전체 삭제 오류" type="ERROR">
                  <Text>{error.message}</Text>
                </ToastMessage>
              ),
              duration: 5000,
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="수신 대상자 전체 삭제 완료" type="SUCCESS">
                  <Text>수신 대상자 전체 삭제가 정상적으로 완료되고</Text>
                  <Text>예약 이 취소되었습니다.</Text>
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    } else {
      const result = subjects
        ?.filter((_, i) => {
          return checkedItems[i];
        })
        .map((data) => {
          return data.id;
        });
      deleteSubjects(
        {
          data: result ?? [],
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="수신 대상자 삭제 오류" type="ERROR">
                  <Text>수신 대상자 삭제 중 알 수 없는 오류가 발생하였습니다.</Text>
                  <Text>
                    수신 대상자 삭제를 클릭하여 수신 대상자를 다시 삭제하세요. 본 오류가 계속
                    발생하는 경우 시스템 관리자에게 문의하기 바랍니다.
                  </Text>
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="수신 대상자 삭제 완료" type="SUCCESS">
                  선택한 수신 대상자를 정상적으로 삭제하였습니다.
                </ToastMessage>
              ),
            });
            refetchReservedMessageDetail();
            refetchSubjects();
            setCheckedSubject([]);
          },
        }
      );
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setMessageContents(messageData?.message);
  }, [messageData]);

  useEffect(() => {
    if (!!subjects?.length) {
      const checkboxArray = subjects?.map(() => false);
      setCheckedItems([...checkboxArray]);
    }
  }, [subjects, onChange]);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="1200px">
        <ModalHeader> 예약 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={3}>
            <CollapseSection headerTitle=" 예약  정보">
              <InfoBox>
                <Flex>
                  <InfoElement flex={1} label="채널">
                    {messageData?.channel === "SHORT" && (
                      <Tag backgroundColor="channel.sms.bg" color="channel.sms.text" size="md">
                        단문 (SMS)
                      </Tag>
                    )}
                    {messageData?.channel === "LONG" && (
                      <Tag backgroundColor="channel.lms.bg" color="channel.lms.text" size="md">
                        장문 (LMS)
                      </Tag>
                    )}
                    {messageData?.channel === "MULTI" && (
                      <Tag backgroundColor="channel.mms.bg" color="channel.mms.text" size="md">
                        멀티 (MMS)
                      </Tag>
                    )}
                  </InfoElement>
                  <InfoElement flex={1} label="예약  일시">
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>
                        {messageData && format(new Date(messageData?.reqDate), "yyyy-MM-dd HH:mm")}
                      </Text>
                      <Button
                        size="sm"
                        variant="secondaryBlue"
                        onClick={handleChangeReservationTimeModalOpen}
                      >
                        예약 일시 수정
                      </Button>
                    </Flex>
                  </InfoElement>
                </Flex>
                <Flex>
                  <InfoElement flex={1} label="담당자">
                    <Text>{messageData && messageData?.createUser}</Text>
                  </InfoElement>
                  <InfoElement flex={1} label="등록일시">
                    {messageData && format(new Date(messageData?.createDate), "yyyy-MM-dd HH:mm")}
                  </InfoElement>
                </Flex>
              </InfoBox>
            </CollapseSection>
            <Flex flex={1} flexDirection="row" gap={3} width="100%">
              <Tabs align="start" variant="enclosed" width="100%">
                <TabList>
                  <Tab> 메시지 정보</Tab>
                  <Tab>
                    수신 대상자
                    <Tag
                      backgroundColor="gray.100"
                      borderColor="gray.300"
                      borderWidth={1}
                      color="gray.800"
                      ml={2}
                    >
                      {totalCount}명
                    </Tag>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InfoBox>
                      <InfoElement label="발신번호" labelWidth="130px">
                        <Flex gap={2} justifyContent="space-between" py={2} width="100%">
                          <Input
                            isDisabled
                            maxWidth="250px"
                            minWidth="150px"
                            size="sm"
                            value={formatter.contactFormatter(
                              messageData &&
                                String(messageData.callerNo)
                                  ?.replace(/[^0-9]/g, "")
                                  .substring(0, 11)
                            )}
                          />
                        </Flex>
                      </InfoElement>
                      <InfoElement label="구분" labelWidth="130px">
                        {messageData?.sendType === "CHATTING" && "안내"}
                        {messageData?.sendType === "AUTO" && "문자상담"}
                      </InfoElement>
                      <InfoElement label="메시지 내용" labelWidth="130px">
                        <Flex flexDirection="column" gap={2} py={2} width="100%">
                          <Textarea
                            backgroundColor="gray.50"
                            borderColor="gray.600"
                            borderRadius="8px"
                            defaultValue={messageData?.message}
                            fontSize="xs"
                            isDisabled
                            minHeight="200px"
                            size="sm"
                            width="100%"
                          />
                        </Flex>
                      </InfoElement>
                      <InfoElement label="이미지 첨부" labelWidth="130px">
                        {imageURLs.length > 0 ? (
                          <Flex gap={2}>
                            {imageURLs.map((imagesURL, index) => (
                              <Flex id={`${imagesURL}-${index}`} key={`${imagesURL}-${index}`}>
                                <Flex
                                  backgroundImage={imagesURL}
                                  backgroundPosition="center"
                                  backgroundRepeat="no-repeat"
                                  backgroundSize="cover"
                                  gap={1}
                                  height="100px"
                                  justifyContent="right"
                                  p={1}
                                  width="100px"
                                />
                              </Flex>
                            ))}
                          </Flex>
                        ) : (
                          <TipText size="sm" text="등록된 이미지가 없습니다." />
                        )}
                      </InfoElement>
                    </InfoBox>
                  </TabPanel>
                  <TabPanel>
                    <Flex flex={1}>
                      <HStack justifyContent="space-between" width="100%">
                        <Text fontSize="xs" fontWeight="bold">
                          대상자 수 : {totalCount} 명
                        </Text>
                        <Flex flex={1} gap={2} justifyContent="flex-end" px={4}></Flex>
                      </HStack>
                    </Flex>
                    <Box height="440px" overflow="auto" width="100%" mb={2}>
                      <CustomTableContainer>
                        <Table>
                          <Thead>
                            <Tr>
                              <Th alignItems="center" width="20px">
                                <Checkbox
                                  borderColor="gray.500"
                                  disabled={totalCount === 0}
                                  isChecked={isAllChecked}
                                  isIndeterminate={isIndeterminate}
                                  px={1}
                                  py={1}
                                  onChange={(e) => handleCheckboxCheckAll(e)}
                                />
                              </Th>
                              <Th>이름</Th>
                              <Th>휴대폰번호</Th>
                              <Th>전화번호</Th>
                              <Th>변수1</Th>
                              <Th>변수2</Th>
                              <Th>변수3</Th>
                              <Th>변수4</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {subjects?.map((subject, i) => {
                              return (
                                <Tr key={subject.id + "-" + i}>
                                  <Td>
                                    <Checkbox
                                      borderColor="gray.500"
                                      isChecked={checkedItems[i]}
                                      px={1}
                                      py={1}
                                      onChange={(e) => {
                                        checkedItems[i] = e.target.checked;
                                        setCheckedItems([...checkedItems]);
                                        e.target.checked
                                          ? setCheckedSubject([
                                              ...checkedSubject,
                                              String(subject.id),
                                            ])
                                          : setCheckedSubject(
                                              checkedSubject.filter(
                                                (id) => Number(id) !== subject.id
                                              )
                                            );
                                      }}
                                    />
                                  </Td>
                                  <Td px={1} textAlign="center">
                                    <Text borderColor="gray.50" size="sm" textAlign="center">
                                      {subject.receiverName}
                                    </Text>
                                  </Td>
                                  <Td px={1} textAlign="center">
                                    <Text borderColor="gray.50" size="sm" textAlign="center">
                                      {formatter.contactFormatter(subject.receiverNo)}
                                    </Text>
                                  </Td>
                                  <Td px={1} textAlign="center">
                                    <Text borderColor="gray.50" size="sm" textAlign="center">
                                      {formatter.contactFormatter(subject.callNumber)}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text borderColor="gray.50" size="sm">
                                      {subject.setValue1}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text borderColor="gray.50" size="sm">
                                      {subject.setValue2}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text borderColor="gray.50" size="sm">
                                      {subject.setValue3}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text borderColor="gray.50" size="sm">
                                      {subject.setValue4}
                                    </Text>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </CustomTableContainer>
                    </Box>
                    <PaginationButtons
                      data={subjects ?? []}
                      isAllChecked={checkedItems.length === totalCount && isAllChecked}
                      isIndeterminate={
                        (checkedItems.length > 0 || checkedItems.length < (totalCount ?? 0)) &&
                        isIndeterminate
                      }
                      pageLength={pageLength}
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      onSelectionDelete={
                        !isDeleteSubjectsLoading || isCancelReservedMessageLoading
                          ? handleDeleteSubjectsCheckModalOpen
                          : () => {}
                      }
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Flex>
                <PreviewPanel
                  channel={messageData?.channel}
                  imageURLs={imageURLs}
                  messageContents={messageContents}
                />
              </Flex>
            </Flex>
          </Flex>
          {deleteSubjectsCheckModalOpen && (
            <DeleteSubjectsCheckModal
              selectedAll={isAllChecked}
              onClose={handleDeleteSubjectsCheckModalClose}
              onDelete={handleReceiverDeleteClick}
            />
          )}
        </ModalBody>
        <ModalFooter justifyContent="space-between" gap={2}>
          {changeMessage ? (
            <Button variant="secondaryGray" onClick={handleDeleteReservedMessageCheckModalOpen}>
              예약 취소
            </Button>
          ) : (
            <Flex></Flex>
          )}
          <Flex>
            <Button mr={3} variant="primaryBlue" onClick={handleChangeReservedButtonClick}>
              예약 수정
            </Button>
            <Button variant="textGray" onClick={onClose}>
              닫기
            </Button>
          </Flex>
        </ModalFooter>
        {changeReservationTimeModalOpen && (
          <ChangeReservationTimeModal
            changeTime={true}
            twoWay={true}
            messageId={messageId}
            onClose={handleChangeReservationTimeModalClose}
          />
        )}
        {changeReservedMessageModalOpen && (
          <ChangeReservedMessageModal
            onChange={handleChangeReserved}
            onClose={handleChangeReservedMessageModalClose}
          />
        )}
        {deleteReservedMessageCheckModalOpen && (
          <DeleteReservedMessageCheckModal
            onDelete={handleDeleteReservedMessage}
            onClose={handleDeleteReservedMessageCheckModalClose}
          />
        )}
      </ModalContent>
    </CustomModal>
  );
}

export default SendReservationDetailModal;
