import { Flex, TableCellProps, Text, Th, VStack } from "@chakra-ui/react";

interface SortableThProps {
  text?: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  sortValue: string;
}
function SortableTh({
  text,
  sortBy,
  sortOrder,
  sortValue,
  ...props
}: SortableThProps & TableCellProps) {
  return (
    <Th
      // cursor="pointer"
      {...props}
    >
      <Flex display="inline-flex" align="center">
        <Text>{text}</Text>
        <VStack display="none" spacing={1.5} ms={1}>
          <Text
            className="fa-solid fa-caret-up fa-sm"
            color={
              sortBy === sortValue && sortOrder === "desc"
                ? "gray.800"
                : "gray.500"
            }
          />
          <Text
            className="fa-solid fa-caret-down fa-sm"
            color={
              sortBy === sortValue && sortOrder === "asc"
                ? "gray.800"
                : "gray.500"
            }
          />
        </VStack>
      </Flex>
    </Th>
  );
}

export default SortableTh;
