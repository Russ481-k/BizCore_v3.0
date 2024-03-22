import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { CustomModal, InfoBox, InfoElement, TipText } from "components";
import DepartmentDetail from "type/DepartmentDetail";

interface DeptDetailModalProps {
  isOpen: boolean;
  selectedDept: DepartmentDetail;
  setModalOpen: (open: boolean) => void;
}

function DeptDetailModal({
  isOpen,
  selectedDept,
  setModalOpen,
}: DeptDetailModalProps) {
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
    }
  };
  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="680px" onKeyPress={handleOnKeyPress}>
        <ModalHeader>부서 정보</ModalHeader>
        <ModalCloseButton type="button" />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <TipText hasBg text="행정시스템과 연동된 부서 정보를 확인합니다." />
            <InfoBox>
              <InfoElement label="부서코드">
                <Text fontSize="sm">{selectedDept.deptCode ?? "-"}</Text>
              </InfoElement>
              <InfoElement label="부서명">
                <Text fontSize="sm">{selectedDept.deptName ?? "-"}</Text>
              </InfoElement>
              <InfoElement label="업데이트 일시">
                <Text fontSize="sm">{selectedDept.createDate ?? "-"}</Text>
              </InfoElement>
            </InfoBox>
          </Flex>
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

export default React.memo(DeptDetailModal);
