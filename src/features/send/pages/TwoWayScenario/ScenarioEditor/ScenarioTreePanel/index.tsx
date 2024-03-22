import { Button, Collapse, Flex, Text } from "@chakra-ui/react";
import { AddIcon, CollapseSection } from "components";
import Scenario from "type/Scenario";
import ScenarioTreeNodeElement from "./ScenarioTreeNodeElement";

export interface ScenarioTree {
  groupId: number;
  replyId: string;
  serviceName: string;
  isUse: boolean;
  autoreply: {
    msg: string;
  };
  mmsReply: {
    msg: string;
  };
  expired: {
    msg: string;
    validTime: number;
  };
  exception: {
    msg: string;
  };
  close: {
    msg: string;
  };
  depth: Scenario[];
}

interface ScenarioTreePanelProps {
  isDisabled: boolean;
  isOpen?: boolean;
  isReset?: boolean;
  isSaveScenarioEnable: boolean;
  isInfoNode: boolean;
  infoNodes: Scenario[];
  selectedNodeId: string;
  scenarioNodes: Scenario[] | null;
  onAddNode: (
    id: string | null,
    depth: number,
    parentReplyId: string | null
  ) => void;
  onDeleteNode: (id: string) => void;
  onChange: (node: Scenario, isInfoNode: boolean) => void;
  onReset: (isReset: boolean) => void;
}

function ScenarioTreePanel({
  isDisabled,
  isOpen,
  isReset,
  isSaveScenarioEnable,
  isInfoNode,
  infoNodes,
  selectedNodeId,
  scenarioNodes,
  onAddNode,
  onDeleteNode,
  onChange,
  onReset,
}: ScenarioTreePanelProps) {
  return (
    <CollapseSection
      flex={4}
      flexDirection="column"
      headerTitle="시나리오 구조"
    >
      <Flex flexDirection="column" overflowY="auto" gap={1}>
        <Button
          isDisabled={isDisabled}
          size="lg"
          variant={
            isSaveScenarioEnable
              ? isInfoNode
                ? "primaryBlue"
                : "secondaryBlue"
              : "error"
          }
          onClick={() => {
            infoNodes && onChange(infoNodes[0], true);
          }}
        >
          {">>"}
          <Text mx={1}>시나리오 안내</Text>
          {">>"}
        </Button>
        <Collapse in={isOpen} animateOpacity>
          {scenarioNodes?.map((scenarioNode, i) => {
            return (
              <Flex
                flexDirection="column"
                key={`${scenarioNode.id}-${i}`}
                pl={`${(scenarioNode.depth ?? 0) * 20}px`}
              >
                <ScenarioTreeNodeElement
                  isDisabled={isDisabled}
                  isReset={isReset}
                  selectedNodeId={selectedNodeId}
                  scenarioNode={scenarioNode}
                  onAddNode={onAddNode}
                  onDeleteNode={onDeleteNode}
                  onChange={onChange}
                  onReset={onReset}
                />
              </Flex>
            );
          })}
        </Collapse>
        <Button
          isDisabled={isDisabled}
          borderColor={isDisabled ? "gray.500" : "primary.500"}
          borderStyle="dashed"
          borderWidth={2}
          backgroundColor="white"
          color={isDisabled ? "gray.500" : "primary.500"}
          onClick={() => onAddNode(null, 0, null)}
        >
          <AddIcon color={isDisabled ? "gray.500" : "primary.500"} />
        </Button>
      </Flex>
    </CollapseSection>
  );
}
export default ScenarioTreePanel;
