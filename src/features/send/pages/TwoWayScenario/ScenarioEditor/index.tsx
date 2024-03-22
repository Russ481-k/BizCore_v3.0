import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomSelect,
  InfoBox,
  InfoElement,
  ReplacementCodeInfoModal,
  TipText,
  ToastMessage,
} from "components";
import AutoTestModal from "components/TwoWayInputPanel/AutoTestModal";
import {
  useAddNode,
  useChangeInfoNode,
  useChangeNode,
  useGetTwoWayScenario,
} from "features/send";
import Scenario from "type/Scenario";
import InfoNodeTabsPanel from "./InfoNodeTabsPanel";
import NodeInputPanel from "./NodeInputPanel";
import ScenarioTreePanel from "./ScenarioTreePanel";
import BackwardCheckModal from "./ScenarioTreePanel/BackwardCheckModal";
import ResetCheckModal from "./ScenarioTreePanel/ResetCheckModal";

interface ScenarioEditorProps {
  groupId: number;
  onReset: () => void;
}

function ScenarioEditor({ groupId, onReset }: ScenarioEditorProps) {
  const toast = useToast();
  const methods = useForm<{
    messageContents: string | null;
    nodeTitle: string | null;
    code: string | null;
    isAutoReplyUsed: string;
    scenarioTitle: string;
    expiredTime: string;
  }>({ mode: "onChange" });
  const watchIsUsed = methods.watch("isAutoReplyUsed");

  const [channel, setChannel] = useState<string>("SMS");
  const [contentsByteCount, setContentsByteCount] = useState<number>(0);
  const [contentsStringLimit, setContentsStringLimit] = useState<number>(0);
  const [deletedNodeId, setDeletedNodeId] = useState<Array<string>>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isAutoTestModalOpen, setAutoTestModalOpen] = useState<boolean>(false);
  const [isInfoNode, setInfoNode] = useState<boolean>(true);
  const [replacementInfoModalOpen, setReplacementInfoModalOpen] =
    useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Scenario | null>(null);
  const [scenarioNodeArray, setScenarioNodeArray] = useState<Array<Scenario>>(
    []
  );
  const [addedNodeArray, setAddedNodeArray] = useState<Array<Scenario>>([]);
  const [changedNodeArray, setChangedNodeArray] = useState<Array<Scenario>>([]);
  const [infoNodeArray, setInfoNodeArray] = useState<Array<Scenario>>([]);
  const [isResetCheckModalOpen, setResetCheckModalOpen] =
    useState<boolean>(false);
  const [isBackwardCheckModalOpen, setBackwardCheckModalOpen] =
    useState<boolean>(false);
  const [isSaveScenarioEnable, setSaveScenarioEnable] =
    useState<boolean>(false);
  const [isSaveAutoReplyEnable, setSaveAutoReplyEnable] =
    useState<boolean>(false);
  const [isSaveCloseEnable, setSaveCloseEnable] = useState<boolean>(false);
  const [isSaveExceptionEnable, setSaveExceptionEnable] =
    useState<boolean>(false);
  const [isSaveExpiredEnable, setSaveExpiredEnable] = useState<boolean>(false);
  const [isNodeChanged, setNodeChanged] = useState<boolean>(false);
  const [isInfoNodeChanged, setInfoNodeChanged] = useState<boolean>(false);
  const [isUseChanged, setUseChanged] = useState<boolean>(false);
  const {
    autoReply,
    close,
    exception,
    expired,
    scenarios,
    isUse,
    serviceName,
    filePath,
  } = useGetTwoWayScenario(
    {
      groupId,
    },
    {
      enabled: !!groupId,
    }
  );

  const { mutate: changeInfoNode } = useChangeInfoNode();
  const { mutate: changeNode } = useChangeNode();
  const { mutate: addNode } = useAddNode();

  const getByteFromText = useCallback(
    (e: string, type: string) => {
      let count = 0;
      let channel = "SMS";
      if (e?.length === 0) {
        setChannel(channel);
        return setContentsByteCount(0);
      }
      return e
        ?.split("")
        .map((s) => s.charCodeAt(0))
        .reduce((prev, c) => {
          if (prev <= 2000) {
            count++;
            setContentsStringLimit(count - 1);
          }
          let result = prev + (c === 10 ? 2 : c >> 7 ? 2 : 1);
          if (type === "contents") {
            setContentsByteCount(result);
            methods?.setValue("messageContents", e);
          }
          return result;
        }, 0);
    },
    [methods, setChannel, setContentsByteCount, setContentsStringLimit]
  );
  const handleAddNodeButtonClick = (
    id: string | null,
    depth: number,
    replyId: string | null
  ) => {
    const timeStamp = new Date().getTime().toString();
    const parentNodeCounter =
      scenarioNodeArray.filter((node) => (node.depth ?? 0) === depth).length +
      1;
    const childNodeCounter = scenarioNodeArray.filter(
      (node) =>
        (node.depth ?? 0) === (depth ?? 0) + 1 &&
        (node.parentReplyId === replyId || node.parentReplyId === id)
    ).length;

    console.log("childNodeCounter", childNodeCounter);

    if (!id?.length) {
      const addedNodeWithOutReplyId = {
        id: timeStamp,
        replyId: "",
        parentReplyId: id,
        //replyId가 없을 때 새로운 하위 노드를 추가하는 경우 새로운 노드의 parentReplyId는??
        //없을 경우 보내는 노드의 타임스템프 아이디를 부모 리플라이 아이디에 넣음
        allowMMS: false,
        code: String(parentNodeCounter),
        depth: 0,
        msg: `노드 ${parentNodeCounter}의 내용을 입력하세요.`,
        title: `노드 ${parentNodeCounter}`,
        file: null,
      };
      scenarioNodeArray.push(addedNodeWithOutReplyId);
      setAddedNodeArray([...addedNodeArray, addedNodeWithOutReplyId]);
    } else {
      const index = scenarioNodeArray.findIndex(
        (node) => node.id === selectedNode?.id
      );
      const addedNodeWithReplyId = {
        id: timeStamp,
        replyId: "",
        parentReplyId: replyId ?? "",
        allowMMS: false,
        code: String(childNodeCounter),
        depth: (depth ?? 0) + 1,
        msg: `노드 ${childNodeCounter}의 내용을 입력하세요.`,
        title: `노드 ${childNodeCounter}`,
        file: null,
      };
      scenarioNodeArray.splice(
        Number(index) + Number(childNodeCounter),
        0,
        addedNodeWithReplyId
      );
      setAddedNodeArray([...addedNodeArray, addedNodeWithReplyId]);
    }
    setScenarioNodeArray([...scenarioNodeArray]);
    setNodeChanged(true);
  };
  const handleSelectNode = useCallback(
    (node: Scenario, infoNode: boolean) => {
      setSelectedNode(node);
      getByteFromText(node.msg ?? "", "contents");
      if (!infoNode) {
        getByteFromText(node.msg ?? "", "title");
      }
      //불필요한 코드로 보임
    },
    [setSelectedNode, getByteFromText]
  );
  const handleDeleteNodeButtonClick = (id: string) => {
    const index = scenarioNodeArray.findIndex((node) => node.id === id);
    if (
      !!scenarioNodeArray[index].replyId?.length &&
      (scenarioNodeArray[index].replyId !==
        scenarioNodeArray[index + 1]?.parentReplyId ||
        !scenarioNodeArray[index + 1])
    ) {
      const title = scenarioNodeArray[index].title;
      setDeletedNodeId([
        ...deletedNodeId,
        scenarioNodeArray[index].replyId ?? "",
      ]);
      scenarioNodeArray.splice(index, 1);
      setScenarioNodeArray([...scenarioNodeArray]);
      setNodeChanged(true);
      toast({
        render: () => (
          <ToastMessage title="시나리오 노드 삭제 완료" type="SUCCESS">
            {title}(이)가 정상적으로 삭제되었습니다.
          </ToastMessage>
        ),
      });
    } else {
      toast({
        render: () => (
          <ToastMessage title="시나리오 노드 삭제 오류" type="ERROR">
            하위 노드가 존재하는 노드는 삭제할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
    }
  };
  const initialInfoNodeArray = useCallback(
    () => [
      {
        id: "autoReply",
        allowMMS: false,
        parentReplyId: "",
        child: [],
        code: "",
        depth: 0,
        msg: autoReply?.msg ?? "",
        replyId: "",
        title: "",
        file: null,
        filePath: filePath,
      },
      {
        id: "expired",
        allowMMS: false,
        parentReplyId: "",
        child: [],
        code: "",
        depth: 0,
        msg: expired?.msg ?? "",
        replyId: "",
        title: "",
      },
      {
        id: "exception",
        allowMMS: false,
        parentReplyId: "",
        child: [],
        code: "",
        depth: 0,
        msg: exception?.msg ?? "",
        replyId: "",
        title: "",
      },
      {
        id: "close",
        allowMMS: false,
        parentReplyId: "",
        child: [],
        code: "",
        depth: 0,
        msg: close?.msg ?? "",
        replyId: "",
        title: "",
      },
    ],
    [autoReply?.msg, expired?.msg, exception?.msg, close?.msg, filePath]
  );
  const handleTreeArray = useCallback(() => {
    const result: Array<Scenario> = [];
    let depthCount = 0;
    setInfoNodeArray(initialInfoNodeArray);
    handleSelectNode(
      {
        id: "autoReply",
        allowMMS: false,
        parentReplyId: "",
        child: [],
        code: "",
        depth: 0,
        msg: autoReply?.msg ?? "",
        replyId: "",
        title: "",
        file: null,
        filePath: filePath,
      },
      true
    );
    getByteFromText(autoReply?.msg ?? "", "contents");
    const scenarioTreeToNodeArray = (trees: Scenario[]) => {
      trees?.forEach((tree, i) => {
        const timeStamp = (new Date().getTime() + i).toString();
        result.push({
          id: timeStamp,
          replyId: tree.replyId,
          parentReplyId: tree.parentReplyId ?? "",
          allowMMS: tree.allowMMS,
          code: tree.code,
          depth: depthCount,
          msg: tree.msg,
          title: tree.title,
          child: tree.child,
          filePath: tree.filePath,
          file: tree.file,
        });
        if (!!tree.child?.length) {
          depthCount++;
          scenarioTreeToNodeArray(tree?.child);
          depthCount--;
        }
      });
    };
    scenarioTreeToNodeArray(scenarios ?? []);
    setScenarioNodeArray(result);
  }, [
    initialInfoNodeArray,
    autoReply?.msg,
    scenarios,
    filePath,
    getByteFromText,
    handleSelectNode,
    setInfoNodeArray,
  ]);
  const handleAutoTestButtonClick = () => {
    setAutoTestModalOpen(true);
  };
  const handleAutoTestModalClose = () => {
    setAutoTestModalOpen(false);
  };
  const handleBackwardCheckModalOpen = () => {
    setBackwardCheckModalOpen(true);
  };
  const handleBackwardCheckModalClose = () => {
    setBackwardCheckModalOpen(false);
  };
  const handleBackwardCheckModalConfirm = () => {
    onReset();
    setNodeChanged(false);
    setInfoNodeChanged(false);
  };
  const handleBackwardButtonClick = () => {
    if (isNodeChanged || isInfoNodeChanged) {
      handleBackwardCheckModalOpen();
    } else {
      onReset();
    }
  };
  const handleImageFileChange = (file: File | null) => {
    setImageFile(file);
    setImageURL(file ? URL.createObjectURL(file) : null);
    if (isInfoNode) {
      setInfoNodeChanged(true);
    } else {
      setNodeChanged(true);
    }
  };
  const handleResetCheckModalOpen = () => {
    setResetCheckModalOpen(true);
  };
  const handleResetCheckModalClose = () => {
    setResetCheckModalOpen(false);
  };
  const handleResetCheckModalConfirm = () => {
    setReset(true);
    setInfoNode(true);
    setImageFile(null);
    setImageURL(null);
    setScenarioNodeArray([]);
    setInfoNodeArray(initialInfoNodeArray);
    getByteFromText("", "contents");
    getByteFromText("", "title");
    setNodeChanged(true);
    setInfoNodeChanged(true);
    methods.resetField("messageContents");
    toast({
      render: () => (
        <ToastMessage title="시나리오 초기화" type="SUCCESS">
          시나리오가 정상적으로 초기화되었습니다.
        </ToastMessage>
      ),
      duration: 5000,
    });
    handleSelectNode(infoNodeArray[0], true);
  };
  const handleSelectedNodeButtonClick = (node: Scenario, infoNode: boolean) => {
    setImageFile(null);
    setImageURL(null);
    setImageFile(node.file ?? null);
    setImageURL(node.filePath ?? "");
    handleSelectNode(node, infoNode);
    methods.setValue("nodeTitle", node.title ?? "");
    methods.setValue("code", node.code ?? "");
    methods.setValue("messageContents", node.msg ?? "");
    setInfoNode(infoNode);
  };
  const handleInfoNodeArrayChange = (infoNodeArray: Scenario[]) => {
    setInfoNodeArray([...infoNodeArray]);
    setInfoNodeChanged(true);
  };
  const handleScenarioNodeArrayChange = (
    nodeArray: Scenario[],
    index: number
  ) => {
    setScenarioNodeArray([...nodeArray]);
    setChangedNodeArray([...changedNodeArray, nodeArray[index]]);
    setNodeChanged(true);
  };
  const handelSaveScenarioButtonClick = methods.handleSubmit(() => {
    if (!!methods.getValues("scenarioTitle")) {
      if (isNodeChanged) {
        changeNode(
          {
            nodeModifyBody: scenarioNodeArray.map((node) => ({
              id: "",
              groupId,
              replyId: node.replyId ?? "",
              parentReplyId: node.parentReplyId ?? "",
              code: node.code ?? "",
              depth: node.depth ?? 0,
              title: node.title ?? "",
              msg: node.msg ?? "",
              allowMMS: node.allowMMS ?? "",
              file: node.file ?? null,
            })),
            groupId,
          },
          {
            onSuccess: () => {
              setNodeChanged(false);
              if (!isInfoNodeChanged) {
                toast({
                  render: () => (
                    <ToastMessage title="시나리오 저장 완료" type="SUCCESS">
                      시나리오가 정상적으로 저장되었습니다.
                    </ToastMessage>
                  ),
                  duration: 5000,
                });
              }
            },
            onError: (error) => {
              toast({
                render: () => (
                  <ToastMessage title="시나리오 노드 저장 실패" type="ERROR">
                    시나리오 노드 저장에 실패하였습니다.
                  </ToastMessage>
                ),
                duration: 5000,
              });
            },
          }
        );
      }
      if (isInfoNodeChanged || watchIsUsed !== (isUse ? "Y" : "N")) {
        changeInfoNode(
          {
            groupId: groupId,
            serviceName: methods.getValues("scenarioTitle") ?? "",
            isUse: watchIsUsed === "Y",
            mmsReply: {
              msg: null,
            },
            autoreply: {
              msg: infoNodeArray[0].msg ?? "",
            },
            expired: {
              validTime: Number(methods.getValues("expiredTime")),
              msg: infoNodeArray[1].msg ?? "",
            },
            exception: {
              msg: infoNodeArray[2].msg ?? "",
            },
            close: {
              msg: infoNodeArray[3].msg ?? "",
            },
            file: infoNodeArray[0].file ?? null,
          },
          {
            onSuccess: () => {
              setInfoNodeChanged(false);
              toast({
                render: () => (
                  <ToastMessage title="시나리오 저장 완료" type="SUCCESS">
                    시나리오가 정상적으로 저장되었습니다.
                  </ToastMessage>
                ),
              });
            },
            onError: () => {
              toast({
                render: (error) => (
                  <ToastMessage title="시나리오 안내 저장 실패" type="ERROR">
                    시나리오 안내 저장에 실패하였습니다.
                  </ToastMessage>
                ),
                duration: 5000,
              });
            },
          }
        );
      }
    } else {
      addNode(
        {
          autoMainRequest: {
            groupId,
            serviceName: methods.getValues("scenarioTitle") ?? "",
            isUse: watchIsUsed === "Y",
            mmsReply: {
              msg: null,
            },
            autoreply: {
              msg: infoNodeArray[0].msg ?? "",
            },
            expired: {
              validTime: Number(methods.getValues("expiredTime")),
              msg: infoNodeArray[1].msg ?? "",
            },
            exception: {
              msg: infoNodeArray[2].msg ?? "",
            },
            close: {
              msg: infoNodeArray[3].msg ?? "",
            },
            file: infoNodeArray[0].file ?? null,
          },
          depthAddRequest: scenarioNodeArray.map((node) => ({
            id: "",
            groupId,
            replyId: null,
            parentReplyId: node.parentReplyId ?? "",
            code: node.code ?? "",
            depth: node.depth ?? 0,
            title: node.title ?? "",
            msg: node.msg ?? "",
            allowMMS: node.allowMMS ?? "",
            file: node.file ?? null,
            // filePath: node.filePath ?? null,
          })),
        },
        {
          onSuccess: () => {
            setNodeChanged(false);
            if (!isInfoNodeChanged) {
              toast({
                render: () => (
                  <ToastMessage title="시나리오 등록" type="SUCCESS">
                    시나리오가 정상적으로 등록되었습니다.
                  </ToastMessage>
                ),
                duration: 5000,
              });
            }
          },
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="시나리오 노드 등록 실패" type="ERROR">
                  시나리오 노드 등록에 실패하였습니다.
                </ToastMessage>
              ),
              duration: 5000,
            });
          },
        }
      );
    }
  });

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    let channel = "SMS";
    if (!!imageFile) {
      channel = "MMS";
      setChannel(channel);
    } else {
      if (contentsByteCount > 90) {
        channel = "LMS";
      } else {
        channel = "SMS";
      }
    }
    setChannel(channel);
  }, [imageFile, contentsByteCount]);

  useEffect(() => {
    handleTreeArray();
    if (!!serviceName?.length) {
      methods.setValue("scenarioTitle", serviceName ?? "");
      methods.setValue("expiredTime", String(expired?.validTime ?? 0));
      methods.setValue("isAutoReplyUsed", isUse ? "Y" : "N");
      setImageURL(`${process.env.REACT_APP_API_URL}/resource/${filePath}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceName, autoReply]);

  useEffect(() => {
    if (!!infoNodeArray.length) {
      if (!!infoNodeArray[0].msg.length) {
        setSaveAutoReplyEnable(true);
      } else {
        setSaveAutoReplyEnable(false);
      }
      if (!!infoNodeArray[1].msg.length) {
        setSaveExpiredEnable(true);
      } else {
        setSaveExpiredEnable(false);
      }
      if (!!infoNodeArray[2].msg.length) {
        setSaveExceptionEnable(true);
      } else {
        setSaveExceptionEnable(false);
      }
      if (!!infoNodeArray[3].msg.length) {
        setSaveCloseEnable(true);
      } else {
        setSaveCloseEnable(false);
      }
      if (
        isSaveExceptionEnable &&
        isSaveCloseEnable &&
        isSaveAutoReplyEnable &&
        isSaveExpiredEnable
      ) {
        setSaveScenarioEnable(true);
      } else {
        setSaveScenarioEnable(false);
      }
    }
  }, [
    infoNodeArray,
    isSaveAutoReplyEnable,
    isSaveCloseEnable,
    isSaveExceptionEnable,
    isSaveExpiredEnable,
    selectedNode,
    setSaveExceptionEnable,
    setSaveCloseEnable,
    setSaveAutoReplyEnable,
    setSaveExpiredEnable,
    setSaveScenarioEnable,
  ]);

  return (
    <CollapseSection
      header={
        <Flex justifyContent="space-between" gap={5}>
          <Heading size="sm">자동안내 시나리오 편집기</Heading>
          <TipText
            size="sm"
            text="양방향 자동안내 시나리오를 변경하신 후 아래의 [자동안내 시나리오 저장] 버튼을 클릭하여 적용하세요."
          />
        </Flex>
      }
    >
      <InfoBox>
        <InfoElement label="자동안내 사용여부">
          <Flex justifyContent="space-between" width="100%">
            <CustomSelect
              codes={[
                {
                  code: "Y",
                  name: "사용",
                },
                {
                  code: "N",
                  name: "미사용",
                },
              ]}
              maxW={150}
              size="sm"
              {...(methods.register("isAutoReplyUsed"),
              {
                onChange: (e) => {
                  if (e.target.value === "Y") {
                    setDisabled(false);
                    isUse && setUseChanged(false);
                    !isUse && setUseChanged(true);
                    handleSelectNode(infoNodeArray[0], true);
                  } else if (e.target.value === "N") {
                    setDisabled(true);
                    !isUse && setUseChanged(false);
                    isUse && setUseChanged(true);
                    handleSelectNode(infoNodeArray[0], true);
                  }
                },
              })}
            />
            <Button
              isDisabled={disabled}
              size="sm"
              variant="secondaryBlue"
              onClick={handleResetCheckModalOpen}
            >
              새 시나리오 작성
            </Button>
          </Flex>
        </InfoElement>
        <InfoElement label="자동안내 시나리오명" required>
          <FormControl isInvalid={!!methods.formState.errors.scenarioTitle}>
            <Input
              isDisabled={disabled}
              size="sm"
              width="100%"
              defaultValue={serviceName}
              {...methods.register("scenarioTitle", {
                required: {
                  value: true,
                  message: "자동안내 시나리오명을 입력하세요.",
                },
                minLength: {
                  value: 2,
                  message: "2~20자 이내로 자동안내 시나리오명을 입력하세요.",
                },
                maxLength: {
                  value: 20,
                  message: "2~20자 이내로 자동안내 시나리오명을 입력하세요.",
                },
              })}
            />
            {methods.formState.errors.scenarioTitle && (
              <FormErrorMessage>
                {methods.formState.errors.scenarioTitle.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </InfoElement>
        <InfoElement flex={1} label="응답 유효시간" required>
          <Flex alignItems="center" flex={1} justifyContent="space-between">
            <Flex alignItems="center" gap={3}>
              <InputGroup size="sm" width="200px">
                <FormControl isInvalid={!!methods.formState.errors.expiredTime}>
                  <Input
                    defaultValue={expired?.validTime ?? 0}
                    isDisabled={disabled}
                    {...methods.register("expiredTime", {
                      required: {
                        value: true,
                        message: "응답 유효시간을 입력하세요.",
                      },
                      onBlur: (e) =>
                        methods.setValue(
                          "expiredTime",
                          e.target.value.replace(/[^0-9]/g, "")
                        ),
                      validate: {
                        min: (v) =>
                          Number(v) >= 1 ||
                          "1분 이상 입력하세요.(숫자만입력가능합니다.)",
                      },
                    })}
                  />
                  {methods.formState.errors.expiredTime && (
                    <FormErrorMessage>
                      {methods.formState.errors.expiredTime.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <InputRightElement color="gray.500">분 </InputRightElement>
              </InputGroup>
              <TipText
                size="sm"
                text="메시지 발송 후 입력된 응답 유효시간동안 답변이 없는 경우
                자동종료됩니다."
              />
            </Flex>
            <Text fontSize="sm">( 이전화면: # 처음화면: * )</Text>
          </Flex>
        </InfoElement>
      </InfoBox>
      <Divider my={2} />
      <Flex gap={3}>
        <ScenarioTreePanel
          isDisabled={disabled}
          isOpen={true}
          isReset={reset}
          isSaveScenarioEnable={isSaveScenarioEnable}
          isInfoNode={isInfoNode}
          infoNodes={infoNodeArray ?? []}
          scenarioNodes={scenarioNodeArray ?? []}
          selectedNodeId={selectedNode?.id ?? ""}
          onChange={handleSelectedNodeButtonClick}
          onAddNode={handleAddNodeButtonClick}
          onDeleteNode={handleDeleteNodeButtonClick}
          onReset={setReset}
        />
        <Flex flex={9} flexDirection="column">
          <Flex flex={1} flexDirection="column">
            {isInfoNode && (
              <InfoNodeTabsPanel
                infoNodeArray={infoNodeArray}
                contentsByteCount={contentsByteCount}
                isDisabled={disabled}
                isSaveAutoReplyEnable={isSaveAutoReplyEnable}
                isSaveCloseEnable={isSaveCloseEnable}
                isSaveExceptionEnable={isSaveExceptionEnable}
                isSaveExpiredEnable={isSaveExpiredEnable}
                selectedNode={selectedNode}
                onSelect={handleSelectedNodeButtonClick}
              />
            )}
            <NodeInputPanel
              channel={channel}
              contentsByteCount={contentsByteCount}
              contentsStringLimit={contentsStringLimit}
              imageURL={imageURL}
              infoNodeArray={infoNodeArray}
              isDisabled={disabled}
              isInfoNode={isInfoNode}
              isReset={reset}
              scenarioNodeArray={scenarioNodeArray}
              selectedNode={selectedNode}
              getByteFromText={getByteFromText}
              onFileChange={handleImageFileChange}
              onInfoNodeArrayChange={handleInfoNodeArrayChange}
              onScenarioNodeArrayChange={handleScenarioNodeArrayChange}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between">
        <Button variant="secondaryBlue" onClick={handleBackwardButtonClick}>
          자동안내 시나리오 목록
        </Button>
        <Flex gap={2}>
          <Button
            isDisabled={disabled}
            variant="secondaryBlue"
            onClick={handleAutoTestButtonClick}
          >
            자동안내 시나리오 테스트
          </Button>
          <Button
            isDisabled={
              !isSaveScenarioEnable ||
              (!isNodeChanged && !isInfoNodeChanged && !isUseChanged)
            }
            variant="primaryBlue"
            onClick={handelSaveScenarioButtonClick}
          >
            자동안내 시나리오 저장
          </Button>
        </Flex>
      </Flex>
      {replacementInfoModalOpen && (
        <ReplacementCodeInfoModal setOpen={setReplacementInfoModalOpen} />
      )}
      {isAutoTestModalOpen && (
        <AutoTestModal onClose={handleAutoTestModalClose} />
      )}
      {isResetCheckModalOpen && (
        <ResetCheckModal
          onClose={handleResetCheckModalClose}
          onConfirm={handleResetCheckModalConfirm}
        />
      )}
      {isBackwardCheckModalOpen && (
        <BackwardCheckModal
          onClose={handleBackwardCheckModalClose}
          onConfirm={handleBackwardCheckModalConfirm}
        />
      )}
    </CollapseSection>
  );
}

export default ScenarioEditor;
