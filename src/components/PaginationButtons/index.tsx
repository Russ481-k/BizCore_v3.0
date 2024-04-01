import { Button, Flex } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomSelect } from "components";
import Pagination from "type/Pagination";

interface PaginationButtonsProps {
  batchSize?: number | null;
  data: any[];
  isAllChecked?: boolean;
  isLoading?: boolean;
  isIndeterminate?: boolean;
  isRefetch?: boolean;
  totalPage?: number;
  pagination?: Pagination;
  onBatchSizeChange?: (batchSize: number) => void;
  onPageChange?: (page: number) => void;
  onRefetch?: (isRefetch: boolean) => void;
  onSelectionDelete?: () => void;
}
const PaginationButtons = ({
  batchSize,
  data,
  isAllChecked,
  isLoading,
  isIndeterminate,
  isRefetch,
  totalPage,
  pagination,
  onBatchSizeChange,
  onPageChange,
  onRefetch,
  onSelectionDelete,
}: PaginationButtonsProps) => {
  const scrollToTop = () => {
    const targetElement = document.getElementById("main");
    targetElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const targetModalElement = document.getElementById("send-modal");
    targetModalElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { getValues } = useForm<{
    batchSize: string;
  }>({
    mode: "onChange",
  });
  const [pageList, setPageList] = useState<number[]>([1]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleCurrentPageChange = (page: number) => {
    onPageChange?.(page);
    setCurrentPage(page);
    scrollToTop();
  };
  const paginationButtonsData = useMemo(() => {
    const data = [
      {
        id: 1,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 1;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 8;
          } else {
            return currentPage - 4;
          }
        },
      },
      {
        id: 2,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 2;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 7;
          } else {
            return currentPage - 3;
          }
        },
      },
      {
        id: 3,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 3;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 6;
          } else {
            return currentPage - 2;
          }
        },
      },
      {
        id: 4,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 4;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 5;
          } else {
            return currentPage - 1;
          }
        },
      },
      {
        id: 5,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 5;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 4;
          } else {
            return currentPage;
          }
        },
      },
      {
        id: 6,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 6;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 3;
          } else {
            return currentPage + 1;
          }
        },
      },
      {
        id: 7,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 7;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 2;
          } else {
            return currentPage + 2;
          }
        },
      },
      {
        id: 8,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 8;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length - 1;
          } else {
            return currentPage + 3;
          }
        },
      },
      {
        id: 9,
        buttonNumber: () => {
          if (pageList.length < 9 || currentPage < 5) {
            return 9;
          } else if (pageList.length <= currentPage + 4) {
            return pageList.length;
          } else {
            return currentPage + 4;
          }
        },
      },
    ];
    return data;
  }, [pageList, currentPage]);

  const handleBatchSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    onPageChange?.(1);
    onBatchSizeChange?.(Number(e.target.value ?? batchSize));
    scrollToTop();
  };

  useEffect(() => {
    if (!!pagination) {
      let totalPageCount = pagination.totalPage ?? 1;
      let pageCount = [];
      for (let count = 2; count < totalPageCount + 1; count++) {
        pageCount.push(count);
      }
      setPageList([1, ...pageCount]);
    }
    //  else {
    //   let totalTemplateCount = data.length;
    //   let totalPageCount =
    //     totalTemplateCount / Number(getValues("batchSize") ?? 1);
    //   let pageCount = [];
    //   for (let count = 2; count < totalPageCount + 1; count++) {
    //     pageCount.push(count);
    //   }
    //   setPageList([1, ...pageCount]);
    // }
    if (!!totalPage) {
      if (currentPage > totalPage) {
        onPageChange?.(currentPage - 1);
      }
    }
  }, [currentPage, data, pagination, totalPage, getValues, onPageChange]);

  useEffect(() => {
    if (isRefetch) {
      setCurrentPage(1);
      onPageChange?.(1);
    }
    onRefetch?.(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch]);

  return (
    <Flex alignItems="center" flex={1} justifyContent="space-between">
      <Flex flex={1}>
        {isIndeterminate && (
          <Button
            isLoading={isLoading}
            size="sm"
            variant="secondaryBlue"
            onClick={!isLoading ? onSelectionDelete : () => {}}
          >
            선택 삭제
          </Button>
        )}
        {isAllChecked && (
          <Button
            isLoading={isLoading}
            size="sm"
            variant="primaryBlue"
            onClick={!isLoading ? onSelectionDelete : () => {}}
          >
            전체 삭제
          </Button>
        )}
      </Flex>
      <Flex flex={4} justifyContent="center" gap={1}>
        <Button
          bgColor="white"
          borderColor="gray.300"
          borderWidth={1}
          color="gray.800"
          fontSize="xs"
          h="32px"
          isDisabled={data.length <= 0}
          minW="32px"
          p={0}
          w="32px"
          onClick={() => (currentPage > 1 ? handleCurrentPageChange(1) : "")}
        >{`<<`}</Button>
        <Button
          bgColor="white"
          borderColor="gray.300"
          borderWidth={1}
          color="gray.800"
          fontSize="xs"
          h="32px"
          isDisabled={data.length <= 0}
          minW="32px"
          p={0}
          w="32px"
          onClick={() =>
            currentPage > 1 ? handleCurrentPageChange(currentPage - 1) : ""
          }
        >{`<`}</Button>
        {paginationButtonsData.map((page) => (
          <Button
            bgColor={
              currentPage === page.buttonNumber() ? "primary.100" : "white"
            }
            borderColor={
              currentPage === page.buttonNumber() ? "primary.700" : "gray.300"
            }
            borderWidth={1}
            color={
              currentPage === page.buttonNumber() ? "primary.700" : "gray.800"
            }
            display={
              page.buttonNumber() > pageList.length ? "none" : "inline-flex"
            }
            fontSize="xs"
            fontWeight={currentPage === page.buttonNumber() ? "700" : "500"}
            h="32px"
            key={`page-${page.id}`}
            minW="32px"
            p={0}
            pointerEvents={
              currentPage === page.buttonNumber() ? "none" : "initial"
            }
            w="32px"
            onClick={() => handleCurrentPageChange(page.buttonNumber())}
          >
            {page.buttonNumber()}
          </Button>
        ))}
        <Button
          bgColor="white"
          borderColor="gray.300"
          borderWidth={1}
          color="gray.800"
          fontSize="xs"
          h="32px"
          isDisabled={data.length <= 0}
          minW="32px"
          p={0}
          w="32px"
          onClick={() =>
            currentPage < pageList.length
              ? handleCurrentPageChange(currentPage + 1)
              : ""
          }
        >{`>`}</Button>
        <Button
          bgColor="white"
          borderColor="gray.300"
          borderWidth={1}
          color="gray.800"
          fontSize="xs"
          h="32px"
          isDisabled={data.length <= 0}
          minW="32px"
          p={0}
          w="32px"
          onClick={() =>
            currentPage < pageList.length
              ? handleCurrentPageChange(pageList.length)
              : ""
          }
        >{`>>`}</Button>
      </Flex>
      <Flex alignItems="center" flex={1} gap={2} justify="flex-end">
        {batchSize && (
          <CustomSelect
            codes={[
              { code: "10", name: "10개씩" },
              { code: "20", name: "20개씩" },
              { code: "30", name: "30개씩" },
              { code: "50", name: "50개씩" },
              { code: "100", name: "100개씩" },
            ]}
            flex={1}
            maxW={120}
            size="sm"
            value={batchSize}
            onChange={handleBatchSizeChange}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default PaginationButtons;
