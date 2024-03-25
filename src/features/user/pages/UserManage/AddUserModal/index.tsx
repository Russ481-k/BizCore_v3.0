import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  InfoBox,
  InfoElement,
  QuestionMarkTooltip,
  TipText,
  ToastMessage,
  EditUserImage,
} from "components";
import { useAddUser, useGetValidUser, USERS_OPTION } from "features/user";
import { convertCodeToName, convertNumbersToJSON } from "libs/converter";
import formatter from "libs/formatter";
import message from "libs/message";
import pattern from "libs/pattern";
import Department from "type/Department";
import FieldNumber from "type/FieldNumbers";
import Option from "type/Option";
import SendAuth from "type/SendAuth";
import SendCount from "type/SendCount";
import SelectDeptModal from "../SelectDeptModal";
import SendAuthCount from "../SendAuthCount";
import SendCrsNums from "../SendCrsNums";
import SendPhoneNums from "../SendPhoneNums";

interface AddUserModalProps {
  isOpen: boolean;
  permissionOptions: Option[];
  selectedDept: Department | null;
  onRefetchPage: () => void;
  setModalOpen: (isOpen: boolean) => void;
}
interface AddUser {
  userId: string;
  userName: string;
  positionCode: string;
  deptCode: string | null;
  permissionsId: number | null;
  wirelessPhoneNumber?: string | null | undefined;
  wiredPhoneNumbers?: FieldNumber[] | undefined;
  crsPhoneNumbers?: FieldNumber[] | undefined;
  sendAuthorization: SendAuth;
  sendCountRequest: SendCount;
}
const addUserDefaultValues = {
  userId: "",
  userName: "",
  positionCode: undefined,
  deptCode: "",
  permissionsId: undefined,
  wirelessPhoneNumber: "",
  wiredPhoneNumbers: [{ number: "" }],
  crsPhoneNumbers: [{ number: "" }],
  sendAuthorization: {
    isSmsUse: true,
    isLmsUse: true,
    isMmsUse: true,
    isKktUse: true,
    isCrsUse: false,
    isSmsUnlimited: false,
    isLmsUnlimited: false,
    isMmsUnlimited: false,
    isKktUnlimited: false,
    isCrsUnlimited: true,
  },
  sendCountRequest: {
    smsLimitCount: 100,
    lmsLimitCount: 100,
    mmsLimitCount: 100,
    kktLimitCount: 100,
    crsLimitCount: null,
  },
};

const usedCrsService: boolean = true;

function AddUserModal({
  isOpen,
  permissionOptions,
  selectedDept,
  onRefetchPage,
  setModalOpen,
}: AddUserModalProps) {
  const toast = useToast();
  const methods = useForm<AddUser>({
    defaultValues: addUserDefaultValues,
    mode: "onBlur",
  });
  const watchSendAuthorization = useWatch({
    control: methods.control,
    name: "sendAuthorization",
  });

  const [changedDept, setChangedDept] = useState<Department | null>(selectedDept);
  const [selectDeptModalOpen, setSelectDeptModalOpen] = useState<boolean>(false);
  const handleChangeDeptButtonClick = () => {
    setSelectDeptModalOpen(true);
  };

  const [getValidEnabled, setGetValidEnabled] = useState<boolean>(false);
  const { isFetching } = useGetValidUser(
    {
      userId: methods.getValues("userId"),
    },
    {
      enabled: getValidEnabled,
      retry: 0,
      onError: (error) => {
        methods.setError("userId", {
          type: "isInvalid",
          message: error.message,
        });
      },
      onSuccess: () => {
        methods.clearErrors("userId");
      },
    }
  );
  const handleDoubleCheck = async () => {
    await methods.trigger("userId");
    if (!methods.formState.errors.userId) {
      setGetValidEnabled(true);
    }
  };

  const { mutate: addUser } = useAddUser();
  const handleSubmitButtonClick = methods.handleSubmit((data) => {
    const deptCodeParam = changedDept?.deptCode;
    const permissionIdParam = Number(data.permissionsId);
    const positionNameParam = convertCodeToName(USERS_OPTION.POSITION, data.positionCode);
    const wiredPhoneNumberParam = data?.wiredPhoneNumbers?.[0].number.toString();
    let wiredPhoneNumberPlusParam = "";
    let crsPhoneNumberParam = "";

    if (data?.wiredPhoneNumbers && data.wiredPhoneNumbers.length > 1) {
      wiredPhoneNumberPlusParam = convertNumbersToJSON(data.wiredPhoneNumbers.slice(1));
    }
    if (data?.crsPhoneNumbers && data.crsPhoneNumbers.length > 0) {
      crsPhoneNumberParam = convertNumbersToJSON(data.crsPhoneNumbers);
    }

    addUser(
      {
        userId: data.userId ?? null,
        userName: data.userName ?? null,
        positionName: positionNameParam ?? null,
        deptCode: deptCodeParam ?? "0",
        permissionsId: permissionIdParam ?? null,
        wirelessPhoneNumber: data.wirelessPhoneNumber ?? null,
        wiredPhoneNumber: wiredPhoneNumberParam ?? null,
        wiredPhoneNumberPlus: wiredPhoneNumberPlusParam ?? null,
        crsPhoneNumber: crsPhoneNumberParam ?? null,
        isBizCore: true,
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
          smsLimitCount: data.sendCountRequest.smsLimitCount,
          lmsLimitCount: data.sendCountRequest.lmsLimitCount,
          mmsLimitCount: data.sendCountRequest.mmsLimitCount,
          kktLimitCount: data.sendCountRequest.kktLimitCount,
          crsLimitCount: data.sendCountRequest.crsLimitCount,
        },
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="운영자 등록 오류" type="ERROR">
                {error.message}
                <br />
                운영자 등록 중 오류가 발생하였습니다.
                <br />
                운영자 추가를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템 관리자에게
                문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="운영자 등록 완료" type="SUCCESS">
                운영자를 정상적으로 등록하였습니다.
              </ToastMessage>
            ),
          });
          onClose();
          onRefetchPage();
        },
      }
    );
  });

  const onClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      methods.clearErrors("userId");
      methods.reset();
      setGetValidEnabled(false);
    }, 100);
  };

  useEffect(() => {
    setChangedDept(selectedDept);
  }, [selectedDept]);

  useEffect(() => {
    if (
      !watchSendAuthorization.isSmsUse &&
      !watchSendAuthorization.isLmsUse &&
      !watchSendAuthorization.isMmsUse &&
      !watchSendAuthorization.isKktUse
    ) {
      methods.resetField("wiredPhoneNumbers");
    }
    if (!watchSendAuthorization.isCrsUse) {
      methods.resetField("crsPhoneNumbers");
    }
  }, [methods, watchSendAuthorization]);

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalContent as="form" minW="720px">
          <ModalHeader>운영자 등록</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TipText
              hasBg
              text="신규 등록할 운영자의 정보와 매체별 권한 정보를 입력하신 후
              [등록] 버튼을 클릭하세요."
            />
            <FormProvider {...methods}>
              <VStack align="stretch" mt={3} spacing={5}>
                <EditUserImage />
                <InfoBox>
                  <InfoElement label="아이디" required>
                    <FormControl isInvalid={!!methods.formState.errors?.userId}>
                      <Flex align="center">
                        <Input
                          borderColor={!!isFetching ? "blue.400" : "gray.400"}
                          borderWidth={!!isFetching ? "2px" : "1px"}
                          maxW={240}
                          placeholder="아이디를 입력하세요."
                          size="sm"
                          {...methods.register("userId", {
                            required: message.userId.required,
                            pattern: {
                              value: pattern.id,
                              message: message.userId.pattern,
                            },
                            onBlur: () => handleDoubleCheck(),
                          })}
                          onFocus={() => setGetValidEnabled(false)}
                        />
                        <QuestionMarkTooltip text="4~16자의 영문(소문자) 및 숫자만 사용 가능" />
                      </Flex>
                      <FormErrorMessage fontSize="xs" mt={1}>
                        {methods.formState.errors.userId?.message}
                      </FormErrorMessage>
                      {isFetching && (
                        <FormHelperText fontSize="xs" fontWeight="500" mt={1} color="blue.400">
                          {message.doubleCheck}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </InfoElement>
                  <InfoElement label="비밀번호">
                    <TipText
                      size="sm"
                      text={`초기 비밀번호로 설정됩니다.\n초기 비밀번호로 로그인 후 필히 비밀번호 변경을 요청해 주시기 바랍니다.`}
                    />
                  </InfoElement>
                  <InfoElement label="이름" required>
                    <FormControl isInvalid={!!methods.formState.errors?.userName?.message}>
                      <Flex align="center">
                        <Input
                          maxW={240}
                          placeholder="이름을 입력하세요."
                          size="sm"
                          {...methods.register("userName", {
                            required: message.userName.required,
                            pattern: {
                              value: pattern.name,
                              message: message.userName.pattern,
                            },
                          })}
                        />
                        <QuestionMarkTooltip text="2~10자로 입력하세요. 특수문자는 사용 불가" />
                      </Flex>
                      <FormErrorMessage fontSize="xs" mt={1}>
                        {methods.formState.errors?.userName?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </InfoElement>
                  <InfoElement label="직급(직책)" required>
                    <FormControl isInvalid={!!methods.formState.errors?.positionCode?.message}>
                      <CustomSelect
                        codes={USERS_OPTION.POSITION}
                        isInvalid={!!methods.formState.errors?.positionCode?.message}
                        maxW={250}
                        placeholder="직급을 선택하세요."
                        size="sm"
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
                    <Flex alignItems="center" flex={1} justify="space-between">
                      <Text fontSize="sm">
                        {changedDept ? changedDept.deptName : "부서 미지정"}
                      </Text>
                      <Button
                        minW="72px"
                        size="xs"
                        variant="secondaryBlue"
                        onClick={() => handleChangeDeptButtonClick()}
                      >
                        부서 변경
                      </Button>
                    </Flex>
                  </InfoElement>
                  <InfoElement label="권한" required>
                    <FormControl isInvalid={!!methods.formState.errors?.permissionsId?.message}>
                      <CustomSelect
                        codes={permissionOptions}
                        isInvalid={!!methods.formState.errors?.permissionsId?.message}
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
                      isInvalid={!!methods.formState.errors?.wirelessPhoneNumber?.message}
                    >
                      <Input
                        maxW={240}
                        placeholder="휴대폰 번호를 입력하세요."
                        size="sm"
                        {...methods.register("wirelessPhoneNumber", {
                          validate: (v: string | null | undefined) => {
                            if (v === "" || v === null || v === undefined) return true;
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
                                e.target.value.replace(/[^0-9]/g, "").substring(0, 11)
                              )
                            ),
                        })}
                      />
                      <FormErrorMessage fontSize="xs" mt={1}>
                        {methods.formState.errors?.wirelessPhoneNumber?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </InfoElement>
                </InfoBox>
                <VStack align="stretch" spacing={2}>
                  <Flex align="flex-end" justify="space-between">
                    <Text fontWeight="600" size="xl">
                      매체별 권한
                    </Text>
                    <TipText
                      size="sm"
                      text="단문/장문/멀티/알림톡 중 1개 이상의 매체를 사용하기 위해 발신번호가 등록되어야 합니다."
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
                        메시지 권한
                      </Text>
                      <TipText
                        size="sm"
                        text=" 메시지를 사용하기 위해  발신번호가  등록되어야 합니다."
                      />
                    </Flex>
                    <InfoBox>
                      <InfoElement
                        label={
                          <>
                            <Text as="span" fontSize="sm" fontWeight="normal" whiteSpace="nowrap">
                              사용권한
                            </Text>
                            <QuestionMarkTooltip
                              placement="bottom-start"
                              text=" 메시지에서 되는 회수는 월 량에서 제외됩니다."
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
              </VStack>
            </FormProvider>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button
              isDisabled={!methods.formState.isValid}
              isLoading={methods.formState.isSubmitting}
              type="submit"
              variant="primaryBlue"
              onClick={handleSubmitButtonClick}
            >
              등록
            </Button>
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
    </>
  );
}
export default React.memo(AddUserModal);
