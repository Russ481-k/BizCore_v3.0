import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  useDisclosure,
  useOutsideClick,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { address } from "api/url";
import {
  CollapseSection,
  CustomCard,
  CustomSelect,
  ExcelFileDownload,
  InfoBox,
  InfoElement,
  PaginationButtons,
  TipText,
  ToastMessage,
} from "components";
import {
  useGetAddressesBySearch,
  useRemoveBulkAddress,
} from "features/address";
import formatter from "libs/formatter";
import AddressGroup from "type/AddressGroup";
import CollectiveAddressRegistrationModal from "./CollectiveAddressRegistrationModal";
import DeleteAddressModal from "./DeleteAddressModal";
import GroupTreePanel from "./GroupTreePanel";
import SaveAddressModal from "./SaveAddressModal";

function AddressManage() {
  const toast = useToast();
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = useForm<{
    searchCondition: string;
    keyword: string;
  }>({ mode: "onChange" });

  const [addAddressModalOpen, setAddAddressModalOpen] =
    useState<boolean>(false);
  const [changeAddressModalData, setChangeAddressModalData] = useState<
    number | null
  >(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false]);
  const [
    collectiveAddressRegistrationModalOpen,
    setCollectiveAddressRegistrationModalOpen,
  ] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEnableQuery, setEnableQuery] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [refetchGroupAddress, setRefetchGroupAddress] =
    useState<boolean>(false);
  const [selectedAddressGroup, setSelectedAddressGroup] =
    useState<AddressGroup | null>(null);
  const [targetColumn, setTargetColumn] = useState<string>("");

  const { mutate: removeBulkAddress, isLoading: isRemoveBulkLoading } =
    useRemoveBulkAddress();
  const {
    contents: addresses,
    paging: pagination,
    pageLength,
    totalCount,
    isLoading: isAddressesLoading,
    refetch,
  } = useGetAddressesBySearch(
    {
      addressGroupId: selectedAddressGroup?.addressGroupId ?? null,
      keyword,
      targetColumn,
      currentPage,
      pageSize,
    },
    { enabled: isEnableQuery }
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheckboxCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxArray = addresses?.map(() => e.target.checked);
    setCheckedItems(checkboxArray ?? []);
  };
  const handleCheckboxCheck = (index: number) => {
    checkedItems[index] = !checkedItems[index];
    setCheckedItems([...checkedItems]);
  };

  const handleAddAddressModalClose = () => {
    setAddAddressModalOpen(false);
    handlePageRefetch();
  };
  const handleAddAddressModalOpen = () => {
    setAddAddressModalOpen(true);
  };
  const handleBatchSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setEnableQuery(true);
  };
  const handleChangeAddressModalClose = () => {
    setChangeAddressModalData(null);
    handlePageRefetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEnableQuery(true);
  };
  const handlePageRefetch = useCallback(() => {
    setCurrentPage(1);
    setRefetchGroupAddress(true);
    refetch();
  }, [setCurrentPage, refetch, setRefetchGroupAddress]);
  const handleDeleteSelectedAddressModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteSelectedAddressModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteSelectAddressModalConfirm = () => {
    if (!!addresses) {
      removeBulkAddress(
        {
          addressIds:
            addresses?.filter((e) => checkedItems[addresses.indexOf(e)])
              .length === 0
              ? []
              : addresses
                  .filter((e) => checkedItems[addresses.indexOf(e)])
                  .map((address) => address.addressId),
        },
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
            handlePageRefetch();
          },
        }
      );
      setDeleteModalOpen(false);
      setEnableQuery(true);
    } else {
      toast({
        render: () => (
          <ToastMessage title="주소록 삭제 오류" type="ERROR">
            주소록 삭제 중 알 수 없는 오류가 발생하였습니다.
            <br />
            주소록 삭제를 다시 진행 하세요. 본 오류가 계속 발생하는 경우 시스템
            관리자에게 문의하기 바랍니다.
          </ToastMessage>
        ),
      });
    }
    setEnableQuery(true);
  };
  const handleFormSubmit = handleSubmit(({ searchCondition, keyword }) => {
    setKeyword(keyword);
    setTargetColumn(searchCondition);
    setCurrentPage(1);
    setEnableQuery(true);
  });
  const handleAddressGroupChange = (groupAddress: AddressGroup | null) => {
    setSelectedAddressGroup(groupAddress);
    setCurrentPage(1);
    setEnableQuery(true);
  };
  const handleCollectiveAddressRegistrationModalOpen = () => {
    setCollectiveAddressRegistrationModalOpen(true);
  };
  const handleChangeAddressModalData = (addressId: number) => {
    setChangeAddressModalData(addressId);
  };

  useOutsideClick({
    ref: currentRef,
    handler: () => {
      if (isOpen) {
        onClose();
      }
    },
  });

  useEffect(() => {
    setCurrentPage(1);
    reset();
    setRefetchGroupAddress(true);
    setPageSize(10);
    setKeyword("");
  }, [selectedAddressGroup, reset]);

  useEffect(() => {
    setCheckedItems(addresses?.length ? addresses?.map(() => false) : [false]);
  }, [addresses]);

  useEffect(() => {
    if (isEnableQuery) {
      setEnableQuery(false);
    }
  }, [isEnableQuery]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="주소록 관리" />
      <HStack align="flex-start" spacing={3}>
        <GroupTreePanel
          isRefetch={refetchGroupAddress}
          onChange={handleAddressGroupChange}
          onRefetch={setRefetchGroupAddress}
        />
        <Flex
          as="form"
          flex={1}
          gap={3}
          width="100%"
          onSubmit={handleFormSubmit}
        >
          <Flex flexDirection="column" width="100%">
            <Flex
              alignItems="center"
              backgroundColor="white"
              borderColor="gray.300"
              borderRadius="12px"
              borderWidth="1px"
              height="50px"
              justifyContent="space-between"
              mb={1}
              p={4}
            >
              <TipText
                size="sm"
                text="[연락처 일괄 등록] 버튼을 클릭하여 연락처를 일괄 등록하세요."
              />
              <Button
                variant="secondaryBlue"
                size="sm"
                onClick={handleCollectiveAddressRegistrationModalOpen}
              >
                연락처 일괄 등록
              </Button>
            </Flex>
            <CollapseSection
              borderBottomRadius={0}
              borderBottomWidth={0}
              flex={1}
              flexDirection="column"
              gap={1}
              headerTitle={
                <Flex>
                  <Text>주소록 목록</Text>
                </Flex>
              }
            >
              <InfoBox>
                <Flex>
                  <InfoElement flex={4} label="주소록 그룹">
                    <Text fontSize="sm">
                      {selectedAddressGroup?.addressGroupName ?? "전체"}
                    </Text>
                  </InfoElement>
                  <InfoElement flex={8} label="키워드">
                    <Flex gap={3} width="100%">
                      <CustomSelect
                        codes={[
                          { code: "name", name: "이름" },
                          { code: "phone", name: "휴대폰 번호" },
                          { code: "number", name: "전화번호" },
                          { code: "note", name: "메모" },
                        ]}
                        flex={1}
                        placeholder="전체"
                        size="sm"
                        {...register("searchCondition")}
                      />
                      <Input flex={3} size="sm" {...register("keyword")} />
                    </Flex>
                  </InfoElement>
                </Flex>
              </InfoBox>
              <Flex justifyContent="flex-end">
                <Button
                  isLoading={isAddressesLoading}
                  variant="primaryBlue"
                  onClick={handleFormSubmit}
                >
                  조회
                </Button>
              </Flex>
            </CollapseSection>
            <Flex
              backgroundColor="white"
              borderBottomRadius="12px"
              borderColor="gray.300"
              borderWidth={1}
              flexDirection="column"
              gap={3}
              height="100%"
              p={3}
            >
              <HStack>
                <Text fontSize="xs" fontWeight="bold">
                  검색결과 : {totalCount ?? 0} 건
                </Text>
                <Flex flex={1} gap={2} justifyContent="flex-end">
                  <Button
                    size="sm"
                    type="button"
                    variant="secondaryBlue"
                    onClick={handleAddAddressModalOpen}
                  >
                    연락처 등록
                  </Button>
                  <ExcelFileDownload
                    url={address(
                      "/excel?" +
                        (selectedAddressGroup?.addressGroupId
                          ? "&addressGroupId=" +
                              selectedAddressGroup?.addressGroupId ?? null
                          : "") +
                        (keyword ? "&keyword=" + keyword : "") +
                        (targetColumn ? "&targetColumn=" + targetColumn : "")
                    )}
                  />
                </Flex>
              </HStack>
              <Box
                borderLeftWidth={1}
                borderRadius="12px"
                borderRightWidth={1}
                borderTopWidth={1}
                overflow="hidden"
                height="100%"
              >
                <Flex
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderBottomWidth={1}
                  flex={1}
                  fontSize="sm"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    px={4}
                    py={2}
                    textAlign="left"
                    onChange={(e) => handleCheckboxCheckAll(e)}
                  />
                  <Text flex={1} px={4} py={2} textAlign="center">
                    이름
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    휴대폰 번호
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    전화번호
                  </Text>
                  <Text flex={4} px={4} py={2} textAlign="center">
                    메모
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {isAddressesLoading ? (
                    Array.from({ length: pageSize }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={
                          addresses?.[i].addressId +
                          "-" +
                          i +
                          "-addresses-skeleton"
                        }
                      >
                        <Skeleton height="16px" mx={4} my={2} width="16px" />
                        <Skeleton flex={1} height="20px" mx={4} my={2} />
                        <Skeleton flex={2} height="20px" mx={4} my={2} />
                        <Skeleton flex={2} height="20px" mx={4} my={2} />
                        <Skeleton flex={4} height="20px" mx={4} my={2} />
                      </Flex>
                    ))
                  ) : !!addresses?.length ? (
                    addresses?.map((address, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={address.addressId + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Checkbox
                          isChecked={checkedItems[i]}
                          px={4}
                          py={2}
                          textAlign="center"
                          onChange={() => handleCheckboxCheck(i)}
                        />
                        <Text
                          color="primary.500"
                          cursor="pointer"
                          flex={1}
                          px={4}
                          py={2}
                          textAlign="left"
                          _hover={{
                            textDecoration: "underline",
                          }}
                          onClick={() =>
                            handleChangeAddressModalData(address.addressId)
                          }
                        >
                          {address.addressName}
                        </Text>
                        <Text flex={2} textAlign="center" px={4} py={2}>
                          {formatter.contactFormatter(
                            address.addressPhone?.slice(0, 11)
                          )}
                        </Text>
                        <Text flex={2} textAlign="center" px={4} py={2}>
                          {formatter.contactFormatter(
                            address.addressNumber?.slice(0, 11)
                          )}
                        </Text>
                        <Text flex={4} textAlign="left" px={4} py={2}>
                          {address.note}
                        </Text>
                      </Flex>
                    ))
                  ) : (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      flex={1}
                      fontSize="sm"
                      justifyContent="center"
                      p={4}
                    >
                      <Text>조회된 연락처가 없습니다.</Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
              <PaginationButtons
                batchSize={pageSize}
                data={addresses ?? []}
                isAllChecked={allChecked}
                isIndeterminate={isIndeterminate}
                isLoading={isRemoveBulkLoading}
                isRefetch={refetchGroupAddress}
                pageLength={pageLength}
                pagination={pagination}
                onBatchSizeChange={handleBatchSizeChange}
                onPageChange={handlePageChange}
                onSelectionDelete={handleDeleteSelectedAddressModalOpen}
              />
            </Flex>
          </Flex>
        </Flex>
        {addAddressModalOpen && (
          <SaveAddressModal
            selectedAddressGroupId={selectedAddressGroup?.addressGroupId}
            isChangeAddress={false}
            onClose={handleAddAddressModalClose}
          />
        )}
        {changeAddressModalData && (
          <SaveAddressModal
            selectedAddressGroupId={selectedAddressGroup?.addressGroupId}
            isChangeAddress={true}
            addressId={changeAddressModalData}
            onClose={handleChangeAddressModalClose}
          />
        )}
      </HStack>
      {deleteModalOpen && (
        <DeleteAddressModal
          onClose={handleDeleteSelectedAddressModalClose}
          onConfirm={handleDeleteSelectAddressModalConfirm}
        />
      )}
      {collectiveAddressRegistrationModalOpen && (
        <CollectiveAddressRegistrationModal
          selectedAddressGroupId={selectedAddressGroup?.addressGroupId}
          onRefetch={handlePageRefetch}
          setOpen={setCollectiveAddressRegistrationModalOpen}
        />
      )}
    </VStack>
  );
}

export default AddressManage;
