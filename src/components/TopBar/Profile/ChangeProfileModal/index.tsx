import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { FormProvider, useForm } from "react-hook-form";

import {
  CustomModal,
  CustomSpinner,
  InfoBox,
  InfoElement,
  QuestionMarkTooltip,
  TipText,
  ToastMessage,
  EditUserImage,
} from "components";
import {
  ChangePwd,
  getMyProfileThunk,
  useChangeMyProfile,
} from "features/system";
import formatter from "libs/formatter";
import message from "libs/message";
import pattern from "libs/pattern";
import { useAppDispatch } from "storage/redux/hooks";
import User from "type/User";

interface ChangeProfileModalProps {
  isOpen: boolean;
  myProfile: User;
  setModalOpen: (open: boolean) => void;
}

interface ChangeProfile {
  userName: string;
  userTel?: string | null;
}

function ChangeProfileModal({
  isOpen,
  myProfile,
  setModalOpen,
}: ChangeProfileModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [defaultValues, setDefaultValues] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [changePwdModalOpen, setChangePwdModalOpen] = useState<boolean>(false);

  const methods = useForm<ChangeProfile>({
    mode: "onBlur",
  });

  const { mutate: changeProfile } = useChangeMyProfile();
  const handleChangeButtonClick = methods.handleSubmit((data) => {
    const userNameParam = data.userName;
    const userTelParam = data.userTel ?? "";
    changeProfile(
      {
        userName: userNameParam,
        userTel: userTelParam,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="운영자 정보 수정 오류" type="ERROR">
                운영자 정보 수정 중 오류가 발생하였습니다.
                <br />
                운영자 정보 수정을 다시 진행 하세요. 본 오류가 계속 발생하는
                경우 시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="운영자 정보 수정 완료" type="SUCCESS">
                운영자 정보를 정상적으로 수정하였습니다.
              </ToastMessage>
            ),
          });
          dispatch(getMyProfileThunk);
          onCloseChangeProfileModal();
        },
      }
    );
  });

  const handleChangePwdButtonClick = () => {
    setChangePwdModalOpen(true);
  };

  const onCloseChangeProfileModal = () => {
    setModalOpen(false);
  };
  const onCloseChangePwdModal = () => {
    setChangePwdModalOpen(false);
  };

  useEffect(() => {
    if (myProfile) {
      setDefaultValues({
        userNo: myProfile.userNo,
        compNo: myProfile.compNo,
        userId: myProfile.userId,
        userName: myProfile.userName,
        userTel: myProfile.userTel,
        userEmail: myProfile.userEmail,
        userOtp: myProfile.userOtp,
        userRole: myProfile.userRole,
        userCode: myProfile.userCode,
        docRole: myProfile.docRole,
        userKey: myProfile.userKey,
        org_id: myProfile.org_id,
        listDateFrom: myProfile.listDateFrom,
        regDatetime: myProfile.regDatetime,
        modDatetime: myProfile.modDatetime,
        attrib: myProfile.attrib,
        userRank: myProfile.userRank,
        userDept: myProfile.userDept,
      });
    }
  }, [myProfile]);

  useEffect(() => {
    if (defaultValues) {
      methods.reset({
        userName: defaultValues.userName,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [defaultValues, methods]);

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onCloseChangeProfileModal}>
        <ModalContent as="form" minW="600px">
          <ModalHeader>운영자 정보 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...methods}>
              <TipText
                hasBg
                text="운영자 정보를 수정하신 다음 아래의 [수정] 버튼을 클릭하세요."
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
                      <InfoElement label="아이디">
                        <Text fontSize="sm">{defaultValues.userId}</Text>
                      </InfoElement>
                      {
                        <InfoElement label="비밀번호">
                          <Button
                            size="sm"
                            variant="primaryBlue"
                            onClick={handleChangePwdButtonClick}
                          >
                            비밀번호 변경
                          </Button>
                        </InfoElement>
                      }
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
                      <InfoElement label="직급 (직책)">
                        <Text fontSize="sm">{defaultValues.userRole}</Text>
                      </InfoElement>
                      <InfoElement label="부서">
                        <Text fontSize="sm">{defaultValues.userDept}</Text>
                      </InfoElement>
                      <InfoElement label="권한">
                        <Text fontSize="sm">{defaultValues.userRank}</Text>
                      </InfoElement>
                      <InfoElement label="휴대폰 번호">
                        <FormControl
                          isInvalid={
                            !!methods.formState.errors?.userTel?.message
                          }
                        >
                          <Input
                            maxW={240}
                            placeholder="휴대폰 번호를 입력하세요."
                            size="sm"
                            {...methods.register("userTel", {
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
                                  "userTel",
                                  formatter.contactFormatter(
                                    e.target.value
                                      .replace(/[^0-9]/g, "")
                                      .substring(0, 11)
                                  )
                                ),
                            })}
                          />
                          <FormErrorMessage fontSize="xs" mt={1}>
                            {methods.formState.errors?.userTel?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </InfoElement>
                    </InfoBox>
                  </>
                )}
              </VStack>
            </FormProvider>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="textGray" onClick={onCloseChangeProfileModal}>
              취소
            </Button>
            <Button
              isDisabled={!methods.formState.isValid}
              isLoading={methods.formState.isSubmitting}
              variant="primaryBlue"
              type="submit"
              onClick={handleChangeButtonClick}
            >
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
      <CustomModal isOpen={changePwdModalOpen} onClose={onCloseChangePwdModal}>
        <ChangePwd isModal onClose={onCloseChangePwdModal} />
      </CustomModal>
    </>
  );
}

export default React.memo(ChangeProfileModal);
