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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useAddAlarmTalkTemplateExcel,
  useGetAlarmTalkTemplateGroups,
} from "features/template";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface ImportAlarmTalkTemplateModalProps {
  selectedTemplateGroupId?: number;
  isChangeTemplate: boolean;
  templateId?: number;
  onClose: () => void;
}

function ImportAlarmTalkTemplateModal({
  selectedTemplateGroupId,
  isChangeTemplate,
  templateId,
  onClose,
}: ImportAlarmTalkTemplateModalProps) {
  const toast = useToast();
  const methods = useForm<{
    groupTemplateId: string;
    excelFile: File;
  }>({ mode: "onBlur" });

  const { data: templateGroups } = useGetAlarmTalkTemplateGroups();

  const { mutate: addAlarmTalkTemplateExcel, isLoading: isAddLoading } =
    useAddAlarmTalkTemplateExcel();

  const [excelFileTitle, setExcelFileTitle] = useState<string>("");
  const [excelFile, setExcelFile] = useState<File>(new File([], ""));

  const templateGroupsCode = templateGroups?.map((group) => {
    return {
      code: String(group?.groupTemplateId),
      name: group.groupTemplateName,
    };
  });
  const handleModalClose = () => {
    onClose();
  };

  const handleAddTemplateButtonClick = methods.handleSubmit(
    ({ groupTemplateId }) => {
      addAlarmTalkTemplateExcel(
        {
          groupTemplateId: Number(groupTemplateId),
          file: excelFile,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="알림톡 템플릿 등록 오류" type="ERROR">
                  <Text width="200px">
                    {!!error?.response?.data.data.overlap_count && (
                      <Text>
                        중복 오류 : {error?.response?.data.data.overlap_count}건
                        <br />
                        중복 오류 코드 <br />
                        {error?.response?.data.data.overlap_template}
                      </Text>
                    )}
                    <br />
                    {!!error?.response?.data.data.empty_count && (
                      <Text>
                        형식 오류 : {error?.response?.data.data.empty_count}건
                        <br />
                        형식 오류 코드 <br />
                        {error?.response?.data.data.empty_template}
                      </Text>
                    )}
                  </Text>
                </ToastMessage>
              ),
              duration: 8000,
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="알림톡 템플릿 등록 완료" type="SUCCESS">
                  알림톡 템플릿을 정상적으로 등록하였습니다.
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    }
  );

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "sample";
  const excelDownload = (excelData: Array<any>) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "순번",
        "카카오채널ID",
        "그룹유형",
        "템플릿코드",
        "템플릿명",
        "템플릿 유형",
        "메시지 내용",
        "부가정보",
        "광고성메시지",
        "검수상태",
        "템플릿상태",
        "강조유형",
        "강조표기타이틀",
        "강조표기보조문구",
        "비고",
        "등록자",
        "검수요청일",
        "버튼타입 [1]",
        "버튼명 [1]",
        "모바일링크 [1]",
        "PC링크 [1]",
        "android스킴 [1]",
        "ios스킴 [1]",
        "플러그인ID [1]",
        "버튼타입 [2]",
        "버튼명 [2]",
        "모바일링크 [2]",
        "PC링크 [2]",
        "android스킴 [2]",
        "ios스킴 [2]",
        "플러그인ID [2]",
        "버튼타입 [3]",
        "버튼명 [3]",
        "모바일링크 [3]",
        "PC링크 [3]",
        "android스킴 [3]",
        "ios스킴 [3]",
        "플러그인ID [3]",
        "버튼타입 [4]",
        "버튼명 [4]",
        "모바일링크 [4]",
        "PC링크 [4]",
        "android스킴 [4]",
        "ios스킴 [4]",
        "플러그인ID [4]",
        "버튼타입 [5]",
        "버튼명 [5]",
        "모바일링크 [5]",
        "PC링크 [5]",
        "android스킴 [5]",
        "ios스킴 [5]",
        "플러그인ID [5]",
      ],
    ]);
    excelData.map((data: any) => {
      XLSX.utils.sheet_add_aoa(ws, [[data.title, data.content]], {
        origin: -1,
      });
      ws["!cols"] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  const handleExcelFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (!e?.target.files) return;
    setExcelFile(e?.target.files[0]);
    setExcelFileTitle(e?.target.files[0].name);
  };
  return (
    <CustomModal isOpen onClose={handleModalClose}>
      <ModalContent minW="768px">
        <ModalHeader>
          알림톡 템플릿 {isChangeTemplate ? "수정" : "등록"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <FormProvider {...methods}>
            <Flex flexDirection="column" gap={3}>
              <TipText
                hasBg
                size="sm"
                text={`카카오페이에서 승인 받은 알림톡 템플릿을 등록합니다.\n승인 받지 못한 알림톡 템플릿을 등록하거나, 모비텍에서 제공 받은 알림톡 템플릿 엑셀 파일을 수정한 경우 오류가 발생합니다.\n\n등록할 알림톡 템플릿 그룹을 선택하신 다음,\n모비텍에서 제공받은 알림톡 템플릿 엑셀 파일을 선택하여 등록하세요.\n\n새로운 알림톡 템플릿 등록이 필요한 경우 모비텍 담당자 (T.051-646-7000)에게 문의 주시기 바랍니다.`}
              />
              <InfoBox>
                <InfoElement label="알림톡 템플릿 그룹" required>
                  <FormControl
                    isInvalid={!!methods.formState.errors.groupTemplateId}
                  >
                    <CustomSelect
                      codes={templateGroupsCode}
                      isInvalid={!!methods.formState.errors.groupTemplateId}
                      size="sm"
                      defaultValue={String(selectedTemplateGroupId ?? 1)}
                      {...methods.register("groupTemplateId", {
                        required: {
                          value: true,
                          message: "알림톡 템플릿 그룹을 선택하세요.",
                        },
                      })}
                    />
                    {!!methods.formState.errors.groupTemplateId && (
                      <FormErrorMessage>
                        {methods.formState.errors.groupTemplateId?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </InfoElement>
                <InfoElement label="엑셀 파일" required>
                  <FormControl isInvalid={!!methods.formState.errors.excelFile}>
                    <Flex alignItems="center" gap={3} width="100%">
                      <Input
                        display="none"
                        id="fileUpload"
                        type="file"
                        {...methods.register("excelFile", {
                          required: {
                            value: true,
                            message: "파일을 선택해주세요.",
                          },
                          onChange: handleExcelFileChange,
                        })}
                      />
                      <Text fontSize="14px" width="100%">
                        {excelFileTitle?.length ? (
                          excelFileTitle
                        ) : !!methods.formState.errors.excelFile ? (
                          <FormErrorMessage m={0}>
                            {methods.formState.errors.excelFile?.message}
                          </FormErrorMessage>
                        ) : (
                          "파일을 선택해주세요."
                        )}
                      </Text>
                      {excelFileTitle?.length ? (
                        <Button
                          as="label"
                          htmlFor="fileUpload"
                          size="sm"
                          variant="secondaryBlue"
                        >
                          변경
                        </Button>
                      ) : (
                        <Button
                          as="label"
                          htmlFor="fileUpload"
                          size="sm"
                          variant="secondaryBlue"
                        >
                          찾아보기
                        </Button>
                      )}
                    </Flex>
                  </FormControl>
                  <Button
                    ms={2}
                    size="sm"
                    variant="secondaryGray"
                    onClick={() => excelDownload([])}
                  >
                    샘플파일 다운로드
                  </Button>
                </InfoElement>
              </InfoBox>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            isLoading={isAddLoading}
            variant="primaryBlue"
            onClick={isAddLoading ? () => {} : handleAddTemplateButtonClick}
          >
            알림톡 템플릿 등록
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ImportAlarmTalkTemplateModal;
