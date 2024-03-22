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
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  CustomModal,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useChangeAlarmTalkTemplateGroup,
  useGetValidAlarmTalkTemplateGroupName,
} from "features/template";
import TemplateGroup from "type/TemplateGroup";
import message from "libs/message";

interface ChangeTemplateGroupModalProps {
  groupTemplate: TemplateGroup;
  onClose: () => void;
}

function ChangeTemplateGroupModal({
  groupTemplate,
  onClose,
}: ChangeTemplateGroupModalProps) {
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

  const { mutate: changeTemplateGroup, isLoading } =
    useChangeAlarmTalkTemplateGroup();

  const { isFetching } = useGetValidAlarmTalkTemplateGroupName(
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
  const handleChangeTemplateGroupButtonClick = handleSubmit(
    ({ groupTemplateName }) => {
      changeTemplateGroup(
        {
          groupTemplateId: groupTemplate?.groupTemplateId,
          groupTemplateName,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="문자 템플릿 그룹 수정 오류" type="ERROR">
                  {error.message}
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="문자 템플릿 그룹 수정 완료" type="SUCCESS">
                  문자 템플릿 그룹 수정이 완료되었습니다.
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
        <ModalHeader>문자 템플릿 그룹 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <TipText
              hasBg
              text="문자 템플릿 그룹명을 수정 입력 하신 다음 [수정] 버튼을
                클릭하세요"
            />
            <InfoBox>
              <InfoElement label="문자 템플릿 그룹명" required>
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
            onClick={handleChangeTemplateGroupButtonClick}
          >
            수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeTemplateGroupModal;
