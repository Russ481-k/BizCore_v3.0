import { TableContainer, TableContainerProps } from "@chakra-ui/react";

const CustomTableContainer = (props: TableContainerProps) => (
  <TableContainer
    borderColor="gray.300"
    borderRadius="0.75rem"
    borderWidth={1}
    sx={{
      table: {
        tableLayout: "fixed",
      },
    }}
    {...props}
  />
);

export default CustomTableContainer;
