import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

import { AddIcon, DeleteIcon, ModifyIcon } from "components";
import Department from "type/Department";

interface ManageButtonGroupProps {
  selectedDept?: Department | null;
  show: boolean;
  type: string;
  openAddModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openChangeModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openDeleteModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ManageButtonGroup({
  selectedDept,
  show,
  type,
  openAddModal,
  openChangeModal,
  openDeleteModal,
}: ManageButtonGroupProps) {
  const handleOpenAddModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (openAddModal) openAddModal(e);
  };
  const handleChangeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (openChangeModal) openChangeModal(e);
  };
  const handleDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDept?.userCnt && selectedDept.userCnt > 0) {
      return alert(
        "부서 내에 유저가 있습니다. 모든 유저를 삭제하거나 다른 부서로 옮긴 후 삭제가 가능합니다."
      );
    }
    if (openDeleteModal) openDeleteModal(e);
  };
  return (
    <ButtonGroup
      alignItems="center"
      bgColor="gray.200"
      height="36px"
      opacity={show ? 1 : 0}
      position="absolute"
      px={1}
      right={0}
      size="xs"
      spacing={1}
      top={0}
      variant="ghostBlue"
      visibility={show ? "visible" : "hidden"}
    >
      <IconButton
        aria-label="추가"
        icon={<AddIcon boxSize={4} />}
        isDisabled={type === "department"}
        onClick={(e) => handleOpenAddModal(e)}
      />
      <IconButton
        aria-label="수정"
        icon={<ModifyIcon boxSize={3} />}
        isDisabled={type === "group"}
        onClick={(e) => handleChangeModal(e)}
      />
      <IconButton
        aria-label="삭제"
        icon={<DeleteIcon boxSize={3} />}
        isDisabled={type === "group"}
        onClick={(e) => handleDeleteModal(e)}
      />
    </ButtonGroup>
  );
}

export default React.memo(ManageButtonGroup);
