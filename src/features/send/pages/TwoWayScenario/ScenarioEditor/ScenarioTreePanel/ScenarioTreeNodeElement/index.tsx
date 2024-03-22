import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { AddIcon, CaretIcon, DeleteIcon } from "components";
import Scenario from "type/Scenario";

interface ScenarioTreeNodeElementProps {
  isDisabled: boolean;
  isReset?: boolean;
  selectedNodeId: string;
  scenarioNode: Scenario;
  onAddNode: (
    id: string | null,
    depth: number,
    parentReplyId: string | null
  ) => void;
  onChange: (node: Scenario, isInfoNode: boolean) => void;
  onDeleteNode: (id: string) => void;
  onReset: (isReset: boolean) => void;
}

function ScenarioTreeNodeElement({
  isDisabled,
  isReset,
  selectedNodeId,
  scenarioNode,
  onAddNode,
  onChange,
  onDeleteNode,
  onReset,
}: ScenarioTreeNodeElementProps) {
  return (
    <Box my={1} width="100%">
      <Flex alignItems="center">
        <ButtonGroup
          alignItems="center"
          bgColor={selectedNodeId !== scenarioNode?.id ? "white" : ""}
          borderRadius="12px"
          color={selectedNodeId !== scenarioNode?.id ? "black" : "primary.800"}
          flex={1}
          flexDirection="row"
          height="36px"
          justifyContent="left"
          width="100%"
          onClick={() => onChange(scenarioNode, false)}
        >
          <Button
            borderColor={
              selectedNodeId !== scenarioNode?.id || isDisabled
                ? "gray.400"
                : "primary.800"
            }
            color={isDisabled ? "gray.400" : ""}
            isDisabled={isDisabled}
            justifyContent="left"
            variant="outline"
            width="100%"
          >
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              <CaretIcon direction="RIGHT" />
              {scenarioNode?.title}
            </Text>
            {selectedNodeId === scenarioNode?.id && (
              <Flex gap={2} position="absolute" px={3} right={0}>
                <IconButton
                  isDisabled={isDisabled}
                  aria-label="추가"
                  opacity={selectedNodeId === scenarioNode?.id ? 1 : 0}
                  icon={<AddIcon boxSize={4} />}
                  size="xs"
                  variant="ghostBlue"
                  onClick={() =>
                    onAddNode(
                      scenarioNode?.id,
                      scenarioNode?.depth ?? 0,
                      scenarioNode?.replyId
                    )
                  }
                />
                <IconButton
                  aria-label="삭제"
                  icon={<DeleteIcon boxSize={3} />}
                  size="xs"
                  variant="primaryGhost"
                  onClick={() => onDeleteNode(scenarioNode.id)}
                />
              </Flex>
            )}
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default ScenarioTreeNodeElement;
