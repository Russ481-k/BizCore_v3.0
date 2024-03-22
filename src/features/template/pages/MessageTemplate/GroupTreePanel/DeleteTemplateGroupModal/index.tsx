import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";

import { CustomModal, ToastMessage } from "components";
import { useDeleteTemplateGroup } from "features/template";

interface DeleteTemplateGroupModalProps {
  groupTemplateId: number | null;
  onClose: () => void;
}

function DeleteTemplateGroupModal({
  groupTemplateId,
  onClose,
}: DeleteTemplateGroupModalProps) {
  const toast = useToast();

  const { mutate: deleteTemplateGroup } = useDeleteTemplateGroup();

  const handleDeleteTemplateGroupButtonClick = () => {
    if (!!groupTemplateId) {
      deleteTemplateGroup(
        {
          groupTemplateId,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="문자 템플릿 그룹 삭제 오류" type="ERROR">
                  {error.message}
                  <br />
                  문자 템플릿 그룹 삭제 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  문자 템플릿 그룹 삭제를 다시 진행 하세요. 본 오류가 계속
                  발생하는 경우 시스템 관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="문자 템플릿 그룹 삭제 완료" type="SUCCESS">
                  문자 템플릿 그룹을 정상적으로 삭제하였습니다.
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    }
  };

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>문자 템플릿 그룹 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {groupTemplateId === 0 ? (
            <Flex flexDirection="column" gap={1}>
              <Text fontSize="14px">
                템플릿 그룹에 속한 문자 템플릿이 있으므로 삭제할 수 없습니다.
              </Text>
              <Text fontSize="14px">
                템플릿 그룹에 속한 문자 템플릿을 삭제한 후 다시 시도하세요.
              </Text>
            </Flex>
          ) : (
            <Flex flexDirection="column" gap={1}>
              <Text fontSize="14px">
                삭제된 문자 템플릿 그룹은 복구가 불가합니다.
              </Text>
              <Text fontSize="14px">
                선택한 문자 템플릿 그룹을 삭제하시겠습니까?
              </Text>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            {groupTemplateId === 0 ? "닫기" : "취소"}
          </Button>
          {groupTemplateId !== 0 && (
            <Button
              variant="secondaryGray"
              onClick={handleDeleteTemplateGroupButtonClick}
            >
              문자 템플릿 그룹 삭제
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default DeleteTemplateGroupModal;
