import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

import {
  CollapseSection,
  CustomSelect,
  DeleteIcon,
  InfoBox,
  InfoElement,
  PaginationButtons,
  SearchIcon,
  ToastMessage,
  WarningIcon,
} from "components";
import { useGetAddressesBySearch, useGetAddressGroups } from "features/address";
import Subject from "type/Subject";

interface StaffAddressTabProps {
  addressData: Subject[];
  setOpen: (isOpen: boolean) => void;
  onChange: (data: Array<Subject>) => void;
}

function StaffAddressTab({
  addressData,
  setOpen,
  onChange,
}: StaffAddressTabProps) {
  const toast = useToast();
  const { data: addressGroups, addressTotalCount } = useGetAddressGroups();
  const [checkedAddress, setCheckedAddress] = useState<boolean[]>([]);
  const [checkedSubject, setCheckedSubject] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [pageSize] = useState<number>(10);
  const [selectedAddressGroupId, setSelectedAddressGroupId] =
    useState<number>(0);
  const [targetColumn, setTargetColumn] = useState<string>("");

  const {
    contents: addresses,
    paging: pagination,
    pageLength,
    totalCount,
    isLoading: isAddressesLoading,
  } = useGetAddressesBySearch({
    addressGroupId: selectedAddressGroupId ?? null,
    keyword,
    targetColumn,
    currentPage,
    pageSize,
  });

  const addressAllChecked =
    !!checkedAddress.length && checkedAddress.every(Boolean);
  const isAddressIndeterminate =
    !!checkedAddress.length &&
    checkedAddress.some(Boolean) &&
    !addressAllChecked;

  const subjectAllChecked =
    !!checkedSubject.length && checkedSubject.every(Boolean);
  const isSubjectIndeterminate =
    checkedSubject.some(Boolean) && !subjectAllChecked;

  const handleAddressGroupButtonClick = (id: number) => {
    setSelectedAddressGroupId(id);
  };
  const handleAddAddressButtonClick = () => {
    if (!addresses) return;
    let duplicatedAddress = false;
    const selectedAddress: Subject[] = addresses
      ?.filter((_, i) => checkedAddress[i])
      .filter((checkedAddress) => {
        if (
          !addressData.some(
            (address) => Number(address.id) === checkedAddress.addressId
          )
        ) {
          return true;
        } else {
          duplicatedAddress = true;
          return false;
        }
      })
      .map((address) => {
        return {
          id: address.addressId,
          name: address.addressName,
          mobile: address.addressPhone,
          phone: address.addressNumber,
          expression_1: "",
          expression_2: "",
          expression_3: "",
          expression_4: "",
        };
      });
    if (duplicatedAddress) {
      toast({
        render: () => (
          <ToastMessage title="연락처 중복 추가" type="ERROR">
            이미 등록된 연락처가 중복 추가되었습니다. 해당 연락처는 추가되지
            않습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
    }
    onChange([...addressData, ...selectedAddress]);
    setCheckedAddress(addresses.map(() => false));
    setCheckedSubject(addressData.map(() => false));
  };

  const handleAddressDelete = (id: number) => {
    const newAddressData = addressData.filter((address) => address.id !== id);
    onChange(newAddressData);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSelectedAddressDelete = () => {
    const newAddressData = addressData.filter((_, i) => !checkedSubject[i]);
    onChange(newAddressData);
    setCheckedSubject(newAddressData.map(() => false));
  };
  const handleTargetColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetColumn(e.target.value);
  };
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (addresses) {
      setCheckedAddress(addresses.map(() => false));
      setCheckedSubject(addressData.map(() => false));
    }
  }, [addresses, addressData]);

  return (
    <Flex gap={3} height="590px">
      <CollapseSection flex={3} flexDirection="column" headerTitle="조직도">
        <Flex flexDirection="column" height="480px" overflowY="auto">
          <Button
            alignItems="left"
            bgColor={selectedAddressGroupId !== 0 ? "white" : ""}
            borderRadius={0}
            flexDirection="column"
            pl={3}
            onClick={() => handleAddressGroupButtonClick(0)}
          >{`전체 운영자 (${addressTotalCount ?? 0})`}</Button>
          {!!addressGroups &&
            addressGroups.map((group, i) => (
              <Flex key={group.addressGroupId + "-" + i} ml={5}>
                <Text py={1}>ㄴ</Text>
                <Button
                  alignItems="center"
                  bgColor={
                    selectedAddressGroupId !== group.addressGroupId
                      ? "white"
                      : ""
                  }
                  borderRadius={0}
                  flex={1}
                  flexDirection="row"
                  key={group.addressGroupId}
                  px={1}
                  onClick={() =>
                    handleAddressGroupButtonClick(group.addressGroupId)
                  }
                >
                  <Text
                    overflow="hidden"
                    textAlign="left"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    width="100px"
                  >
                    {group.addressGroupName}
                  </Text>
                  <Text>{`(${group.addressCount ?? 0})`}</Text>
                </Button>
              </Flex>
            ))}
        </Flex>
      </CollapseSection>
      <CollapseSection
        flex={6}
        flexDirection="column"
        headerTitle="연락처 목록"
      >
        <Flex flexDirection="column" gap={2}>
          <InfoBox>
            <InfoElement label={<SearchIcon></SearchIcon>} labelWidth="50px">
              <Flex gap={3} w="100%">
                <CustomSelect
                  codes={[
                    {
                      code: "total",
                      name: "전체",
                    },
                    {
                      code: "name",
                      name: "이름",
                    },
                    {
                      code: "phone",
                      name: "휴대폰 번호",
                    },
                    {
                      code: "number",
                      name: "전화번호",
                    },
                  ]}
                  defaultValue="total"
                  flex={1}
                  size="sm"
                  onChange={handleTargetColumnChange}
                />
                <Input flex={2} size="sm" onChange={handleKeywordChange} />
              </Flex>
            </InfoElement>
          </InfoBox>
          <Flex alignItems="end" justifyContent="space-between">
            <Text fontSize="14px">조회수 : {totalCount}명</Text>
            <Button
              size="sm"
              variant="secondaryBlue"
              onClick={handleAddAddressButtonClick}
            >
              선택한 수신 대상자 추가 {`>>`}
            </Button>
          </Flex>
          <Box
            borderRadius="12px"
            borderWidth={1}
            height="375px"
            mb={2}
            overflow="hidden"
          >
            <Flex
              alignItems="center"
              bgColor="gray.100"
              borderBottomWidth={1}
              flex={1}
              fontSize="sm"
              justifyContent="space-between"
            >
              <Checkbox
                borderColor="gray.400"
                isChecked={addressAllChecked}
                isIndeterminate={isAddressIndeterminate}
                pl={4}
                py={2}
                onChange={(e) =>
                  setCheckedAddress(
                    addresses?.map(() => e.target.checked) ?? []
                  )
                }
              />
              <Text flex={2} fontWeight="600" px={4} py={2} textAlign="center">
                이름
              </Text>
              <Text flex={1} fontWeight="600" px={4} py={2} textAlign="center">
                직급
              </Text>
              <Text flex={3} fontWeight="600" px={4} py={2} textAlign="center">
                휴대폰 번호
              </Text>
              <Text flex={3} fontWeight="600" px={4} py={2} textAlign="center">
                부서
              </Text>
            </Flex>
            <Box height="381px" overflowY="auto">
              {!totalCount ? (
                <Flex alignItems="center" justifyContent="center" height="100%">
                  {isAddressesLoading ? (
                    <Spinner m={5} />
                  ) : (
                    <Flex lineHeight={1.9}>
                      <WarningIcon color="primary.700" mr={1} />
                      <Text fontSize="12px">{`조회된 연락처가 없습니다.`}</Text>
                    </Flex>
                  )}
                </Flex>
              ) : (
                <>
                  {addresses?.map((address, i) => (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      borderRadius={0}
                      flex={1}
                      fontSize="sm"
                      justifyContent="space-between"
                      key={address.addressId + "-" + i}
                      width="100%"
                    >
                      <Checkbox
                        pl={4}
                        py={2}
                        isChecked={checkedAddress[i]}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setCheckedAddress((prev) => {
                            const newChecked = [...prev];
                            newChecked[i] = checked;
                            return newChecked;
                          });
                        }}
                      />
                      <Text flex={2} textAlign="center" px={4} py={2}>
                        {address.addressName}
                      </Text>
                      <Text flex={1} textAlign="center" px={4} py={2}>
                        {"직급 연동 필요"}
                      </Text>
                      <Text flex={3} px={4} py={2} textAlign="center">
                        {address.addressPhone}
                      </Text>
                      <Text flex={3} px={4} py={2} textAlign="center">
                        {address.addressGroupName}
                      </Text>
                    </Flex>
                  ))}
                </>
              )}
            </Box>
          </Box>
          <PaginationButtons
            batchSize={null}
            isAllChecked={false}
            isIndeterminate={false}
            data={addresses ?? []}
            pagination={pagination}
            pageLength={pageLength}
            onPageChange={handlePageChange}
          />
        </Flex>
      </CollapseSection>
      <CollapseSection
        flex={5}
        flexDirection="column"
        headerTitle="수신 대상자"
      >
        <Flex flexDirection="column" gap={3} height="530px" overflowY="hidden">
          <Text fontSize="14px">조회수 : {addressData?.length ?? 0}명</Text>
          <Box
            borderRadius="12px"
            borderWidth={1}
            height="535px"
            mb={2}
            overflow="hidden"
          >
            <Flex
              alignItems="center"
              bgColor="gray.100"
              borderBottomWidth={1}
              flex={1}
              fontSize="sm"
              justifyContent="space-between"
            >
              <Checkbox
                borderColor="gray.400"
                isChecked={subjectAllChecked}
                isIndeterminate={isSubjectIndeterminate}
                pl={4}
                py={2}
                onChange={(e) =>
                  setCheckedSubject(addressData.map(() => e.target.checked))
                }
              />
              <Text flex={2} fontWeight="600" px={2} py={2} textAlign="center">
                이름
              </Text>
              <Text flex={3} fontWeight="600" px={2} py={2} textAlign="center">
                휴대폰 번호
              </Text>
              <Text flex={3} fontWeight="600" px={2} py={2} textAlign="center">
                부서
              </Text>
              <Text
                flex={1}
                fontWeight="600"
                pl={2}
                pr={4}
                py={2}
                textAlign="center"
              >
                제외
              </Text>
            </Flex>
            <Box height="467px" overflowY="scroll">
              {addressData.length === 0 ? (
                <Flex
                  alignItems="center"
                  height="100%"
                  lineHeight={2}
                  justifyContent="center"
                >
                  <Text fontSize="12px" m={3}>
                    <WarningIcon color="primary.700" mr={1} />
                    {`왼편의 연락처 목록에서 수신 대상자를 
                          선택하여 추가하세요.`}
                  </Text>
                </Flex>
              ) : (
                <>
                  {addressData.map((address, i) => (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      borderRadius={0}
                      flex={1}
                      fontSize="sm"
                      justifyContent="space-between"
                      key={address.id + "-" + i}
                      width="100%"
                    >
                      <Checkbox
                        pl={4}
                        py={2}
                        isChecked={checkedSubject[i]}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setCheckedSubject((prev) => {
                            const newChecked = [...prev];
                            newChecked[i] = checked;
                            return newChecked;
                          });
                        }}
                      />
                      <Text flex={2} textAlign="center" px={2} py={2}>
                        {address.name}
                      </Text>
                      <Text flex={3} px={2} py={2} textAlign="center">
                        {address.mobile}
                      </Text>
                      <Text flex={3} px={2} py={2} textAlign="center">
                        {"부서 연동 필요"}
                      </Text>
                      <DeleteIcon
                        flex={1}
                        boxSize={5}
                        color="primary.700"
                        cursor="pointer"
                        onClick={() => handleAddressDelete(address.id)}
                      />
                    </Flex>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Flex>
        {!!addressData.length && (
          <Button
            isDisabled={!isSubjectIndeterminate && !subjectAllChecked}
            size="sm"
            variant="secondaryBlue"
            width="80px"
            onClick={handleSelectedAddressDelete}
          >
            {subjectAllChecked ? "전체 삭제" : "선택 삭제"}
          </Button>
        )}
      </CollapseSection>
    </Flex>
  );
}
export default StaffAddressTab;
