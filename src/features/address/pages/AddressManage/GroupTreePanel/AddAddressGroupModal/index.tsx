import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  CustomModal,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useAddAddressGroup,
  useGetValidAddressGroupName,
} from "features/address";
import message from "libs/message";

interface AddAddressGroupModalProps {
  onClose: () => void;
}

function AddAddressGroupModal({ onClose }: AddAddressGroupModalProps) {
  const toast = useToast();
  const {
    formState: { errors, isValid },
    clearErrors,
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
  } = useForm<{ addressGroupName: string }>({ mode: "onBlur" });

  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);

  const { mutate: addAddressGroup, isLoading } = useAddAddressGroup();
  const { isFetching } = useGetValidAddressGroupName(
    {
      addressGroupName: getValues("addressGroupName"),
    },
    {
      enabled: isEnableQuery,
      retry: 0,
      onError: (error) => {
        setError("addressGroupName", {
          type: "isInvalid",
          message: error.message,
        });
      },
      onSuccess: () => {
        clearErrors("addressGroupName");
      },
      onSettled: () => {
        setEnableQuery(false);
      },
    }
  );

  const handleDoubleCheck = async () => {
    await trigger("addressGroupName");
    if (!errors.addressGroupName) {
      setEnableQuery(true);
    }
  };

  const handleAddAddressGroupButtonClick = handleSubmit(
    ({ addressGroupName }) => {
      addAddressGroup(
        {
          addressGroupName,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 등록 오류" type="ERROR">
                  {error.message}
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 등록 완료" type="SUCCESS">
                  주소록 그룹 등록이 완료되었습니다.
                </ToastMessage>
              ),
            });
            onClose();
          },
        }
      );
    }
  );

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent as="form" minW="680px">
        <ModalHeader>주소록 그룹 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <TipText
              hasBg
              text="주소록명을 입력 하신 다음 [추가] 버튼을 클릭하세요."
            />
            <InfoBox>
              <InfoElement label="주소록 그룹명" labelWidth="130px" required>
                <FormControl isInvalid={!!errors.addressGroupName}>
                  <Input
                    borderColor={!!isFetching ? "blue.400" : "gray.400"}
                    borderWidth={!!isFetching ? "2px" : "gray.400"}
                    isInvalid={!!errors.addressGroupName}
                    placeholder={message.addressGroupName.pattern}
                    size="sm"
                    {...register("addressGroupName", {
                      required: {
                        value: true,
                        message: message.addressGroupName.required,
                      },
                      pattern: {
                        value: /^.{2,20}$/,
                        message: message.addressGroupName.pattern,
                      },
                      onBlur: () => handleDoubleCheck(),
                      onChange: (e) => {
                        setValue(
                          "addressGroupName",
                          e.target.value.replace(/\\/g, "")
                        );
                      },
                    })}
                    onFocus={() => setEnableQuery(false)}
                  />
                  {errors.addressGroupName && (
                    <FormErrorMessage>
                      {errors.addressGroupName.message}
                    </FormErrorMessage>
                  )}
                  {isFetching && (
                    <FormHelperText color="blue.400">
                      {message.doubleCheck}
                    </FormHelperText>
                  )}
                </FormControl>
              </InfoElement>
            </InfoBox>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={onClose}>
            취소
          </Button>
          <Button
            isDisabled={!isValid}
            isLoading={isLoading}
            type="submit"
            variant="primaryBlue"
            onClick={handleAddAddressGroupButtonClick}
          >
            추가
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default AddAddressGroupModal;
