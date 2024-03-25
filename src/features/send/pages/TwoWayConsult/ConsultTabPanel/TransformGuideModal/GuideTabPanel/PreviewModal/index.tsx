import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { ChannelTag, CustomModal, TipText } from "components";

interface PreviewModalProps {
  channel: string;
  context: string;
  imgURL: string;
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function PreviewModal({ channel, context, imgURL, isOpen, setModalOpen }: PreviewModalProps) {
  const [, setMessageData] = useState([
    {
      callType: "S",
      message: context,
      filePath: imgURL,
    },
  ]);
  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setMessageData([
      {
        callType: "S",
        message: context,
        filePath: imgURL,
      },
    ]);
  }, [context, imgURL]);
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="550px">
        <ModalHeader>미리보기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <ChannelTag channelType={channel} />
            <TipText size="sm" text="수신자의 단말기 설정에 따라 다르게 보일 수 있습니다." />
          </VStack>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default PreviewModal;
