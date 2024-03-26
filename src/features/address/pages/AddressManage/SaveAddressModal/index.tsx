import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  CustomModal,
  CustomSelect,
  EssentialIcon,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import {
  useAddAddress,
  useChangeAddress,
  useGetAddress,
  useGetAddressGroups,
  useRemoveBulkAddress,
} from "features/address";
import formatter from "libs/formatter";
import DeleteAddressModal from "../DeleteAddressModal";

interface SaveAddressModalProps {
  selectedAddressGroupId?: number;
  isChangeAddress: boolean;
  addressId?: number;
  onClose: () => void;
}

function SaveAddressModal({
  selectedAddressGroupId,
  isChangeAddress,
  addressId,
  onClose,
}: SaveAddressModalProps) {
  const toast = useToast();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    resetField,
    setValue,
  } = useForm<{
    addressName: string;
    addressPhone: string;
    addressNumber: string;
    note: string;
  }>({
    mode: "onBlur",
  });
  const { data: addressGroups } = useGetAddressGroups();
  const { data: address } = useGetAddress({
    addressId: addressId ?? null,
  });
  const { mutate: addAddress } = useAddAddress();
  const { mutate: changeAddress } = useChangeAddress();
  const { mutate: deleteAddress } = useRemoveBulkAddress();

  const addressGroupsCode = addressGroups?.map((group) => {
    return {
      code: String(group?.addressGroupId),
      name: group.addressGroupName,
    };
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addressGroupId, setAddressGroupId] = useState<number>(
    !!selectedAddressGroupId
      ? selectedAddressGroupId
      : Number(!!addressGroupsCode ? addressGroupsCode[0]?.code : 0)
  );
  const [addressList, setAddressList] = useState<
    {
      addressName: string;
      addressPhone: string;
      addressNumber: string | null;
      note: string | null;
    }[]
  >([]);

  const handleAddAddressListButtonClick = handleSubmit(() => {
    setAddressList([
      ...addressList,
      {
        addressName: getValues("addressName"),
        addressPhone: getValues("addressPhone"),
        addressNumber: getValues("addressNumber"),
        note: getValues("note"),
      },
    ]);
    resetField("addressName");
    resetField("addressPhone");
    resetField("addressNumber");
    resetField("note");
  });

  const handleDeleteAddressButtonClick = (index: number) => {
    setAddressList([...addressList.filter((_, i) => i !== index)]);
  };
  const handleDeleteAddressModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteAddressModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteAddressModalConfirm = () => {
    if (addressId) {
      deleteAddress(
        { addressIds: [addressId] },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 삭제 오류" type="ERROR">
                  주소록 삭제 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  주소록 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                  시스템 관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 삭제 완료" type="SUCCESS">
                  주소록을 정상적으로 삭제하였습니다.
                </ToastMessage>
              ),
            });
            onClose();
            setDeleteModalOpen(false);
          },
        }
      );
    }
  };

  const handleAddAddressesButtonClick = () => {
    resetField("addressName");
    resetField("addressPhone");
    resetField("addressNumber");
    resetField("note");
    if (!!addressList.length) {
      addAddress(
        {
          addressList,
          addressGroupId,
        },
        {
          onError: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 등록 오류" type="ERROR">
                  주소록 등록 중 알 수 없는 오류가 발생하였습니다.
                  <br />
                  주소록 등록을 다시 수정하세요. 본 오류가 계속 발생하는 경우
                  시스템 관리자에게 문의하기 바랍니다.
                </ToastMessage>
              ),
            });
          },
          onSuccess: () => {
            toast({
              render: () => (
                <ToastMessage title="주소록 등록 완료" type="SUCCESS">
                  주소록을 정상적으로 등록하였습니다.
                </ToastMessage>
              ),
            });
            handleSaveAddressModalClose();
          },
        }
      );
    } else {
      toast({
        render: () => (
          <ToastMessage title="주소록 등록 오류" type="ERROR">
            추가된 주소록이 없습니다. 주소록을 등록해주세요.
          </ToastMessage>
        ),
      });
      return;
    }
  };
  const handleAddressGroupIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddressGroupId(Number(e.target.value));
  };
  const handleChangeAddressButtonClick = () => {
    changeAddress(
      {
        address: addressList[0],
        addressGroupId,
        addressId,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="주소록 수정 오류" type="ERROR">
                주소록을 다시 수정하세요.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="주소록 등록 완료" type="SUCCESS">
                주소록을 정상적으로 등록하였습니다.
              </ToastMessage>
            ),
          });
          handleSaveAddressModalClose();
        },
      }
    );
  };

  const handleSaveAddressModalClose = () => {
    onClose();
    setAddressList([]);
  };

  useEffect(() => {
    if (isChangeAddress && address) {
      setAddressList([
        {
          addressName: address.addressName ?? "",
          addressPhone: address.addressPhone ?? "",
          addressNumber: address.addressNumber ?? "",
          note: address.note ?? "",
        },
      ]);
    }
  }, [address, isChangeAddress]);

  return (
    <CustomModal isOpen onClose={handleSaveAddressModalClose}>
      <ModalContent
        height={isChangeAddress ? "400px" : "700px"}
        minW={isChangeAddress ? "900px" : "1024px"}
        overflow="hidden"
      >
        <ModalHeader>주소록 {isChangeAddress ? "수정" : "등록"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDirection="column" gap={3}>
            <TipText
              hasBg
              text={
                isChangeAddress
                  ? "연락처의 주소록을 변경하거나 연락처 정보를 수정하신 다음 하단의 수정 버튼을 클릭하세요."
                  : `등록할 주소록을 선택하고, 연락처 정보를 입력하세요.\n1명 이상의 연락처 정보를 등록할 수 있습니다.`
              }
            />
            <InfoBox>
              <InfoElement label="주소록" required>
                <CustomSelect
                  codes={addressGroupsCode}
                  key={addressGroupsCode?.[0]?.code + "-selector"}
                  maxW="50%"
                  size="sm"
                  value={addressGroupId}
                  onChange={handleAddressGroupIdChange}
                />
              </InfoElement>
            </InfoBox>
            <Flex
              borderBottomWidth="1px"
              borderColor="gray.300"
              borderRadius="12px"
              borderWidth="1px"
              flexDirection="column"
              flexWrap="wrap"
              overflow="hidden"
            >
              <Flex backgroundColor="gray.100" fontSize="14px" height="38px">
                <Flex
                  borderRightWidth={1}
                  flex={1}
                  justifyContent="center"
                  p={3}
                >
                  <Text ml={2}>이름</Text>
                  <EssentialIcon ml={1} />
                </Flex>
                <Flex
                  borderRightWidth={1}
                  flex={2}
                  justifyContent="center"
                  p={3}
                >
                  <Text ml={2}>휴대폰번호</Text>
                  <EssentialIcon ml={1} />
                </Flex>
                <Flex
                  borderRightWidth={1}
                  flex={2}
                  justifyContent="center"
                  p={3}
                >
                  <Text>전화번호</Text>
                </Flex>
                <Flex
                  borderRightWidth={1}
                  flex={4}
                  justifyContent="center"
                  p={3}
                >
                  <Text>메모</Text>
                </Flex>
                {!isChangeAddress && (
                  <Flex flex={1} justifyContent="center" p={3}>
                    <Text>관리</Text>
                  </Flex>
                )}
              </Flex>
              {addressList.map((address, i) => (
                <Flex
                  key={address.addressNumber + "-" + i}
                  borderTopWidth={1}
                  height="48px"
                >
                  <Flex
                    borderRightWidth={1}
                    flex={1}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <Input
                      borderColor="gray.300"
                      defaultValue={address.addressName}
                      isInvalid={addressList[i].addressName === ""}
                      size="sm"
                      onBlur={(e) => {
                        addressList[i].addressName = e.target.value;
                      }}
                    />
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={2}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <Input
                      borderColor="gray.300"
                      defaultValue={address.addressPhone}
                      isInvalid={addressList[i].addressPhone === ""}
                      size="sm"
                      onBlur={(e) => {
                        e.target.value = formatter.contactFormatter(
                          e.target.value.replace(/[^0-9]/g, "").substring(0, 11)
                        );
                        addressList[i].addressPhone = e.target.value;
                      }}
                    />
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={2}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <Input
                      borderColor="gray.300"
                      defaultValue={address.addressNumber ?? ""}
                      size="sm"
                      onBlur={(e) => {
                        addressList[i].addressNumber = e.target.value;
                      }}
                    />
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={4}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <Input
                      borderColor="gray.300"
                      defaultValue={address.note ?? ""}
                      size="sm"
                      onBlur={(e) => {
                        addressList[i].note = e.target.value;
                      }}
                    />
                  </Flex>
                  {!isChangeAddress && (
                    <Flex flex={1} justifyContent="center" p={3}>
                      <Button
                        alignItems="center"
                        borderRadius="50%"
                        height="23px"
                        my="4px"
                        size="xs"
                        textAlign="center"
                        variant="primaryBlue"
                        width="23px"
                        onClick={() => handleDeleteAddressButtonClick(i)}
                      >
                        <Text fontSize="30px" mb="4px" textAlign="center">
                          -
                        </Text>
                      </Button>
                    </Flex>
                  )}
                </Flex>
              ))}
              {!isChangeAddress && (
                <Flex borderTopWidth={1}>
                  <Flex
                    borderRightWidth={1}
                    flex={1}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <FormControl isInvalid={!!errors?.addressName}>
                      <Input
                        borderColor="gray.500"
                        size="sm"
                        {...register("addressName", {
                          required: {
                            value: true,
                            message: "이름을 입력해주세요.",
                          },
                          pattern: {
                            value: /^.{2,10}$/,
                            message: "2~10자 이내로 이름을 입력하세요.",
                          },
                        })}
                      />
                      {errors?.addressName && (
                        <FormErrorMessage>
                          {errors?.addressName?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={2}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <FormControl isInvalid={!!errors?.addressPhone}>
                      <Input
                        borderColor="gray.500"
                        size="sm"
                        {...register("addressPhone", {
                          required: {
                            value: true,
                            message: "휴대폰번호를 입력해주세요.",
                          },
                          minLength: {
                            value: 8,
                            message: "최소 8자 이상 입력하세요.",
                          },
                          onBlur: (e) =>
                            setValue(
                              "addressPhone",
                              formatter.contactFormatter(
                                e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .substring(0, 11)
                              )
                            ),
                        })}
                      />
                      {errors?.addressPhone && (
                        <FormErrorMessage>
                          {errors?.addressPhone?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={2}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <FormControl isInvalid={!!errors?.addressNumber}>
                      <Input
                        borderColor="gray.500"
                        size="sm"
                        {...register("addressNumber", {
                          minLength: {
                            value: 8,
                            message: "최소 8자 이상 입력하세요.",
                          },
                          onBlur: (e) =>
                            setValue(
                              "addressNumber",
                              formatter.contactFormatter(
                                e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .substring(0, 11)
                              )
                            ),
                        })}
                      />
                      {errors?.addressNumber && (
                        <FormErrorMessage>
                          {errors?.addressNumber?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex
                    borderRightWidth={1}
                    flex={4}
                    justifyContent="center"
                    px={3}
                    py={2}
                  >
                    <FormControl isInvalid={!!errors?.note}>
                      <Input
                        borderColor="gray.500"
                        size="sm"
                        {...register("note")}
                      />
                    </FormControl>
                  </Flex>
                  <Flex flex={1} justifyContent="center" px={3} py={2}>
                    <Button
                      alignItems="center"
                      borderRadius="50%"
                      height="23px"
                      my="4px"
                      size="xs"
                      textAlign="center"
                      variant="primaryBlue"
                      width="23px"
                      onClick={handleAddAddressListButtonClick}
                    >
                      <Text fontSize="30px" mb="4px" textAlign="center">
                        +
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Flex gap={2}>
            {isChangeAddress ? (
              <Button
                variant="secondaryGray"
                onClick={handleDeleteAddressModalOpen}
              >
                삭제
              </Button>
            ) : (
              <Flex></Flex>
            )}
          </Flex>
          <Flex gap={2}>
            <Button variant="textGray" onClick={handleSaveAddressModalClose}>
              취소
            </Button>
            {isChangeAddress ? (
              <Button
                variant="primaryBlue"
                onClick={handleChangeAddressButtonClick}
              >
                수정
              </Button>
            ) : (
              <Button
                variant="primaryBlue"
                onClick={handleAddAddressesButtonClick}
              >
                등록
              </Button>
            )}
          </Flex>
        </ModalFooter>
        {deleteModalOpen && (
          <DeleteAddressModal
            onClose={handleDeleteAddressModalClose}
            onConfirm={handleDeleteAddressModalConfirm}
          />
        )}
      </ModalContent>
    </CustomModal>
  );
}

export default SaveAddressModal;
