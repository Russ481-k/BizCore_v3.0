import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import {
  CaretIcon,
  CollapseSection,
  CustomModal,
  ToastMessage,
} from "components";
import { useGetDeptGroups } from "features/system";
import { DEPARTMENT_GROUP } from "libs/fixture";
import Department from "type/Department";
import DepartmentGroup from "type/DepartmentGroup";

interface SelectDeptModalProps {
  isOpen: boolean;
  selectedDept: Department | null;
  title: string;
  type: string;
  setModalOpen: (open: boolean) => void;
  setSelectedDept: (item: Department | null) => void;
}

function SelectDeptModal({
  isOpen,
  selectedDept,
  title,
  type,
  setModalOpen,
  setSelectedDept,
}: SelectDeptModalProps) {
  const toast = useToast();
  const { data } = useGetDeptGroups();
  const { BASIC, ADDITION } = DEPARTMENT_GROUP;

  const [thisGroup, setThisGroup] = useState<DepartmentGroup | null>(null);
  const [thisGroupsData, setThisGroupsData] = useState<Department[] | null>([]);

  useEffect(() => {
    if (data) {
      switch (type) {
        case "basic":
          setThisGroup(BASIC);
          setThisGroupsData(data.eminwonBody);
          break;
        case "addition":
          setThisGroup(ADDITION);
          setThisGroupsData(data.BizCoreBody);
          break;
        default:
          setThisGroup(null);
          setThisGroupsData([]);
          break;
      }
    }
  }, [ADDITION, BASIC, data, type]);

  const onClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleDeptOnClick = (item?: Department | null) => {
    try {
      setSelectedDept(item ?? null);
      onClose();
    } catch {
      toast({
        render: () => (
          <ToastMessage title={`${title} 오류`} type="ERROR">
            {`${title} 중 알 수 없는 오류가 발생하였습니다.`}
            <br />
            관리 부서를 다시 선택 하세요. 본 오류가 계속 발생하는 경우 시스템
            관리자에게 문의하기 바랍니다.
          </ToastMessage>
        ),
      });
    }
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="380px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CollapseSection
            flexDirection="column"
            headerTitle={thisGroup?.groupName}
            gap={0}
          >
            <VStack
              align="stretch"
              direction="column"
              minH="400px"
              overflowY="auto"
              spacing={1}
            >
              <Accordion defaultIndex={[0]} border={0}>
                <AccordionItem border={0} _notFirst={{ mt: 1 }}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        alignItems="center"
                        borderRadius={0}
                        fontSize="sm"
                        fontWeight="600"
                        height="36px"
                        justifyContent="flex-start"
                        pl={2}
                        textAlign="left"
                      >
                        <CaretIcon
                          boxSize="16px"
                          color="gray.900"
                          direction={isExpanded ? "DOWN" : "RIGHT"}
                          me={2}
                          transition=".15s"
                        />
                        {thisGroup?.groupName}
                      </AccordionButton>
                      <AccordionPanel p={1} border={0}>
                        {thisGroupsData?.map((item) => (
                          <Flex
                            align="center"
                            justify="flex-start"
                            key={`modal-dept-${item.deptCode}`}
                            position="relative"
                            ps={4}
                          >
                            <Text>-</Text>
                            <Button
                              alignItems="center"
                              bgColor={
                                selectedDept?.deptCode === item.deptCode
                                  ? "gray.200"
                                  : "white"
                              }
                              borderRadius={0}
                              flex={1}
                              height="38px"
                              justifyContent="flex-start"
                              ms={1}
                              px={2}
                              size="sm"
                              onClick={() => handleDeptOnClick(item)}
                            >
                              <Text
                                maxWidth="90%"
                                overflow="hidden"
                                textAlign="left"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {item.deptName}
                              </Text>
                            </Button>
                          </Flex>
                        ))}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </VStack>
          </CollapseSection>
        </ModalBody>
        <ModalFooter>
          <Button variant="textGray" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}
export default React.memo(SelectDeptModal);
