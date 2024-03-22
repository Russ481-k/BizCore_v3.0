import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  ImageUploader,
  InfoBox,
  InfoElement,
  MessageTextarea,
  QuestionMarkIcon,
  ReplacementCodeInfoModal,
  ReplacementCodeList,
  SpecialSymbolList,
  TipText,
  ToastMessage,
} from "components";
import Scenario from "type/Scenario";

interface NodeInputPanelProps {
  channel?: string;
  contentsByteCount: number;
  contentsStringLimit: number;
  imageURL: string | null;
  infoNodeArray: Scenario[];
  isDisabled: boolean;
  isInfoNode: boolean;
  isReset: boolean;
  scenarioNodeArray: Scenario[];
  selectedNode: Scenario | null;
  getByteFromText: (text: string, type: string) => void;
  onFileChange: (file: File | null) => void;
  onInfoNodeArrayChange: (infoNodeArray: Scenario[]) => void;
  onScenarioNodeArrayChange: (
    scenarioNodeArray: Scenario[],
    index: number
  ) => void;
}

function NodeInputPanel({
  channel,
  contentsByteCount,
  contentsStringLimit,
  imageURL,
  infoNodeArray,
  isDisabled,
  isInfoNode,
  isReset,
  scenarioNodeArray,
  selectedNode,
  getByteFromText,
  onFileChange,
  onInfoNodeArrayChange,
  onScenarioNodeArrayChange,
}: NodeInputPanelProps) {
  const toast = useToast();
  const { setValue, getValues, register, clearErrors, setError } =
    useFormContext<{
      code: string;
      nodeTitle: string;
      messageContents: string;
    }>();
  const messageContents = getValues("messageContents");

  const [replacementInfoModalOpen, setReplacementInfoModalOpen] =
    useState<boolean>(false);

  const index = scenarioNodeArray.findIndex(
    (item) => item.id === selectedNode?.id
  );
  const removeImageFile = () => {
    onFileChange(null);
    scenarioNodeArray[index].file = null;
    scenarioNodeArray[index].filePath = null;
  };
  const handleReplacementInfoModalIconClick = () => {
    setReplacementInfoModalOpen(true);
  };
  const handleInfoNodeChange = (
    type: "autoReply" | "close" | "exception" | "expired",
    e: string
  ) => {
    if (type === "autoReply") {
      infoNodeArray[0].msg = e;
    } else if (type === "expired") {
      infoNodeArray[1].msg = e;
    } else if (type === "exception") {
      infoNodeArray[2].msg = e;
    } else if (type === "close") {
      infoNodeArray[3].msg = e;
    }
    onInfoNodeArrayChange([...infoNodeArray]);
  };
  const handleScenarioNodeChange = (
    type: "title" | "msg" | "code",
    e: string
  ) => {
    if (type === "title") {
      scenarioNodeArray[index].title = e;
    } else if (type === "msg") {
      scenarioNodeArray[index].msg = e;
    } else if (type === "code") {
      scenarioNodeArray[index].code = e;
    }
    onScenarioNodeArrayChange([...scenarioNodeArray], index);
  };
  const handleAddSymbol = (e: string) => () => {
    if (contentsByteCount >= 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2,000bytes를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
    } else {
      getByteFromText(messageContents + e, "contents");
      setValue("messageContents", messageContents + e);
    }
  };
  const handleContentsChange = (e: string) => {
    getByteFromText(e, "contents");
    if (selectedNode?.id === "autoReply") {
      handleInfoNodeChange("autoReply", e);
    } else if (selectedNode?.id === "expired") {
      handleInfoNodeChange("expired", e);
    } else if (selectedNode?.id === "exception") {
      handleInfoNodeChange("exception", e);
    } else if (selectedNode?.id === "close") {
      handleInfoNodeChange("close", e);
    }
  };
  const handleContentsBlur = (e: string) => {
    if (contentsByteCount > 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2,000bytes를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
      getByteFromText(e.substring(0, contentsStringLimit), "contents");
      return e.substring(0, contentsStringLimit);
    } else {
      getByteFromText(e, "contents");
      setValue("messageContents", e);
      return e;
    }
  };
  const changeImageFile = (file: File) => {
    onFileChange(file);
    if (isInfoNode) {
      infoNodeArray[index].file = file;
      infoNodeArray[index].filePath = URL.createObjectURL(file);
    } else {
      scenarioNodeArray[index].file = file;
      scenarioNodeArray[index].filePath = URL.createObjectURL(file);
    }
  };

  useEffect(() => {
    clearErrors("messageContents");
    if (isInfoNode) {
      if (selectedNode) {
        setValue("messageContents", selectedNode.msg);
      }
    } else {
      if (selectedNode) {
        setValue("code", selectedNode.code);
        setValue("nodeTitle", selectedNode.title);
        if (selectedNode.code === "") {
          setError(
            "code",
            {
              type: "required",
              message: "회신번호을 입력하세요.",
            },
            { shouldFocus: true }
          );
          setValue("code", "");
        }
        if (selectedNode.title === "") {
          setError(
            "nodeTitle",
            {
              type: "required",
              message: "노드명을 입력하세요.",
            },
            { shouldFocus: true }
          );
          setValue("nodeTitle", "");
        }
      }
    }
  }, [isInfoNode, selectedNode, setValue, setError, clearErrors]);

  useEffect(() => {
    if (isReset) {
      setValue("messageContents", "");
      setValue("code", "");
      setValue("nodeTitle", "");
    }
  }, [isReset, setValue]);

  return (
    <InfoBox>
      {!isInfoNode && (
        <Flex>
          <InfoElement label="노드명" required>
            {isInfoNode ? (
              <Text color="primary.800">{selectedNode?.title}</Text>
            ) : (
              <Input
                size="sm"
                defaultValue={selectedNode?.title}
                isDisabled={isDisabled}
                {...register("nodeTitle")}
                onChange={(e) => {
                  handleScenarioNodeChange("title", e.target.value);
                }}
              />
            )}
          </InfoElement>
          <InfoElement label="회신문자" required>
            {isInfoNode ? (
              <Text color="primary.800">{selectedNode?.code}</Text>
            ) : (
              <Input
                size="sm"
                defaultValue={selectedNode?.code}
                isDisabled={isDisabled}
                {...register("code")}
                onChange={(e) => {
                  handleScenarioNodeChange("code", e.target.value);
                }}
              />
            )}
          </InfoElement>
        </Flex>
      )}
      <InfoElement label="메시지 내용" required>
        <Flex flexDirection="column" gap={2} py={2} width="100%">
          <MessageTextarea
            channel={channel ?? "SMS"}
            contentsByteCount={contentsByteCount}
            defaultValue={selectedNode?.msg}
            isDisabled={isDisabled}
            onContentsBlur={handleContentsBlur}
            onContentsChange={handleContentsChange}
          />
          <Flex justifyContent="space-between" gap={2}>
            <Button
              isDisabled={isDisabled}
              size="sm"
              variant="secondaryBlue"
              width="150px"
            >
              미리보기
            </Button>
            <Flex alignItems="center" gap={2}>
              <Popover>
                <PopoverTrigger>
                  <Button
                    isDisabled={isDisabled}
                    size="sm"
                    variant="secondaryBlue"
                    width="150px"
                  >
                    특수문자
                  </Button>
                </PopoverTrigger>
                <PopoverContent boxShadow="0px 4px 12px -3px" width="402px">
                  <PopoverArrow />
                  <PopoverHeader>특수문자 입력</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody p={0}>
                    <SpecialSymbolList addSymbol={handleAddSymbol} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <Button
                    isDisabled={isDisabled}
                    size="sm"
                    variant="secondaryBlue"
                    width="150px"
                  >
                    치환코드
                  </Button>
                </PopoverTrigger>
                <PopoverContent boxShadow="0px 4px 12px -3px" width="162px">
                  <PopoverArrow />
                  <PopoverHeader>치환코드 입력</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody p={0}>
                    <ReplacementCodeList addSymbol={handleAddSymbol} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <QuestionMarkIcon
                color="primary.700"
                cursor="pointer"
                onClick={handleReplacementInfoModalIconClick}
              />
            </Flex>
          </Flex>
          <TipText
            size="sm"
            text="내용이 90bytes가 넘으면 장문메시지로 자동변경됩니다. (단문 90bytes,
            장문 / 포토 2,000bytes) 문서 프로그램에서 작성한 특수문자 등을
            복사/붙여넣기 할 경우 수신자폰에서 깨짐 현상이 발생 할 수 있습니다.
            상단 [특수문자]버튼을 클릭하여 특수문자를 직접 입력해주세요."
          />
        </Flex>
      </InfoElement>
      {selectedNode?.id !== "expired" &&
        selectedNode?.id !== "exception" &&
        selectedNode?.id !== "close" && (
          <InfoElement label="이미지 첨부">
            <ImageUploader
              isTwoWay={true}
              isDisabled={isDisabled}
              imageURLs={imageURL ? [imageURL] : undefined}
              onChange={changeImageFile}
              removeImageFile={removeImageFile}
            />
          </InfoElement>
        )}
      {replacementInfoModalOpen && (
        <ReplacementCodeInfoModal setOpen={setReplacementInfoModalOpen} />
      )}
    </InfoBox>
  );
}

export default NodeInputPanel;
