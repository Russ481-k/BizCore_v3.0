import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  ToastMessage,
} from "components";
import {
  useChangeAlarmTalkTemplate,
  useGetAlarmTalkTemplate,
  useGetAlarmTalkTemplateGroups,
} from "features/template";
import Buttons from "type/Buttons";
import PreviewPanel from "./PreviewPanel";

interface SaveAlarmTalkTemplateModalProps {
  isChangeTemplate: boolean;
  selectedTemplateGroupId?: number;
  templateId?: number;
  onClose: () => void;
  onConfirm: () => void;
}

function SaveAlarmTalkTemplateModal({
  isChangeTemplate,
  selectedTemplateGroupId,
  templateId,
  onClose,
  onConfirm,
}: SaveAlarmTalkTemplateModalProps) {
  const toast = useToast();

  const methods = useForm<{
    templateGroupId: string;
  }>({ mode: "onBlur" });

  const [buttons, setButtons] = useState<Array<Buttons>>([]);

  const { data: template } = useGetAlarmTalkTemplate({
    templateId: templateId ?? 0,
  });
  const { data: alarmTalkTemplateGroups } = useGetAlarmTalkTemplateGroups();
  const alarmTalkTemplateGroupsCodes = alarmTalkTemplateGroups?.map((group) => {
    return {
      code: String(group.groupTemplateId),
      name: group.groupTemplateName,
    };
  });
  const { mutate: changeAlarmTalkTemplate } = useChangeAlarmTalkTemplate();
  const handleChangeAlarmTalkTemplate = methods.handleSubmit(() => {
    changeAlarmTalkTemplate(
      {
        templateId: templateId ?? 0,
        templateGroupId: Number(methods.getValues("templateGroupId")),
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="알람톡 템플릿 수정 오류" type="ERROR">
                {error.message}
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="알람톡 템플릿 수정 완료" type="SUCCESS">
                알림톡 템플릿을 정상적으로 수정하였습니다
              </ToastMessage>
            ),
            duration: 3000,
          });
          onConfirm();
        },
      }
    );
  });

  useEffect(() => {
    if (template) {
      setButtons([
        {
          url: template.buttonMobileUrl1,
          name: template.buttonName1,
          pcUrl: template.buttonPcUrl1,
          type: template.buttonType1,
        },
        {
          url: template.buttonMobileUrl2,
          name: template.buttonName2,
          pcUrl: template.buttonPcUrl2,
          type: template.buttonType2,
        },
        {
          url: template.buttonMobileUrl3,
          name: template.buttonName3,
          pcUrl: template.buttonPcUrl3,
          type: template.buttonType3,
        },
        {
          url: template.buttonMobileUrl4,
          name: template.buttonName4,
          pcUrl: template.buttonPcUrl4,
          type: template.buttonType4,
        },
        {
          url: template.buttonMobileUrl5,
          name: template.buttonName5,
          pcUrl: template.buttonPcUrl5,
          type: template.buttonType5,
        },
      ]);
    }
  }, [template]);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="1200px">
        <ModalHeader>알림톡 템플릿 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <Flex flexDirection="column" gap={3}>
              <CollapseSection headerTitle="알림톡 템플릿 정보">
                <Flex
                  as="form"
                  gap={3}
                  width="100%"
                  onSubmit={handleChangeAlarmTalkTemplate}
                >
                  <InfoBox flex={1}>
                    <InfoElement label="상태" labelWidth="130px">
                      <Text>{template ? template?.status : "-"}</Text>
                    </InfoElement>
                    <InfoElement label="템플릿 ID" labelWidth="130px">
                      <Text>{template ? template?.templateCode : "-"}</Text>
                    </InfoElement>
                    <InfoElement
                      label="알림톡 템플릿 그룹"
                      labelWidth="130px"
                      required
                    >
                      {isChangeTemplate ? (
                        <CustomSelect
                          codes={alarmTalkTemplateGroupsCodes}
                          defaultValue={
                            template?.kakaoGroupTemplate?.groupTemplateId
                          }
                          isInvalid={
                            !!methods?.formState.errors.templateGroupId
                          }
                          maxW={150}
                          size="sm"
                          {...methods?.register("templateGroupId", {
                            required: {
                              value: true,
                              message: "알림톡 템플릿 그룹을 선택하세요.",
                            },
                          })}
                        />
                      ) : (
                        <Text>
                          {template?.kakaoGroupTemplate?.groupTemplateName}
                        </Text>
                      )}
                    </InfoElement>
                    <InfoElement label="알림톡 템플릿명" labelWidth="130px">
                      <Text>{template ? template?.templateName : "-"}</Text>
                    </InfoElement>
                    <InfoElement label="등록(요청) 일시" labelWidth="130px">
                      <Text>
                        {template
                          ? format(
                              new Date(String(template?.createDate)),
                              "yyyy년 MM월 dd일 00 : 00 : 00"
                            )
                          : "-"}
                      </Text>
                    </InfoElement>
                  </InfoBox>
                  <Flex flexDirection="column">
                    <PreviewPanel
                      buttons={buttons}
                      messageContents={
                        template ? template?.templateMsgContext : "-"
                      }
                    />
                  </Flex>
                </Flex>
              </CollapseSection>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="space-between" my={3}>
            <Flex />
            <Flex gap={2}>
              <Button variant="textGray" onClick={onClose}>
                닫기
              </Button>
              {isChangeTemplate && (
                <Button
                  mr={3}
                  variant="primaryBlue"
                  type="submit"
                  onClick={handleChangeAlarmTalkTemplate}
                >
                  알림톡 템플릿 수정
                </Button>
              )}
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default SaveAlarmTalkTemplateModal;
