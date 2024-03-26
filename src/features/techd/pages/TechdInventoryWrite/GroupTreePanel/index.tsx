import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { CollapseSection } from "components";
import { useGetAlarmTalkTemplateGroups } from "features/sopp";
import TemplateGroup from "type/TemplateGroup";

interface GroupTreePanelProps {
  isRefetch: boolean;
  onChange: (groupTemplate: TemplateGroup | null) => void;
  onRefetch: (isRefetch: boolean) => void;
}

function GroupTreePanel({
  isRefetch,
  onChange,
  onRefetch,
}: GroupTreePanelProps) {
  const [selectedTemplateGroupId, setSelectedTemplateGroupId] = useState<
    number | null
  >(null);

  const { data: templateGroups, totalTemplateCount } =
    useGetAlarmTalkTemplateGroups();
  const handleSelectTemplateGroup = (groupTemplate: TemplateGroup | null) => {
    onChange(groupTemplate);
    setSelectedTemplateGroupId(groupTemplate?.groupTemplateId ?? null);
  };

  useEffect(() => {
    if (isRefetch) {
      onRefetch(false);
    }
  }, [isRefetch, onRefetch]);

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column" gap={3}>
        <CollapseSection headerTitle=" 그룹" width="300px">
          <Flex flexDirection="column">
            <Button
              backgroundColor={
                selectedTemplateGroupId === null ? "gray.200" : "white"
              }
              borderRadius={0}
              justifyContent="left"
              pl={2}
              size="sm"
              width="100%"
              onClick={() => handleSelectTemplateGroup(null)}
            >
              {`전체 (${totalTemplateCount ?? 0})`}
            </Button>
            {templateGroups?.map((templateGroup, i) => (
              <Flex
                align="center"
                justify="flex-start"
                key={templateGroup.groupTemplateId + "-" + i}
                position="relative"
                ps={4}
              >
                <Text>-</Text>
                <Flex borderRadius="8px" width="100%">
                  <Button
                    backgroundColor={
                      templateGroup.groupTemplateId === selectedTemplateGroupId
                        ? "gray.200"
                        : "white"
                    }
                    borderRadius={0}
                    flex={1}
                    justifyContent="left"
                    pl={2}
                    pr={0}
                    size="sm"
                    variant="none"
                    _hover={{ backgroundColor: "gray.200" }}
                    onClick={() => handleSelectTemplateGroup(templateGroup)}
                  >
                    <Flex gap={1} width="130px">
                      <Text
                        overflow="hidden"
                        textAlign="left"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {templateGroup.groupTemplateName}
                      </Text>
                      <Text>{`(${templateGroup.templateCount ?? 0})`}</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </CollapseSection>
      </Flex>
    </Flex>
  );
}
export default GroupTreePanel;
