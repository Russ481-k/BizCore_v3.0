import {
  Button,
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CustomModal,
  CustomSpinner,
  CustomTableContainer,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import { useChangeUser, USERS_OPTION } from "features/user";
import { convertCodeToName } from "libs/converter";
import User from "type/User";
import UserSendCountTotal from "type/UserSendCountTotal";
import SendAuthCount from "../SendAuthCount";

interface SendDetailModalProps {
  isOpen: boolean;
  userData: User | undefined;
  sendData: UserSendCountTotal;
  userIdx: number;
  onRefetchPage: () => void;
  setModalOpen: (open: boolean) => void;
}

interface RecordBooleanProps {
  [key: string]: boolean;
}
interface RecordNumberProps {
  [key: string]: number;
}
interface RecordNumberOrNullProps {
  [key: string]: number | null;
}

const defalutBooleanProps = {
  sms: false,
  lms: false,
  mms: false,
  kkt: false,
  crs: false,
};
const defalutNumberProps = {
  sms: 0,
  lms: 0,
  mms: 0,
  kkt: 0,
  crs: 0,
};
const defalutNullProps = {
  sms: null,
  lms: null,
  mms: null,
  kkt: null,
  crs: null,
};

interface ChangeSendAuth {
  sendAuthorization: {
    isSmsUnlimited: boolean;
    isLmsUnlimited: boolean;
    isMmsUnlimited: boolean;
    isKktUnlimited: boolean;
    isCrsUnlimited: boolean;
  };
  sendCountRequest: {
    smsLimitCount?: number | null;
    lmsLimitCount?: number | null;
    mmsLimitCount?: number | null;
    kktLimitCount?: number | null;
    crsLimitCount?: number | null;
  };
}

function SendDetailModal({
  isOpen,
  userData,
  sendData,
  userIdx,
  onRefetchPage,
  setModalOpen,
}: SendDetailModalProps) {
  const toast = useToast();
  const methods = useForm<ChangeSendAuth>({
    mode: "onBlur",
  });
  const { mutate: changeUser } = useChangeUser();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUse, setIsUse] = useState<RecordBooleanProps>(defalutBooleanProps);
  const [isUnlimited, setIsUnlimited] = useState<RecordBooleanProps>(defalutBooleanProps);
  const [limitCount, setLimitCount] = useState<RecordNumberOrNullProps>(defalutNullProps);
  const [useCount, setUseCount] = useState<RecordNumberProps>(defalutNumberProps);

  const handleRemainCount = useCallback((limit: number | null, use: number) => {
    if (limit !== null) {
      return Number(limit - use);
    } else {
      return "무제한";
    }
  }, []);

  const handleChangeButtonClick = methods.handleSubmit((data) => {
    if (userData) {
      changeUser(
        {
          userIdx: userIdx,
          status: userData.status ?? "W",
          userName: userData.userName,
          positionName: userData.positionName,
          deptCode: userData.deptCode,
          permissionsId: userData.permissionsId,
          wirelessPhoneNumber: userData.wirelessPhoneNumber,
          wiredPhoneNumber: userData.wiredPhoneNumber,
          wiredPhoneNumberPlus: userData.wiredPhoneNumberPlus,
          crsPhoneNumber: userData.crsPhoneNumber,
          isBizCore: true,
          sendAuthorization: {
            isSmsUse: userData.sendAuthorization.isSmsUse,
            isLmsUse: userData.sendAuthorization.isLmsUse,
            isMmsUse: userData.sendAuthorization.isMmsUse,
            isKktUse: userData.sendAuthorization.isKktUse,
            isCrsUse: userData.sendAuthorization.isCrsUse,
            isSmsUnlimited: data.sendAuthorization.isSmsUnlimited,
            isLmsUnlimited: data.sendAuthorization.isLmsUnlimited,
            isMmsUnlimited: data.sendAuthorization.isMmsUnlimited,
            isKktUnlimited: data.sendAuthorization.isKktUnlimited,
            isCrsUnlimited: data.sendAuthorization.isCrsUnlimited,
          },
          sendCountRequest: {
            smsLimitCount: data.sendCountRequest.smsLimitCount ?? null,
            lmsLimitCount: data.sendCountRequest.lmsLimitCount ?? null,
            mmsLimitCount: data.sendCountRequest.mmsLimitCount ?? null,
            kktLimitCount: data.sendCountRequest.kktLimitCount ?? null,
            crsLimitCount: data.sendCountRequest.crsLimitCount ?? null,
          },
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="당월 량 수정 오류" type="ERROR">
                  {error.message}
                  <br />
                  당월 량 수정 중 오류가 발생하였습니다.
                  <br />
                  당월 량 수정을 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템 관리자에게
                  문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="당월 량 수정 완료" type="SUCCESS">
                  당월 량을 정상적으로 수정하였습니다.
                </ToastMessage>
              ),
            });
            onClose();
            onRefetchPage();
          },
        }
      );
    }
  });

  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (userData && sendData) {
      setIsUse({
        sms: userData.sendAuthorization.isSmsUse,
        lms: userData.sendAuthorization.isLmsUse,
        mms: userData.sendAuthorization.isMmsUse,
        kkt: userData.sendAuthorization.isKktUse,
        crs: userData.sendAuthorization.isSmsUse,
      });
      if (sendData.monthLimitData !== null) {
        setIsUnlimited({
          sms: sendData.monthLimitData.isSmsUnlimited,
          lms: sendData.monthLimitData.isLmsUnlimited,
          mms: sendData.monthLimitData.isMmsUnlimited,
          kkt: sendData.monthLimitData.isKktUnlimited,
          crs: sendData.monthLimitData.isCrsUnlimited,
        });
        setLimitCount({
          sms: sendData.monthLimitData.applySmsLimitCount ?? null,
          lms: sendData.monthLimitData.applyLmsLimitCount ?? null,
          mms: sendData.monthLimitData.applyMmsLimitCount ?? null,
          kkt: sendData.monthLimitData.applyKktLimitCount ?? null,
          crs: sendData.monthLimitData.applyCrsLimitCount ?? null,
        });
      } else {
        setIsUnlimited({
          sms: userData.sendAuthorization.isSmsUnlimited,
          lms: userData.sendAuthorization.isLmsUnlimited,
          mms: userData.sendAuthorization.isMmsUnlimited,
          kkt: userData.sendAuthorization.isKktUnlimited,
          crs: userData.sendAuthorization.isCrsUnlimited,
        });
        setLimitCount({
          sms: userData.sendCountRequest?.smsLimitCount ?? null,
          lms: userData.sendCountRequest?.lmsLimitCount ?? null,
          mms: userData.sendCountRequest?.mmsLimitCount ?? null,
          kkt: userData.sendCountRequest?.kktLimitCount ?? null,
          crs: userData.sendCountRequest?.crsLimitCount ?? null,
        });
      }
      setUseCount({
        sms: userData.sendCountRequest?.smsUseCount ?? 0,
        lms: userData.sendCountRequest?.lmsUseCount ?? 0,
        mms: userData.sendCountRequest?.mmsUseCount ?? 0,
        kkt: userData.sendCountRequest?.kktUseCount ?? 0,
        crs: userData.sendCountRequest?.crsUseCount ?? 0,
      });
    }
  }, [userData, sendData]);

  useEffect(() => {
    methods.reset({
      sendAuthorization: {
        isSmsUnlimited: isUnlimited.sms,
        isLmsUnlimited: isUnlimited.lms,
        isMmsUnlimited: isUnlimited.mms,
        isKktUnlimited: isUnlimited.kkt,
        isCrsUnlimited: isUnlimited.crs,
      },
      sendCountRequest: {
        smsLimitCount: limitCount.sms,
        lmsLimitCount: limitCount.lms,
        mmsLimitCount: limitCount.mms,
        kktLimitCount: limitCount.kkt,
        crsLimitCount: limitCount.crs,
      },
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [isUnlimited, limitCount, methods]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent as="form" minW="900px">
        <ModalHeader>당월 량 상세</ModalHeader>
        <ModalCloseButton type="button" />
        <ModalBody>
          {isLoading && (
            <Center h={"500px"}>
              <CustomSpinner />
            </Center>
          )}
          {!isLoading && userData && (
            <VStack align="stretch" spacing={5}>
              <VStack align="stretch" spacing={2}>
                <TipText
                  hasBg
                  text="당월 량을 조정 하신 다음 하단의 [수정] 버튼을 클릭하여 저장하세요."
                />
                <InfoBox>
                  <InfoElement label="상태" labelWidth="130px">
                    <Text fontSize="sm">
                      {userData.status
                        ? convertCodeToName(USERS_OPTION.STATUS, userData.status)
                        : "-"}
                    </Text>
                  </InfoElement>
                  <InfoElement label="아이디" labelWidth="130px">
                    <Text fontSize="sm">{userData.userId ?? "-"}</Text>
                  </InfoElement>
                  <InfoElement label="이름" labelWidth="130px">
                    <Text fontSize="sm">{userData.userName ?? "-"}</Text>
                  </InfoElement>
                </InfoBox>
              </VStack>
              <VStack align="stretch" spacing={2}>
                <Flex align="flex-end" justify="space-between">
                  <Text fontWeight="600" size="xl">
                    당월 량
                  </Text>
                  <TipText size="sm" text="당월 량 조정시 해당월에만 적용됩니다." />
                </Flex>
                <FormProvider {...methods}>
                  <CustomTableContainer>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th width="160px"> 매체</Th>
                          <Th width="130px">기본 월 량</Th>
                          <Th width="130px">당월 된량</Th>
                          <Th width="130px">남은 량</Th>
                          <Th>당월 량 조정</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {[
                          {
                            name: "단문(SMS)",
                            code: "sms",
                            registerNames: {
                              use: "isSmsUse",
                              unlimited: "isSmsUnlimited",
                              count: "smsLimitCount",
                            },
                          },
                          {
                            name: "장문(LMS)",
                            code: "lms",
                            registerNames: {
                              unlimited: "isLmsUnlimited",
                              count: "lmsLimitCount",
                            },
                          },
                          {
                            name: "멀티(MMS)",
                            code: "mms",
                            registerNames: {
                              unlimited: "isMmsUnlimited",
                              count: "mmsLimitCount",
                            },
                          },
                          {
                            name: "알림톡",
                            code: "kkt",
                            registerNames: {
                              unlimited: "isKktUnlimited",
                              count: "kktLimitCount",
                            },
                          },
                          {
                            name: "",
                            code: "crs",
                            registerNames: {
                              unlimited: "isCrsUnlimited",
                              count: "crsLimitCount",
                            },
                          },
                        ].map((item) => {
                          return (
                            <Tr key={`month-send-count-${item.code}`}>
                              <Th>{item.name} 량</Th>
                              <Td>
                                {isUse[item.code]
                                  ? isUnlimited[item.code]
                                    ? "무제한"
                                    : limitCount[item.code]
                                  : "-"}
                              </Td>
                              <Td>{useCount[item.code] || "-"}</Td>
                              <Td>
                                {handleRemainCount(limitCount[item.code], useCount[item.code])}
                              </Td>
                              <Td>
                                {isUse[item.code] ? (
                                  <SendAuthCount
                                    justUnlimited
                                    unlimitedName={item.registerNames.unlimited}
                                    countName={item.registerNames.count}
                                  />
                                ) : (
                                  "-"
                                )}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </CustomTableContainer>
                </FormProvider>
              </VStack>
              <TipText hasBg size="sm">
                <VStack align="stretch" spacing={0.5}>
                  <Flex align="flex-start">
                    <Text as="strong" flexShrink={0} me={1}>
                      기본 월 량:
                    </Text>
                    <Text>매월 1일 초기화되는 운영자의 월 량입니다.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Text as="strong" flexShrink={0} me={1}>
                      당월 된량:
                    </Text>
                    <Text>운영자가 당월 한 수입니다.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Text as="strong" flexShrink={0} me={1}>
                      남은 방송량:
                    </Text>
                    <Text>운영자가 당월 가능한 남은 수입니다.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Text as="strong" flexShrink={0} me={1}>
                      당월 량 조정:
                    </Text>
                    <Text>
                      당월에 한하여 량을 조정할 수 있으며, 당월 량보다 작은 수를 등록하시면
                      <br />
                      해당 운영자는 할 수 없습니다. (남은 량 = 당월 량 조정 – 당월 량)
                    </Text>
                  </Flex>
                </VStack>
              </TipText>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            닫기
          </Button>
          <Button
            isDisabled={!methods.formState.isValid}
            type="submit"
            variant="primaryBlue"
            onClick={handleChangeButtonClick}
          >
            수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default React.memo(SendDetailModal);
