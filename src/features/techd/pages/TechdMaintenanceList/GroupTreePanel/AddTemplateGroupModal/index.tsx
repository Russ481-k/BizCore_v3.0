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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import {
  CustomModal,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useAddTemplateGroup,
  useGetValidTemplateGroupName,
} from "features/sopp";
import { useState } from "react";
import message from "libs/message";

interface AddTemplateGroupModalProps {
  onClose: () => void;
}

function AddTemplateGroupModal({ onClose }: AddTemplateGroupModalProps) {
  const toast = useToast();
  const {
    formState: { errors, isValid },
    clearErrors,
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
  } = useForm<{ groupTemplateName: string }>({ mode: "onBlur" });

  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);

  const { mutate: addTemplateGroup, isLoading } = useAddTemplateGroup();
  const { isFetching } = useGetValidTemplateGroupName(
    {
      templateGroupName: getValues("groupTemplateName"),
    },
    {
      enabled: isEnableQuery,
      retry: 0,
      onError: (error) => {
        setError("groupTemplateName", {
          type: "isInvalid",
          message: error.message,
        });
      },
      onSuccess: () => {
        clearErrors("groupTemplateName");
      },
      onSettled: () => {
        setEnableQuery(false);
      },
    }
  );

  const handleDoubleCheck = async () => {
    await trigger("groupTemplateName");
    if (!errors.groupTemplateName) {
      setEnableQuery(true);
    }
  };

  const handleAddTemplateGroupButtonClick = handleSubmit(
    ({ groupTemplateName }) => {
      addTemplateGroup(
        {
          groupTemplateName,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title=" 그룹 등록 오류" type="ERROR">
                  {error.message}
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title=" 그룹 등록 완료" type="SUCCESS">
                  그룹 등록이 완료되었습니다.
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    }
  );

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent as="form" minW="680px">
        <ModalHeader> 그룹 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <TipText
              hasBg
              text=" 그룹명을 입력 하신 다음 [추가] 버튼을 클릭하세요."
            />
            <InfoBox>
              <InfoElement label=" 그룹명" required>
                <FormControl isInvalid={!!errors.groupTemplateName}>
                  <Input
                    borderColor={!!isFetching ? "blue.400" : "gray.400"}
                    borderWidth={!!isFetching ? "2px" : "gray.400"}
                    placeholder={message.templateGroupName.pattern}
                    size="sm"
                    {...register("groupTemplateName", {
                      required: {
                        value: true,
                        message: message.templateGroupName.required,
                      },
                      pattern: {
                        value: /^.{2,20}$/,
                        message: message.templateGroupName.pattern,
                      },
                      onBlur: () => handleDoubleCheck(),
                      onChange: (e) =>
                        setValue(
                          "groupTemplateName",
                          e.target.value.replace(/\\/g, "")
                        ),
                    })}
                    onFocus={() => setEnableQuery(false)}
                  />
                  {errors.groupTemplateName && (
                    <FormErrorMessage>
                      {errors.groupTemplateName.message}
                    </FormErrorMessage>
                  )}
                  {isFetching && (
                    <FormHelperText color="blue.400">
                      {message.doubleCheck}
                    </FormHelperText>
                  )}
                </FormControl>
              </InfoElement>
            </InfoBox>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button
            isDisabled={!isValid}
            isLoading={isLoading}
            type="submit"
            variant="primaryBlue"
            onClick={handleAddTemplateGroupButtonClick}
          >
            추가
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default AddTemplateGroupModal;
