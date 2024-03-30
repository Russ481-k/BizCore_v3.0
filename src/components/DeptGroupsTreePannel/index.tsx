import { Accordion, Button, useToast, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { CollapseSection, ToastMessage } from "components";
import { useGetDept } from "features/system";
import { DEPARTMENT_GROUP } from "libs/fixture";
import Department from "type/Department";
import DepartmentGroup from "type/DepartmentGroup";
import DeptGroups from "type/DeptGroups";
import AddDeptModal from "./AddDeptModal";
import ChangeDeptModal from "./ChangeDeptModal";
import DeleteDeptModal from "./DeleteDeptModal";
import DeptDetailModal from "./DeptDetailModal";
import DeptGroupAccordionItem from "./DeptGroupAccordionItem";

interface DeptGroupsTreePannelProps {
  deptGroupsData: DeptGroups | undefined;
  selectedDeptGroup: DepartmentGroup;
  selectedDept: Department | null;
  setSelectedDeptGroup: (group: DepartmentGroup) => void;
  setSelectedDept: (item: Department | null) => void;
  onRefetchPage: () => void;
  onRefetchUsers: () => void;
  onResetSearchForm: () => void;
}

function DeptGroupsTreePannel({
  deptGroupsData,
  selectedDept,
  selectedDeptGroup,
  setSelectedDept,
  setSelectedDeptGroup,
  onRefetchPage,
  onRefetchUsers,
  onResetSearchForm,
}: DeptGroupsTreePannelProps) {
  const toast = useToast();
  const { ALL, BASIC, ADDITION } = DEPARTMENT_GROUP;
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [changeModalOpen, setChangeModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [getDeptEnabled, setGetDeptEnabled] = useState<boolean>(false);

  const { data: deptDetailData } = useGetDept(
    {
      deptCode: selectedDept?.deptCode ?? null,
    },
    {
      enabled: getDeptEnabled,
      retry: 0,
      onError: (error) => {
        toast({
          render: () => (
            <ToastMessage title="부서 정보 보기 오류" type="ERROR">
              {error.message}
              <br />
              부서 정보 보기를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
              시스템 관리자에게 문의하기 바랍니다.
            </ToastMessage>
          ),
        });
      },
      onSuccess: (error) => {
        setDetailModalOpen(true);
      },
      onSettled: () => {
        setGetDeptEnabled(false);
      },
    }
  );

  const handleDeptOnClick = useCallback(
    (group: DepartmentGroup, item?: Department | null) => {
      setSelectedDeptGroup(group);
      setSelectedDept(item ?? null);
    },
    [setSelectedDeptGroup, setSelectedDept]
  );

  const openAddModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setAddModalOpen(true);
    },
    [setAddModalOpen]
  );
  const openChangeModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setChangeModalOpen(true);
    },
    [setChangeModalOpen]
  );
  const openDeleteModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setDeleteModalOpen(true);
    },
    [setDeleteModalOpen]
  );
  const openDetailModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setGetDeptEnabled(true);
    },
    [setGetDeptEnabled]
  );

  useEffect(() => {
    if (selectedDeptGroup) {
      onResetSearchForm();
      onRefetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeptGroup, selectedDept]);

  return (
    <CollapseSection headerTitle="조직도" gap={0}>
      <VStack
        align="stretch"
        direction="column"
        height="580px"
        overflowY="auto"
        spacing={1}
      >
        <Button
          alignItems="center"
          bgColor={selectedDeptGroup.isBizCore === null ? "gray.200" : "white"}
          borderRadius={0}
          fontWeight="600"
          justifyContent="flex-start"
          pl={2}
          onClick={() => handleDeptOnClick(ALL)}
        >
          {ALL.groupName} ({deptGroupsData?.deptTotalCount ?? 0})
        </Button>
        <Accordion allowMultiple border={0}>
          <DeptGroupAccordionItem
            items={deptGroupsData?.eminwonBody}
            selectedDept={selectedDept}
            selectedDeptGroup={selectedDeptGroup}
            thisGroup={BASIC}
            totalCnt={deptGroupsData?.eminwonTotal}
            onItemSelect={handleDeptOnClick}
            openDetailModal={openDetailModal}
          />
          <DeptGroupAccordionItem
            items={deptGroupsData?.BizCoreBody}
            selectedDept={selectedDept}
            selectedDeptGroup={selectedDeptGroup}
            thisGroup={ADDITION}
            totalCnt={deptGroupsData?.BizCoreTotal}
            onItemSelect={handleDeptOnClick}
            openAddModal={openAddModal}
            openDeleteModal={openDeleteModal}
            openChangeModal={openChangeModal}
          />
        </Accordion>
      </VStack>
      <AddDeptModal
        isOpen={addModalOpen}
        onRefetch={onRefetchPage}
        setModalOpen={setAddModalOpen}
      />
      {selectedDept && (
        <>
          <ChangeDeptModal
            isOpen={changeModalOpen}
            selectedDept={selectedDept}
            onRefetch={onRefetchPage}
            setModalOpen={setChangeModalOpen}
          />
          <DeleteDeptModal
            isOpen={deleteModalOpen}
            selectedDept={selectedDept}
            onRefetch={onRefetchPage}
            setModalOpen={setDeleteModalOpen}
          />
        </>
      )}
      {deptDetailData && (
        <DeptDetailModal
          isOpen={detailModalOpen}
          selectedDept={deptDetailData}
          setModalOpen={setDetailModalOpen}
        />
      )}
    </CollapseSection>
  );
}
export default React.memo(DeptGroupsTreePannel);
