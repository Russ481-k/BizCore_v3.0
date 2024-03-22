import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";

import { CustomModal } from "components";
import Subject from "type/Subject";
import EmergencyStaffAddressSetUpTab from "./EmergencyStaffAddressSetUpTab";
import EmergencyStaffAddressTab from "./EmergencyStaffAddressTab";
import StaffAddressTab from "./StaffAddressTab";

interface ImportStaffAddressModalProps {
  setOpen: (isOpen: boolean) => void;
  onChange: (data: Array<Subject>) => void;
}

function ImportStaffAddressModal({
  setOpen,
  onChange,
}: ImportStaffAddressModalProps) {
  const [addressData, setAddressData] = useState<Subject[]>([]);

  const handleSetAddressData = (data: Subject[]) => {
    setAddressData(data);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleImportAddress = () => {
    const importAddressesData: Subject[] = addressData.map((address) => {
      return {
        id: address.id,
        name: address.name,
        mobile: address.mobile,
        phone: address.phone,
        expression_1: "",
        expression_2: "",
        expression_3: "",
        expression_4: "",
      };
    });
    onChange(importAddressesData);
    setOpen(false);
  };

  return (
    <CustomModal isOpen onClose={() => setOpen(false)}>
      <ModalContent minW="1200px">
        <ModalHeader>직원 연락처 불러오기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs align="start" variant="enclosed" width="100%">
            <TabList borderColor="gray.400">
              <Tab width="180px">직원 연락처</Tab>
              <Tab width="180px">직원 비상 연락망</Tab>
              <Tab width="180px">직원 비상 연락망 설정</Tab>
            </TabList>
            <TabPanels>
              <TabPanel pb={0} px={0}>
                <StaffAddressTab
                  addressData={addressData}
                  setOpen={setOpen}
                  onChange={handleSetAddressData}
                />
              </TabPanel>
              <TabPanel pb={0} px={0}>
                <EmergencyStaffAddressTab
                  addressData={addressData}
                  setOpen={setOpen}
                  onChange={handleSetAddressData}
                />
              </TabPanel>
              <TabPanel pb={0} px={0}>
                <EmergencyStaffAddressSetUpTab setOpen={setOpen} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleImportAddress}>
            직원 연락처 불러오기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ImportStaffAddressModal;
