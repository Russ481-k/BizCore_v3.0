import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import {
  CustomModal,
  CustomSelect,
  CustomSpinner,
  EditUserImage,
  InfoBox,
  InfoElement,
  QuestionMarkTooltip,
  TipText,
  ToastMessage,
} from "components";
import {
  useChangeUser,
  useDeleteUser,
  useResetPwd,
  USERS_OPTION,
} from "features/user";
import authService from "libs/authService";
import {
  convertCodeToName,
  convertJSONToNumbers,
  convertNameToCode,
  convertNumbersToJSON,
} from "libs/converter";
import formatter from "libs/formatter";
import message from "libs/message";
import pattern from "libs/pattern";
import { useAppSelector } from "storage/redux/hooks";
import Department from "type/Department";
import FieldNumber from "type/FieldNumbers";
import Option from "type/Option";
import SendAuth from "type/SendAuth";
import SendCount from "type/SendCount";
import User from "type/User";
import UserListItem from "type/UserListItem";
import SelectDeptModal from "../SelectDeptModal";
import SendAuthCount from "../SendAuthCount";
import SendCrsNums from "../SendCrsNums";
import SendPhoneNums from "../SendPhoneNums";
import DeleteUserCheckModal from "./DeleteUserCheckModal";
import ResetPwdModal from "./ResetPwdModal";

interface ManageUserModalProps {
  isModify: boolean;
  isOpen: boolean;
  permissionOptions: Option[];
  userData: User | undefined;
  userIdx: number;
  onRefetchPage: () => void;
  setModalOpen: (open: boolean) => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserListItem | null>>;
}

interface ChangeUser {
  status: string;
  userId: string;
  userName: string;
  positionCode: string;
  deptCode: string | null;
  deptName: string | null;
  permissionsId: number | null;
  wirelessPhoneNumber?: string | null;
  wiredPhoneNumbers?: FieldNumber[] | undefined;
  crsPhoneNumbers?: FieldNumber[] | undefined;
  sendAuthorization: SendAuth;
  sendCountRequest: SendCount;
}

const usedCrsService: boolean = true;

function ManageUserModal({
  isModify,
  isOpen,
  permissionOptions,
  userData,
  userIdx,
  onRefetchPage,
  setModalOpen,
  setSelectedUser,
}: ManageUserModalProps) {
  const toast = useToast();
  const currentIdx = useAppSelector((state) => state.user.profile.userIdx);

  const [changedDept, setChangedDept] = useState<Department | null>({
    deptCode: "",
    deptName: "부서 미지정",
  });
  const [defaultValues, setDefaultValues] = useState<ChangeUser | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [deleteCheckModalOpen, setDeleteCheckModalOpen] = useState(false);
  const [selectDeptModalOpen, setSelectDeptModalOpen] =
    useState<boolean>(false);
  const [resetPwdModalOpen, setResetPwdModalOpen] = useState(false);

  const methods = useForm<ChangeUser>({
    mode: "onBlur",
  });
  const watchSendAuthorization = useWatch({
    control: methods.control,
    name: "sendAuthorization",
  });

  const { mutate: changeUser } = useChangeUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: resetPwd } = useResetPwd();

  const handleChangeDeptButtonClick = () => {
    setSelectDeptModalOpen(true);
  };
  const handleDeleteButtonClick = () => {
    setDeleteCheckModalOpen(true);
  };
  const handleResetPwdButtonClick = () => {
    setResetPwdModalOpen(true);
  };

  const handleChangeButtonClick = methods.handleSubmit((data) => {
    const positionNameParam = convertCodeToName(
      USERS_OPTION.POSITION,
      data.positionCode
    );
    const deptCodeParam = changedDept?.deptCode;
    const permissionIdParam = Number(data.permissionsId);
    const wiredPhoneNumberParam =
      data?.wiredPhoneNumbers?.[0].number.toString();
    let wiredPhoneNumberPlusParam = "";
    let crsPhoneNumberParam = "";

    if (data?.wiredPhoneNumbers && data.wiredPhoneNumbers.length > 1) {
      wiredPhoneNumberPlusParam = convertNumbersToJSON(
        data.wiredPhoneNumbers.slice(1)
      );
    }
    if (data?.crsPhoneNumbers && data.crsPhoneNumbers.length > 0) {
      crsPhoneNumberParam = convertNumbersToJSON(data.crsPhoneNumbers);
    }
    changeUser(
      {
        userIdx: userIdx,
        status: data.status,
        userName: data.userName ?? null,
        positionName: positionNameParam ?? null,
        deptCode: deptCodeParam ?? "0",
        permissionsId: permissionIdParam ?? null,
        wirelessPhoneNumber: data.wirelessPhoneNumber ?? null,
        wiredPhoneNumber: wiredPhoneNumberParam ?? null,
        wiredPhoneNumberPlus: wiredPhoneNumberPlusParam ?? null,
        crsPhoneNumber: crsPhoneNumberParam ?? null,
        isMobytalk: userData?.isMobytalk,
        sendAuthorization: {
          isSmsUse: data.sendAuthorization.isSmsUse,
          isLmsUse: data.sendAuthorization.isLmsUse,
          isMmsUse: data.sendAuthorization.isMmsUse,
          isKktUse: data.sendAuthorization.isKktUse,
          isCrsUse: data.sendAuthorization.isCrsUse,
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
              <ToastMessage title="운영자 수정 오류" type="ERROR">
                {error.message}
                <br />
                운영자 수정 중 오류가 발생하였습니다.
                <br />
                부서 추가를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="운영자 수정 완료" type="SUCCESS">
                운영자를 정상적으로 수정하였습니다.
              </ToastMessage>
            ),
          });
          if (userIdx === currentIdx) {
            authService.getMyData();
          }
          onClose();
          onRefetchPage();
        },
      }
    );
  });

  const onDeleteUser = () => {
    deleteUser(
      {
        userIdx,
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="운영자 삭제 오류" type="ERROR">
                {error.message}
                <br />
                운영자 삭제 중 오류가 발생하였습니다.
                <br />
                운영자 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="운영자 삭제 완료" type="SUCCESS">
                운영자를 정상적으로 삭제하였습니다.
              </ToastMessage>
            ),
          });
          setDeleteCheckModalOpen(false);
          onClose();
          onRefetchPage();
        },
      }
    );
  };

  const onResetPwd = () => {
    resetPwd(
      {
        userIdx,
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="비밀번호 초기화 오류" type="ERROR">
                {error.message}
                <br />
                비밀번호 초기화 중 오류가 발생하였습니다.
                <br />
                비밀번호 초기화를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="비밀번호 초기화 완료" type="SUCCESS">
                운영자의 비밀번호 초기화를 정상적으로 완료하였습니다.
              </ToastMessage>
            ),
          });
          setResetPwdModalOpen(false);
        },
      }
    );
  };

  const onClose = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (userData) {
      setChangedDept({
        deptCode: userData.deptCode ?? "",
        deptName: userData.deptName ?? "부서 미지정",
      });
      const positionCodeValue = convertNameToCode(
        USERS_OPTION.POSITION,
        userData.positionName
      );
      let wiredPhoneNumbersValue: FieldNumber[] = [];
      let crsPhoneNumbersValue: FieldNumber[] = [];

      if (userData.wiredPhoneNumber !== null) {
        const phoneObj = `{"phone0":"${userData.wiredPhoneNumber}"}`;
        wiredPhoneNumbersValue = wiredPhoneNumbersValue.concat(
          convertJSONToNumbers(phoneObj)
        );
        if (userData.wiredPhoneNumberPlus) {
          wiredPhoneNumbersValue = wiredPhoneNumbersValue.concat(
            convertJSONToNumbers(userData?.wiredPhoneNumberPlus)
          );
        }
      }
      if (userData.crsPhoneNumber) {
        crsPhoneNumbersValue = crsPhoneNumbersValue.concat(
          convertJSONToNumbers(userData.crsPhoneNumber)
        );
      }
      setDefaultValues({
        status: userData.status ?? "W",
        userId: userData.userId,
        userName: userData.userName,
        positionCode: positionCodeValue ?? "0",
        deptCode: userData.deptCode,
        deptName: userData.deptName ?? "부서 미지정",
        permissionsId: userData.permissionsId,
        wirelessPhoneNumber: userData.wirelessPhoneNumber,
        wiredPhoneNumbers: wiredPhoneNumbersValue,
        crsPhoneNumbers: crsPhoneNumbersValue,
        sendAuthorization: {
          isSmsUse: userData.sendAuthorization.isSmsUse,
          isLmsUse: userData.sendAuthorization.isLmsUse,
          isMmsUse: userData.sendAuthorization.isMmsUse,
          isKktUse: userData.sendAuthorization.isKktUse,
          isCrsUse: userData.sendAuthorization.isCrsUse,
          isSmsUnlimited: userData.sendAuthorization.isSmsUnlimited ?? null,
          isLmsUnlimited: userData.sendAuthorization.isLmsUnlimited ?? null,
          isMmsUnlimited: userData.sendAuthorization.isMmsUnlimited ?? null,
          isKktUnlimited: userData.sendAuthorization.isKktUnlimited ?? null,
          isCrsUnlimited: userData.sendAuthorization.isCrsUnlimited ?? null,
        },
        sendCountRequest: {
          smsLimitCount: userData.sendCountRequest?.smsLimitCount ?? null,
          lmsLimitCount: userData.sendCountRequest?.lmsLimitCount ?? null,
          mmsLimitCount: userData.sendCountRequest?.mmsLimitCount ?? null,
          kktLimitCount: userData.sendCountRequest?.kktLimitCount ?? null,
          crsLimitCount: userData.sendCountRequest?.crsLimitCount ?? null,
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [defaultValues, methods]);

  return (
    <>
      <CustomModal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent as="form" minW="720px">
          <ModalHeader>운영자 {isModify ? "수정" : "상세"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...methods}>
              <TipText
                hasBg
                text={
                  isModify
                    ? "운영자의 정보와 발송매체별 권한 정보를 수정하신 후 [수정] 버튼을 클릭하세요."
                    : "행정 시스템과 연동된 운영자의 정보는 수정할 수 없으며, 운영자 권한과 발송매체별 권한 정보만 수정 가능합니다."
                }
              />
              <VStack align="stretch" mt={3} spacing={5}>
                {isLoading && (
                  <Center h={"500px"}>
                    <CustomSpinner />
                  </Center>
                )}
                {!isLoading && defaultValues && (
                  <>
                    <EditUserImage />
                    <InfoBox>
                      <InfoElement label="상태">
                        {isModify ? (
                          <CustomSelect
                            codes={USERS_OPTION.STATUS}
                            maxW={250}
                            size="sm"
                            {...methods.register("status")}
                          />
                        ) : (
                          <Text fontSize="sm">
                            {defaultValues.status
                              ? convertCodeToName(
                                  USERS_OPTION.STATUS,
                                  defaultValues.status
                                )
                              : "-"}
                          </Text>
                        )}
                      </InfoElement>
                      <InfoElement label="아이디">
                        <Text fontSize="sm">{defaultValues.userId}</Text>
                      </InfoElement>
                      {isModify && (
                        <InfoElement label="비밀번호">
                          <VStack align="flex-start" spacing={1}>
                            <Flex align="flex-end">
                              <Button
                                size="sm"
                                variant="primaryBlue"
                                onClick={handleResetPwdButtonClick}
                              >
                                초기화
                              </Button>
                              <Text fontSize="xs" ms={2}>
                                ※ 비밀번호를 초기화합니다.
                              </Text>
                            </Flex>
                            <TipText
                              size="sm"
                              text={`비밀번호를 분실한 경우에만 초기화를 진행하세요.\n초기화 후 운영자님께 필히 변경을 요청해 주시기 바랍니다`}
                            />
                          </VStack>
                        </InfoElement>
                      )}
                      <InfoElement label="이름" required>
                        <FormControl
                          isInvalid={
                            !!methods.formState.errors?.userName?.message
                          }
                        >
                          <Flex align="center">
                            <Input
                              maxW={240}
                              placeholder="이름을 입력하세요."
                              readOnly={!isModify}
                              size="sm"
                              {...methods.register("userName", {
                                required: message.userName.required,
                                pattern: {
                                  value: pattern.name,
                                  message: message.userName.pattern,
                                },
                              })}
                            />
                            {isModify && (
                              <QuestionMarkTooltip text="2~10자로 입력하세요. 특수문자는 사용 불가" />
                            )}
                          </Flex>
                          <FormErrorMessage fontSize="xs" mt={1}>
                            {methods.formState.errors?.userName?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </InfoElement>
                      <InfoElement label="직급 (직책)" required>
                        <FormControl
                          isInvalid={
                            !!methods.formState.errors?.positionCode?.message
                          }
                        >
                          <CustomSelect
                            codes={USERS_OPTION.POSITION}
                            isDisabled={!isModify}
                            isInvalid={
                              !!methods.formState.errors?.positionCode?.message
                            }
                            maxW={250}
                            placeholder="직급을 선택하세요."
                            size="sm"
                            variant="outline2"
                            {...methods.register("positionCode", {
                              required: message.position.required,
                            })}
                          />
                          <FormErrorMessage fontSize="xs" mt={1}>
                            {methods.formState.errors?.positionCode?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </InfoElement>
                      <InfoElement label="부서" required>
                        <Flex
                          alignItems="center"
                          flex={1}
                          justify="space-between"
                        >
                          <Text fontSize="sm">{changedDept?.deptName}</Text>
                          {isModify && (
                            <Button
                              minW="72px"
                              size="xs"
                              variant="secondaryBlue"
                              onClick={() => handleChangeDeptButtonClick()}
                            >
                              부서 변경
                            </Button>
                          )}
                        </Flex>
                      </InfoElement>
                      <InfoElement label="권한" required>
                        <FormControl
                          isInvalid={
                            !!methods.formState.errors?.permissionsId?.message
                          }
                        >
                          <CustomSelect
                            codes={permissionOptions}
                            isInvalid={
                              !!methods.formState.errors?.permissionsId?.message
                            }
                            maxW={250}
                            placeholder="권한을 선택하세요."
                            size="sm"
                            {...methods.register("permissionsId", {
                              required: message.permission.required,
                            })}
                          />
                          <FormErrorMessage fontSize="xs" mt={1}>
                            {methods.formState.errors?.permissionsId?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </InfoElement>
                      <InfoElement label="휴대폰 번호">
                        <FormControl
                          isInvalid={
                            !!methods.formState.errors?.wirelessPhoneNumber
                              ?.message
                          }
                        >
                          <Input
                            maxW={240}
                            placeholder="휴대폰 번호를 입력하세요."
                            size="sm"
                            {...methods.register("wirelessPhoneNumber", {
                              validate: (v: string | null | undefined) => {
                                if (v === "" || v === null || v === undefined)
                                  return true;
                                return (
                                  pattern.phoneNumber.mobile.test(v) ||
                                  pattern.phoneNumber.tel.test(v) ||
                                  pattern.phoneNumber.rep.test(v) ||
                                  pattern.phoneNumber.rep2.test(v) ||
                                  pattern.phoneNumber.num.test(v) ||
                                  message.phoneNumber.pattern
                                );
                              },
                              onBlur: (e) =>
                                methods.setValue(
                                  "wirelessPhoneNumber",
                                  formatter.contactFormatter(
                                    e.target.value
                                      .replace(/[^0-9]/g, "")
                                      .substring(0, 11)
                                  )
                                ),
                            })}
                          />
                          <FormErrorMessage fontSize="xs" mt={1}>
                            {
                              methods.formState.errors?.wirelessPhoneNumber
                                ?.message
                            }
                          </FormErrorMessage>
                        </FormControl>
                      </InfoElement>
                    </InfoBox>

                    <VStack align="stretch" spacing={2}>
                      <Flex align="flex-end" justify="space-between">
                        <Text fontWeight="600" size="xl">
                          발송매체별 권한
                        </Text>
                        <TipText
                          size="sm"
                          text="단문/장문/멀티/알림톡 중 1개 이상의 발송매체를 사용하기 위해 발신번호가 등록되어야 합니다."
                        />
                      </Flex>
                      <InfoBox>
                        <InfoElement label="단문(SMS) 사용권한">
                          <SendAuthCount
                            useName="isSmsUse"
                            unlimitedName="isSmsUnlimited"
                            countName="smsLimitCount"
                          />
                        </InfoElement>
                        <InfoElement label="장문(LMS) 사용권한">
                          <SendAuthCount
                            useName="isLmsUse"
                            unlimitedName="isLmsUnlimited"
                            countName="lmsLimitCount"
                          />
                        </InfoElement>
                        <InfoElement label="멀티(MMS) 사용권한">
                          <SendAuthCount
                            useName="isMmsUse"
                            unlimitedName="isMmsUnlimited"
                            countName="mmsLimitCount"
                          />
                        </InfoElement>
                        <InfoElement label="알림톡 사용권한">
                          <SendAuthCount
                            useName="isKktUse"
                            unlimitedName="isKktUnlimited"
                            countName="kktLimitCount"
                          />
                        </InfoElement>
                        {(watchSendAuthorization.isSmsUse ||
                          watchSendAuthorization.isLmsUse ||
                          watchSendAuthorization.isMmsUse ||
                          watchSendAuthorization.isKktUse) && (
                          <InfoElement label="발신번호">
                            <SendPhoneNums registerName="wiredPhoneNumbers" />
                          </InfoElement>
                        )}
                      </InfoBox>
                    </VStack>
                    {usedCrsService && (
                      <VStack align="stretch" spacing={2}>
                        <Flex align="flex-end" justify="space-between">
                          <Text fontWeight="600" size="xl">
                            양방향 메시지 권한
                          </Text>
                          <TipText
                            size="sm"
                            text="양방향 메시지를 사용하기 위해 양방향 발신번호가  등록되어야 합니다."
                          />
                        </Flex>
                        <InfoBox>
                          <InfoElement
                            label={
                              <>
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  fontWeight="normal"
                                  whiteSpace="nowrap"
                                >
                                  양방향 사용권한
                                </Text>
                                <QuestionMarkTooltip
                                  placement="bottom-start"
                                  text="양방향 메시지에서 자동발송되는 회수는 월 발송량에서 제외됩니다."
                                />
                              </>
                            }
                          >
                            <SendAuthCount
                              useName="isCrsUse"
                              unlimitedName="isCrsUnlimited"
                              countName="crsLimitCount"
                            />
                          </InfoElement>
                          {watchSendAuthorization.isCrsUse && (
                            <InfoElement label="발신번호">
                              <SendCrsNums registerName="crsPhoneNumbers" />
                            </InfoElement>
                          )}
                        </InfoBox>
                      </VStack>
                    )}
                  </>
                )}
              </VStack>
            </FormProvider>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button variant="secondaryGray" onClick={handleDeleteButtonClick}>
              삭제
            </Button>
            <HStack spacing={2}>
              <Button variant="textGray" onClick={onClose}>
                취소
              </Button>
              <Button
                isDisabled={!methods.formState.isValid}
                isLoading={methods.formState.isSubmitting}
                type="submit"
                variant="primaryBlue"
                onClick={handleChangeButtonClick}
              >
                수정
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
      <SelectDeptModal
        title="부서 변경"
        type="addition"
        isOpen={selectDeptModalOpen}
        selectedDept={changedDept}
        setModalOpen={setSelectDeptModalOpen}
        setSelectedDept={setChangedDept}
      />
      <DeleteUserCheckModal
        isOpen={deleteCheckModalOpen}
        onSubmit={onDeleteUser}
        onClose={() => setDeleteCheckModalOpen(false)}
      />
      <ResetPwdModal
        isOpen={resetPwdModalOpen}
        onSubmit={onResetPwd}
        onClose={() => setResetPwdModalOpen(false)}
      />
    </>
  );
}

export default React.memo(ManageUserModal);
