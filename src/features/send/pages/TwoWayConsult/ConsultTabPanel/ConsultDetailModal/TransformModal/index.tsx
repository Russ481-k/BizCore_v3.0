import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

import { CustomModal } from "components";
import { KEYWORD } from "features/send";

interface TransformModalProps {
  isOpen: boolean;
  transTo: "A" | "C"; // A:안내 / C:문자상담
  setCurrentSendType: React.Dispatch<React.SetStateAction<"A" | "C">>;
  setModalOpen: (open: boolean) => void;
}

function TransformModal({
  isOpen,
  transTo,
  setCurrentSendType,
  setModalOpen,
}: TransformModalProps) {
  const onSubmit = () => {
    if (transTo === "A") {
      console.log("안내로 전환!");
      setCurrentSendType("A");
      // 안내 전환 완료
      // 안내로 정상적으로 전환되었습니다.
      // PreviewBox에 '안내로 전환' 출력
      // 버튼 '안내로 전환' 으로 변경
    } else {
      console.log("문자상담으로 전환!");
      setCurrentSendType("C");
      // 문자상담 전환 완료
      // 문자상담으로 정상적으로 전환되었습니다
      // PreviewBox에 '문자상담으로 전환' 출력
      // 버튼 '안내로 전환' 으로 변경
      // 현재구분 '문자상담' 으로 변경
      // 문자메세지 입력영역 활성화
    }
    onClose();
  };
  const onClose = () => {
    setModalOpen(false);
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>{transTo === "A" ? KEYWORD.TRANSFORM_ToA : KEYWORD.TRANSFORM_ToC}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {transTo === "A" ? (
            <Text>
              안내 전환시 안내 시나리오의 처음부터 진행됩니다.
              <br />
              <br />
              안내로 전환하시겠습니까?
            </Text>
          ) : (
            <Text>진행중인 안내를 종료하고 문자상담으로 전환하시겠습니까?</Text>
          )}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={onSubmit}>
            {transTo === "A" ? KEYWORD.TRANSFORM_ToA : KEYWORD.TRANSFORM_ToC}
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default TransformModal;
