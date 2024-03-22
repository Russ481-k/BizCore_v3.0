import { Button, Flex, Text } from "@chakra-ui/react";

import { EssentialIcon } from "components";
import Scenario from "type/Scenario";

interface InfoNodeTabsPanelProps {
  contentsByteCount: number;
  infoNodeArray: Scenario[];
  isDisabled: boolean;
  isSaveAutoReplyEnable: boolean;
  isSaveCloseEnable: boolean;
  isSaveExceptionEnable: boolean;
  isSaveExpiredEnable: boolean;
  selectedNode: Scenario | null;
  onSelect: (node: any, isInfoNode: boolean) => void;
}

function InfoNodeTabsPanel({
  contentsByteCount,
  infoNodeArray,
  isDisabled,
  isSaveAutoReplyEnable,
  isSaveCloseEnable,
  isSaveExceptionEnable,
  isSaveExpiredEnable,
  selectedNode,
  onSelect,
}: InfoNodeTabsPanelProps) {
  return (
    <Flex mb={3}>
      <Button
        isDisabled={isDisabled}
        bgColor={selectedNode?.id === "autoReply" && !isDisabled ? "white" : ""}
        borderBottomRadius={0}
        borderColor={
          !isDisabled
            ? selectedNode?.id === "autoReply"
              ? isSaveAutoReplyEnable
                ? "primary.800"
                : "red"
              : isSaveAutoReplyEnable
              ? "gray.300"
              : "red"
            : "gray.300"
        }
        borderBottomColor={
          !isDisabled
            ? selectedNode?.id === "autoReply"
              ? "white"
              : contentsByteCount
              ? "primary.800"
              : "red"
            : "gray.300"
        }
        borderWidth={1}
        color={
          !isDisabled
            ? selectedNode?.id === "autoReply"
              ? isSaveAutoReplyEnable
                ? "primary.800"
                : "red"
              : isSaveAutoReplyEnable
              ? "gray.600"
              : "red"
            : "gray.600"
        }
        flex={1}
        onClick={() => onSelect(infoNodeArray[0], true)}
      >
        <Text ml={3}>
          시나리오 시작 안내
          <EssentialIcon ml={1} />
        </Text>
      </Button>
      <Button
        isDisabled={isDisabled}
        bgColor={selectedNode?.id === "expired" && !isDisabled ? "white" : ""}
        borderBottomRadius={0}
        borderColor={
          !isDisabled
            ? selectedNode?.id === "expired"
              ? isSaveExpiredEnable
                ? "primary.800"
                : "red"
              : isSaveExpiredEnable
              ? "gray.300"
              : "red"
            : "gray.300"
        }
        borderBottomColor={
          !isDisabled
            ? selectedNode?.id === "expired"
              ? "white"
              : contentsByteCount
              ? "primary.800"
              : "red"
            : "gray.300"
        }
        borderWidth={1}
        color={
          !isDisabled
            ? selectedNode?.id === "expired"
              ? isSaveExpiredEnable
                ? "primary.800"
                : "red"
              : isSaveExpiredEnable
              ? "gray.600"
              : "red"
            : "gray.600"
        }
        flex={1}
        onClick={() => onSelect(infoNodeArray[1], true)}
      >
        <Text ml={3}>
          유효시간 초과 안내
          <EssentialIcon ml={1} />
        </Text>
      </Button>
      <Button
        isDisabled={isDisabled}
        bgColor={selectedNode?.id === "exception" && !isDisabled ? "white" : ""}
        borderBottomRadius={0}
        borderColor={
          !isDisabled
            ? selectedNode?.id === "exception"
              ? isSaveExceptionEnable
                ? "primary.800"
                : "red"
              : isSaveExceptionEnable
              ? "gray.300"
              : "red"
            : "gray.300"
        }
        borderBottomColor={
          !isDisabled
            ? selectedNode?.id === "exception"
              ? "white"
              : contentsByteCount
              ? "primary.800"
              : "red"
            : "gray.300"
        }
        borderWidth={1}
        color={
          !isDisabled
            ? selectedNode?.id === "exception"
              ? isSaveExceptionEnable
                ? "primary.800"
                : "red"
              : isSaveExceptionEnable
              ? "gray.600"
              : "red"
            : "gray.600"
        }
        flex={1}
        onClick={() => onSelect(infoNodeArray[2], true)}
      >
        <Text ml={3}>
          입력 오류 안내
          <EssentialIcon ml={1} />
        </Text>
      </Button>
      <Button
        isDisabled={isDisabled}
        bgColor={selectedNode?.id === "close" ? "white" : ""}
        borderBottomRadius={0}
        borderColor={
          !isDisabled
            ? selectedNode?.id === "close"
              ? isSaveCloseEnable
                ? "primary.800"
                : "red"
              : isSaveCloseEnable
              ? "gray.300"
              : "red"
            : "gray.300"
        }
        borderBottomColor={
          !isDisabled
            ? selectedNode?.id === "close"
              ? "white"
              : contentsByteCount
              ? "primary.800"
              : "red"
            : "gray.300"
        }
        borderWidth={1}
        color={
          !isDisabled
            ? selectedNode?.id === "close"
              ? isSaveCloseEnable
                ? "primary.800"
                : "red"
              : isSaveCloseEnable
              ? "gray.600"
              : "red"
            : "gray.600"
        }
        flex={1}
        onClick={() => onSelect(infoNodeArray[3], true)}
      >
        <Text ml={3}>
          시나리오 종료 안내
          <EssentialIcon ml={1} />
        </Text>
      </Button>
    </Flex>
  );
}

export default InfoNodeTabsPanel;
