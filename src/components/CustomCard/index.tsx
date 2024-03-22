import { ReactNode } from "react";
import { Flex, FlexProps, Text } from "@chakra-ui/react";

interface CustomCardProps {
  children?: ReactNode;
  isHeader?: string;
}

function CustomCard({
  children,
  isHeader,
  ...props
}: CustomCardProps & FlexProps) {
  return (
    <Flex
      align="center"
      bg="white"
      borderColor="gray.300"
      borderRadius="12px"
      borderWidth="1px"
      color="gray.800"
      p={3}
      w="100%"
      {...props}
    >
      {isHeader ? (
        <Text color="black" fontSize="xl" fontWeight="600">
          {isHeader}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
}

export default CustomCard;
