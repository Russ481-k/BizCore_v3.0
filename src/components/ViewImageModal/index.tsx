import {
  Button,
  Center,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

import { CustomModal, DownloadIcon, ToastMessage } from "components";
import { useAppSelector } from "storage/redux/hooks";

interface ViewImageModalProps {
  isOpen: boolean;
  url: string;
  onClose: () => void;
}

function ViewImageModal({ isOpen, url, onClose }: ViewImageModalProps) {
  const toast = useToast();
  const token = useAppSelector((state) => state?.user?.accessToken);
  const handleImageDownloadClick = async () => {
    try {
      // TODO: 정상 연결될 때 URL수정
      // const response = await axios.get(url, {
      const response = await axios.get(
        "https://cdn.imweb.me/thumbnail/20220504/b3cfa3b5bc931.jpg",
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blob = new Blob([response.data], {
        type: "image/jpeg",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "image.jpg";
      link.click();
      toast({
        render: () => (
          <ToastMessage title="이미지 다운로드 완료" type="SUCCESS">
            이미지를 성공적으로 다운로드하였습니다.
          </ToastMessage>
        ),
        duration: 3000,
      });
    } catch (error) {
      toast({
        render: () => (
          <ToastMessage title="이미지 다운로드 오류" type="ERROR">
            이미지 다운로드 중 알 수 없는 오류가 발생하였습니다.
            <br />
            이미지 다운로드를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
            시스템 관리자에게 문의하기 바랍니다.
          </ToastMessage>
        ),
      });
    }
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="490px">
        <ModalHeader>이미지 보기</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <VStack spacing={4} w="100%">
            <Center w="100%" h="450px">
              <Image
                maxH="100%"
                maxW="100%"
                // TODO: 정상 연결될 때 URL수정
                // src={url}
                src="https://cdn.imweb.me/upload/S202008179a8a184fd9517/8eba4249cba79.jpg"
              />
            </Center>
            <Button
              leftIcon={<DownloadIcon />}
              variant="secondaryBlue"
              onClick={handleImageDownloadClick}
            >
              다운로드
            </Button>
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

export default React.memo(ViewImageModal);
