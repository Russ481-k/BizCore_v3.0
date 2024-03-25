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

import { CustomModal } from "components";

interface NoneWiredNumberModalProps {
  onClose: () => void;
}

function NoneWiredNumberModal({ onClose }: NoneWiredNumberModalProps) {
  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>발신번호 미등록 안내</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex display="block" fontSize="14px">
            <Text>
              문자 메시지를 하기 위한 발신번호가 등록되지 않아 문자 메시지를 할 수 없습니다.
            </Text>
            <Text>관리자에게 문의하시기 바랍니다</Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default NoneWiredNumberModal;
