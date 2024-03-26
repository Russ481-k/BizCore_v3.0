import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { CollapseSection, DeleteIcon, ModifyIcon } from "components";
import { useGetTemplateGroups } from "features/sopp";
import TemplateGroup from "type/TemplateGroup";
import AddTemplateGroupModal from "./AddTemplateGroupModal";
import ChangeTemplateGroupModal from "./ChangeTemplateGroupModal";
import DeleteTemplateGroupModal from "./DeleteTemplateGroupModal";

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
  const [addTemplateGroupModalOpen, setAddTemplateGroupModalOpen] =
    useState<boolean>(false);
  const [changeTemplateGroupModalData, setChangeTemplateGroupModalData] =
    useState<TemplateGroup | null>(null);
  const [deleteTemplateGroupModalData, setDeleteTemplateGroupModalData] =
    useState<number | null>(null);
  const [selectedTemplateGroupId, setSelectedTemplateGroupId] = useState<
    number | null
  >(null);

  const {
    data: templateGroups,
    totalTemplateCount,
    refetch,
  } = useGetTemplateGroups();

  const handleAddTemplateGroupModalClose = () => {
    setAddTemplateGroupModalOpen(false);
    refetch();
    onRefetch(false);
  };
  const handleAddTemplateGroupModalOpen = () => {
    setAddTemplateGroupModalOpen(true);
  };
  const handleChangeTemplateGroupModalClose = () => {
    setChangeTemplateGroupModalData(null);
    refetch();
    onRefetch(false);
  };
  const handleChangeTemplateGroupModalOpen = (groupTemplate: TemplateGroup) => {
    setChangeTemplateGroupModalData(groupTemplate);
  };
  const handleDeleteTemplateGroupModalClose = () => {
    setDeleteTemplateGroupModalData(null);
    refetch();
    onRefetch(false);
  };
  const handleDeleteTemplateGroupModalOpen = (
    groupTemplate: TemplateGroup | null
  ) => {
    if (groupTemplate?.templateCount === 0) {
      setDeleteTemplateGroupModalData(groupTemplate?.groupTemplateId ?? null);
    } else {
      setDeleteTemplateGroupModalData(0);
    }
  };

  const handleSelectTemplateGroup = (groupTemplate: TemplateGroup | null) => {
    onChange(groupTemplate);
    setSelectedTemplateGroupId(groupTemplate?.groupTemplateId ?? null);
  };

  useEffect(() => {
    if (isRefetch) {
      refetch();
      onRefetch(false);
    }
  }, [isRefetch, onRefetch, refetch]);

  useEffect(() => {
    if (
      !addTemplateGroupModalOpen ||
      !changeTemplateGroupModalData ||
      !deleteTemplateGroupModalData
    ) {
      refetch();
    }
  }, [
    addTemplateGroupModalOpen,
    changeTemplateGroupModalData,
    deleteTemplateGroupModalData,
    refetch,
  ]);

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
            <Flex flexDirection="column" maxHeight="600px" overflowY="auto">
              {templateGroups?.map((templateGroup: any, i: number) => (
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
                        templateGroup.groupTemplateId ===
                        selectedTemplateGroupId
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
                      {templateGroup.groupTemplateId ===
                        selectedTemplateGroupId && (
                        <Flex gap={2} position="absolute" px={3} right={0}>
                          <IconButton
                            aria-label="추가"
                            isDisabled={templateGroup.defaultYn}
                            opacity={
                              templateGroup.groupTemplateId ===
                              selectedTemplateGroupId
                                ? 1
                                : 0
                            }
                            icon={<ModifyIcon boxSize={4} />}
                            size="xs"
                            variant="primaryGhost"
                            onClick={() =>
                              handleChangeTemplateGroupModalOpen(templateGroup)
                            }
                          />
                          <IconButton
                            aria-label="삭제"
                            icon={<DeleteIcon boxSize={3} />}
                            isDisabled={templateGroup.defaultYn}
                            size="xs"
                            variant="primaryGhost"
                            onClick={() =>
                              handleDeleteTemplateGroupModalOpen(templateGroup)
                            }
                          />
                        </Flex>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </CollapseSection>
        <Button
          size="sm"
          variant="primaryBlue"
          width="100%"
          onClick={handleAddTemplateGroupModalOpen}
        >
          템플릿 그룹 추가
        </Button>
      </Flex>
      {addTemplateGroupModalOpen && (
        <AddTemplateGroupModal onClose={handleAddTemplateGroupModalClose} />
      )}
      {changeTemplateGroupModalData && (
        <ChangeTemplateGroupModal
          groupTemplate={changeTemplateGroupModalData}
          onClose={handleChangeTemplateGroupModalClose}
        />
      )}
      {deleteTemplateGroupModalData !== null && (
        <DeleteTemplateGroupModal
          groupTemplateId={deleteTemplateGroupModalData}
          onClose={handleDeleteTemplateGroupModalClose}
        />
      )}
    </Flex>
  );
}
export default GroupTreePanel;
