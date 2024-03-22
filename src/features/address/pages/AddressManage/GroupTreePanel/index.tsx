import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { CollapseSection, DeleteIcon, ModifyIcon } from "components";
import { useGetAddressGroups } from "features/address";
import AddressGroup from "type/AddressGroup";
import AddAddressGroupModal from "./AddAddressGroupModal";
import ChangeAddressGroupModal from "./ChangeAddressGroupModal";
import DeleteAddressGroupModal from "./DeleteAddressGroupModal";

interface GroupTreePanelProps {
  isRefetch: boolean;
  onChange: (groupAddress: AddressGroup | null) => void;
  onRefetch: (isRefetch: boolean) => void;
}

function GroupTreePanel({
  isRefetch,
  onChange,
  onRefetch,
}: GroupTreePanelProps) {
  const [addAddressGroupModalOpen, setAddAddressGroupModalOpen] =
    useState<boolean>(false);
  const [changeAddressGroupModalData, setChangeAddressGroupModalData] =
    useState<AddressGroup | null>(null);
  const [deleteAddressGroupModalData, setDeleteAddressGroupModalData] =
    useState<number | null>(null);
  const [selectedAddressGroupId, setSelectedAddressGroupId] = useState<
    number | null
  >(null);

  const {
    data: addressGroups,
    addressTotalCount,
    refetch,
  } = useGetAddressGroups();

  const handleAddAddressGroupModalClose = () => {
    setAddAddressGroupModalOpen(false);
    refetch();
    onRefetch(false);
  };
  const handleAddAddressGroupModalOpen = () => {
    setAddAddressGroupModalOpen(true);
  };
  const handleChangeAddressGroupModalClose = () => {
    setChangeAddressGroupModalData(null);
    refetch();
    onRefetch(false);
  };
  const handleChangeAddressGroupModalOpen = (groupAddress: AddressGroup) => {
    setChangeAddressGroupModalData(groupAddress);
  };
  const handleDeleteAddressGroupModalClose = () => {
    setDeleteAddressGroupModalData(null);
    refetch();
    onRefetch(false);
  };
  const handleDeleteAddressGroupModalOpen = (addressGroupId: number | null) => {
    setDeleteAddressGroupModalData(addressGroupId);
  };

  const handleSelectAddressGroup = (groupAddress: AddressGroup | null) => {
    onChange(groupAddress);
    setSelectedAddressGroupId(groupAddress?.addressGroupId ?? null);
  };

  useEffect(() => {
    if (isRefetch) {
      refetch();
      onRefetch(false);
    }
  }, [isRefetch, onRefetch, refetch]);

  useEffect(() => {
    if (
      !addAddressGroupModalOpen ||
      !changeAddressGroupModalData ||
      !deleteAddressGroupModalData
    ) {
      refetch();
    }
  }, [
    addAddressGroupModalOpen,
    changeAddressGroupModalData,
    deleteAddressGroupModalData,
    refetch,
  ]);

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column" gap={3}>
        <CollapseSection headerTitle="주소록 그룹" width="300px">
          <Flex flexDirection="column">
            <Button
              backgroundColor={
                selectedAddressGroupId === null ? "gray.200" : "white"
              }
              borderRadius={0}
              justifyContent="left"
              pl={2}
              size="sm"
              width="100%"
              onClick={() => handleSelectAddressGroup(null)}
            >
              {`전체 (${addressTotalCount ?? 0})`}
            </Button>
            <Flex flexDirection="column" maxHeight="600px" overflowY="auto">
              {addressGroups?.map((addressGroup, i) => (
                <Flex
                  align="center"
                  justify="flex-start"
                  key={addressGroup.addressGroupId + "-" + i}
                  position="relative"
                  ps={4}
                >
                  <Text>-</Text>
                  <Flex borderRadius="8px" width="100%">
                    <Button
                      backgroundColor={
                        addressGroup.addressGroupId === selectedAddressGroupId
                          ? "gray.200"
                          : "white"
                      }
                      borderRadius={0}
                      flex={1}
                      justifyContent="left"
                      pl={2}
                      pr={0}
                      size="sm"
                      variant="none"
                      _hover={{ backgroundColor: "gray.200" }}
                      onClick={() => handleSelectAddressGroup(addressGroup)}
                    >
                      <Flex gap={1} width="130px">
                        <Text
                          overflow="hidden"
                          textAlign="left"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {addressGroup.addressGroupName}
                        </Text>
                        <Text>{`(${addressGroup.addressCount ?? 0})`}</Text>
                      </Flex>
                      {addressGroup.addressGroupId ===
                        selectedAddressGroupId && (
                        <Flex gap={2} position="absolute" px={3} right={0}>
                          <IconButton
                            aria-label="추가"
                            isDisabled={addressGroup.defaultYn}
                            opacity={
                              addressGroup.addressGroupId ===
                              selectedAddressGroupId
                                ? 1
                                : 0
                            }
                            icon={<ModifyIcon boxSize={4} />}
                            size="xs"
                            variant="primaryGhost"
                            onClick={() =>
                              handleChangeAddressGroupModalOpen(addressGroup)
                            }
                          />
                          <IconButton
                            aria-label="삭제"
                            icon={<DeleteIcon boxSize={3} />}
                            isDisabled={addressGroup.defaultYn}
                            size="xs"
                            variant="primaryGhost"
                            onClick={() =>
                              handleDeleteAddressGroupModalOpen(
                                addressGroup.addressGroupId
                              )
                            }
                          />
                        </Flex>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </CollapseSection>
        <Button
          size="sm"
          variant="primaryBlue"
          width="100%"
          onClick={handleAddAddressGroupModalOpen}
        >
          주소록 추가
        </Button>
      </Flex>
      {addAddressGroupModalOpen && (
        <AddAddressGroupModal onClose={handleAddAddressGroupModalClose} />
      )}
      {changeAddressGroupModalData && (
        <ChangeAddressGroupModal
          addressGroup={changeAddressGroupModalData}
          onClose={handleChangeAddressGroupModalClose}
        />
      )}
      {deleteAddressGroupModalData && (
        <DeleteAddressGroupModal
          addressGroupId={deleteAddressGroupModalData}
          onClose={handleDeleteAddressGroupModalClose}
        />
      )}
    </Flex>
  );
}
export default GroupTreePanel;
