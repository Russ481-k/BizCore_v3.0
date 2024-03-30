import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  // IconButton,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import React, {
  useEffect,
  useState,
  // useState
} from "react";
import { useForm, useFormState } from "react-hook-form";

import {
  CustomModal,
  // CloseIcon,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  // SelectManageDeptModal,
  useChangeDept,
  useGetValidDept,
} from "features/system";
import Department from "type/Department";
import message from "libs/message";

interface ChangeDeptModalProps {
  isOpen: boolean;
  selectedDept: Department;
  onRefetch: () => void;
  setModalOpen: (open: boolean) => void;
}

function ChangeDeptModal({
  isOpen,
  selectedDept,
  onRefetch,
  setModalOpen,
}: ChangeDeptModalProps) {
  const toast = useToast();
  const {
    clearErrors,
    control,
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<{
    deptName: string;
  }>({
    defaultValues: {
      deptName: selectedDept?.deptName,
    },
    mode: "onBlur",
  });
  const { errors, isSubmitting, isValid } = useFormState({ control });

  const [getValidEnabled, setGetValidEnabled] = useState<boolean>(false);
  // const [selectedManageDept, setSelectedManageDept] =
  //   useState<Department | null>(null);
  // const [selectManageDeptModalOpen, setSelectManageDeptModal] =
  //   useState<boolean>(false);

  const { mutate: changeDept } = useChangeDept();
  const { isFetching } = useGetValidDept(
    {
      departmentName: getValues("deptName"),
    },
    {
      enabled: getValidEnabled,
      retry: 0,
      onError: (error) => {
        setError("deptName", {
          type: "isInvalid",
          message: error.message,
        });
      },
      onSuccess: () => {
        clearErrors("deptName");
      },
      onSettled: () => {
        setGetValidEnabled(false);
      },
    }
  );

  const handleDoubleCheck = async () => {
    await trigger("deptName");
    if (!errors.deptName) {
      setGetValidEnabled(true);
    }
  };

  const handleSubmitButtonClick = handleSubmit((data) => {
    changeDept(
      {
        deptCode: selectedDept.deptCode,
        deptName: data.deptName,
        managementDept: null,
        isBizCore: true,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="부서 수정 오류" type="ERROR">
                부서 수정 중 오류가 발생하였습니다.
                <br />
                부서 수정를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="부서 수정 완료" type="SUCCESS">
                부서를 정상적으로 수정하였습니다.
              </ToastMessage>
            ),
          });
          onClose();
          onRefetch();
        },
      }
    );
  });

  const onClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      reset();
      // setSelectedManageDept(null);
    }, 200);
  };

  // const openSelectManageDeptModal = () => {
  //   setSelectManageDeptModal(true);
  // };

  useEffect(() => {
    if (selectedDept) {
      reset({ deptName: selectedDept.deptName });
    }
  }, [reset, selectedDept]);

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalContent as="form" minW="680px">
          <ModalHeader>부서 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={1}>
              {/* 부서명 입력과 관리부서를 선택하신 다음 [수정] 버튼을 클릭하세요. */}
              <TipText
                hasBg
                text="부서명을 입력하신 다음 [수정] 버튼을 클릭하세요."
              />
              <InfoBox>
                <InfoElement label="부서명" required>
                  <FormControl isInvalid={!!errors.deptName}>
                    <Input
                      borderColor={!!isFetching ? "blue.400" : "gray.400"}
                      borderWidth={!!isFetching ? "2px" : "1px"}
                      placeholder={message.deptName.pattern}
                      size="sm"
                      {...register("deptName", {
                        required: {
                          value: true,
                          message: message.deptName.required,
                        },
                        pattern: {
                          value: /^.{2,20}$/,
                          message: message.deptName.pattern,
                        },
                        onBlur: () => handleDoubleCheck(),
                        onChange: (e) =>
                          setValue(
                            "deptName",
                            e.target.value.replace(/\\/g, "")
                          ),
                      })}
                    />
                    {errors?.deptName && (
                      <FormErrorMessage>
                        {errors?.deptName?.message}
                      </FormErrorMessage>
                    )}
                    {isFetching && (
                      <FormHelperText color="blue.400">
                        {message.doubleCheck}
                      </FormHelperText>
                    )}
                  </FormControl>
                </InfoElement>
                {/* <InfoElement label="관리부서">
                  <Flex flex={1} justify="space-between">
                    {selectedManageDept && (
                      <Flex align="center">
                        <Text fontSize="sm">{selectedManageDept.deptName}</Text>
                        <IconButton
                          aria-label="부서삭제"
                          borderRadius={4}
                          icon={<CloseIcon boxSize={2.5} />}
                          ms={1}
                          size="xs"
                          variant="primaryGray"
                          onClick={() => setSelectedManageDept(null)}
                        />
                      </Flex>
                    )}
                    <Button
                      size="sm"
                      variant="secondaryBlue"
                      onClick={openSelectManageDeptModal}
                    >
                      관리부서 선택
                    </Button>
                  </Flex>
                </InfoElement> */}
              </InfoBox>
            </Flex>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
              variant="primaryBlue"
              onClick={handleSubmitButtonClick}
            >
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
      {/* <SelectDeptModal
        title="관리 부서 선택"
        type="basic"
        isOpen={selectManageDeptModalOpen}
        selectedDept={selectedManageDept}
        setModalOpen={setSelectManageDeptModal}
        setSelectedDept={setSelectedManageDept}
      /> */}
    </>
  );
}

export default React.memo(ChangeDeptModal);
