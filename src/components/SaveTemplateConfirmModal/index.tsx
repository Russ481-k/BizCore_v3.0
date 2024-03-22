import {
  Button,
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
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import {
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  ToastMessage,
} from "components";
import { useAddTemplateAnother, useGetTemplateGroups } from "features/template";
import Template from "type/Template";

interface SaveTemplateConfirmModalProps {
  data: Template;
  onClose: () => void;
}

function SaveTemplateConfirmModal({
  data,
  onClose,
}: SaveTemplateConfirmModalProps) {
  const toast = useToast();
  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useFormContext<{
    templateName: string;
    groupTemplateId: string;
  }>();
  const { data: templateGroups } = useGetTemplateGroups();
  const { mutate: addTemplate, isLoading: isAddLoading } =
    useAddTemplateAnother();

  const templateGroupsCode = templateGroups?.map((group) => {
    return {
      code: String(group?.groupTemplateId),
      name: group.groupTemplateName,
    };
  });
  const handleTemplateSaveSubmit = handleSubmit(() => {
    addTemplate(
      {
        template: {
          templateId: data.templateId ?? "",
          templateName: getValues("templateName") ?? "",
          wiredPhoneNumber: data.wiredPhoneNumber ?? "",
          templateMsgTitle: data.templateMsgTitle ?? "",
          templateMsgContext: data.templateMsgContext ?? "",
          templateChannel: data.templateChannel ?? "",
          groupTemplateId: Number(getValues("groupTemplateId")),
          uniqueFileName:
            data.files?.map((file) => {
              return file.uniqueFileName;
            }) ?? [],
          changeFileOrder: data.changeFileOrder ?? [],
        },
        files: data.files?.map((file) => file.file) ?? [],
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="문자 템플릿 등록 오류" type="ERROR">
                {error.message}
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="문자 템플릿 등록 완료" type="SUCCESS">
                문자 템플릿을 정상적으로 등록하였습니다.
              </ToastMessage>
            ),
          });
          onClose();
        },
      }
    );
  });

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTemplateSaveSubmit();
    }
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent
        as="form"
        minW="512px"
        onKeyPress={handleOnKeyPress}
        onSubmit={handleTemplateSaveSubmit}
      >
        <ModalHeader>문자 템플릿 등록</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={3}>
            <Text fontSize="sm">
              템플릿 그룹 선택 및 템플릿명을 입력하신 후 하단의 [저장] 버튼을
              클릭하세요.
            </Text>
            <InfoBox>
              <InfoElement label="문자 템플릿 그룹" labelWidth="130px" required>
                <FormControl isInvalid={!!errors.groupTemplateId}>
                  <CustomSelect
                    codes={templateGroupsCode}
                    isInvalid={!!errors.groupTemplateId}
                    placeholder="템플릿 그룹을 선택하세요."
                    size="sm"
                    {...register("groupTemplateId", {
                      required: true,
                    })}
                  />
                </FormControl>
              </InfoElement>
              <InfoElement label="문자 템플릿명" labelWidth="130px" required>
                <FormControl isInvalid={!!errors.templateName}>
                  <Input
                    size="sm"
                    placeholder="2~20자 이내로 문자 템플릿명을 입력하세요."
                    {...register("templateName", {
                      required: {
                        value: true,
                        message: "템플릿명을 입력해주세요.",
                      },
                      minLength: {
                        value: 2,
                        message: "템플릿명은 2자 이상 입력해주세요.",
                      },
                      maxLength: {
                        value: 22,
                        message: "템플릿명은 22자 이하로 입력해주세요.",
                      },
                    })}
                  />

                  {errors.templateName && (
                    <FormErrorMessage>
                      {errors.templateName.message}
                    </FormErrorMessage>
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
          <Button variant="primaryBlue" isLoading={isAddLoading} type="submit">
            등록
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default SaveTemplateConfirmModal;
