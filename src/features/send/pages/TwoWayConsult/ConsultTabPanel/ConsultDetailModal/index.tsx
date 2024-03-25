/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CustomCard,
  CustomModal,
  CustomSpinner,
  ImageIcon,
  InfoBox,
  InfoElement,
  LetterIcon,
  StatusText,
  UpdateIcon,
} from "components";
import { KEYWORD } from "features/send";
import formatter from "libs/formatter";
import message from "libs/message";
import ConsultData from "type/ConsultData";
import RobotIcon from "components/Icons/RobotIcon";
import SendMessageArea from "./SendMessageArea";
import TransformModal from "./TransformModal";
import EndConsultModal from "./EndConsultModal";

interface ConsultDetailModalProps {
  consultData: ConsultData;
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}
function ConsultDetailModal({ consultData, isOpen, setModalOpen }: ConsultDetailModalProps) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [msgChannel, setMsgChannel] = useState<string>("SMS");

  // 전환모달
  const [currentStatus, setCurrentStatus] = useState<0 | 1>(1); // 0:종료 1:진행중
  const [currentSendType, setCurrentSendType] = useState<"A" | "C">("C");
  const [transformModalOpen, setTransformModalOpen] = useState<boolean>(false);
  const handleTransformButtonClick = () => {
    setTransformModalOpen(true);
  };

  // 종료모달
  const [endConsultModalOpen, setEndConsultModalOpen] = useState<boolean>(false);
  const handleFinishButtonClick = () => {
    setEndConsultModalOpen(true);
  };

  const handleExcelDownloadButtonClick = () => {
    // TODO: 엑셀 다운로드
    console.log("엑셀 다운로드!");
    // 엑셀 다운로드 완료
    // 엑셀 다운로드를 정상적으로 완료하였습니다.
    // 엑셀 다운로드 오류
    // 엑셀 다운로드 중 알 수 없는 오류가 발생하였습니다.
    // 엑셀 다운로드를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
    // 시스템 관리자에게 문의하기 바랍니다.
  };
  const onClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      // onReset();
    }, 200);
  };

  useEffect(() => {
    if (consultData) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [consultData]);

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalContent minW="768px">
          <ModalHeader> 상담 상세</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading && (
              <Center h={"500px"}>
                <CustomSpinner />
              </Center>
            )}
            {!isLoading && consultData && (
              <VStack align="stretch" spacing={10}>
                <VStack align="stretch" spacing={4}>
                  <Heading as="h4" color="gray.900" fontSize="md" fontWeight="600">
                    메세지 정보
                  </Heading>
                  <InfoBox>
                    <Flex>
                      <InfoElement flex={1} label="발신번호" labelWidth="120px">
                        <Text fontSize="sm">
                          {formatter.contactFormatter(consultData.headerData.callerNo)}
                        </Text>
                      </InfoElement>
                      <InfoElement flex={1} label="등록자" labelWidth="120px">
                        <Text fontSize="sm">
                          {consultData.headerData.userName}({consultData.headerData.userId})
                        </Text>
                      </InfoElement>
                    </Flex>
                    <Flex>
                      <InfoElement flex={1} label="최초 구분" labelWidth="120px">
                        <Text fontSize="sm">
                          {consultData.headerData.firstSendType === "A"
                            ? KEYWORD.SENDTYPE_AUTO
                            : KEYWORD.SENDTYPE_CHAT}
                        </Text>
                      </InfoElement>
                      <InfoElement flex={1} label="최초 일시" labelWidth="120px">
                        <Text fontSize="sm">
                          {format(
                            new Date(consultData.headerData.firstSendDate),
                            "yyyy-MM-dd HH:mm"
                          )}
                        </Text>
                      </InfoElement>
                    </Flex>
                    <Flex>
                      <InfoElement flex={1} label="이름" labelWidth="120px">
                        <Text fontSize="sm">{consultData.headerData.userName}</Text>
                      </InfoElement>
                      <InfoElement flex={1} label="수신(휴대)번호" labelWidth="120px">
                        <Text fontSize="sm">
                          {formatter.contactFormatter(consultData.headerData.receiverNo)}
                        </Text>
                      </InfoElement>
                    </Flex>
                  </InfoBox>
                </VStack>
                <HStack align="stretch" spacing={5}>
                  <Box flex="0 0 320px"></Box>
                  <VStack align="stretch" flex={1} spacing={6}>
                    <VStack
                      align="stretch"
                      bg="gray.100"
                      borderRadius="xl"
                      flexShrink={0}
                      p={5}
                      spacing={7}
                    >
                      <HStack spacing={3}>
                        <Badge size="lg" variant="primaryBlue">
                          {currentSendType === "A" ? <RobotIcon /> : <LetterIcon />}
                        </Badge>
                        <VStack align="flex-start" spacing={0}>
                          <StatusText
                            text={
                              currentStatus === 1 ? KEYWORD.STATUS_PROGRESS : KEYWORD.STATUS_END
                            }
                            colorScheme={currentStatus === 1 ? "success" : "danger"}
                          />
                          <Text color="black" fontWeight="500">
                            {currentSendType === "A"
                              ? KEYWORD.SENDTYPE_AUTO
                              : KEYWORD.SENDTYPE_CHAT}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button
                        alignSelf="flex-end"
                        leftIcon={<UpdateIcon />}
                        size="sm"
                        variant="textGray"
                        onClick={handleTransformButtonClick}
                      >
                        {currentSendType === "A" ? KEYWORD.TRANSFORM_ToC : KEYWORD.TRANSFORM_ToA}
                      </Button>
                    </VStack>
                    <SendMessageArea
                      consultData={consultData}
                      msgChannel={msgChannel}
                      setMsgChannel={setMsgChannel}
                      flex={1}
                    />
                  </VStack>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter gap={2} justifyContent="space-between">
            <Button variant="secondaryGray" onClick={handleFinishButtonClick}>
              상담 종료
            </Button>
            <Button variant="textGray" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
      <EndConsultModal isOpen={endConsultModalOpen} setModalOpen={setEndConsultModalOpen} />
      <TransformModal
        isOpen={transformModalOpen}
        transTo={currentSendType === "A" ? "C" : "A"}
        setCurrentSendType={setCurrentSendType}
        setModalOpen={setTransformModalOpen}
      />
    </>
  );
}

export default React.memo(ConsultDetailModal);
