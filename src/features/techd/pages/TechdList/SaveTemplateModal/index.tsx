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
import { format } from "date-fns";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  InputPanel,
  ToastMessage,
} from "components";
import {
  useAddTemplate,
  useChangeTemplate,
  useDeleteTemplate,
  useGetTemplate,
  useGetTemplateGroups,
  useGetValidTemplateName,
} from "features/sopp";
import message from "libs/message";
import DeleteTemplateModal from "../DeleteTemplateModal";
import PreviewPanel from "./PreviewPanel";

interface SaveTemplateModalProps {
  selectedTemplateGroupId?: number;
  isChangeTemplate: boolean;
  templateId?: number;
  onClose: () => void;
}

function SaveTemplateModal({
  selectedTemplateGroupId,
  isChangeTemplate,
  templateId,
  onClose,
}: SaveTemplateModalProps) {
  const toast = useToast();
  const methods = useForm<{
    templateName: string;
  }>({ mode: "onBlur" });

  const { data: templateGroups } = useGetTemplateGroups();

  const { data: template } = useGetTemplate(
    {
      templateId: templateId ?? null,
    },
    {
      enabled: !!templateId,
    }
  );
  const { mutate: addTemplate, isLoading: isAddLoading } = useAddTemplate();
  const { mutate: changeTemplate, isLoading: isChangeLoading } =
    useChangeTemplate();
  const { mutate: deleteTemplate, isLoading: isDeleteLoading } =
    useDeleteTemplate();
  const templateGroupsCode = templateGroups?.map((group) => {
    return {
      code: String(group?.groupTemplateId),
      name: group.groupTemplateName,
    };
  });

  const [changeFiles, setChangeFiles] = useState<
    Array<{
      uniqueFileName: string;
      fileOrder: number;
    }>
  >([]);
  const [changedIndex, setChangedIndex] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [wiredPhoneNumber, setWiredPhoneNumber] = useState<string | null>(null);
  const [templateMsgTitle, setTemplateMsgTitle] = useState<string | null>(null);
  const [templateMsgContext, setTemplateMsgContext] = useState<string | null>(
    null
  );
  const [templateChannel, setTemplateChannel] = useState<string | null>(null);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
  const [groupTemplateId, setGroupTemplateId] = useState<number>(
    !!selectedTemplateGroupId
      ? selectedTemplateGroupId
      : !!templateGroupsCode?.length
      ? Number(templateGroupsCode?.[0]?.code)
      : 1
  );
  const { isFetching } = useGetValidTemplateName(
    {
      templateName: methods.getValues("templateName"),
    },
    {
      enabled: isEnableQuery,
      retry: 0,
      onError: (error) => {
        methods.setError("templateName", {
          type: "isInvalid",
          message: error.message,
        });
      },
      onSuccess: () => {
        methods.clearErrors("templateName");
      },
      onSettled: () => {
        setEnableQuery(false);
      },
    }
  );

  const changeImageFile = useMemo(
    () => (file: File, url: string | null, index: number | null) => {
      if (index !== null) {
        if (!!url?.length) {
          setImageFiles([]);
          setImageURLs([]);
          const bufImageFiles = imageFiles;
          const bufImageUrls = imageURLs;
          bufImageFiles[index] = new File([], url);
          bufImageUrls[index] = url;
          setImageFiles([...bufImageFiles]);
          setImageURLs([...bufImageUrls]);
          return;
        }
        const bufImageFiles = imageFiles;
        const bufImageUrls = imageURLs;
        if (!!imageURLs[index]?.length && !changedIndex.includes(index)) {
          setChangedIndex([...changedIndex, index]);
          setChangeFiles([
            ...changeFiles,
            {
              uniqueFileName: bufImageUrls[index]?.slice(
                imageURLs[index].indexOf("/resources/") + 11,
                imageURLs[index].length
              ),
              fileOrder: index,
            },
          ]);
        }
        bufImageFiles[index] = file;
        bufImageUrls[index] = URL.createObjectURL(file);
        setImageFiles([...bufImageFiles]);
        setImageURLs([...bufImageUrls]);
        return;
      } else if (imageFiles.length < 3) {
        setImageFiles([...imageFiles, file]);
        if (!imageFiles) {
          return;
        }
        setImageURLs([...imageURLs, URL.createObjectURL(file)]);
      } else {
        toast({
          render: () => (
            <ToastMessage title="사진 파일 업로드 오류" type="ERROR">
              사진 파일 업로드 중 오류가 발생하였습니다.
              <br />
              사진 파일은 최대 3개까지 업로드 가능합니다.
            </ToastMessage>
          ),
        });
      }
    },
    [
      changedIndex,
      changeFiles,
      imageFiles,
      imageURLs,
      toast,
      setChangeFiles,
      setImageFiles,
      setImageURLs,
    ]
  );

  const removeImageFile = (index: number) => {
    const bufImageFiles = imageFiles;
    const bufImageUrls = imageURLs;
    if (!!imageURLs[index]?.length && !changedIndex.includes(index)) {
      setChangedIndex([...changedIndex, index]);
      setChangeFiles([
        ...changeFiles,
        {
          uniqueFileName: bufImageUrls[index]?.slice(
            imageURLs[index].indexOf("/resources/") + 11,
            imageURLs[index].length
          ),
          fileOrder: index,
        },
      ]);
    }
    bufImageFiles.splice(index, 1);
    bufImageUrls.splice(index, 1);
    setImageFiles([...bufImageFiles]);
    setImageURLs([...bufImageUrls]);
  };
  const handleResetFiles = () => {
    setImageFiles([]);
    setImageURLs([]);
    setChangeFiles([]);
  };
  const handleContextChange = (e: string) => {
    setTemplateMsgContext(e);
  };
  const handleDeleteTemplateModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteTemplateModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteTemplateModalConfirm = () => {
    if (templateId) {
      deleteTemplate(
        { templateId },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title=" 삭제 오류" type="ERROR">
                  삭제 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
                  관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title=" 삭제 완료" type="SUCCESS">
                  을 정상적으로 삭제하였습니다.
                </ToastMessage>
              ),
            });
            handleModalClose();
          },
        }
      );
    }
    setDeleteModalOpen(false);
  };
  const handleAddTemplateButtonClick = methods.handleSubmit(
    ({ templateName }) => {
      addTemplate(
        {
          template: {
            templateName,
            wiredPhoneNumber,
            templateMsgTitle,
            templateMsgContext,
            templateChannel,
            groupTemplateId,
          },
          files: imageFiles,
        },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title=" 등록 오류" type="ERROR">
                  등록 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  등록을 다시 수정하세요. 본 오류가 계속 발생하는 경우 시스템
                  관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title=" 등록 완료" type="SUCCESS">
                  을 정상적으로 등록하였습니다.
                </ToastMessage>
              ),
            });
            handleModalClose();
          },
        }
      );
    }
  );
  const handleDoubleCheck = async () => {
    await methods.trigger("templateName");
    if (!methods.formState.errors.templateName) {
      setEnableQuery(true);
    }
  };
  const handleGroupTemplateIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGroupTemplateId(Number(e.target.value));
  };
  const handleChangeTemplateButtonClick = methods.handleSubmit(
    ({ templateName }) => {
      changeTemplate(
        {
          template: {
            templateId,
            templateName,
            wiredPhoneNumber,
            templateMsgTitle,
            templateMsgContext,
            templateChannel,
            groupTemplateId,
            changeFiles,
          },
          files: imageFiles,
        },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title=" 수정 오류" type="ERROR">
                  수정 중 알 수 없는 오류가 발생하였습니다.
                  <br />을 다시 수정하세요. 본 오류가 계속 발생하는 경우 시스템
                  관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title=" 수정 완료" type="SUCCESS">
                  을 정상적으로 수정하였습니다.
                </ToastMessage>
              ),
            });
            handleModalClose();
          },
        }
      );
      setChangeFiles([]);
    }
  );
  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    methods.setValue("templateName", template?.templateName ?? "");
    setChangeFiles([]);
  }, [methods, selectedTemplateGroupId, template]);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="1200px">
        <ModalHeader>{isChangeTemplate ? "수정" : "등록"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <FormProvider {...methods}>
            <Flex flexDirection="column" gap={3}>
              <CollapseSection headerTitle=" 기본 정보">
                <InfoBox>
                  {isChangeTemplate && (
                    <Flex>
                      <InfoElement flex={1} label="등록일시">
                        <Text>
                          {template &&
                            format(
                              new Date(template?.createDate ?? ""),
                              "yyyy-MM-dd HH:mm"
                            )}
                        </Text>
                      </InfoElement>
                      <InfoElement flex={1} label="담당자">
                        <Text>{template?.userName}</Text>
                      </InfoElement>
                    </Flex>
                  )}
                  <InfoElement label=" 그룹">
                    <CustomSelect
                      codes={templateGroupsCode}
                      key={templateGroupsCode?.[0]?.code + "-selector"}
                      maxW="50%"
                      size="sm"
                      value={groupTemplateId}
                      onChange={handleGroupTemplateIdChange}
                    />
                  </InfoElement>
                  <InfoElement label="명">
                    <FormControl
                      isInvalid={!!methods.formState.errors.templateName}
                    >
                      <Input
                        borderColor={!!isFetching ? "blue.400" : "gray.400"}
                        borderWidth={!!isFetching ? "2px" : "gray.400"}
                        placeholder={message.templateName.pattern}
                        size="sm"
                        {...methods.register("templateName", {
                          required: {
                            value: true,
                            message: message.templateName.required,
                          },
                          pattern: {
                            value: /^.{2,20}$/,
                            message: message.templateName.pattern,
                          },
                          onBlur: () => handleDoubleCheck(),
                          onChange: (e) =>
                            methods.setValue(
                              "templateName",
                              e.target.value.replace(/\\/g, "")
                            ),
                        })}
                        onFocus={() => setEnableQuery(false)}
                      />
                      {methods.formState.errors.templateName && (
                        <FormErrorMessage>
                          {methods.formState.errors.templateName.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </InfoElement>
                </InfoBox>
              </CollapseSection>
              <CollapseSection headerTitle=" 내용 등록">
                <Flex gap={3} width="100%">
                  <InputPanel
                    changeFile={changeFiles}
                    imageFiles={imageFiles}
                    imageURLs={imageURLs}
                    subjectPanel={false}
                    template={template}
                    wiredPhoneNumbers={[]}
                    onChannelChange={setTemplateChannel}
                    onContextChange={handleContextChange}
                    onImagesChange={changeImageFile}
                    onTitleChange={setTemplateMsgTitle}
                    onWiredPhoneNumberChange={setWiredPhoneNumber}
                    removeImageFile={removeImageFile}
                    resetFiles={handleResetFiles}
                  />
                  <Flex flexDirection="column">
                    <PreviewPanel
                      channel={templateChannel ?? ""}
                      imageURLs={imageURLs}
                      messageContents={templateMsgContext}
                    />
                  </Flex>
                </Flex>
              </CollapseSection>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Flex gap={2}>
            {isChangeTemplate ? (
              <Button
                isLoading={isDeleteLoading}
                variant="secondaryGray"
                onClick={
                  isDeleteLoading ? () => {} : handleDeleteTemplateModalOpen
                }
              >
                삭제
              </Button>
            ) : (
              <Flex></Flex>
            )}
          </Flex>
          <Flex gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            {isChangeTemplate ? (
              <Button
                isDisabled={!!methods.formState.errors.templateName}
                isLoading={isChangeLoading}
                variant="primaryBlue"
                onClick={
                  isChangeLoading ? () => {} : handleChangeTemplateButtonClick
                }
              >
                수정
              </Button>
            ) : (
              <Button
                isDisabled={!!methods.formState.errors.templateName}
                isLoading={isAddLoading}
                variant="primaryBlue"
                onClick={isAddLoading ? () => {} : handleAddTemplateButtonClick}
              >
                등록
              </Button>
            )}
          </Flex>
        </ModalFooter>
        {deleteModalOpen && (
          <DeleteTemplateModal
            onClose={handleDeleteTemplateModalClose}
            onConfirm={handleDeleteTemplateModalConfirm}
          />
        )}
      </ModalContent>
    </CustomModal>
  );
}

export default SaveTemplateModal;
