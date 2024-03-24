import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";

import { CaretIcon, TipIcon } from "components";
import Department from "type/Department";
import DepartmentGroup from "type/DepartmentGroup";
import ManageButtonGroup from "./ManageButtonGroup";

interface DeptGroupAccordionItemProps {
  items: Department[] | null | undefined;
  selectedDept: Department | null;
  selectedDeptGroup: DepartmentGroup;
  thisGroup: DepartmentGroup;
  totalCnt: number | undefined;
  onItemSelect: (group: DepartmentGroup, item: Department | null) => void;
  openAddModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openDeleteModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openDetailModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openChangeModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function DeptGroupAccordionItem({
  items,
  selectedDept,
  selectedDeptGroup,
  thisGroup,
  totalCnt,
  onItemSelect,
  openAddModal,
  openDeleteModal,
  openDetailModal,
  openChangeModal,
}: DeptGroupAccordionItemProps) {
  const handleSelectedItem = useCallback(
    (item: Department) => {
      const selectedBizCore: boolean =
        selectedDeptGroup.isBizCore === thisGroup.isBizCore &&
        selectedDept?.deptCode === item.deptCode;
      return selectedBizCore;
    },
    [thisGroup, selectedDeptGroup, selectedDept]
  );

  return (
    <AccordionItem border={0} _notFirst={{ mt: 1 }}>
      {({ isExpanded }) => (
        <>
          <Box position="relative">
            <AccordionButton
              alignItems="center"
              bgColor={
                selectedDeptGroup.isBizCore === thisGroup.isBizCore
                  ? "gray.200"
                  : "white"
              }
              borderRadius={0}
              fontSize="sm"
              fontWeight="600"
              height="36px"
              justifyContent="flex-start"
              pl={2}
              textAlign="left"
              onClick={() => onItemSelect(thisGroup, null)}
            >
              <CaretIcon
                boxSize="16px"
                color="gray.900"
                direction={isExpanded ? "DOWN" : "RIGHT"}
                me={2}
                transition=".15s"
              />
              {thisGroup.groupName} ({totalCnt ?? 0})
            </AccordionButton>
            {selectedDeptGroup.isBizCore && (
              <ManageButtonGroup
                show={
                  selectedDeptGroup.isBizCore === thisGroup.isBizCore &&
                  !!!selectedDept?.deptCode
                }
                openAddModal={openAddModal}
                type="group"
              />
            )}
          </Box>
          <AccordionPanel p={1} pr={0} border={0}>
            {items?.map((item) => (
              <Flex
                align="center"
                justify="flex-start"
                key={`accordion-dept-${item.deptCode}`}
                position="relative"
                ps={4}
              >
                <Text>-</Text>
                <Button
                  alignItems="center"
                  bgColor={handleSelectedItem(item) ? "gray.200" : "white"}
                  borderRadius={0}
                  flex={1}
                  height="38px"
                  justifyContent="flex-start"
                  ms={1}
                  px={2}
                  size="sm"
                  onClick={() => onItemSelect(thisGroup, item)}
                >
                  <Text
                    maxWidth={
                      selectedDeptGroup.isBizCore
                        ? handleSelectedItem(item)
                          ? "calc(100% - 6.5rem)"
                          : "90%"
                        : "calc(100% - 2rem)"
                    }
                    overflow="hidden"
                    textAlign="left"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {item.deptName}
                  </Text>
                  <Text ms={1}>({item.userCnt ?? 0})</Text>
                </Button>
                {selectedDeptGroup.isBizCore ? (
                  <ManageButtonGroup
                    show={handleSelectedItem(item)}
                    type="department"
                    selectedDept={selectedDept}
                    openDeleteModal={openDeleteModal}
                    openChangeModal={openChangeModal}
                  />
                ) : (
                  <ButtonGroup
                    opacity={handleSelectedItem(item) ? 1 : 0}
                    visibility={handleSelectedItem(item) ? "visible" : "hidden"}
                    alignItems="center"
                    height="36px"
                    position="absolute"
                    px={1}
                    right={0}
                    size="xs"
                    spacing={1}
                    top={0}
                    variant="ghostBlue"
                  >
                    <IconButton
                      aria-label="정보"
                      icon={<TipIcon boxSize={4} />}
                      onClick={(e) => openDetailModal && openDetailModal(e)}
                    />
                  </ButtonGroup>
                )}
              </Flex>
            ))}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default React.memo(DeptGroupAccordionItem);
