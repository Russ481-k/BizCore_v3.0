import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

import { CustomModal, HtmlPreview } from "components";

interface PreviewModalProps {
  previewHeight: number;
  previewHtml: string;
  previewWidth: number;
  onCancel: () => void;
}

const defaultProps = {
  previewHeight: 740,
  previewWidth: 360,
};

const PreviewModal = ({
  previewHeight,
  previewWidth,
  previewHtml,
  onCancel,
}: PreviewModalProps) => {
  return (
    <CustomModal isOpen onClose={onCancel}>
      <ModalContent minW="512px">
        <ModalHeader>미리 보기</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="center"
          overflowX="hidden"
          overflowY="auto"
        >
          <HtmlPreview
            previewHeight={previewHeight}
            previewHtml={previewHtml}
            previewWidth={previewWidth}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="primaryBlue" onClick={onCancel}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
};

PreviewModal.defaultProps = defaultProps;

export default PreviewModal;
