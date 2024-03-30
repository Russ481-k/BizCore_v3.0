/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: 검색, 페이징
import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  CustomModal,
  CustomSelect,
  CustomTableContainer,
  NoDataTr,
  PaginationButtons,
} from "components";
import { useGetCrs, USERS_OPTION } from "features/user";
import FieldNumber from "type/FieldNumbers";

interface SelectCrsNumModalProps {
  isOpen: boolean;
  selectedNums: FieldNumber[];
  addListItem: (newItem: FieldNumber) => void;
  setModalOpen: (open: boolean) => void;
}

function SelectCrsNumModal({
  isOpen,
  selectedNums,
  addListItem,
  setModalOpen,
}: SelectCrsNumModalProps) {
  const [bizNumbers, setBizNumbers] = useState<string[]>([]);
  const { data: crsData } = useGetCrs();

  const handleUseButtonClick = (number: string) => {
    addListItem({ number: number });
    onClose();
  };

  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setBizNumbers(
      selectedNums.map((item) => {
        return item.number;
      })
    );
  }, [selectedNums]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="740px">
        <ModalHeader> 발신번호 목록</ModalHeader>
        <ModalCloseButton type="button" />
        <ModalBody>
          <VStack align="stretch" spacing={2}>
            {/* <Flex align="center" justify="space-between">
              <CustomSelect codes={USERS_OPTION.CRS_USE} maxW={100} size="sm" />
              <Flex align="center" gap={2}>
                <Text flexShrink={0} fontSize="sm" fontWeight="700">
                  발신번호
                </Text>
                <Input
                  maxW="160px"
                  placeholder="발신번호 입력"
                  size="sm"
                  {...register("keyword")}
                />
                <Button
                  size="sm"
                  variant="secondaryBlue"
                  onClick={handleSearchFormSubmit}
                >
                  검색
                </Button>
              </Flex>
            </Flex> */}
            <CustomTableContainer minH="400px">
              <Table>
                <Thead>
                  <Tr>
                    <Th width="60px">No</Th>
                    <Th> 발신번호</Th>
                    <Th width="15%">사용</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {crsData && crsData.crsGroupList.length > 0 ? (
                    crsData.crsGroupList.map((item, i) => {
                      return (
                        <Tr key={`crs-number-${item.bizNumber}`}>
                          <Td>{i + 1}</Td>
                          <Td>{item.bizNumber}</Td>
                          <Td py={0}>
                            <Button
                              variant="primaryBlue"
                              size="sm"
                              isDisabled={bizNumbers.includes(item.bizNumber)}
                              onClick={() =>
                                handleUseButtonClick(item.bizNumber)
                              }
                            >
                              사용
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <NoDataTr colspan={5} text="조회된  발신번호가 없습니다." />
                  )}
                </Tbody>
              </Table>
            </CustomTableContainer>
            {/* <PaginationButtons
              // data={crsData?.crsGroupList ?? []}
              data={dummyList ?? []}
              isRefetch={refetchCrs}
              pageLength={pageLength}
              pagination={pagination}
              onPageChange={handlePageChange}
            /> */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="textGray" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}
export default React.memo(SelectCrsNumModal);

// const dummyList = [
//   { bizNumber: "01000000000" },
//   { bizNumber: "01000000001" },
//   { bizNumber: "01000000002" },
//   { bizNumber: "01000000003" },
//   { bizNumber: "01000000004" },
//   { bizNumber: "01000000005" },
//   { bizNumber: "01000000006" },
//   { bizNumber: "01000000007" },
//   { bizNumber: "01000000008" },
//   { bizNumber: "01000000009" },
//   { bizNumber: "01000000010" },
//   { bizNumber: "01000000020" },
//   { bizNumber: "01000000030" },
//   { bizNumber: "01000000040" },
//   { bizNumber: "01000000050" },
//   { bizNumber: "01000000060" },
//   { bizNumber: "01000000070" },
//   { bizNumber: "01000000080" },
//   { bizNumber: "01000000090" },
//   { bizNumber: "01000000100" },
//   { bizNumber: "01000000200" },
//   { bizNumber: "01000000300" },
//   { bizNumber: "01000000400" },
//   { bizNumber: "01000000500" },
// ];
