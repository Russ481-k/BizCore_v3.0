import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CustomModal } from "components";
import { KEYWORD } from "features/send";
import CheckEmptyContextModal from "./CheckEmptyContextModal";
import GuideTabPanel from "./GuideTabPanel";

interface TransformGuideModalProps {
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function TransformGuideModal({
  isOpen,
  setModalOpen,
}: TransformGuideModalProps) {
  const methods = useForm({
    defaultValues: {
      chatMessageText: "",
      chatMessageImage: [{ file: {} }],
      autoMessageText: "",
      autoMessageImage: [{ file: {} }],
      quitMessageText: "",
      quitMessageImage: [{ file: {} }],
    },
    mode: "onBlur",
  });

  const [chatAutoSend, setChatAutoSend] = useState("unused");
  const [autoAutoSend, setAutoAutoSend] = useState("unused");
  const [quitAutoSend, setQuitAutoSend] = useState("unused");

  const [checkEmptyContextModalOpen, setCheckEmptyContextModalOpen] =
    useState<boolean>(false);

  const onSubmit = methods.handleSubmit(
    (data) => {
      // 유효성 검사를 통과한 경우의 처리
      console.log("submit!");
      onClose();
      // 전환안내 설정 저장 완료
      // 전환안내 설정을 정상적으로 저장하였습니다

      // 전환안내 설정 저장 오류
      // 전환안내 설정 저장 중 중 알 수 없는 오류가 발생하였습니다.
      // 전환안내 설정 저장을 다시 진행 하세요. 본 오류가 계속 발생하는
      // 경우 시스템 관리자에게 문의하기 바랍니다.
    },
    (errors) => {
      setCheckEmptyContextModalOpen(true);
    }
  );
  const onClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      onReset();
    }, 200);
  };

  const onReset = () => {
    setChatAutoSend("unused");
    setAutoAutoSend("unused");
    setQuitAutoSend("unused");
    methods.reset();
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <ModalContent minW="800px" h="750px">
          <ModalHeader>전환 안내 설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody flex={1}>
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab>{KEYWORD.SENDTYPE_AUTO}</Tab>
                <Tab>{KEYWORD.SENDTYPE_CHAT}</Tab>
                <Tab>상담종료</Tab>
              </TabList>
              <FormProvider {...methods}>
                <TabPanels>
                  <GuideTabPanel
                    autoSend={chatAutoSend}
                    setAutoSend={setChatAutoSend}
                    messageText="chatMessageText"
                    messageImage="chatMessageImage"
                  />
                  <GuideTabPanel
                    autoSend={autoAutoSend}
                    setAutoSend={setAutoAutoSend}
                    messageText="autoMessageText"
                    messageImage="autoMessageImage"
                  />
                  <GuideTabPanel
                    autoSend={quitAutoSend}
                    setAutoSend={setQuitAutoSend}
                    messageText="quitMessageText"
                    messageImage="quitMessageImage"
                  />
                </TabPanels>
              </FormProvider>
            </Tabs>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="textGray" onClick={onClose}>
              취소
            </Button>
            <Button variant="primaryBlue" onClick={onSubmit}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </CustomModal>
      <CheckEmptyContextModal
        isOpen={checkEmptyContextModalOpen}
        setModalOpen={setCheckEmptyContextModalOpen}
      />
    </>
  );
}

export default TransformGuideModal;
