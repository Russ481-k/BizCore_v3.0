import { Modal, ModalOverlay, ModalProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomModalProps {
  children: ReactNode;
}

function CustomModal({ children, ...props }: CustomModalProps & ModalProps) {
  return (
    <Modal closeOnOverlayClick={false} isCentered {...props}>
      <ModalOverlay />
      {children}
    </Modal>
  );
}
export default CustomModal;
