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
import { useForm } from "react-hook-form";

import {
  CustomModal,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useChangeAddressGroup,
  useGetValidAddressGroupName,
} from "features/address";
import AddressGroup from "type/AddressGroup";
import { useState } from "react";
import message from "libs/message";

interface ChangeAddressGroupModalProps {
  addressGroup: AddressGroup;
  onClose: () => void;
}

function ChangeAddressGroupModal({
  addressGroup,
  onClose,
}: ChangeAddressGroupModalProps) {
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

  const { mutate: changeAddressGroup, isLoading } = useChangeAddressGroup();
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

  const handleChangeAddressGroupButtonClick = handleSubmit(
    ({ addressGroupName }) => {
      changeAddressGroup(
        {
          addressGroupId: addressGroup?.addressGroupId,
          addressGroupName,
        },
        {
          onError: (error) => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 수정 오류" type="ERROR">
                  {error.message}
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 그룹 수정 완료" type="SUCCESS">
                  주소록 그룹 수정이 완료되었습니다.
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
        <ModalHeader>주소록 그룹 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={1}>
            <TipText
              hasBg
              text={`주소록 그룹명을 수정 입력 하신 다음 [수정] 버튼을 클릭하세요.`}
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
            onClick={handleChangeAddressGroupButtonClick}
          >
            수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default ChangeAddressGroupModal;
